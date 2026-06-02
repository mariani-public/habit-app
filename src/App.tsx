import { type JSX, useEffect, useState } from 'react';
import type { RxDatabase } from 'rxdb';
import Provider from 'rxdb-hooks/dist/Provider';
import { TrackingGrid } from './pages/TrackingGrid/TrackingGrid';
import {
  type HabitDatabaseCollections,
  initializeDatabase,
} from './storage/database';
import './App.css';

function App() {
  const [db, setDb] = useState<
    RxDatabase<HabitDatabaseCollections> | undefined
  >();
  const [page, _setPage] = useState<JSX.Element>(<TrackingGrid />);

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

  return <Provider db={db}>{page}</Provider>;
}

export default App;
