import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useRxCollection } from 'rxdb-hooks';
import { v4 as uuid } from 'uuid';
import { type HabitCollection } from '../../storage/schemas/habit';
import { NewHabitForm } from './NewHabitForm';

const NewHabitFormContainer = () => {
  const habitsCollection = useRxCollection('habits') as HabitCollection;
  const [habitTitle, setHabitTitle] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [canCreateHabit, setCanCreateHabit] = useState(false);

  const createNewHabit = async () => {
    if (!habitsCollection) return;

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
  };

  const NewHabitFormProps = {
    createNewHabit,
    habitTitle,
    setHabitTitle,
    habitDescription,
    setHabitDescription,
    canCreateHabit,
    setCanCreateHabit,
  };

  return <NewHabitForm {...NewHabitFormProps} />;
};

export { NewHabitFormContainer };
