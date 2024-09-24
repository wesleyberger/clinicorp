// TodoAdd.js
import React from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import TodoForm from './ui/TodoForm';

const TodoAdd = ({ addTodoToList }) => {
    const addTodo = async (text) => {
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                text: text,
                completed: false,
                createdAt: new Date()
            });
            return { id: docRef.id, text, completed: false };
        } catch (error) {
            console.error("Erro ao adicionar o documento: ", error);
        }
    };

    return (
        <TodoForm
            onSubmit={async (values, { resetForm }) => {
                const addedTodo = await addTodo(values.text);
                // Atualize a lista de todos no componente pai
                if (addedTodo) {
                    addTodoToList(addedTodo);
                }
                resetForm();
            }}
        />
    );
};

export default TodoAdd;
