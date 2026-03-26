import { Button, Textarea, TextInput } from '@mantine/core';
import { type ChangeEvent, useState } from 'react';
import { useNewHabitFormHooks } from './NewHabitForm.hooks';

const NewHabitForm = () => {
  const [habitTitle, setHabitTitle] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [canCreateHabit, setCanCreateHabit] = useState(false);

  const { createNewHabit } = useNewHabitFormHooks();

  const handleTitleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.trim();

    if (title !== '') {
      setHabitTitle(e.target.value);
      setCanCreateHabit(true);
    }
  };

  return (
    <div>
      <TextInput
        label="Habit title"
        placeholder="Enter a title for your habit"
        withAsterisk
        maxLength={255}
        value={habitTitle}
        onChange={handleTitleOnChange}
      />
      <Textarea
        label="Habit description"
        placeholder="Enter a short description for your habit"
        value={habitDescription}
        onChange={(e) => setHabitDescription(e.target.value)}
      />
      <Button
        onClick={() => createNewHabit({ habitTitle, habitDescription })}
        disabled={!canCreateHabit}
      >
        Create new habit
      </Button>
    </div>
  );
};

export { NewHabitForm };
