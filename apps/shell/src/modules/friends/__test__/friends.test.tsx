import { describe, it, expect } from 'vitest';
import { render, screen } from 'test';
import { Friends } from '../friends';

describe('Friends', () => {
  it('loads the friends remote', async () => {
    render(<Friends />);

    expect(await screen.findByTestId('friends-remote')).toBeInTheDocument();
  });
});
