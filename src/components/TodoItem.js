import React, { useState } from "react";
import { Checkbox, ListItemControl } from 'react-md';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TodoActions from './ui/TodoActions';
import TodoTextField from './ui/TodoTextField';
import '../styles/components/TodoItem.scss';

const TodoItem = ({ todo, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [updateOn, setUpdateOn] = useState(false);
  const [newCompleted, setNewCompleted] = useState(todo.completed);

  const formik = useFormik({
    initialValues: {
      text: todo.text,
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .required('O campo não pode ser vazio')
        .min(3, 'O campo deve ter pelo menos 3 caracteres')
        .max(50, 'Máximo de 50 caracteres!'),
    }),
    onSubmit: async (values) => {
      await handleEditSave(todo.id, values.text);
    },
    enableReinitialize: true,
  });

  const handleSaveCompleted = async (id, completed) => {
    setLoading(true);
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, { completed });
      setNewCompleted(completed);
    } catch (error) {
      console.error('Erro ao atualizar a tarefa: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSave = async (id, text) => {
    setLoading(true);
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, { text });
      formik.setValues({ text });
      setUpdateOn(false);
    } catch (error) {
      console.error('Erro ao atualizar a tarefa: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const todoRef = doc(db, "todos", id);
      await deleteDoc(todoRef);
      onDelete(id);
    } catch (error) {
      console.error('Erro ao deletar a tarefa: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ListItemControl
      className="h__4"
      key={todo.id}
      primaryAction={(
        <Checkbox
          name={todo.id}
          id={todo.id}
          label={updateOn ? (
            <TodoTextField formik={formik} />
          ) : (
            <span className={newCompleted ? 'completed' : ''}>
              {formik.values.text}
            </span>
          )}
          checked={newCompleted}
          onChange={() => handleSaveCompleted(todo.id, !newCompleted)}
          disabled={loading || updateOn}
        />
      )}
      rightIcon={(
        <TodoActions
          onEdit={() => setUpdateOn(!updateOn)}
          onDelete={() => handleDelete(todo.id)}
          updateOn={updateOn}
          onSave={formik.handleSubmit}
        />
      )}
    />
  );
};

export default TodoItem;
