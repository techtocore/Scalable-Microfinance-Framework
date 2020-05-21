import React, { Component } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, withRouter } from "react-router-dom";


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.state = {
      opt: '',
      username: '',
      password: '',
      phone: '',
      location: '',
      role: '',
      name: ''
    };
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

  login() {
    let targetUrl = global.config.url + 'auth';
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password
      })
    };
    fetch(targetUrl, options)
      .then(blob => blob.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('jwt', data.access_token);
        this.props.history.push("/home");
      });
  }

  register() {
    let targetUrl = global.config.url + 'addUser';
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': this.state.name,
        'password': this.state.password,
        'role': this.state.role,
        'phone': this.state.phone,
        'location': this.state.location
      })
    };
    fetch(targetUrl, options)
      .then(blob => blob.json())
      .then(data => {
        console.log(data);
        this.setState({ opt: 'login' });
        this.setState({ username: this.state.phone })
      });
  }

  render(props) {
    const opt = this.state.opt;

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
        {/* <Link to="/signup">
          <button variant="outlined">
            Sign up
          </button>
        </Link> */}
      </div>

    );

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
            <input type="phone" className="form-control" id="phoneno" aria-describedby="emailHelp" placeholder="Enter Phone Number"
              value={this.state.username} onChange={(ev) => this.setState({ username: ev.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="pw">Password</label>
            <input type="password" className="form-control" id="pw" placeholder="Password"
              value={this.state.password} onChange={(ev) => this.setState({ password: ev.target.value })} />
          </div>
          <br></br>
          <button type="button" className="btn btn-primary" onClick={this.login} >Submit</button>
        </form>
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
              <input type="name" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name"
                value={this.state.name} onChange={(ev) => this.setState({ name: ev.target.value })} />
            </div>
            <div className="form-group col">
              <label htmlFor="phoneno">Phone Number</label>
              <input type="phone" className="form-control" id="phoneno" placeholder="Enter Phone Number" value={this.state.phone} onChange={(ev) => this.setState({ phone: ev.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pw">Password</label>
            <input type="password" className="form-control" id="pw" placeholder="Password"
              value={this.state.password} onChange={(ev) => this.setState({ password: ev.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="loc">Location</label>
            <input type="text" className="form-control" id="loc" placeholder="Address"
              value={this.state.location} onChange={(ev) => this.setState({ location: ev.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="role">I am a</label>
            <select className="custom-select" value={this.state.role} onChange={(ev) => this.setState({ role: ev.target.value })}>
              <option>Select Role</option>
              <option value="sender">Sender</option>
              <option value="receiver">Receiver</option>
              <option value="merchant">Merchant</option>
            </select>
          </div>
          <br></br>
          <button type="button" className="btn btn-primary" onClick={this.register}>Submit</button>
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