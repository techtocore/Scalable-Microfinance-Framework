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
          <button className="btn btn-primary b1" onClick={this.handleSignupClick}> Signup </button>
        </div>
      </div>

    );

    let signup = (
      <div>

        <FontAwesomeIcon className="backicon" onClick={this.handleBackClick} icon={faArrowLeft} />
        <h4 className="white inline">
          Register
            </h4>
        <br></br>
        <br></br>
        <form>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="name">Full Name</label>
              <input type="name" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name" />
            </div>
            <div className="form-group col">
              <label htmlFor="phoneno">Phone Number</label>
              <input type="phone" className="form-control" id="phoneno" aria-describedby="emailHelp" placeholder="Enter Phone Number" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pw">Password</label>
            <input type="password" className="form-control" id="pw" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="loc">Location</label>
            <input type="text" className="form-control" id="loc" placeholder="Address" />
          </div>
          <div className="form-group">
            <label htmlFor="role">I am a</label>
            <select class="custom-select">
              <option selected>Select Role</option>
              <option value="sender">Sender</option>
              <option value="receiver">Receiver</option>
              <option value="merchant">Merchant</option>
            </select>
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );

    if (opt === '') {
      return main;
    }
    else if (opt === 'login') {
      return login;
    }
    else if (opt === 'signup') {
      return signup;
    }

  }
}

export default Login;