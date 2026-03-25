import { Button, Textarea, TextInput } from '@mantine/core';
import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react';

interface NewHabitFormProps {
  createNewHabit: () => void;
  habitTitle: string;
  setHabitTitle: Dispatch<SetStateAction<string>>;
  habitDescription: string;
  setHabitDescription: Dispatch<SetStateAction<string>>;
  canCreateHabit: boolean;
  setCanCreateHabit: Dispatch<SetStateAction<boolean>>;
}

const NewHabitForm = ({
  createNewHabit,
  habitTitle,
  setHabitTitle,
  habitDescription,
  setHabitDescription,
  canCreateHabit,
  setCanCreateHabit,
}: NewHabitFormProps) => {
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
      <Button onClick={createNewHabit} disabled={!canCreateHabit}>
        Create new habit
      </Button>
    </div>
  );
};

export { NewHabitForm };
