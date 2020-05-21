import React from 'react';
import Navbar from './Navbar'
import Login from './Login'
import Home from './Home'
import './App.css';
import './config'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar name="SMF"></Navbar>
      <div className="btns">
        <div className="card">
          <div className="card-body">
            <Switch> {/* The Switch decides which component to show based on the current URL.*/}
              <Route exact path='/' component={Login}></Route>
              <Route exact path='/home' component={Home}></Route>
            </Switch>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
