import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App.js';

test('renders To-Do List title', () => {
  render(<App />);
  const titleElement = screen.getByText(/to-do list/i);
  expect(titleElement).toBeInTheDocument();
});
