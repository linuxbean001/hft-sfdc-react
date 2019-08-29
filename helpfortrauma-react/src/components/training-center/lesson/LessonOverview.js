import React, { Component } from 'react';
import AuthService from '../../../services/AuthService';
import CoursesService from '../../../services/CoursesService';
import Stripe from '../../register/stripe/Stripe';
import './Lessons.css';
import SingleLession from './SingleLession';
const course = new CoursesService();
const Auth = new AuthService();

class LessonOverview extends Component {

    /* *****************************Constructor********************** */
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            lessons: [],
            lesson: {},
            showCourseDetail: true
        };
    }

    componentDidMount() {
        this.getCourse();
    }

    getCourse = () => {
        if (this.props.location.state.course) {
            this.setState({
                course: this.props.location.state.course,
                isUsrSubscribed: this.props.location.state.isUsrSubscribed
            });
            this._getLessons(this.props.location.state.course.sfid);
        } else {
            this.props.history.push({
                pathname: '/Learning-center',
            })
        }
    }

    goToNextLesson = (currentLesson) => {
        this.setState({
            showCourseDetail: false,
            lesson: this.state.lessons[currentLesson + 1],
            lessonIndex: currentLesson + 1
        });
    }

    paymemtTrue = (paymemtSuccess) => {
        if (paymemtSuccess) {
            console.log('xxxxxxx xxxxxx xxxxxxxxx success payment ', paymemtSuccess);
            this.buyCourse();
        }
    }

    buyCourse = () => {
        let buyCourseVo = {
            courseId: this.state.course.sfid,
            courseName: this.state.course.name,
            usrId: Auth.getProfile().sfid,
            username: Auth.getProfile().username
        }

        course.buyCourse(buyCourseVo)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        isUsrSubscribed: true
                    }, function() {
                        this.props.history.replace('/Learning-center');                    
                    });
                    
                }
            }).catch(err => {
                console.log('xxxxxxx xxxxx xxxxxx err is ', err);
            });
    }

    // isUsrSubscribed = () => {

    // }

    _getLessons = (courseId) => {
        course.getLessons(courseId)
            .then(lessons => {
                if (lessons.data.success) {
                    let lessonsOrder = lessons.data.body;
                    lessonsOrder.sort((a, b) => {
                        return a.position__c - b.position__c
                    });
                    this.setState({
                        lessons: lessonsOrder,
                        lesson: lessons.data.body[0] 
                    });
                }
            }).catch(err => {
                console.log('xxxxxxxx xxxxxxxxx xxxxxxxxxx lessons are ', err);
            });
    }


    render() {
        const isUsrSubscribed = this.state.isUsrSubscribed;
        return (
            <div>
                <div className="container">

                    <div className="col-md-8 col-sm-6 col-xs-12">
                        {
                            this.state.showCourseDetail ? (
                                <div>
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <h3 className="lession-title">{this.state.course.title__c}</h3>
                                    </div>
                                    <div className="spacer"></div>
                                    <div className="col-md-12 col-sm-12 col-xs-12">

                                        <div className="image-ls">
                                            <div className="panel-collapse collapse in">
                                                <div className="panel-body panel-body-video">
                                                    <div style={{ padding: "56.25% 0 0 0", position: "relative" }}><iframe src="https://player.vimeo.com/video/224861127?byline=0&portrait=0" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="spacer"></div>
                                    <div className="clearfix"></div>


                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div className="alert alert-warning">
                                            No CE credits available at this time. Applications are being reviewed
                             </div>

                                        <div className="form-group">

                                            <div hidden={isUsrSubscribed}>
                                                <Stripe total={this.state.course.cost__c} paymemtSuccess={this.paymemtTrue} />
                                            </div>
                                        </div>
                                        <div className="course-content">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <td>Lessons</td>
                                                        <td className="status">Status</td>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.lessons.map((lesson, index) =>
                                                            <tr key={index}>
                                                                <td>{lesson.name}</td>
                                                                <td className="status"></td>

                                                            </tr>
                                                        )
                                                    }


                                                </tbody>

                                            </table>

                                        </div>

                                    </div>
                                </div>
                            ) : (
                                    <div><SingleLession lessonIndex={this.state.lessonIndex} lessonSingle={this.state.lesson} currentLesson={this.goToNextLesson} /></div>
                                )
                        }
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12 list-ls">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group">
                                {
                                    this.state.lessons.length > 0 ? (
                                        <div>
                                            <h4>Lessons Overview</h4>
                                            <ul className="timeline">

                                                {
                                                    this.state.lessons.map((lesson, index) =>
                                                        <li key={index}>
                                                            <a href="javascript:void(0)">{lesson.name}</a>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                            <div className="form-group">
                                                <h4>Quizzes</h4>
                                                <hr />
                                            </div>
                                            <div className="form-group">
                                                <h4>Course Materials</h4>
                                                <div className="image-ls">
                                                    <img src="https://img.alicdn.com/imgextra/i3/TB1NfNlIVXXXXc5XXXXXXXXXXXX_!!0-item_pic.jpg" />
                                                </div>

                                            </div>
                                        </div>

                                    ) : (
                                            null
                                        )
                                }


                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default LessonOverview;
