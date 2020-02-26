import React from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter, 
  Route, 
  Switch,
} from 'react-router-dom';
import TodoApp from './TodoApp.js'

function App() {
  return (
    <div className="App">
      <header>ToDo List</header>
      <BrowserRouter>
        <Switch>
          <Route exact path ="/" component={ TodoApp }/>
        </Switch>
       </BrowserRouter>
    </div>
  );
}

export default App;
