import React, { Component } from 'react';
import './Transaction.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, withRouter } from "react-router-dom";
import { publish } from '../PubSub'

class Transaction extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     role: '',
  //     amount: ''
  //   };
  // }

  // componentWillMount(){}
  // componentDidMount() {}
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

  render(props) {
    let welcome = (
      <div>
        <FontAwesomeIcon className="backicon" onClick={this.props.handleBackClick} icon={faArrowLeft} />
        <h4 className="white inline">
          {this.head()}
        </h4>
        <br></br>
      </div>
    );
    return (
      <div>
        {welcome}
      </div>
    )

  }
}

export default Transaction;