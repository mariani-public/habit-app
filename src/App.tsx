import { useEffect, useState } from 'react';
import type { RxDatabase } from 'rxdb';
import Provider from 'rxdb-hooks/dist/Provider';
import { TrackingGrid } from './pages/TrackingGrid/TrackingGrid';
import {
  type HabitDatabaseCollections,
  initializeDatabase,
} from './storage/database';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  const [db, setDb] = useState<
    RxDatabase<HabitDatabaseCollections> | undefined
  >();

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
    <Provider db={db}>
      <TrackingGrid />
    </Provider>
  );
}

export default App;
