import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

const Auth = new AuthService();
//const Url='http://localhost:3300';
//const Url = '';
class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            fields: {},
            showSuccessMsg: false,
            actionMessage: '',
            messageColor: '',

        };
    }


    resetPassword = () => {

       
        if(this.state.fields["password"] || this.state.fields["con-password"]){

            if(this.state.fields["password"] == this.state.fields["con-password"]) {

                this.setState({
                    showSuccessMsg: true,
                    actionMessage: <i className="fas fa-spinner icon-flipped"></i>,
              
                });


                Auth.resetPassword(this.state.fields["password"], this.props.match.params.token
                )
                    .then(res => {
                        this.setState({
                            showSuccessMsg: true,
                            responseMessage: res.data.success,
                            actionMessage: res.data.message,
                        });
                        if (res.data.success) {
                            this.setState({
                                messageColor: 'alert alert-success'
                              });
                           
                            setTimeout(
                                function() {
                                    Auth.setToken(this.props.match.params.token);
                                    this.props.history.replace('/hft/Home');
                                }
                                .bind(this),
                                2000
                            );
                        } else {
    
                            this.setState({
                                messageColor: 'alert alert-danger'
                              });
    
                        }
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });
            } else {
    
                this.setState({
                    showSuccessMsg: true,
                    responseMessage: false,
                    actionMessage: 'Password did not match',
                    messageColor: 'alert alert-danger'
                  });
    
                  setTimeout(
                    function() {
                        this.setState({
                            showSuccessMsg: false,
                            responseMessage: '',
                            actionMessage: '',
                            messageColor:''
                          });
                    }
                    .bind(this),
                    3000
                );
    
            }

        }else{

            this.setState({
                showSuccessMsg: true,
                responseMessage: false,
                actionMessage: 'Please fill the fields',
                messageColor: 'alert alert-danger'
              });

              setTimeout(
                function() {
                    this.setState({
                        showSuccessMsg: false,
                        responseMessage: '',
                        actionMessage: '',
                        messageColor:''
                      });
                }
                .bind(this),
                3000
            );

        }

        
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
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
                                    <div className="page-element widget-container widget-headline widget-form">
                                        <div className="contents element-278 col-md-offset-3 col-md-6">
                                            <h2>Reset Password</h2>
                                            {
                                                this.state.showSuccessMsg
                                                    ? (

                                                        <div className={'text-center ' + this.state.messageColor}>
                                                            <span>{this.state.actionMessage}</span>
                                                        </div>

                                                    )
                                                    : (
                                                        null
                                                    )
                                            }
                                            <form method="post" action="" className="email-form" data="instapage-form" data-wid="430" noValidate="novalidate">
                                                <div className="input-holder field-text">
                                                    <div className="field-element">

                                                        <input onChange={this.handleChange.bind(this, "password")} type="password" className="shortnice form-input  required" ref="password" value={this.state.fields["password"]} name="password" placeholder="Password" tabIndex="1" />

                                                    </div>
                                                    <div className="field-element">

                                                        <input onChange={this.handleChange.bind(this, "con-password")} type="password" className="shortnice form-input  required" ref="con-password" value={this.state.fields["con-password"]} name="con-password" placeholder="Confirm Password" tabIndex="2" />

                                                    </div>
                                                </div>


                                                <button type="button" onClick={this.resetPassword} className="btn submit-button button_submit dynamic-button  corners  " tabIndex="4">
                                                    Reset Password &nbsp; <i className="fa fa-play-circle"></i>
                                                </button>
                                            </form>
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

export default ResetPassword;