import { MantineProvider } from '@mantine/core';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { TrackingGrid } from './TrackingGrid.component';

vi.mock('rxdb-hooks', () => ({
  useRxCollection: vi.fn(),
}));

describe('TrackingGrid', () => {
  it('renders the grid', async () => {
    const { getByText } = await render(
      <MantineProvider env="test">
        <TrackingGrid />
      </MantineProvider>,
    );

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    days.forEach((day) => {
      const dayCol = getByText(day);
      expect(dayCol).toBeVisible();
    });
  });
});
