import { ClipboardCheck } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { useRxCollection } from 'rxdb-hooks';
import { Button } from '../../components/Button/Button';
import type {
  HabitCollection,
  HabitDocType,
} from '../../storage/schemas/habit';
import styles from './TrackingGrid.module.css';

const DAYS = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const EmptyGrid = () => {
  const handleOnClick = () => {
    console.log('### display new habit form');
  };

  return (
    <div className={styles['empty-tracking-grid']}>
      <div className={styles['instructions']}>
        <h2>No habits created</h2>
        <p>Create your first habit today and start tracking your progress!</p>
      </div>
      <Button onClick={handleOnClick}>
        <ClipboardCheck />
        Create Habit
      </Button>
    </div>
  );
};

const TrackingGrid = () => {
  const habitsCollection = useRxCollection('habits') as HabitCollection;
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

  return (
    <>
      {habits.length > 0 ? (
        <div className={styles['tracking-grid']}>
          <div>Habit</div>
          {Object.entries(DAYS).map(([dayNum, dayName]) => (
            <div key={dayNum}>
              <h3>{dayName}</h3>
            </div>
          ))}
          {habits.map((habit) => (
            <Fragment key={habit.id}>
              <div>{habit.title}</div>
              {Object.entries(DAYS).map(([dayNum]) => (
                <div
                  key={dayNum}
                  style={{ border: '2px solid orange', borderRadius: '50%' }}
                />
              ))}
            </Fragment>
          ))}
        </div>
      ) : (
        <EmptyGrid />
      )}
    </>
  );
};

export { TrackingGrid };
