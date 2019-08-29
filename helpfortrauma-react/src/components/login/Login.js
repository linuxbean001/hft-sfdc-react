import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import AlertMsg from '../shared/alert';


const Auth = new AuthService();
//const Url='http://localhost:3300';
//const Url = '';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      fields: {},
      errors: {},
      showSuccessMsg: false,
      actionMessage: '',
      messageColor: '',
      showLoader: false
    };
    this.LoginMe = this.LoginMe.bind(this);
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;



    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    if (!fields["pass"] && fields["pass"] !== "undefined") {
      formIsValid = false;
      errors["pass"] = "Cannot be empty Password";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  componentWillMount() {

    const currentLocation = this.props.location.pathname;

    // this.setState({ menuSelected: currentLocation });




    if (Auth.loggedIn())
      this.props.history.replace('/Home');

  }



  LoginMe() {
    // e.preventDefault();
    this.setState({
      showLoader: true,

    });
    Auth.login(this.refs.email.value, this.refs.pass.value)
      .then(res => {
        console.log('login true', res.data.success);
        this.setState({
          showLoader: false,
        }, function () {
          if (res.data.success) {

            this.setState({
              showAlert: true,
              messageColor: 'success',
              actionMessage: res.data.message

            });



            setTimeout(
              function () {
                this.props.history.replace('/hft/Home');
              }
                .bind(this),
              2000
            );

          } else {

            this.setState({
              messageColor: 'danger',
              showAlert: true,
              actionMessage: res.data.message
            });

          }
        });




      })
      .catch(err => {

        console.log(err);
      })

    if (this.handleValidation()) {
      this.setState({ message: 'Form submitted' });

    } else {
      this.setState({ message: 'Form has errors' });

    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }
  resetLoader = (reset) => {
    if (reset) {
      this.setState({
        showLoader: false
      })
    }
  }
  resetAlert = (reset) => {
    if (reset) {
      this.setState({
        showAlert: false
      })
    }
  }
  render() {

    return (

      <div>
        <div className="page-block page_block_below_fold" id="page_block_below_registration">
          <div className="border-holder">
            <div className="container">
              <div className="block-inner">
                <div className="border-holder-left col-md-12">

                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="page-block  page_block_custom" id="page_block_below_login_content">
          <div className="border-holder">
            <div className="container">
              <div className="block-inner">
                <div className="block-inner-main">
                  <div className="border-holder-left col-md-6 form-border-holder-left-login">
                    <div className="page-element widget-container widget-headline widget-form">
                      <div className="contents element-278">
                        <h2>Log in to your account</h2>
                        {
                          this.state.showLoader
                            ? (
                              <div className="text-center">
                                <AlertMsg reset={this.resetLoader} spinner={true} />
                              </div>
                            )
                            : (
                              null
                            )
                        }
                        {
                          this.state.showAlert
                            ? (
                              <div className="text-center">
                                <AlertMsg msg={this.state.actionMessage} reset={this.resetAlert} style={this.state.messageColor} />
                              </div>
                            )
                            : (
                              null
                            )
                        }
                        <form method="post" action="" className="email-form" data="instapage-form" data-wid="430" noValidate="novalidate">
                          <div className="input-holder field-text">
                            <div className="field-element ">
                              <input type="text" className="shortnice form-input  required" ref="email" name="email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} placeholder="Email" tabIndex="1" />
                              <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                            </div>
                          </div>

                          <div className="input-holder field-text">
                            <div className="field-element ">
                              <input type="password" className="shortnice form-input  required  " name="pass" id="pass" ref="pass" onChange={this.handleChange.bind(this, "pass")} value={this.state.fields["pass"]} placeholder="Password" tabIndex="2" />
                              <span style={{ color: "red" }}>{this.state.errors["pass"]}</span>
                            </div>
                          </div>
                          <div className="input-holder field-text input-holder-field-text-checkbox">
                            <div className="field-element ">
                              <input type="checkbox" name="agree" value="Bike" /> Remember me <span className="float-right forgot_passwd"><NavLink to={'/login/forget-password'}>Forgot Password?</NavLink></span>
                            </div>
                          </div>

                          <button type="button" onClick={this.LoginMe} className="btn submit-button button_submit dynamic-button  corners  " tabIndex="4">
                            Login &nbsp; <i className="fa fa-play-circle"></i>
                          </button>
                        </form>
                        <p className="text-center">Need an account?   <NavLink to={'/register'}> Create one for free!</NavLink></p>
                      </div>
                    </div>

                  </div>
                  <div className="border-holder-right col-md-6 form-border-holder-right-login">
                    <div className="contents element-272">
                      <h5>Today's Trauma Insight:</h5>
                      <p>A one-time traumatic event can cause severe emotional damage to children and adults. These events are perceived as shocking and life threatening.</p>
                      <p>Single blow traumas may include natural disasters such as earthquakes, technological disasters such as plane crashes and criminal violence such as robbery or homicide.</p>
                      <p>These events can traumatize witnesses in addition to victims.</p>
                      <a href="#" target="_blank">Learn More</a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;