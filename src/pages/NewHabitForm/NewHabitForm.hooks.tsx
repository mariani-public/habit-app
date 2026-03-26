import { notifications } from '@mantine/notifications';
import { useCallback } from 'react';
import { useRxCollection } from 'rxdb-hooks';
import { v4 as uuid } from 'uuid';
import { type HabitCollection } from '../../storage/schemas/habit';

const useNewHabitFormHooks = () => {
  const habitsCollection = useRxCollection('habits') as HabitCollection;

  const createNewHabit = useCallback(
    async ({
      habitTitle,
      habitDescription = '',
    }: {
      habitTitle: string;
      habitDescription: string;
    }) => {
      if (!habitsCollection || habitTitle === '') return;

      try {
        const newHabit = await habitsCollection.insert({
          id: uuid(),
          title: habitTitle,
          description: habitDescription,
        });

        if (newHabit) {
          notifications.show({
            title: 'Habit created successfully',
            message: `Habit is '${habitTitle}'. Good luck, you can do this!`,
          });
        }
      } catch (error) {
        notifications.show({
          title: 'Could not create habit. Try again later.',
          message: `There was an error creating your habit ${habitTitle}`,
          color: 'red',
        });
        console.error('There was an error creating your habit', error);
      }
    },
    [habitsCollection],
  );

  return {
    createNewHabit,
  };
};

export { useNewHabitFormHooks };
