import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AuthService from '../../../../../services/AuthService';
import './css/Recovery.css';

import './js/main.js';
const Auth = new AuthService();

class Regression extends Component {


  render() {
    return (
      <div>
        <div className="row form-group head_div">
          <div className="pull-left"><span className="head_title">Assessments</span></div>
        </div>
        <div className="row">
          <div className="question-main-style">
            <div className="title-question">
              <h1 className="text-center">Trauma Recovery Scale</h1>
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
                <h6 className="question_h6">
                  <span id="question_of_time">0</span>% of the time
                </h6>
                <div className="progress-main progress-main-scale ">
                  
                  <div className="progress-range">
                    <input type="range" min="0" max="100" step="10"  value="0" className="slider" id="myRange"></input>
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
export default Regression;

