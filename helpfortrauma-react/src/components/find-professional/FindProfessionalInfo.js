import React, { Component } from 'react';
import './FindProfessionalInfo.css';

class FindProfessionalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }



    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="mainbar L-header">
                    <div className="container">
                    </div>
                </div>
                <div className="container FindProfessionalInfo-style">

                    <div className="content">

                        <div className="content-container">
                            <div className="row">
                              <div className="col-md-12 text-left Help_form">
                                <div className="Help_form-main">
                                  <h2>Find a Certified Trauma Professional</h2>
                                  <form action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST">
                                    <input type="hidden" name="oid" value="00D5A000000CA6e"/>
                                    <input type="hidden" name="retURL" value="https://hft-sfdc.herokuapp.com/find-a-professional"/>

                                    <div className="input-holder field-text">
                                        <div className="field-element ">
                                            <label for="first_name">First Name</label><input  id="first_name" maxlength="40" name="first_name" size="20" type="text" />
                                        </div>
                                    </div>
                                    <div className="input-holder field-text">
                                        <div className="field-element ">
                                            <label for="last_name">Last Name</label><input  id="last_name" maxlength="80" name="last_name" size="20" type="text" />
                                        </div>
                                    </div>
                                    <div className="input-holder field-text">
                                        <div className="field-element ">
                                            <label for="email">Email</label><input  id="email" maxlength="80" name="email" size="20" type="text" />
                                        </div>
                                    </div>
                                    
                                    <div className="input-holder field-text">
                                      <div className="field-element ">
                                        <label for="company">Company</label><input  id="company" maxlength="40" name="company" size="20" type="text" />
                                      </div>
                                    </div>
                                    <div className="input-holder field-text">
                                      <div className="field-element ">
                                        <label for="city">City</label><input  id="city" maxlength="40" name="city" size="20" type="text" />
                                      </div>
                                    </div>
                                    <div className="input-holder field-text">
                                      <div className="field-element ">
                                        <label for="state">State/Province</label><input  id="state" maxlength="20" name="state" size="20" type="text" />
                                      </div>
                                    </div>
                                    <div className="input-holder field-text">
                                      <div className="field-element ">
                                        <input type="submit" name="submit" value="Submit"/>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
export default FindProfessionalInfo;