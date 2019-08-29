import React, { Component } from 'react';
import './Evaluations.css';

class Evaluations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonStatus: 1,
        };
    }

    clickRightButton = (value) => {
        this.setState({ buttonStatus: value });
    }

    render() {
        return (
            <div>
                <div className="ConsultationCalls">
                    <div className="row form-group head_div">
                        <div className="pull-left ">
                            <span className="head_title">Course Evaluation</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 Evalutions-vertical-line">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{this.state.buttonStatus == 1 ? <button type="button" className="btn btn-info Evalutions-btn-circle" ><i className="fa fa-check"></i>
                                        </button> : ""} </td>
                                        <td> <div className="Evalutions-atc-margin" onClick={this.clickRightButton.bind(this, 1)}><h4>ATC 102 LIVE</h4> <h6>Completed March 14,2019</h6></div></td>
                                    </tr>
                                    <tr>
                                        <td> {this.state.buttonStatus == 2 ? <button type="button" className="btn btn-info Evalutions-btn-circle" ><i className="fa fa-check"></i>
                                        </button> : ""}</td>
                                        <td> <div className="Evalutions-atc-margin" onClick={this.clickRightButton.bind(this, 2)}> <h4>ATC 101</h4> <h6>Completed March 14,2019</h6></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-9">
                            <div className="Evalutions-top-border" >
                                <h5 className="Evalutions-float-right Evalutions-margin-top">A. Circle the number, which represents how you rate the training course:</h5>
                            </div> <br />
                            <div>
                                <table className="table table-bordered Evalutions-right-border">

                                    <tbody>
                                        <tr>
                                            <td className="Evalutions-table-width"><div className="Evalutions-float-right">Content:</div></td>
                                            <td>Impractical</td>
                                            <td>{'<'}</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>{'>'}</td>
                                            <td>Useful</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Old Knowledge</td>
                                            <td>{'<'}</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>{'>'}</td>
                                            <td>New</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Unorganized</td>
                                            <td>{'<'}</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>{'>'}</td>
                                            <td>Organized</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Ambiguous</td>
                                            <td>{'<'}</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>{'>'}</td>
                                            <td>clear</td>
                                        </tr>
                                        <tr>
                                            <td><div className="Evalutions-float-right">videos:</div></td>
                                            <td>Inadequate</td>
                                            <td>{'<'}</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>{'>'}</td>
                                            <td>Highly Useful</td>
                                        </tr>
                                        <tr>
                                            <td><div className="Evalutions-float-right">Printed Materials:</div></td>
                                            <td>Inadequate</td>
                                            <td>{'<'}</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>{'>'}</td>
                                            <td>Highly Useful</td>
                                        </tr>
                                        <tr>
                                            <td><div className="Evalutions-float-right">Supplementel Materials:</div></td>
                                            <td>Not Conductive</td>
                                            <td>{'<'}</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>{'>'}</td>
                                            <td>Conductive</td>
                                        </tr>
                                        <tr>
                                            <td><div className="Evalutions-float-right">General Overall Rating</div></td>
                                            <td>Poor</td>
                                            <td>{'<'}</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>{'>'}</td>
                                            <td>Excellent</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h5 className="Evalutions-float-right">B. Please answer(Yes or No) to the following questions:</h5>
                            <table className="table table-bordered Evalutions-right-border">
                                <tbody>
                                    <tr>
                                        <td><div className="Evalutions-float-right">Did you find the registration online easy to do and understand?</div> </td>
                                        <td>Yes </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="3"><div className="Evalutions-float-right">Would you prefer that the cource material be spread out over severalcourses? </div><br /><div className="Evalutions-padding-top">Did you find this program relevant to professional counselors or mental health clinicians?</div> </td>
                                        <td >Yes </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"  > </td>
                                    </tr>
                                    <tr>
                                        <td>Yes </td>
                                        <td>No</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h5 className="Evalutions-float-right">C. Please rate the following statement relating to the training objectives</h5>
                            <table className="table table-bordered Evalutions-right-border">
                                <tbody>
                                    <tr>
                                        <td><div className="Evalutions-float-right">Did you find the registration online easy to do and understand?</div> </td>
                                        <td>Yes </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3"></td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="3"><div className="Evalutions-float-right">Would you prefer that the cource material be spread out over severalcourses? </div><br /><div className="Evalutions-padding-top">Did you find this program relevant to professional counselors or mental health clinicians?</div> </td>
                                        <td >Yes </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"  > </td>
                                    </tr>
                                    <tr>
                                        <td>Yes </td>
                                        <td>No</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Evaluations;