import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
const Auth = new AuthService();

class Publicprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="container">
                <div className="content">
                    <div className="content-container Profile-Management">
                        <div className="Lcenter">
                            <div>
                                <form className="email-form" >
                                    <h3>Profile Management</h3>
                                    <div className="input-holder field-text">
                                        <div className="field-element">
                                            <input type="email" name="email" placeholder="Your Email" data-label-inside="Email" className="shortnice form-input required  " value=""/>
                                            <span ></span>
                                        </div>
                                    </div>
                                    <div className="input-holder field-text">
                                        <div className="col-md-4 input-inline">
                                            <input type="text" name="name" placeholder="First Name" data-label-inside="First Name" className="shortnice form-input  required  " value=""/>
                                            <span ></span>
                                        </div>
                                        <div className="col-md-4 input-inline">
                                            <input type="text" name="lName" placeholder="Last Name" data-label-inside="Last Name" className="shortnice form-input  required  " value=""/>
                                        </div>
                                        <div className="col-md-4 input-inline">
                                            <input type="text" name="cradetial" placeholder="Credentials" data-label-inside="Cradetial" className="shortnice form-input  required  " value=""/>
                                        </div>
                                    </div>
                                    <div className="input-holder field-text">
                                        <div className="field-element ">
                                            <input type="text" name="username" placeholder="Username" data-label-inside="Last Name" className="shortnice form-input  required  " value=""/>
                                        </div>
                                    </div>
                                    <div className="input-holder field-text">
                                        <div className="field-element ">
                                            <input type="password" name="pass" placeholder="Password" data-label-inside="Password" className="shortnice form-input  required  " value=""/>
                                        </div>
                                    </div>
                                    <button className="btn submit-button button_submit dynamic-button  corners  ">
                                        Change Password
                                    </button>                                                                       
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
export default Publicprofile;