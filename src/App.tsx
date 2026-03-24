import { useEffect, useState } from 'react';
import type { RxDatabase } from 'rxdb';
import DatabaseProvider from 'rxdb-hooks/dist/Provider';
import { TrackingGrid } from './pages/TrackingGrid/TrackingGrid';
import {
  type HabitDatabaseCollections,
  initializeDatabase,
} from './storage/database';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  const [db, setDb] = useState<
    RxDatabase<HabitDatabaseCollections> | undefined
  >();

  useEffect(() => {
    let cancelled = false;

    // RxDB instantiation can be asynchronous
    const init = async () => {
      const initializedDB = await initializeDatabase();
      if (!cancelled && !db) {
        setDb(initializedDB as RxDatabase<HabitDatabaseCollections>);
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [db]);

  return (
    <DatabaseProvider db={db}>
      <MantineProvider>
        <TrackingGrid />
      </MantineProvider>
    </DatabaseProvider>
  );
}

export default App;
