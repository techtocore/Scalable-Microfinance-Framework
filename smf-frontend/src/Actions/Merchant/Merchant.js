import React, { Component } from 'react';
import './Merchant.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, withRouter } from "react-router-dom";

class Merchant extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.state = {
      bank: ''
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
    let targetUrl = global.config.url + 'merchantRegister';
    var myHeaders = new Headers();
    let jwt = localStorage.getItem('jwt');
    myHeaders.append("Authorization", "JWT " + jwt);
    myHeaders.append("Content-Type", "application/json");
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        'bank': this.state.bank
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
        <h4 className="white inline"> Add Bank Account </h4>
        <br></br>
        <br></br>
        <img alt="card" className="img1" width="25%" src="/cashback.png"></img>
        <br></br>
        <form>
          <div className="form-group">
            <label htmlFor="bnm">Bank Name</label>
            <input type="phone" className="form-control" id="bnm" placeholder="Enter Bank Name"
              value={this.state.receiverPhone} onChange={(ev) => this.setState({ receiverPhone: ev.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="bank">Account Number</label>
            <input type="text" className="form-control" id="bank" placeholder="Enter Account Number"
              value={this.state.bank} onChange={(ev) => this.setState({ bank: ev.target.value })} />
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="cvv">Branch Name</label>
              <input type="text" className="form-control" id="cvv" aria-describedby="emailHelp" placeholder="Enter Branch" />
            </div>
            <div className="form-group col">
              <label htmlFor="exp">IFSC Code</label>
              <input type="text" className="form-control" id="exp" placeholder="Enter IFSC"/>
            </div>
          </div>
          <br></br>
          <button type="button" className="btn btn-primary" onClick={this.add} >Submit</button>
          <br></br>
        </form>
      </div>
    );
  }
}

export default Merchant;