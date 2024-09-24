import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import TodoForm from '../components/ui/TodoForm';

describe('TodoForm Component', () => {
  const onSubmitMock = jest.fn();

  test('should render the form with input and button', () => {
    render(<TodoForm onSubmit={onSubmitMock} />);
    
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  test('should display error message when input is empty', async () => {
    render(<TodoForm onSubmit={onSubmitMock} />);

    fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

    expect(await screen.findByText('O campo não pode ser vazio')).toBeInTheDocument();
  });

  test('should call onSubmit when form is submitted with valid input', async () => {
    render(<TodoForm onSubmit={onSubmitMock} />);

    fireEvent.change(screen.getByPlaceholderText('Add a new todo'), {
      target: { value: 'New Todo' }
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add todo/i }));
    });

    await waitFor(() => {
      expect(screen.queryByText('O campo não pode ser vazio')).not.toBeInTheDocument();
    });
    
    expect(onSubmitMock).toHaveBeenCalledWith({ text: 'New Todo' }, expect.anything());
  });
});
