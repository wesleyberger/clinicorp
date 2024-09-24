import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoAdd from '../components/TodoAdd';
import { collection, addDoc } from 'firebase/firestore';

jest.mock('../config/firebaseConfig', () => ({
  db: {
    collection: jest.fn(),
  },
}));


jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

describe('TodoAdd Component', () => {
  const addTodoToListMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call addTodoToList with the new todo when form is submitted', async () => {

    addDoc.mockResolvedValue({ id: '1' });
    collection.mockReturnValue({});

    render(<TodoAdd addTodoToList={addTodoToListMock} />);

    const input = screen.getByPlaceholderText('Add a new todo');
    const button = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(expect.any(Object), {
        text: 'New Todo',
        completed: false,
        createdAt: expect.any(Date),
      });
      expect(addTodoToListMock).toHaveBeenCalledWith({ id: '1', text: 'New Todo', completed: false });
    });
  });
});
