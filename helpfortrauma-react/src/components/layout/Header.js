import React, { Component } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import RegisterService from '../../services/RegisterService';
import './style.css';
import profile from '../profile/profile';

const Auth = new AuthService();
const RegService = new RegisterService();

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSelected: ''
    };
  };
  componentWillMount() {
  }
  handleLogout() {
    Auth.logout()
  }
  render() {
    return (
      <div>
        <header className="App-header app-main-header">
          <div className="navbar">
            <div className="container">
              <div className="navbar-header">
                <div className="pull-left">
                  <div className="logo">
                    <NavLink to={'/'}> <img src="logo.png" height="100%" width="100%" /></NavLink>
                  </div>
                </div>
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <i className="fa fa-cogs"></i>
                </button>
              </div>
              <div className="navbar-collapse collapse col-md-8">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <NavLink to={'/about'} style={{ cursor: "pointer" }} activeClassName="isSelectedActive-about" onClick={this.sendToParent}>
                      &nbsp;&nbsp;About Trauma</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/find-a-professional'} style={{ cursor: "pointer" }} activeClassName="isSelectedActive" onClick={this.sendToParent}>
                      &nbsp;&nbsp;Find a Certified Trauma Professional</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/Learning-center'} style={{ cursor: "pointer" }} activeClassName="isSelectedActive-traning" onClick={this.sendToParent}>
                      &nbsp;&nbsp;Trauma Training</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/hft'} exact style={{ cursor: "pointer" }} activeClassName="isSelectedActive-app" onClick={this.sendToParent}>
                      &nbsp;&nbsp;Help for Trauma App</NavLink>
                  </li>
                </ul>
              </div>
              {
                Auth.loggedIn() ? (
                  <div className="navbar-collapse-right-course col-md-2 p-0">
                    <ul className="nav navbar-nav navbar-right">

                      {/* <li>
                        <ul className="nav navbar-nav noticebar navbar-left">
                          <li className="dropdown">
                            <a href="./page-notifications.html" className="dropdown-toggle" data-toggle="dropdown">
                              <i className="fa fa-bell"></i>
                              <span className="navbar-visible-collapsed">&nbsp;Notifications&nbsp;</span>
                              <span className="badge">3</span>
                            </a>
                            <ul className="dropdown-menu noticebar-menu" role="menu">
                              <li className="nav-header">
                                <div className="pull-left">
                                  Notifications
                                </div>
                                <div className="pull-right">
                                  <a href="href-no-hash">Mark as Read</a>
                                </div>
                              </li>
                              <li>
                                <a href="./page-notifications.html" className="noticebar-item">
                                  <span className="noticebar-item-image">
                                    <i className="fa fa-cloud-upload text-success"></i>
                                  </span>
                                  <span className="noticebar-item-body">
                                    <strong className="noticebar-item-title">Templates Synced</strong>
                                    <span className="noticebar-item-text">20 Templates have been synced to the Mashon Demo instance.</span>
                                    <span className="noticebar-item-time"><i className="fa fa-clock-o"></i> 12 minutes ago</span>
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="./page-notifications.html" className="noticebar-item">
                                  <span className="noticebar-item-image">
                                    <i className="fa fa-ban text-danger"></i>
                                  </span>
                                  <span className="noticebar-item-body">
                                    <strong className="noticebar-item-title">Sync Error</strong>
                                    <span className="noticebar-item-text">5 Designs have been failed to be synced to the Mashon Demo instance.</span>
                                    <span className="noticebar-item-time"><i className="fa fa-clock-o"></i> 20 minutes ago</span>
                                  </span>
                                </a>
                              </li>
                              <li className="noticebar-menu-view-all">
                                <a href="./page-notifications.html">View All Notifications</a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown">
                            <a href="./page-notifications.html" className="dropdown-toggle" data-toggle="dropdown">
                              <i className="fa fa-envelope"></i>
                              <span className="navbar-visible-collapsed">&nbsp;Messages&nbsp;</span>
                            </a>
                            <ul className="dropdown-menu noticebar-menu" role="menu">
                              <li className="nav-header">
                                <div className="pull-left">
                                  Messages
                                </div>
                                <div className="pull-right">
                                  <a href="href-no-hash">New Message</a>
                                </div>
                              </li>
                              <li>
                                <a href="./page-notifications.html" className="noticebar-item">
                                  <span className="noticebar-item-image">
                                  </span>
                                  <span className="noticebar-item-body">
                                    <strong className="noticebar-item-title">New Message</strong>
                                    <span className="noticebar-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</span>
                                    <span className="noticebar-item-time"><i className="fa fa-clock-o"></i> 20 minutes ago</span>
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="./page-notifications.html" className="noticebar-item">
                                  <span className="noticebar-item-image">
                                  </span>
                                  <span className="noticebar-item-body">
                                    <strong className="noticebar-item-title">New Message</strong>
                                    <span className="noticebar-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</span>
                                    <span className="noticebar-item-time"><i className="fa fa-clock-o"></i> 5 hours ago</span>
                                  </span>
                                </a>
                              </li>
                              <li className="noticebar-menu-view-all">
                                <a href="./page-notifications.html">View All Messages</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li> */}
                      <li className="dropdown navbar-profile">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="href-no-hash">
                          <i className="fa fa-user"></i>
                          <span className="navbar-profile-label">rod@rod.me &nbsp;</span>
                          <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu" role="menu">
                          <li>
                            <a href="/profile">
                              <i className="fa fa-user"></i>
                              &nbsp;&nbsp;My Profile
                              </a>
                          </li>
                          <li>
                            <a href="./page-pricing.html">
                              <i className="fa fa-dollar"></i>
                              &nbsp;&nbsp;Plans &amp; Billing
                            </a>
                          </li>
                          <li>
                            <a href="./page-settings.html">
                              <i className="fa fa-cogs"></i>
                              &nbsp;&nbsp;Settings
                            </a>
                          </li>
                          <li className="divider"></li>
                          <li>
                            <Link to={'/login'} onClick={this.handleLogout.bind(this)}>
                              <i className="fa fa-sign-out"></i>
                              &nbsp;&nbsp;Logout
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                ) : (
                    <div className="navbar-collapse-right col-md-4" hidden={RegService.getCreatedUser() != null || undefined ? true : false}> 
                      <NavLink className="create-an-account" to={'/register'}>Create an account</NavLink>
                      <NavLink to={"/login"} className="login">Login</NavLink>
                    </div>
                  )
              }
            </div>
          </div>
        </header >
      <Switch>
          <Route exact path='/profile' component={profile} />
      </Switch>
      </div>
      
    );
  }
}
export default Header;