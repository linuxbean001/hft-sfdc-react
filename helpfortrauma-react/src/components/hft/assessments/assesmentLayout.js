import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AssignmentSelection from './dashboard/AssignmentSelection';
import FinishAssesment from './finishAssesment';
import Request from './request/Request';
import AssReport from './assReport';
import SelfType from './selfType';
import ViewAssResult from './newmyself/viewAssResult';
import SelfAssessments from './newmyself/SelfAssessments';

class AssesmentLayout extends Component {
    render() {
        return (
            <div>
                    <Switch>
                        <Route exact path='/hft/Assessments' component={AssignmentSelection} />
                        <Route path='/hft/Assessments/finish' component={FinishAssesment} />
                        <Route path='/hft/Assessments/self-type' component={SelfType} />
                        <Route path='/hft/Assessments/request' component={Request} />
                        <Route path='/hft/Assessments/AssReport' component={AssReport} />
                        <Route path='/hft/Assessments/AssResult' component={ViewAssResult} />
                        <Route path='/hft/Assessments/selfAssessment' component={SelfAssessments} />
                    </Switch>
            </div>
        );
    }
}

export default AssesmentLayout;
