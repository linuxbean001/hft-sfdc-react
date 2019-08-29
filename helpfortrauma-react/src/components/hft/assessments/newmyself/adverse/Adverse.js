import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AuthService from '../../../../../services/AuthService';
//import './css/Recovery.css';

import './js/ace.js';
const Auth = new AuthService();

class Adverse extends Component {


  render() {
    return (
      <div>
        <div className="row form-group head_div">
          <div className="pull-left"><span className="head_title">Assessments</span></div>
        </div>
        <div className="row">
          <div className="question-main-style">
            <div className="title-question">
            <h1 className="text-center">Adverse Childhood Experience (ACE) Questionnaire</h1>
          </div>
          <div className="question-main col-md-12 float-left p-0">
            <div className="question-bar">
              <div className="border border-light text-center">
                Question <span className="progress-current">1</span> of <span className="length"></span>
              </div>
            </div>
            
            <div className="question-progress  mb-2 ">
              <div className="question">
                <p></p>
              </div>
              
              <div className="progress-main progress-main-scale ace">
                
                <div className="progress-range">
                  <label className="ace-container">Yes
                    <input type="radio" checked="checked" name="question-radio" value="1"></input>
                    <span className="checkmark"></span>
                  </label>
                  <label className="ace-container">No
                    <input type="radio" name="question-radio" value="0"></input>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              
            </div>
            
            <div className="question-bar">
              <div className="border border-light text-center">
                <input type="hidden" id="rel" name="rel" value="1"></input>
                <button type="button"  className="previous-question btn btn-outline-light">Previous</button><button type="button"  className="next-question btn btn-outline-light active">Next</button>
              </div>
            </div>
          </div>
          <div className="question-bottom">
            <p><a href="https://www.helpfortrauma.com/terms/">Terms</a> | <a href="https://www.helpfortrauma.com/privacy-policy/">Privacy Policy</a> | <a href="https://www.helpfortrauma.com">Helpfortrauma.com</a></p>
          </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Adverse;

