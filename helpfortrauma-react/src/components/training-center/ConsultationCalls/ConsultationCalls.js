import React, { Component } from 'react';
import './ConsultationCalls.css';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

import FullCalendar from 'fullcalendar-reactwrapper';
import events from './data/events';
import Stripe from '../../register/stripe/Stripe';


class ConsultationCalls extends React.Component {
	/* *****************************Constructor******************* */
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		super(props);
		this.state = {
			events: events,
		}
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
	}


	render() {



		return (
			<div>
				<div className="ConsultationCalls">
					<div className="row form-group head_div">
						<div className="pull-left ">
							<span className="head_title">Consultation Calls</span>
						</div>
					</div>
				</div>
				<div className="ConsultationCalls-body">
					<div className="row">
						<div className="col-md-12 p-0 float-left">
							<div className="col-md-6 float-left ConsultationCalls-body-left">
								<p>A Level 4 Certified ITR Trainer will host 12 bi-weekly one-hour video calls reviewing case studies and answering questions about practicing the ITR Method. These calls are designed to help a practitioner advance quickly in their skill level and be comfortable with any client. You can join in on any date for the 6 months unless it is filled to capacity. $297/12 calls</p>
								<p>If you want to move on to a Level 4 Certified ITR Trainer, 24 calls are required.</p>
								<div>
									<h4>Consultation Calls</h4>
									<p><strong>12 Consultation Calls</strong></p>
									<label className="mar-bottom-30">
										<span>Price:</span> <span className="red" >$297.00</span>
									</label>
									<Stripe total={297} label={'Subscribe to Consultation Calls'} />
								</div>
								<div>

								</div>
							</div>
							<div className="col-md-6 p-0 float-left ConsultationCalls-body-right">
								<div>
									<h4>Help for Trauma Calendar</h4>
									<FullCalendar
										id="your-custom-ID"
										header={{
											left: 'prev,next today myCustomButton',
											center: 'title',
											right: 'month,basicWeek,basicDay'
										}}
										defaultDate={new Date()}
										navLinks={true} // can click day/week names to navigate views
										editable={true}
										eventLimit={true} // allow "more" link when too many events
										events={this.state.events}
									/>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ConsultationCalls;
