import React, { Component } from 'react';
import EventService from '../../../../services/EventService';
import AssessmentTrs from './AssessmentTrs';
import AssessmentScl from './AssessmentScl';
import AssessmentDes from './AssessmentDes';
import AssessmentDrs from './AssessmentDrs';
import AssessmentAce from './AssessmentAce';
const Hft = new EventService();

class SelfAssessments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.setState({
            assType: this.props.location.state.assessment
        });

        this._getAssessment(this.props.location.state.assessment);
    }

    _getAssessment = (assType) => {
        Hft.getAssesment(assType)
            .then(res => {
                if (res.data.success) {
                    console.log('xxxxxxx  xxxxxxxx xxxxxxx assess is ', res.data.body);
                    this.setState({
                        assessmentForUser: res.data.body,
                        loading: false
                    });
                } else {

                }
            }).catch(err => {
                console.log('xxxxxxx  xxxxxxxx xxxxxxx err is ', err); 

            });
    }

    render() {
        if (this.state.loading) {
            return 'Loading...'
        }
        return (
            <div>
                <div className="typeTrs">
                    {
                        this.state.assType == 'TRS' ? (
                            <AssessmentTrs assQues={this.state.assessmentForUser} />
                        ) : (null)

                    }

                </div>
                <div className="typeScl">
                    {
                        this.state.assType == 'SCL-45' ? (
                            <AssessmentScl assQues={this.state.assessmentForUser} />
                        ) : (null)

                    }

                </div>
                <div className="typeDes">
                    {
                        this.state.assType == 'DES-II' ? (
                            <AssessmentDes assQues={this.state.assessmentForUser} />
                        ) : (null)

                    }

                </div>
                <div className="typeDrs">
                    {
                        this.state.assType == 'DRS' ? (
                            <AssessmentDrs assQues={this.state.assessmentForUser} />
                        ) : (null)

                    }

                </div>
                <div className="typeAce">
                    {
                        this.state.assType == 'ACE' ? (
                            <AssessmentAce assQues={this.state.assessmentForUser} />
                        ) : (null)

                    }

                </div>
            </div>
        );
    }
};
export default SelfAssessments;