import React, { Component } from 'react';
import './Home.css';
import { publish } from '../PubSub'
import Transaction from '../Transaction'
import LinkAC from '../Actions/LinkAC'
import Send from '../Actions/Send'
import Merchant from '../Actions/Merchant'
import Receive from '../Actions/Receive'
import Edit from '../Actions/Edit'
import Direct from '../Actions/Direct'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      name: '',
      navLevel: 1,
      page: ''
    };
    this.setPageTransact = this.setPage.bind(this, 'transact');
    this.setPageLinkac = this.setPage.bind(this, 'linkac');
    this.setPageSend = this.setPage.bind(this, 'send');
    this.setPageBank = this.setPage.bind(this, 'bank');
    this.setPageReceive = this.setPage.bind(this, 'receive');
    this.setPageEdit = this.setPage.bind(this, 'edit');
    this.setPageDirect = this.setPage.bind(this, 'direct');
    this.handleBackClick = this.handleBackClick.bind(this);
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

  setPage(pagename) {
    this.setState({ page: pagename });
    this.setState({ navLevel: 2 });
  }

  handleBackClick() {
    this.setState({ navLevel: 1 });
  }

  render(props) {
    let welcome = (
      <div>
        <br></br>
        <h3 className="white"> Hi {this.state.name} </h3>
        <br></br>
      </div>
    )
    if (this.state.role === 'sender' && this.state.navLevel === 1) {
      return (
        <div>
          {welcome}
          <ul className="list-group">
            <li className="list-group-item list-group-item-success" onClick={this.setPageLinkac}>Link Receiver</li>
            <li className="list-group-item list-group-item-info" onClick={this.setPageSend}>Send Money</li>
            <li className="list-group-item list-group-item-success" onClick={this.setPageTransact}>View Transactions</li>
            <li className="list-group-item list-group-item-info" onClick={this.setPageEdit}>Edit Profile</li>
          </ul>
        </div>
      );
    }
    else if (this.state.role === 'receiver' && this.state.navLevel === 1) {
      return (
        <div>
          {welcome}
          <ul className="list-group">
            <li className="list-group-item list-group-item-success" onClick={this.setPageReceive}>Withdraw Money</li>
            <li className="list-group-item list-group-item-info" onClick={this.setPageDirect}>Direct Transfer</li>
            <li className="list-group-item list-group-item-success" onClick={this.setPageTransact}>View Transactions</li>
            <li className="list-group-item list-group-item-info" onClick={this.setPageEdit}>Edit Profile</li>
          </ul>
        </div>
      );
    }
    else if (this.state.role === 'merchant' && this.state.navLevel === 1) {
      return (
        <div>
          {welcome}
          <ul className="list-group">
            <li className="list-group-item list-group-item-success" onClick={this.setPageBank}>Link Bank Account</li>
            <li className="list-group-item list-group-item-info" onClick={this.setPageTransact}>View Transactions</li>
            <li className="list-group-item list-group-item-success" onClick={this.setPageEdit}>Edit Profile</li>
          </ul>
        </div>
      );
    }
    else if (this.state.page === 'transact' && this.state.navLevel === 2) {
      return (
        <div>
          <Transaction handleBackClick={this.handleBackClick} role={this.state.role} />
        </div>
      )
    }
    else if (this.state.page === 'linkac' && this.state.navLevel === 2) {
      return (
        <div>
          <LinkAC handleBackClick={this.handleBackClick} />
        </div>
      )
    }
    else if (this.state.page === 'send' && this.state.navLevel === 2) {
      return (
        <div>
          <Send handleBackClick={this.handleBackClick} />
        </div>
      )
    }
    else if (this.state.page === 'bank' && this.state.navLevel === 2) {
      return (
        <div>
          <Merchant handleBackClick={this.handleBackClick} />
        </div>
      )
    }
    else if (this.state.page === 'receive' && this.state.navLevel === 2) {
      return (
        <div>
          <Receive handleBackClick={this.handleBackClick} />
        </div>
      )
    }
    else if (this.state.page === 'direct' && this.state.navLevel === 2) {
      return (
        <div>
          <Direct handleBackClick={this.handleBackClick} />
        </div>
      )
    }
    else if (this.state.page === 'edit' && this.state.navLevel === 2) {
      return (
        <div>
          <Edit handleBackClick={this.handleBackClick} />
        </div>
      )
    }
    else {
      return (
        <span></span>
      )
    }

  }
}

export default Home;