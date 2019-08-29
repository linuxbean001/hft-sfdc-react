import React, { Component } from 'react';
import './style.css';
import { Line, Circle } from 'rc-progress';
class Home extends Component {
    render() {
        return (
            <div>
		        <div className=" col-md-12 FindProfessionalInfo  float-left form-group head_div">
			        <div className=" col-md-12  float-left">
			          <div className="pull-left"><span className="head_title">My Learning Dashboard</span></div>
			        </div>
		        </div>
		        <div className="">
			        <div className="col-md-12 p-0 float-left LearningDashboard-body">
						<div className="col-md-6  float-left ">
							<div className=" col-md-12  float-left form-group ">
								<div className=" col-md-12 LearningDashboard-body-3 p-0 float-left">
									<img src={require('../images/im.png')} className="img-responsive" />
									<div className="col-md-12 p-0 float-left LearningDashboard-body-2">
										<div className="col-md-12 p-0 float-left LearningDashboard-body-1">
											<h3>Formal Elements of Art Therapy Scale</h3>
											<p>Welcome to FEATS</p>
										</div>
										<p className="p_small">20%</p>
										<Line percent="20" strokeWidth="2" strokeColor="#007bff" />
										
										<button className="btn btn-primary">Go To Lessons</button>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-6  float-left ">
							<div className=" col-md-12  float-left form-group">
								<div className=" col-md-12 LearningDashboard-body-3 p-0 float-left  ">
									<img src={require('../images/im.png')} className="img-responsive" />
									<div className="col-md-12 p-0 float-left LearningDashboard-body-2">
										<div className="col-md-12 p-0 float-left LearningDashboard-body-1">
											<h3>ITR Accelerated Traumatology Course 102 LIVE</h3>
											<p>Build the confidence you need to use the Instinctual Trauma Response Method" with your population in your clinical setting. The ATC 102 is a two-day course with 13 continuing education credit hours. Order online and begin coursework for only $597. *Completion</p>
										</div>
										<p className="p_small">70%</p>
										<Line percent="70" strokeWidth="2" strokeColor="#007bff" />
										
										<button className="btn btn-primary">Go To Lessons</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
	      	</div>
        );
    }
}

export default Home;
