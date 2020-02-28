import React, { Component } from 'react'
import request from 'superagent';
import AddTodo from './AddTodo.js/index.js';

export default class TodoApp extends Component {
    state = { todos: [] }
    componentDidMount = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const todos = await request.get(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/todos`)
        .set('Authorization', user.token);
        // console.log(todos.body)
        this.setState({ todos: todos.body })
    }
    handleClick = async () => {
        const newTodo = {
            id: Math.random(),
            task: this.state.todoInput,
            complete: false
        };
        const user = JSON.parse(localStorage.getItem('user'));

        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos });
        const data = await request.post(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/todos`, {
            task: this.state.todoInput
        })
            .set('Authorization', user.token)
            }
    handleInput = (e) => { this.setState({ todoInput: e.target.value })}

    render() {
        if (localStorage.getItem('user')) {
        return (
            <div>
                <h4>Hey {JSON.parse(localStorage.getItem('user')).email}, let's tackle some tasks!</h4>
                <AddTodo 
                todoInput = {this.state.todoInput}
                handleClick = {this.handleClick}
                handleInput = {this.handleInput}
                />
                {
                    this.state.todos.map((todo) => <div
                    style={{
                        textDecoration: todo.complete ? 'line-through' : 'none'
                    }}
                    onClick={async () => {
                        const newTodos = this.state.todos.slice();
                        const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);
                        matchingTodo.complete = !todo.complete
                        const user = JSON.parse(localStorage.getItem('user'));
                        this.setState({ todos: newTodos });
                        const data = await request.put(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/todos`, matchingTodo)
                        .set('Authorization', user.token);
                    }} key={todo.id}>
                        {todo.task}
                        </div>
                    )
                }
                }
            </div>
        )
    }
}