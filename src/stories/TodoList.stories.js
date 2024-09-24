import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import TodoList from '../components/TodoList';
export default {
  title: 'Components/TodoList',
  component: TodoList,
};

const Template = (args) => {
  const [todos, setTodos] = useState(args.todos);

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    action('Todo Deleted')(id);
  };

  const handleSave = (id, newText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
    action('Todo Saved')(id, newText);
  };

  return (
    <TodoList todos={todos} onDelete={handleDelete} onSave={handleSave} />
  );
};

export const Default = Template.bind({});
Default.args = {
  todos: [
    {
      id: '1',
      text: 'Learn React',
      completed: false,
    },
    {
      id: '2',
      text: 'Complete Todo app',
      completed: true,
    },
    {
      id: '3',
      text: 'Test Storybook',
      completed: false,
    },
  ],
};
