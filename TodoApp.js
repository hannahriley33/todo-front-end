import React, { Component } from 'react'
import request from 'superagent';
import AddTodo from './AddTodo.js'

export default class TodoApp extends Component {
    state = { todos: [] }
    componentDidMount = async() => {
        const todos = await request.get('https://rocky-island-80350.herokuapp.com/')
        console.log(todos.body)
        this.setState({ todos: todos.body })
    }
    handleClick = async () => {
        const newTodo = {
            id: Math.random(),
            task: this.state.todoInput,
            complete: false
        };
        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos });
        const data = await request.post('https://rocky-island-80350.herokuapp.com/', {
            task: this.state.todoInput
        });
            }
    handleInput = (e) => { this.setState({ todoInput: e.target.value })}

    render() {
        return (
            <div>
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
                        this.setState({ todos: newTodos });
                        const data = await request.put(`https://rocky-island-80350.herokuapp.com/${todo.id}`, matchingTodo)
                    }} key={todo.id}>
                        {todo.task}
                        </div>
                    )
                }
            </div>
        )
    }
}