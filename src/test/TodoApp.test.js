import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('odoApp Component', () => {
  it('should add a new todo to the list', async () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const button = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Todo')).toBeInTheDocument();
    });
  });
});
