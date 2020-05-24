import React, { Component } from 'react';
import './Transaction.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, withRouter } from "react-router-dom";
import { publish } from '../PubSub'

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      logs: []
    };
  }

  // componentWillMount(){}
  componentWillMount() {
    let targetUrl = '';
    if (this.props.role === 'sender')
      targetUrl = global.config.url + 'amountSent';
    else if (this.props.role === 'receiver')
      targetUrl = global.config.url + 'amountWithdrawn';
    else targetUrl = global.config.url + 'amountGot';

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
        this.setState({ amount: data.amount });
        this.setState({ logs: data.logs });
        // console.log(this.state.logs);
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

  head() {
    if (this.props.role === 'sender') {
      return (<span>Amount Sent </span>);
    } else if (this.props.role === 'merchant') {
      return (<span>Amount Got </span>);
    } else {
      return (<span>Amount Withdrawn </span>);
    }
  }

  theadtxt() {
    if (this.props.role === 'sender') {
      return (<span> Receiver's Phone No </span>);
    } else if (this.props.role === 'merchant') {
      return (<span> Receiver's Phone No </span>);
    } else {
      return (<span> Merchant's Phone No </span>);
    }
  }

  getph(obj) {
    if (this.props.role === 'sender') {
      return (<span> {obj.phone_r} </span>);
    } else if (this.props.role === 'merchant') {
      return (<span> {obj.phone_r} </span>);
    } else {
      return (<span> {obj.phone_m} </span>);
    }
  }

  render(props) {
    let welcome = (
      <div>
        <FontAwesomeIcon className="backicon" onClick={this.props.handleBackClick} icon={faArrowLeft} />
        <h4 className="white inline">
          {this.head()}:   <FontAwesomeIcon className="rsicon" icon={faRupeeSign} /> {this.state.amount}
        </h4>
        <br></br>
      </div>
    );
    return (
      <div>
        {welcome}
        <br></br>
        <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Timestamp</th>
            <th scope="col">{this.theadtxt()}</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        {this.state.logs.map(( listValue, index ) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{listValue.timestamp}</td>
              <td>{this.getph(listValue)}</td>
              <td>{listValue.amount}</td>
            </tr>
          );
        })}
      </table>
      </div>
    )

  }
}

export default Transaction;