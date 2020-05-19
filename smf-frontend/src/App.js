import React from 'react';
import Navbar from './Navbar'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar name="SMF"></Navbar>
      <div className="btns">
        <div className="card">
          <div className="card-body">
            <h4 className="white">
              Welcome to this demo of a Scalable Microfinance Framework
            </h4>
            <div className="loginbtn">
              <button className="btn btn-primary"> Login </button>
              <br></br>
              <button className="btn btn-primary b1"> Signup </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
