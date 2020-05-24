import React, { Component } from 'react';
import './Direct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, withRouter } from "react-router-dom";

class Direct extends Component {
  constructor(props) {
    super(props);
    this.pay = this.pay.bind(this);
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

  pay() {
    let targetUrl = global.config.url + 'directpay';
    var myHeaders = new Headers();
    let jwt = localStorage.getItem('jwt');
    myHeaders.append("Authorization", "JWT " + jwt);
    myHeaders.append("Content-Type", "application/json");
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        'merchantPhone': this.state.merchantPhone,
        'amount': parseInt(this.state.amount)
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
        <h4 className="white inline"> Direct Pay </h4>
        <br></br>
        <br></br>
        <img alt="card" className="img1" width="27%" src="/card.png"></img>
        <br></br>
        <form>
          <div className="form-group">
            <label htmlFor="phoneno">Merchant's Phone Number</label>
            <input type="phone" className="form-control" id="phoneno" placeholder="Enter Phone Number"
              value={this.state.merchantPhone} onChange={(ev) => this.setState({ merchantPhone: ev.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="amt">Amount to Send</label>
            <input type="number" className="form-control" id="amt" placeholder="Enter Amount"
              value={this.state.amount} onChange={(ev) => this.setState({ amount: ev.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="cno">Card Number</label>
            <input type="number" className="form-control" id="cno" placeholder="Enter Valid Card Number" />
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="cvv">CVV</label>
              <input type="text" className="form-control" id="cvv" aria-describedby="emailHelp" placeholder="Enter Name" />
            </div>
            <div className="form-group col">
              <label htmlFor="exp">Expiry Date</label>
              <input type="text" className="form-control" id="exp" placeholder="MM/YY" />
            </div>
          </div>
          <center>
            <span className="or">OR</span>
          </center>
          <div className="form-group">
            <label htmlFor="upi">UPI ID</label>
            <input type="number" className="form-control" id="upi" placeholder="Enter Valid UPI ID" />
          </div>
          <br></br>
          <button type="button" className="btn btn-primary" onClick={this.pay} >Submit</button>
          <br></br>
        </form>
      </div>
    );
  }
}

export default Direct;