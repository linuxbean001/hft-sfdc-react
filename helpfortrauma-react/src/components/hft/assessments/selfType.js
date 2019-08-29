import React from 'react';
import EventService from '../../../services/EventService';
import './newmyself/Newmyself.css';
import SelfAssessments from './newmyself/SelfAssessments';
import AlertMsg from '../../shared/alert';
import { assType } from '../../../const/assessment-type';

/* ***************************** Global Varibales *************************** */
const AssService = new EventService();
const ASS_TYPE = assType;


class SelfType extends React.Component {

    /* ***************************** Constructor ********************** */
    constructor() {
        super();

        this.state = {
            AssessmentStatus: true,
            showAlert: false
        };
        this.MyselfSubmit = this.MyselfSubmit.bind(this);
    }

    /* ***************************** Methods *************************** */
    componentDidMount() {
        console.log('xxxxxxxxx xxxxxxx xxxxxxxxxx ass are ', ASS_TYPE);
    }

    MyselfSubmit() {
        AssService.isUsrAllowedForAss(this.state.selectedAss)
            .then(res => {
                if (res.data.success) {
                    if (res.data.body) {
                        this.setState({
                            AssessmentStatus: false
                        });
                    } else {
                        this.setState({
                            showAlert: true,
                            alertMsg: res.data.message
                        })
                    }
                }
            }).catch(err => {
                console.log('xxxxxxx xxxxx error is ', err);
            });
    }

    handleChange(event) {
        this.setState({
            selectedAss: event.target.value,
        });

        console.log('xxxxxx xxxxxx xxxxxxxxxxxx selected ass is ', event.target.value);
        
    }
    
    resetAlert = (reset) => {
        if (reset) {
            this.setState({
                showAlert: false
            })
        }
    }

    render() {

        /* ***************************** Template ************************** */
        return (
            <div>
                <div className="row form-group head_div">
                    <div className="pull-left"><span className="head_title">Assessments</span></div>
                </div>
                <div className="tt">
                    {
                        this.state.AssessmentStatus ? (
                            <div className="row">
                                <div className="col-md-12 text-left assessments-style-Myself-main">
                                    <h3>New Assessment for Myself</h3>
                                    {
                                        this.state.showAlert ? (
                                            <div className="col-md-offset-3 col-md-6 text-center">
                                                <AlertMsg msg={this.state.alertMsg} reset={this.resetAlert} style='warning' /></div>
                                        ) : (null)
                                    }
                                        <div className="col-md-12 text-left assessments-Myself">
                                            <div className="assessments-Myself-style">
                                                {
                                                    ASS_TYPE.map((val, index) =>
                                                        <label className="container_checkbox" key={val.code + "-" + index}>
                                                            <strong>{val.name}</strong><br></br>
                                                            {val.description}
                                                            <input type="radio" name={"myself-input" + val.code} value={val.code} checked={this.state.selectedAss === val.code} onChange={this.handleChange.bind(this)}></input>
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-12 text-left assessments-button-Myself">
                                            <div className="assessments-button-style-Myself">
                                                <button type="submit" className="btn btn-default" onClick={this.MyselfSubmit} >Begin Assessment</button>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        ) : (
                                <SelfAssessments AssessmentSingle={this.state.selectedAss} />
                            )
                    }
                </div>



            </div>
        );
    }
};

export default SelfType;