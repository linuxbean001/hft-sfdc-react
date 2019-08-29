import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Help.css';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      console.log('xxxxxx xxxxx ev ' + this.props.location.state.eventId);

    }
  }
 
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 text-left Help_form">
            <div className="Help_form-main">
              <h2>Application Help</h2>
              <form action="https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8" method="POST">
                <input type="hidden" name="orgid" value="00D5A000000CA6e"/>
                <input type="hidden" name="retURL" value="https://hft-sfdc.herokuapp.com/hft/AppHelp"/>

                <div className="input-holder field-text">
                  <div className="field-element ">
                    <label for="name">Contact Name</label><input  id="name" maxlength="80" name="name" size="20" type="text" />
                  </div>
                </div>
                <div className="input-holder field-text">
                  <div className="field-element ">
                    <label for="email">Email</label><input  id="email" maxlength="80" name="email" size="20" type="text" />
                    </div>
                </div>
                <div className="input-holder field-text">
                  <div className="field-element ">
                    <label for="phone">Phone</label><input  id="phone" maxlength="40" name="phone" size="20" type="text" />
                  </div>
                </div>
                <div className="input-holder field-text">
                  <div className="field-element ">
                    <label for="type">Type</label>
                    <select  id="type" name="type">
                      <option value="">--None--</option>
                      <option value="Problem">Problem</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Question">Question</option>
                    </select>
                  </div>
                </div>
                <div className="input-holder field-text">
                  <div className="field-element ">
                    <label for="subject">Subject</label><input  id="subject" maxlength="80" name="subject" size="20" type="text" />
                  </div>
                </div>
                <div className="input-holder field-text">
                  <div className="field-element ">
                    <label for="description">Description</label><textarea name="description"></textarea>
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
    );
  }
};
export default Help;