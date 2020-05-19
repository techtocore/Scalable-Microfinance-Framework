import React from 'react';
import Navbar from './Navbar'
import Login from './Login'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar name="SMF"></Navbar>
      <div className="btns">
        <div className="card">
          <div className="card-body">
            <Login></Login>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
