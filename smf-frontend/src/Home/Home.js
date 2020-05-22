import React, { Component } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory, withRouter } from "react-router-dom";
import { publish } from '../PubSub'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      name: ''
    };
  }

  // componentWillMount(){}
  componentDidMount() {
    let targetUrl = global.config.url + 'me';
    var myHeaders = new Headers();
    let jwt = localStorage.getItem('jwt');
    myHeaders.append("Authorization", "JWT " + jwt);
    let options = {
      method: 'GET',
      headers: myHeaders
    };
    fetch(targetUrl, options)
      .then(response => {
        console.log(response);
        if (response.status !== 200) {
          throw new Error(response.status)
        }
        return response.json();
      })
      .then(data => {
        this.setState({ role: data.role });
        this.setState({ name: data.name });
        publish('LoginEvent', 'login');
      })
      .catch(error => {
        console.log('error', error); this.props.history.push("/");
      });
  }
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render(props) {
    let welcome = (
      <div>
        <br></br>
        <h2 className="white"> Hi {this.state.name} </h2>
        <br></br>
      </div>
    )
    if (this.state.role === 'sender') {
      return (
        <div>
          <ul className="list-group">
            <li className="list-group-item list-group-item-success">Link Receiver</li>
            <li className="list-group-item list-group-item-info">Send Money</li>
            <li className="list-group-item list-group-item-success">View Transactions</li>
            <li className="list-group-item list-group-item-info">Edit Profile</li>
          </ul>
        </div>
      );
    }
    else if (this.state.role === 'receiver') {
      return (
        <div>
          {welcome}
          <ul className="list-group">
            <li className="list-group-item list-group-item-success">Withdraw Money</li>
            <li className="list-group-item list-group-item-info">View Transactions</li>
            <li className="list-group-item list-group-item-success">Edit Profile</li>
          </ul>
        </div>
      );
    }
    else if (this.state.role === 'merchant') {
      return (
        <div>
          <ul className="list-group">
            <li className="list-group-item list-group-item-success">Link Bank Account</li>
            <li className="list-group-item list-group-item-info">View Transactions</li>
            <li className="list-group-item list-group-item-success">Edit Profile</li>
          </ul>
        </div>
      );
    }
    else {
      return (
        <span></span>
      )
    }

  }
}

export default Navbar;