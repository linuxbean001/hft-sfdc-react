import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import './Lcenter.css';
const Auth = new AuthService();


class LcHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.sendToParent = this.sendToParent.bind(this);

    }

    handleLogout() {
        Auth.logout()
        this.props.history.replace('/login');
    }

    sendToParent() {
        this.props.childDataFromLc('');
    }
    render() {
        return (
            <div>
                <div>

                    <div className="mainbar L-header">

                        <div className="container">

                            <button type="button" className="btn mainbar-toggle" data-toggle="collapse" data-target=".mainbar-collapse">
                                <i className="fa fa-bars"></i>
                            </button>



                            <div className="mainbar-collapse collapse ">

                                <ul className="nav navbar-nav mainbar-nav">

                                    <li>


                                        <NavLink to={'/Learning-center/Learning-Dashboard'}>  <i className="far fa-dashboard"></i>My Learning Dashboard</NavLink>
                                    </li>

                                    <li className="dropdown">

                                        <Link to={'/Courses'} className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">  <i className="fal fa-graduation-cap"></i>All Courses
              <span className="caret"></span>
                                        </Link>

                                        <ul className="dropdown-menu">
                                            <li><a href="./ui-buttons.html"><i className="fa fa-user nav-icon"></i> Test Buttons</a></li>
                                            <li><a href="./ui-tabs.html"><i className="fa fa-bars nav-icon"></i> Tabs &amp; Accordions</a></li>
                                            <li><a href="./ui-notifications.html"><i className="fa fa-asterisk nav-icon"></i> Popups / Notifications</a></li>
                                            <li><a href="./ui-sliders.html"><i className="fa fa-tasks nav-icon"></i> Sliders</a></li>
                                            <li><a href="./ui-typography.html"><i className="fa fa-font nav-icon"></i> Typography</a></li>
                                            <li><a href="./ui-portlets.html"><i className="fa fa-list-alt nav-icon"></i> Portlets</a></li>


                                            <li className="dropdown-submenu">
                                                <a tabIndex="-1" href="#">
                                                    <i className="fa fa-bar-chart-o"></i>
                                                    &nbsp;&nbsp;Charts &amp; Graphs
      </a>

                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a href="./ui-chart-flot.html">
                                                            <i className="fa fa-bar-chart-o"></i>
                                                            &nbsp;&nbsp;jQuery Flot
          </a>
                                                    </li>

                                                    <li>
                                                        <a href="./ui-chart-morris.html">
                                                            <i className="fa fa-bar-chart-o"></i>
                                                            &nbsp;&nbsp;Morris.js
          </a>
                                                    </li>
                                                </ul>
                                            </li>

                                        </ul>
                                    </li>

                                    <li className="dropdown">

                                        <Link to={'/Live-Training'} className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">  <i className="fal fa-chalkboard-teacher"></i>Live Training<span className="caret"></span></Link>

                                        <ul className="dropdown-menu">
                                            <li className="dropdown-header">Form Elements</li>

                                            <li>
                                                <a href="./ui-form-regular.html">
                                                    <i className="fa fa-location-arrow nav-icon"></i>
                                                    Regular Elements
      </a>
                                            </li>

                                            <li>
                                                <a href="./ui-form-extended.html">
                                                    <i className="fa fa-bolt nav-icon"></i>
                                                    Extended Plugins
      </a>
                                            </li>

                                            <li>
                                                <a href="./ui-form-validation.html">
                                                    <i className="fa fa-check nav-icon"></i>
                                                    Form Validation
      </a>
                                            </li>

                                            <li className="divider"></li>

                                            <li className="dropdown-header">Data Tables</li>

                                            <li>
                                                <a href="./ui-table-basic.html">
                                                    <i className="fa fa-table"></i>
                                                    &nbsp;&nbsp;Basic Tables
      </a>
                                            </li>

                                            <li>
                                                <a href="./ui-table-advanced.html">
                                                    <i className="fa fa-table"></i>
                                                    &nbsp;&nbsp;Advanced Tables
      </a>
                                            </li>

                                            <li>
                                                <a href="./ui-table-responsive.html">
                                                    <i className="fa fa-table"></i>
                                                    &nbsp;&nbsp;Responsive Tables
      </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="dropdown">


                                        <Link to={'/Consultation-Calls'} className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"> <i className="fal fa-headset"></i>Consultation Calls<span className="caret"></span></Link>

                                        <ul className="dropdown-menu">
                                            <li><a href="./page-profile.html"><i className="fa fa-user nav-icon"></i> Profile</a></li>
                                            <li><a href="./page-invoice.html"><i className="fa fa-money nav-icon"></i> Invoice</a></li>
                                            <li><a href="./page-pricing.html"><i className="fa fa-dollar nav-icon"></i> Pricing Plans</a></li>
                                            <li><a href="./page-support.html"><i className="fa fa-question nav-icon"></i> Support Page</a></li>
                                            <li><a href="./page-gallery.html"><i className="fa fa-picture-o nav-icon"></i> Gallery</a></li>
                                            <li><a href="./page-settings.html"><i className="fa fa-cogs nav-icon"></i> Settings</a></li>
                                            <li><a href="./page-calendar.html"><i className="fa fa-calendar nav-icon"></i> Calendar</a></li>
                                        </ul>
                                    </li>

                                    <li className="dropdown">


                                        <Link to={'/Certificates'} className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">  <i className="fal fa-file-certificate"></i>Certificates<span className="caret"></span></Link>

                                        <ul className="dropdown-menu" role="menu">
                                            <li>
                                                <a href="./page-notifications.html">
                                                    <i className="fa fa-bell"></i>
                                                    &nbsp;&nbsp;Notifications
      </a>
                                            </li>

                                            <li>
                                                <a href="./ui-icons.html">
                                                    <i className="fa fa-smile-o"></i>
                                                    &nbsp;&nbsp;Font Icons
      </a>
                                            </li>

                                            <li className="dropdown-submenu">
                                                <a tabIndex="-1" href="#">
                                                    <i className="fa fa-ban"></i>
                                                    &nbsp;&nbsp;Error Pages
      </a>

                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a href="./page-404.html">
                                                            <i className="fa fa-ban"></i>
                                                            &nbsp;&nbsp;404 Error
          </a>
                                                    </li>

                                                    <li>
                                                        <a href="./page-500.html">
                                                            <i className="fa fa-ban"></i>
                                                            &nbsp;&nbsp;500 Error
          </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="dropdown-submenu">

                                                <a tabIndex="-1" href="#">
                                                    <i className="fa fa-lock"></i>
                                                    &nbsp;&nbsp;Login Pages
      </a>

                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a href="./account-login.html">
                                                            <i className="fa fa-unlock"></i>
                                                            &nbsp;&nbsp;Login
          </a>
                                                    </li>

                                                    <li>
                                                        <a href="./account-login-social.html">
                                                            <i className="fa fa-unlock"></i>
                                                            &nbsp;&nbsp;Login Social
          </a>
                                                    </li>

                                                    <li>
                                                        <a href="./account-signup.html">
                                                            <i className="fa fa-star"></i>
                                                            &nbsp;&nbsp;Signup
          </a>
                                                    </li>

                                                    <li>
                                                        <a href="./account-forgot.html">
                                                            <i className="fa fa-envelope"></i>
                                                            &nbsp;&nbsp;Forgot Password
          </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="divider"></li>

                                            <li>
                                                <a href="./page-blank.html">
                                                    <i className="fa fa-square-o"></i>
                                                    &nbsp;&nbsp;Blank Page
      </a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="dropdown">

                                        <Link to={'/Evaluations'}>  <i className="fal fa-clipboard-list"></i>Evaluations</Link>

                                    </li>
                                    <li className="dropdown">
                                        <Link to={'/Resources'}>
                                            <i className="fa fa-external-link"></i>
                                            Resources
                </Link>

                                    </li>
                                    <li className="dropdown">
                                        <Link to={'/LearnerHelp'}>
                                            <i className="far fa-question-circle" aria-hidden="true"></i>
                                            Help
                </Link>

                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>





                </div>



            </div>
        );
    }
}

export default LcHeader;
