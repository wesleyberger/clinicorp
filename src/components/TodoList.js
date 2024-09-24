import React, { useState, useEffect } from 'react';
import { List } from 'react-md';
import TodoItem from './TodoItem';
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const TodoList = ({ initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos || []); // Allow injection of initial todos for testing

  useEffect(() => {
    if (!initialTodos) {  // Only fetch from Firestore if no initial todos are provided
      const q = query(collection(db, "todos"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const todosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTodos(todosData);
      });
      return () => unsubscribe();
    }
  }, [initialTodos]);

  return (
    <div>
      <List className="mt__3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </div>
  );
};

export default TodoList;
