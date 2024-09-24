import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoActions from '../components/ui/TodoActions';

describe('TodoActions Component', () => {
  const onEditMock = jest.fn();
  const onDeleteMock = jest.fn();
  const onSaveMock = jest.fn();

  test('should render edit and delete buttons', () => {
    render(
      <TodoActions 
        onEdit={onEditMock} 
        onDelete={onDeleteMock} 
        updateOn={false} 
        onSave={onSaveMock} 
      />
    );
    
    expect(screen.getByText('edit')).toBeInTheDocument();
    expect(screen.getByText('delete')).toBeInTheDocument();
  });

  test('should call onEdit when edit button is clicked', () => {
    render(
      <TodoActions 
        onEdit={onEditMock} 
        onDelete={onDeleteMock} 
        updateOn={false} 
        onSave={onSaveMock} 
      />
    );
    
    fireEvent.click(screen.getByText('edit'));
    expect(onEditMock).toHaveBeenCalledTimes(1);
  });

  test('should call onSave when save button is clicked', () => {
    render(
      <TodoActions 
        onEdit={onEditMock} 
        onDelete={onDeleteMock} 
        updateOn={true} 
        onSave={onSaveMock} 
      />
    );
    
    fireEvent.click(screen.getByText('save'));
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  test('should call onDelete when delete button is clicked', () => {
    render(
      <TodoActions 
        onEdit={onEditMock} 
        onDelete={onDeleteMock} 
        updateOn={false} 
        onSave={onSaveMock} 
      />
    );
    
    fireEvent.click(screen.getByText('delete'));
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
