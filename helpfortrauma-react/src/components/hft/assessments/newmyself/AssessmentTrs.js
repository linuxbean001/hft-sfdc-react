import React, { Component } from 'react';
import UserSelfAssesment from './UserSelfAssesment';

class AssessmentTrs extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            quesIndex: 0,
            loading: true,
            percent: 0
        }
    }

    componentDidMount() {
        console.log('xxxxxxxx xxxxxxxx xxxxxxxxxx AssessmentTrs1', this.props.assQues);
        this._setArray(this.props.assQues[0]);
    }

    _setArray = (assess) => {
        let i = 1;
        let arr = [
            assess.question_1__c,
            assess.question_2__c,
            assess.question_3__c,
            assess.question_4__c,
            assess.question_5__c,
            assess.question_6__c,
            assess.question_7__c,
            assess.question_8__c,
            assess.question_9__c,
            assess.question_10__c,
            assess.question_11__c,
        ]

        this.setState({
            quesArr: arr,
            assId: assess.sfid,
            assName: assess.name,
            assType: assess.assesment_type__c
        }, function () {
            console.log('xxxxxxxxxxx xxxxx assess name ', this.state.assName);
            if (this.state.quesArr.length > 0) {
                this.setState({ loaded: true })
            }
        })
    }

    render() {
        return (
            <div>
                {
                    <div>
                        {
                            this.state.loaded ? ( 
                                <UserSelfAssesment quesArr={this.state.quesArr} assName={this.state.assName} assId={this.state.assId} assType={this.state.assType}/>  
                            ) : (null)
                        }

                    </div>

                }

            </div>
        );
    }
}

export default AssessmentTrs;
