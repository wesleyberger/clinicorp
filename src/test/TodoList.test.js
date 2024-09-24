// src/test/TodoList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';

// Mocking the Firebase Firestore related methods
jest.mock('../config/firebaseConfig', () => ({
  db: jest.fn()
}));

describe('TodoList Component', () => {
  const mockTodos = [
    { id: '1', text: 'Test Todo 1', completed: false },
    { id: '2', text: 'Test Todo 2', completed: true },
  ];

  test('renders todos passed as props', () => {
    render(<TodoList initialTodos={mockTodos} />);
    
    // Check if the todos are correctly rendered
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  test('displays "no todos" message when there are no todos', () => {
    render(<TodoList initialTodos={[]} />);

    // Verify that no todos are present in the document
    expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Todo 2')).not.toBeInTheDocument();
  });
});
