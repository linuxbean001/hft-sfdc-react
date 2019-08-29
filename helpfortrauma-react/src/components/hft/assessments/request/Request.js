import React, { Component } from 'react';
import EventService from '../../../../services/EventService';
import './Request.css';
const eventService = new EventService();

class Request extends Component {

	constructor() {
		super();

		this.state = {
			size: '',
			term: '',
			checkAssessment: '',
			termStatus: '',
			termEmail: '',
			checkStatus: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeTerm = this.handleChangeTerm.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleCheckStatus = this.handleCheckStatus.bind(this);

	}

	handleChange(event) {
		this.setState({
			size: event.target.value,
			checkAssessment: event.target.value
		});
		this.handleCheckStatus();

	}

	handleChangeTerm(event) {
		this.setState({
			term: event.target.value,
			termStatus: event.target.value
		});
		this.handleCheckStatus();

	}

	handleChangeEmail(event) {
		this.setState({
			termEmail: event.target.value
		});
		this.handleCheckStatus();

	}

	requestAss = () => {
		if (this.state.termEmail != '') {
			let info = {
				clientEmail: this.state.termEmail,
				assType: this.state.checkAssessment
			}
			eventService.requestAssessment(info)
				.then(res => {
					console.log('xxxxx xxxxxxx xxxxxxx res is ', res);
				}).catch(err => {
					console.log('xxxxx xxxxxxx xxxxxxx res is ', err);
				})
		} else {
			alert('enter email');
		}

	}

	handleCheckStatus(event) {
		if (this.state.checkAssessment != '' && this.state.termStatus != '' && this.state.termEmail != '') {

			this.setState({
				checkStatus: false
			});

		}

	}

	render() {
		return (
			<div>
				<div className="row form-group head_div">
					<div className="pull-left"><span className="head_title">Assessments</span></div>
				</div>
				<div className="row">
					<div className="col-md-12 text-left assessments-style-Myself-main">
						<h3>Request Assessment from Someone Else</h3>
						<div className="col-md-12 text-left assessments-Request">
							<div className="col-md-8 assessments-Request-style">
								<label className="container_checkbox"><strong>Trauma Recovery Scale</strong><br></br>
									Lorem ipsum dolor sit amet, consectetur adipiscing alit. Aenean laoreet sollicitudin odio ac convallis.
				  	<input type="radio" name="myself-input" value="TRS" checked={this.state.size === "TRS"} onChange={this.handleChange}></input>
									<span className="checkmark"></span>
								</label>
								<label className="container_checkbox"><strong>Symptom Check List (SCL-45)</strong><br></br>
									Lorem ipsum dolor sit amet, consectetur adipiscing alit. Aenean laoreet sollicitudin odio no convallis
					<input type="radio" name="myself-input" value="SCL-45" checked={this.state.size === "SCL-45"} onChange={this.handleChange}></input>
									<span className="checkmark"></span>
								</label>
								<label className="container_checkbox"><strong>Dissociative Experiences Scale-II (DES-II)</strong><br></br>
									Lorem ipsum dolor sit amet, consectetur adipiscing alit. Aenean laoreet sollicitudin odio ac convallis. In varius, leo
					<input type="radio" name="myself-input" value="DES-II" checked={this.state.size === "DES-II"} onChange={this.handleChange}></input>
									<span className="checkmark"></span>
								</label>
								<label className="container_checkbox"><strong>Dissociative Regression Scale</strong><br></br>
									Lorem ipsum dolor sit amet, consectetur adipiscing alit. Aenean laoreet sollicitudin odio ac convallis.
					<input type="radio" name="myself-input" value="DRS" checked={this.state.size === "DRS"} onChange={this.handleChange}></input>
									<span className="checkmark"></span>
								</label>
								<label className="container_checkbox"><strong>Adverse Childhood Experience (ACE) Questionnaire</strong><br></br>
									Lorem ipsum dolor sit amet, consectetur adipiscing alit. Aenean laoreet sollicitudin odio ac convallis.
				<input type="radio" name="myself-input" value="ACE" checked={this.state.size === "ACE"} onChange={this.handleChange}></input>
									<span className="checkmark"></span>
								</label>
							</div>
							<div className="col-md-4 assessments-Request-style-right">
								<strong>Assessment Terms and Conditions</strong><br></br>
								trauma processing.... Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labors at dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip on ea commodo eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
qui officia deserunt mollit anim id est laborum.
              </div>
						</div>
						<div className="col-md-12 text-left assessments-Request">
							<div className="col-md-7 assessments-Request-style-bottom">
								<div className="search-container">
									<input type="text" placeholder="Enter email address" name="email" autocomplete="off"
										onKeyUp={this.handleChangeEmail}></input>
									<button className="btn btn-success" onClick={this.requestAss} disabled={this.state.checkStatus}>Request Assessment</button>
								</div>
							</div>
							<div className="col-md-5 assessments-Request-style-right-bottom">
								<label className="container_checkbox">I agree to the terms and conditions
              		<input type="radio" name="term-condition" value="True" checked={this.state.term === "True"} onChange={this.handleChangeTerm}></input>
									<span className="checkmark"></span>
								</label>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
};
export default Request;