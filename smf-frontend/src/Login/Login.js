import React, { Component } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.state = { opt: '' };
  }

  handleLoginClick() {
    this.setState({ opt: 'login' });
  }

  handleSignupClick() {
    this.setState({ opt: 'signup' });
  }

  handleBackClick() {
    this.setState({ opt: '' });
  }

  render(props) {
    const opt = this.state.opt;
    let login = (
      <div>

        <FontAwesomeIcon className="backicon" onClick={this.handleBackClick} icon={faArrowLeft} />
        <h4 className="white inline">
          Login
            </h4>
        <br></br>
        <br></br>
        <form>
          <div className="form-group">
            <label htmlFor="phoneno">Phone Number</label>
            <input type="phone" className="form-control" id="phoneno" aria-describedby="emailHelp" placeholder="Enter Phone Number" />
          </div>
          <div className="form-group">
            <label htmlFor="pw">Password</label>
            <input type="password" className="form-control" id="pw" placeholder="Password" />
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
    let main = (
      <div>
        <h4 className="white">
          Welcome to this demo of a Scalable Microfinance Framework
            </h4>
        <div className="loginbtn">
          <button className="btn btn-primary" onClick={this.handleLoginClick}> Login </button>
          <br></br>
          <button className="btn btn-primary b1"> Signup </button>
        </div>
      </div>

    );
    if (opt === '') {
      return main;
    }
    else if (opt === 'login') {
      return login;
    }

  }
}

export default Login;