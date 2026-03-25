import { useEffect, useState } from 'react';
import type { RxDatabase } from 'rxdb';
import DatabaseProvider from 'rxdb-hooks/dist/Provider';
import { TrackingGrid } from './pages/TrackingGrid/TrackingGrid';
import {
  type HabitDatabaseCollections,
  initializeDatabase,
} from './storage/database';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NewHabitFormContainer } from './pages/NewHabitForm/NewHabitFormContainer';

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
        {!isShowingNewHabitForm ? <TrackingGrid /> : <NewHabitFormContainer />}
      </MantineProvider>
    </DatabaseProvider>
  );
}

export default App;
