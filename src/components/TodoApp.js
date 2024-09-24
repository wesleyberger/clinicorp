import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import React, { Component } from "react";
import TodoAdd from "./TodoAdd";
import TodoList from "./TodoList";

class TodoApp extends Component {
    state = {
        todos: [],
    };

    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "todos"));
            const todos = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            this.setState({ todos });
        } catch (error) {
            console.error("Erro ao buscar os documentos: ", error);
        }
    };

    addTodoToList = (newTodo) => {
        this.setState((prevState) => ({
            todos: [...prevState.todos, newTodo],
        }));
    };

    render() {
        return (
            <div className='container__sm'>
                <h3>To-Do List</h3>
                <TodoAdd addTodoToList={this.addTodoToList} />
                <TodoList todos={this.state.todos} />
            </div>
        );
    }
}

export default TodoApp;
