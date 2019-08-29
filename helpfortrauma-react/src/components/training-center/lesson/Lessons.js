import React, { Component } from 'react';
import CoursesService from '../../../services/CoursesService';
import './Lessons.css';
import SingleLession from './SingleLession';
const Course = new CoursesService();

class Lesson extends Component {

    /* *****************************Constructor********************** */
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            lessons: [],
            lesson: {},
            showCourseDetail: true,
        };

    }

    componentDidMount() {
        // let sum = 1;
        // // for (let i = 1; i <= 100; i++) {
        // //     arr.push(arr);
        // // }
        // let arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9','10','11']
        // let test = arr;
        // let k = [];
        // let flag = 0;
        // console.log(arr)
        // for (let p = 1; p <= arr.length; p++) {
        //     if (p % 3 == 0) {
        //         let obj = {
        //             start: arr[sum - 1],
        //             end: arr[p - 2 -1]
        //         }
        //         sum = sum + 3;
        //         k.push(obj)
        //         flag++; 
        //         if(flag == 3) {
        //             // let left = arr.length - flag*4;

        //             k.push({
        //                 start: arr[(flag*3)],
        //                 end: arr[arr.length - 1]
        //             })
        //         }
        //     }
        // }


        // console.log('kkkkkkk', k);


        this.getCourse();
    }

    goNextLesson = (lesson) => {
        this.goToLesson(lesson);
    }

    goToLesson = (lesson, index) => {
        if (lesson) {
            this.setState({
                showCourseDetail: false,
                lesson: lesson,
                lessonIndex: index
            });
        }
    }

    updateLessonList = (lessonArr) => {
        let completedLessons = [];
        lessonArr.forEach(lesson => {
            completedLessons.push(lesson.lessons__c);
        });
        this.setState({
            completedLessons
        }, function () {
        });
        this._getLessons(this.props.location.state.course.sfid);
    }

    getUsrCompletedLessons = () => {
        Course.getUserCompltedLesson(this.props.location.state.course.sfid)
            .then(res => {
                if (res.data.success) {
                    this.updateLessonList(res.data.body);
                }
            }).catch(err => {
                console.log('xxxxxxxx  xxxxxxxxxx xxxxxxxxxxx res lessons are ', err)
            })
    }

    getCourse = () => {
        if (this.props.location.state.course) {
            this.setState({
                course: this.props.location.state.course
            });
            this.getUsrCompletedLessons();
        } else {
            this.props.history.push({
                pathname: '/Learning-center',
            })
        }
    }

    goToNextLesson = (currentLesson) => {
        console.log('xxxx xxxxxxx xxxx next pre prop is ', currentLesson)
        if (this.state.lessons[currentLesson.current + 1]) {
            switch (currentLesson.go) {
                case "NEXT":
                    this.setState({
                        showCourseDetail: false,
                        lesson: this.state.lessons[currentLesson.current + 1],
                        lessonIndex: currentLesson.current + 1
                    });
                    break;

                case "PRE":
                    this.setState({
                        lesson: this.state.lessons[currentLesson.current - 1],
                        lessonIndex: currentLesson.current - 1,
                        showCourseDetail: false
                    });
                    console.log(this.state.lessonIndex)
                    break;
            }
        }
    }

    getCompleteLesson = (lessonId) => {
        this.setState({
            completedLessons: [...this.state.completedLessons, lessonId]
        })
    }

    getLesonProgress = () => {
        let counter = this.state.completedLessons.length;
        let percent = (counter / this.state.lessons.length) * 100;
        return percent;
    }

    _getLessons = (courseId) => {
        Course.getLessons(courseId)
            .then(lessons => {
                if (lessons.data.success) {
                    let lessonsOrder = lessons.data.body;
                    lessonsOrder.sort((a, b) => {
                        return a.position__c - b.position__c
                    });
                    this.setState({
                        lessons: lessonsOrder
                    }, function () {
                        console.log('xxxxxx xxxxxxx xxxxxxxxx lesson order', this.state.lessons)
                        if (this.state.completedLessons.length > 0) {
                            let lastLesson = this.state.completedLessons[0];
                            this.state.lessons.forEach((lesson, index) => {
                                if (lesson.sfid === lastLesson) {
                                    this.setState({
                                        lesson,
                                        lessonIndex: index,
                                        showCourseDetail: false
                                    });
                                }
                            });

                        } else {
                            this.setState({
                                showCourseDetail: true
                            });
                        }
                    });
                }
            }).catch(err => {
                console.log('xxxxxxxx xxxxxxxxx xxxxxxxxxx lessons are ', err);
            });
    }




    render() {
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
                                                currentLesson                                            </table>

                                        </div>

                                    </div>
                                </div>
                            ) : (
                                    <div><SingleLession lessonIndex={this.state.lessonIndex} totalLesson={this.state.lessons.length} courseId={this.state.course.sfid} courseTitle={this.state.course.name} lessonSingle={this.state.lesson} currentLesson={this.goToNextLesson} completedLesson={this.getCompleteLesson} isLessonCompleted={this.state.completedLessons.includes(this.state.lesson.sfid)} /></div>
                                )
                        }
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12 list-ls">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group">
                                {
                                    this.state.lessons.length > 0 ? (
                                        <div>
                                            <div className="form-group">
                                                <h4>Progress Bar</h4>

                                                <div className="progress progress-striped active">
                                                    <div className="progress-bar progress-bar-secondary" role="progressbar" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100" style={{ width: this.getLesonProgress() + '%' }}>
                                                        <span className="sr-only">42.7% Bounce Rate</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4>Lesson Navigation</h4>
                                            <ul className="timeline">

                                                {
                                                    this.state.lessons.map((lesson, index) =>
                                                        <li key={index} className={this.state.completedLessons.includes(lesson.sfid) ? 'completed' : ''}>
                                                            <a href="javascript:void(0)" className={this.state.lesson.sfid == lesson.sfid ? 'active_lesson' : ''} onClick={this.goToLesson.bind(this, lesson, index)}>{lesson.name}</a>
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

export default Lesson;
