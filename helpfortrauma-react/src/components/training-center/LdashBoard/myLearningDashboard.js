import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import CoursesService from '../../../services/CoursesService';
import './MyLearningDashboard.css';

const courseApi = new CoursesService();

class MyLearningDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
		this.getLessonProgress();
	}

	getUserFullCourses = () => {
		courseApi.getUserCoursesFull()
			.then(res => {
				if (res.data.success) {
					this.setState({
						courses: res.data.body.reverse()
					})
				}
			}).catch(err => {
				console.log('xxxxxxxx xxxxxxxxxxx err is ', err);
			});
	}

	goToLesson = (course) => {
		this.props.history.push({
			pathname: '/Learning-center/Lesson',
			state: { course: course }
		});
	}

	getLessonProgress = () => {
		courseApi.getNoOfLessonByCourse()
			.then(res => {
				if (res.data.success) {
					this.setState({
						lessonProgress: new Map(JSON.parse(res.data.body))
					}, function () {
						this.getUserFullCourses();
					});
				}
			}).catch(err => {
				console.log('xxxxxx xxxxxxxxx xxxxxxx res is ', err);
			});
	}

	render() {

		console.log("courses", this.state.courses);
		return (
			<div>

				<div className="MyLearningDashboard-body">
					<div className="row">
						<div className="col-md-12 p-0 float-left MyLearningDashboard-body-content">


							<div className="col-md-8 float-left MyLearningDashboard-body-left">
								<div className="col-md-12  float-left ">
									<div className=" col-md-12 p-0 float-left form-group head_div">
										<div className="pull-left ">
											<span className="head_title">My Learning Dashboard</span>
										</div>
									</div>
								</div>
								{
									this.state.courses && this.state.courses.map((course, index) =>
										<div key={index} className="col-md-6 float-left MyLearningDashboard-body-left-c">
											<img className="card-img-top" src='/img/image/thumb.svg' alt="Card image cap" />
											<div className={this.state.lessonProgress.get(course.course__c) ? "col-md-12  float-left MyLearningDashboard-left-c" : "col-md-12  float-left MyLearningDashboard-left-c MyLearningDashboard-progressBar-leftMargin "}>
												<h4>{course.title__c}</h4>
												<p>{course.description__c}</p>
												<InputRange
													formatLabel={value => `${value}%`}
													maxValue={100}
													minValue={0}
													value={parseInt(this.state.lessonProgress.get(course.course__c)) || 0}
													onChange={value => this.setState({ value: parseInt(this.state.lessonProgress.get(course.course__c)) || 0 })} />
												<button onClick={this.goToLesson.bind(this, course)} className="btn btn-primary">Go To Lessons</button>
											</div>
										</div>
									)
								}

							</div>
							<div className="col-md-4 float-left MyLearningDashboard-body-right">
								<div className="col-md-12  float-left ">
									<div className=" col-md-12 p-0 float-left form-group head_div">
										<div className="pull-left ">
											<span className="head_title">Transactions </span>
										</div>
									</div>

									{
										this.state.courses && this.state.courses.map((course, index) =>
											<div key={index}>
												{index === 0 || index === 1 || index === 2 ? <h4>{course.title__c}</h4> : ""}
											</div>

										)
									}
									<p></p>
								</div>
								<div className="col-md-12  float-left ">
									<div className=" col-md-12 p-0 float-left form-group head_div">
										<div className="pull-left ">
											<span className="head_title">Certificates</span>
										</div>
									</div>
									<p></p>
									<p></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MyLearningDashboard;
