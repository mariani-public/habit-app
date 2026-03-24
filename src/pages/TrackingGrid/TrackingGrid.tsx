import { Grid, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useRxCollection } from 'rxdb-hooks';
import type {
  HabitCollection,
  HabitDocType,
} from '../../storage/schemas/habit';

const DAYS = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
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

  console.log('habits', habits);

  return (
    <Grid columns={Object.keys(DAYS).length + 1}>
      <Grid.Col span={1}>
        <div>Habit</div>
      </Grid.Col>
      {Object.entries(DAYS).map(([dayNum, dayName]) => (
        <Grid.Col span={1} key={dayNum}>
          <h3>{dayName}</h3>
        </Grid.Col>
      ))}
      {habits.map((habit) => (
        <>
          <Grid.Col span={1} key={habit.id}>
            <div>{habit.title}</div>
          </Grid.Col>
          {Object.entries(DAYS).map(([dayNum]) => (
            <Grid.Col span={1} key={dayNum}>
              <ThemeIcon radius="lg">
                <IconCheck height="1rem" />
              </ThemeIcon>
            </Grid.Col>
          ))}
        </>
      ))}
    </Grid>
  );
};

export { TrackingGrid };
