import React, { Component } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faHandPointRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, withRouter } from "react-router-dom";
import { Subscriber } from '../PubSub'

class Navbar extends Component {
  // constructor(props){
  // super(props);
  // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render(props) {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="navbar-brand" href="#">
            <FontAwesomeIcon className="mainicon1" icon={faRupeeSign} />
            <FontAwesomeIcon className="mainicon2" icon={faHandPointRight} />
            {this.props.name} </a>
          <div className="ml-auto mr-1">
            <ul className="navbar-nav">
              <Subscriber topic="LoginEvent">
                {text => {
                  if (text === 'login') {
                    return (<li className="nav-item">
                      <Link to="/">
                        <FontAwesomeIcon className="mainicon2" icon={faSignOutAlt} />
                      </Link>
                    </li>)
                  }
                  return (<span className="nav-item"></span>);
                }}
              </Subscriber>
            </ul>
          </div>
        </nav>
        <footer className="bg-dark">
          <a href="https://akashravi.github.io/" className="foot">
            Designed by Akash Ravi</a>
        </footer>
      </div>
    );
  }
}

export default Navbar;