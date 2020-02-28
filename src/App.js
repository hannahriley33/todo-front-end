import React from 'react';
import './App.css';
import { 
  BrowserRouter, 
  Route, 
  Switch,
  Redirect
} from 'react-router-dom';
import TodoApp from './TodoApp.js'
import AddTodo from './AddTodo.js'

const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends React.Component {
  render() {
  return (
    <div className="App">
      <header>ToDo List</header>
      <BrowserRouter>
        <Switch>
          <Route path ="/" render={() => isLoggedIn()
          ? <TodoApp />
          : <Redirect to='login' />
          }/>
        </Switch>
       </BrowserRouter>
    </div>
  );
}
};