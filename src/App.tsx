import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import type { RxDatabase } from "rxdb";
import Provider from "rxdb-hooks/dist/Provider";
import {
	type HabitDatabaseCollections,
	initializeDatabase,
} from "./storage/database";

function App() {
	const [count, setCount] = useState(0);
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
		<Provider db={db}>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</Provider>
	);
}

export default App;
