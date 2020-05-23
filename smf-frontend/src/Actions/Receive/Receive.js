import React, { Component } from 'react';
import './Receive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, withRouter } from "react-router-dom";

class Recieve extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.state = {
      merchantPhone: '',
      amount: 0
    };
  }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  add() {
    let targetUrl = global.config.url + 'transact';
    var myHeaders = new Headers();
    let jwt = localStorage.getItem('jwt');
    myHeaders.append("Authorization", "JWT " + jwt);
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        'merchantPhone': this.state.merchantPhone,
        'amount': this.state.amount
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
        <h4 className="white inline"> Withdraw Amount </h4>
        <br></br>
        <br></br>
        <img alt="card" className="img1" width="35%" src="/scanqr.png"></img>
        <br></br>
        <form>
          <div className="form-group">
            <label htmlFor="bnm">Phone Number</label>
            <input type="phone" className="form-control" id="bnm" placeholder="Enter Merchant's Phone Number"
              value={this.state.merchantPhone} onChange={(ev) => this.setState({ merchantPhone: ev.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount to Receive</label>
            <input type="text" className="form-control" id="amount" placeholder="Enter Amount"
              value={this.state.amount} onChange={(ev) => this.setState({ amount: ev.target.value })} />
          </div>
          <br></br>
          <button type="button" className="btn btn-primary" onClick={this.add} >Submit</button>
          <br></br>
        </form>
      </div>
    );
  }
}

export default Recieve;