import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import FindProfessionalInfov from './FindProfessionalInfo';
import Empty from '../Empty';
import Home from './dashboard/Home';
const Auth = new AuthService();

class FindProfessional extends Component {
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
    {
    !Auth.loggedIn() ? (
        <FindProfessionalInfov />
    ) : (
        <div>
                <div className="mainbar L-header">
                  <div className="container">
                    <button type="button" className="btn mainbar-toggle" data-toggle="collapse" data-target=".mainbar-collapse">
                      <i className="fa fa-bars"></i>
                    </button>
                    <div className="mainbar-collapse collapse ">
                      <ul className="nav navbar-nav mainbar-nav">
                        <li>
                          <Link to={'/find-a-professional'}>  <i className="far fa-dashboard"></i>My Learning Dashboard</Link>
                        </li>
                        {/* <li>
                          <Link to={'/Learning-center/Courses'} >  <i className="fal fa-graduation-cap"></i>All Courses
                          </Link>
                        </li>
                        <li>
                          <Link to={'/Learning-center/Live-Training'}>  <i className="fal fa-chalkboard-teacher"></i>Live Training</Link>
                        </li>
                        <li>
                          <Link to={'/Learning-center/Consultation-Calls'}> <i className="fal fa-headset"></i>Consultation Calls</Link>
                        </li>
                        <li>
                          <Link to={'/Learning-center/Certificates'}>  <i className="fal fa-file-certificate"></i>Certificates</Link>
                        </li>
                        <li>
                          <Link to={'/Learning-center/Evaluations'}>  <i className="fal fa-clipboard-list"></i>Evaluations</Link>
                        </li>
                        <li>
                          <Link to={'/Learning-center/Resources'}>
                            <i className="fa fa-external-link"></i>
                            Resources
			                </Link>
                        </li>
                        <li className="dropdown">
                          <Link to={'/Learning-center/LearnerHelp'}>
                            <i className="far fa-question-circle" aria-hidden="true"></i>
                            Help
			                </Link>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="content">
                    <div className="content-container">
                      <div className="Lcenter">
                        <Route exact path={'/find-a-professional'} component={Home} />
                        {/* <Route path={'/Learning-center/Courses'} component={Courses} />
                        <Route path={'/Learning-center/Lesson'} component={Lesson} />
                        <Route path={'/Learning-center/SingleLession'} component={SingleLession} /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}
                

            </div>
        );
    }
};
export default FindProfessional;