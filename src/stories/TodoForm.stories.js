import React from 'react';
import TodoForm from '../components/ui/TodoForm';

export default {
  title: 'Components/TodoForm',
  component: TodoForm,
};

const Template = (args) => <TodoForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (values, { resetForm }) => {
    alert(`Todo added: ${values.text}`);
    resetForm();
  },
};
