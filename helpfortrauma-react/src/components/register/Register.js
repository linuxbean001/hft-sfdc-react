import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import RegisterService from '../../services/RegisterService';
import AlertMsg from '../shared/alert';

const Auth = new AuthService();
const Reg = new RegisterService();

class Register extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      fName: '',
      lName: null,
      email: null,
      username: null,
      pass: null,
      name: null,
      targetid: null,
      message: '',
      agree: '',
      fields: {},
      errors: {},
      isChecked: false,
      // showSuccessMsg: false,
      actionMessage: '',
      messageColor: '',
      subscriberOptions: [],
      showAlert: false

    };

    this.RegisterMe = this.RegisterMe.bind(this);
    this.handleCheck = this.handleCheck.bind(this);

  }

  handleCheck(event) {
    this.setState({ isChecked: event.target.checked });
  }

  sendWelcomeEmail() {
    Reg.sendWelcomeEmail({
      name: this.refs.name.value,
      email: this.refs.email.value
    }).then(res => {
      if (res.data.success) {
        this.props.history.replace('/register/checkout');
      }
    }).catch(err => {
      console.log('xxxxxxx xxxxxxxxxx xxxxxxxxxx err ', err);
    })
  }

  // Register form validations
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    //Email
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

    if (!this.refs.name.value) {
      formIsValid = false;
      errors["name"] = "Cannot be empty firstname";
    }

    if (!this.refs.username.value) {
      // formIsValid = false;
      errors["username"] = "Cannot be empty username";
    }
    if (!this.refs.pass.value) {
      // formIsValid = false;
      errors["pass"] = "Cannot be empty password";
    }
    this.setState({ errors: errors });

    console.log(formIsValid);
    return formIsValid;
  }

  getSubscriberOptions = () => {
    Reg.getSubscriberOptions()
      .then(res => {
        if (res.data.success) {
          this.setState({
            subscriberOptions: res.data.body
          });
        }
        console.log('xxxx xxxxxxxx xxxxxxx res is ', this.state.subscriberOptions);
      }).catch(err => {
        console.log('xxxx xxxxxxxx xxxxxxx res is ', err);
      });
  }

  componentDidMount() {
    this.getSubscriberOptions();
  }

  RegisterMe(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      this.setState({ message: 'Form submitted' });

      const userInfoVo = {
        'name': this.refs.name.value,
        'email': this.refs.email.value,
        'created': '',
        'username': this.refs.username.value,
        'pass': this.refs.pass.value,
        'targetid': this.refs.targetid.value
      }
      console.log('xxxxxxxxxxxxx data', userInfoVo);
      Reg.registerUser(userInfoVo)
        .then((result) => {
          Reg.setCreatedUser(result.data.body[0]);
          Reg.setUsrCredentials(userInfoVo);
          console.log('Register done', result);

          this.setState({
            //  showSuccessMsg: true,
            actionMessage: result.data.message,

          });

          if (result.data.success) {
            this.setState({
              actionMessage: result.data.message,
              messageColor: 'success',
              showAlert: true
            }, function () {
              this.sendWelcomeEmail();
            });
             setTimeout(
              function () {
                this.props.history.replace('/hft');
              }
                .bind(this),
              2000
            );
            // setTimeout(
            //   function () {
            //     this.props.history.replace('/register/checkout');
            //   }
            //     .bind(this),
            //   2000
            // );

          } else {

            this.setState({
              actionMessage: result.data.message,
              messageColor: 'warning',
              showAlert: true
            });
          }
        }).catch(err => {

        });

    } else {
      this.setState({ message: 'Form has errors' });
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  resetAlert = (reset) => {
    if (reset) {
      this.setState({
        showAlert: false
      })
    }
  }

  render() {
    console.log(this.state);
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

        <div className="page-block  page_block_custom" id="page_block_below_registration_content">
          <div className="border-holder">
            <div className="container">
              <div className="block-inner">
                <div className="block-inner-main">
                  <div className="border-holder-left col-md-6 form-border-holder-left-registration">
                    <div className="contents element-272">
                      <h5>Help for Trauma is a collection of tools and resources to help eliminate the affects of trauma.</h5>
                      <p>After creating a free account, you'll be able to explore premium services available:</p>
                      <ul>
                        <li>Help for Trauma App</li>
                        <li>Premium Online Training Courses</li>
                        <li>Consultation Calls for Professionals</li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-holder-right col-md-6 form-border-holder-right-registration">
                    <div className="page-element widget-container widget-headline widget-form">
                      <div className="contents element-278">
                        <h2>Get Started with a Free Account.</h2>
                        {
                          this.state.showAlert ? (
                            <AlertMsg msg={this.state.actionMessage} reset={this.resetAlert} style={this.state.messageColor} />
                          ) : (null)
                        }

                        <p>Sign up in 30 seconds. No credit card required.</p>
                        <form className="email-form form-inline" data="instapage-form" data-wid="430" noValidate="noValidate">
                          <input type="hidden" name="variant" defaultValue="A" />
                          <div className="input-holder field-text">
                            <div className="field-element ">
                              <input type="email" ref="email" name="email" value={this.state.fields["email"]} onChange={this.handleChange.bind(this, "email")} placeholder="Your Email" data-label-inside="Email" className="shortnice form-input required  " />
                              <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                            </div>
                          </div>
                          <div className="input-holder field-text">
                            <div className="col-md-4 input-inline">
                              <input type="text" ref="name" name="name" value={this.state.fields["name"]} placeholder="First Name" data-label-inside="First Name" className="shortnice form-input  required  " />
                              <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                            </div>
                            <div className="col-md-4 input-inline">
                              <input type="text" ref="lName" name="lName" value={this.state.fields["lName"]} placeholder="Last Name" data-label-inside="Last Name" className="shortnice form-input  required  " />

                            </div>
                            <div className="col-md-4 input-inline">
                              <input type="text" ref="cradetial" name="cradetial" value={this.state.fields["cradetial"]} placeholder="Credentials" data-label-inside="Cradetial" className="shortnice form-input  required  " />

                            </div>
                          </div>
                          <div className="input-holder field-text">
                            <div className="field-element ">
                              <input type="text" ref="username" name="username" value={this.state.fields["username"]} placeholder="Username" data-label-inside="Last Name" className="shortnice form-input  required  " />
                            </div>
                          </div>

                          <div className="input-holder field-text">
                            <div className="field-element ">
                              <input type="password" ref="pass" name="pass" value={this.state.fields["pass"]} placeholder="Password" data-label-inside="Password" className="shortnice form-input  required  " />
                            </div>
                          </div>
                          <div className="input-holder field-text">
                            <div className="field-element ">
                              <select defaultValue="I am here for" ref="targetid" name="targetid" value={this.state.fields["targetid"]}>
                                <option value="I am here for" disabled={true}>I am here for</option>
                                {
                                  this.state.subscriberOptions.map(val =>
                                    <option key={val.id} value={val.name}>{val.name}</option>
                                  )}
                              </select>
                            </div>
                          </div>

                          <button onClick={this.RegisterMe} className="btn submit-button button_submit dynamic-button  corners  ">Create My Account <i className="fa fa-play-circle" aria-hidden="true"></i></button>
                        </form>
                        <p>Already have an account?   <Link to={'/login'}> Login here</Link></p>
                      </div>
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
export default Register;