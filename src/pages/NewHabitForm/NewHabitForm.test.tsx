import { MantineProvider } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRxCollection } from 'rxdb-hooks';
import { describe, expect, it, type Mock, vi } from 'vitest';
import { render, renderHook } from 'vitest-browser-react';
import { NewHabitForm } from './NewHabitForm.component';
import { useNewHabitFormHooks } from './NewHabitForm.hooks';

vi.mock('./NewHabitForm.hooks');
vi.mock('rxdb-hooks', () => ({
  useRxCollection: vi.fn(),
}));

vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
  },
}));

describe('NewHabitForm', () => {
  describe('component', () => {
    it('renders the form', async () => {
      const { getByPlaceholder, getByRole } = await render(
        <MantineProvider env="test">
          <NewHabitForm />
        </MantineProvider>,
      );

      const titleInput = getByPlaceholder('Enter a title for your habit');
      const descriptionInput = getByPlaceholder(
        'Enter a short description for your habit',
      );
      const createButton = getByRole('button', { name: 'Create new habit' });

      expect(titleInput).toBeVisible();
      expect(descriptionInput).toBeVisible();
      expect(createButton).toBeVisible();
      expect(createButton).toBeDisabled();
    });
  });

  describe('hooks', () => {
    it('should call collection.insert and show notification on success', async () => {
      const mockInsert = vi.fn().mockResolvedValue(true);
      (useRxCollection as Mock).mockReturnValue({
        insert: mockInsert,
      });

      const { result } = await renderHook(() => useNewHabitFormHooks());

      await result.current.createNewHabit({
        habitTitle: 'Drink Water',
        habitDescription: '8 glasses',
      });

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Drink Water',
          description: '8 glasses',
        }),
      );
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Habit created successfully',
        }),
      );
    });
  });
});
