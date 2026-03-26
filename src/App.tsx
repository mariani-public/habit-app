import { useEffect, useState } from 'react';
import type { RxDatabase } from 'rxdb';
import DatabaseProvider from 'rxdb-hooks/dist/Provider';
import { TrackingGrid } from './pages/TrackingGrid/TrackingGrid.component';
import {
  type HabitDatabaseCollections,
  initializeDatabase,
} from './storage/database';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NewHabitForm } from './pages/NewHabitForm/NewHabitForm.component';

function App() {
  const [db, setDb] = useState<
    RxDatabase<HabitDatabaseCollections> | undefined
  >();
  const [isShowingNewHabitForm, setIsShowingNewHabitForm] = useState(false);

  const showNewHabitForm = () =>
    setIsShowingNewHabitForm(!isShowingNewHabitForm);

  useEffect(() => {
    let cancelled = false;

    // RxDB instantiation can be asynchronous
    const init = async () => {
      const initializedDB = await initializeDatabase();
      if (!cancelled) {
        setDb(initializedDB as RxDatabase<HabitDatabaseCollections>);
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DatabaseProvider db={db}>
      <MantineProvider>
        <Notifications position="top-center" />
        <button onClick={showNewHabitForm}>Add habit</button>
        {!isShowingNewHabitForm ? <TrackingGrid /> : <NewHabitForm />}
      </MantineProvider>
    </DatabaseProvider>
  );
}

export default App;
