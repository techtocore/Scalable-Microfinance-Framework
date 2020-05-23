import React, { Component } from 'react';
import './Edit.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, withRouter } from "react-router-dom";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.pay = this.pay.bind(this);
    this.state = {
      name: '',
      location: '',
      oldPassword: '',
      password: ''
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
        this.setState({ name: data.name });
        this.setState({ location: data.location });
      })
      .catch(error => {
        console.log('error', error);
      });
  }
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  pay() {
    let targetUrl = global.config.url + 'changeUser';
    var myHeaders = new Headers();
    let jwt = localStorage.getItem('jwt');
    myHeaders.append("Authorization", "JWT " + jwt);
    myHeaders.append("Content-Type", "application/json");
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        'name': this.state.name,
        'location': this.state.location,
        'oldPassword': this.state.oldPassword,
        'password': this.state.password
      })
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
        alert(data.message);
      })
      .catch(error => {
        console.log('error', error);
        alert("Some error occured. Please try again.");
      });
  }

  render(props) {
    return (
      <div>
        <FontAwesomeIcon className="backicon" onClick={this.props.handleBackClick} icon={faArrowLeft} />
        <h4 className="white inline"> Edit Profile </h4>
        <br></br>
        <br></br>
        <img alt="card" className="img1" width="35%" src="/profile.png"></img>
        <br></br>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="phone" className="form-control" id="name" placeholder="Enter Fullname"
              value={this.state.name} onChange={(ev) => this.setState({ name: ev.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="loc">Location</label>
            <input type="text" className="form-control" id="loc" placeholder="Enter Location"
              value={this.state.location} onChange={(ev) => this.setState({ location: ev.target.value })} />
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="opw">Old Password</label>
              <input type="password" className="form-control" id="opw" placeholder="Enter Current Password"
                value={this.state.oldPassword} onChange={(ev) => this.setState({ oldPassword: ev.target.value })} />
            </div>
            <div className="form-group col">
              <label htmlFor="pw">New Password</label>
              <input type="password" className="form-control" id="pw" placeholder="Enter Current Password"
                value={this.state.password} onChange={(ev) => this.setState({ password: ev.target.value })} />
            </div>
          </div>
          <br></br>
          <button type="button" className="btn btn-primary" onClick={this.pay} >Submit</button>
          <br></br>
        </form>
      </div>
    );
  }
}

export default Edit;