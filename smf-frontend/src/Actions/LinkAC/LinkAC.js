import React, { Component } from 'react';
import './LinkAC.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, withRouter } from "react-router-dom";

class LinkAC extends Component {
  constructor(props) {
    super(props);
    this.link = this.link.bind(this);
    this.state = {
      receiverPhone: ''
    };
  }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  link() {
    let targetUrl = global.config.url + 'linkReceiver';
    var myHeaders = new Headers();
    let jwt = localStorage.getItem('jwt');
    myHeaders.append("Authorization", "JWT " + jwt);
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        'receiverPhone': this.state.receiverPhone
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
        <h4 className="white inline"> Link Account of Receiver </h4>
        <br></br>
        <br></br>
        <form>
          <div className="form-group">
            <label htmlFor="phoneno">Receiver's Phone Number</label>
            <input type="phone" className="form-control" id="phoneno" placeholder="Enter Phone Number"
              value={this.state.receiverPhone} onChange={(ev) => this.setState({ receiverPhone: ev.target.value })} />
          </div>
          <br></br>
          <button type="button" className="btn btn-primary" onClick={this.link} >Submit</button>
          <br></br>
        </form>
      </div>
    );
  }
}

export default LinkAC;