import { useEffect, useState } from "react";
import { useRxCollection } from "rxdb-hooks";
import type {
	HabitCollection,
	HabitDocType,
} from "../../storage/schemas/habit";
import styles from "./TrackingGrid.module.css";

const DAYS = {
	0: "Sunday",
	1: "Monday",
	2: "Tuesday",
	3: "Wednesday",
	4: "Thursday",
	5: "Friday",
	6: "Saturday",
};

const TrackingGrid = () => {
	const habitsCollection = useRxCollection("habits") as HabitCollection;
	const [habits, setHabits] = useState<HabitDocType[]>([]);

	useEffect(() => {
		const fetchHabits = async () => {
			if (habitsCollection) {
				const habits = await habitsCollection.find().exec();
				setHabits(habits);
			}
		};

		fetchHabits();
	}, [habitsCollection]);

	console.log("habits", habits);

	return (
		<div className={styles["tracking-grid"]}>
			<div>Habit</div>
			{Object.entries(DAYS).map(([dayNum, dayName]) => (
				<div key={dayNum}>
					<h3>{dayName}</h3>
				</div>
			))}
			{habits.map((habit) => (
				<>
					<div key={habit.id}>{habit.title}</div>
					{Object.entries(DAYS).map(([dayNum]) => (
						<div
							key={dayNum}
							style={{ border: "2px solid orange", borderRadius: "50%" }}
						/>
					))}
				</>
			))}
		</div>
	);
};

export { TrackingGrid };
