import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import CoursesService from '../../../services/CoursesService';
import './Lessons.css';
const course = new CoursesService();

class SingleLession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: this.props.lessonSingle,
            lessonIndex: this.props.lessonIndex,
            totalLesson: this.props.totalLesson,
            questions: [],
            solution: new Map(),
            lessonId: this.props.lessonSingle.sfid,
            isLessonCompleted: this.props.isLessonCompleted,
            courseId: this.props.courseId,
            courseTitle: this.props.courseTitle,
            totalLesson: this.props.courseTitle,
            showResult: false,
            selectedValue: [],
            ansArray: [],
            showSubmitButton: false,
            loading: true
        };
        this.getUserKnowledgeCheckResult();
    }

    handleChange = (question, event) => {
        this.state.solution.set(question.sfid, {
            selected: event.target.value,
            answer: question.answer__c,
            name: question.name,
            result: event.target.value == question.answer__c ? true : false
        });
        this.state.selectedValue[question.sfid] = event.target.value;
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            lesson: nextProps.lessonSingle,
            lessonId: nextProps.lessonSingle.sfid,
            lessonIndex: nextProps.lessonIndex,
            isLessonCompleted: nextProps.isLessonCompleted,
            totalLesson: nextProps.totalLesson,
            showResult: false,
            questions: [],
            solution: new Map()
        }, function () {
            this.getUserKnowledgeCheckResult()
        });
    }

    getUserKnowledgeCheckResult = () => {
        course.getUserKnowledgeCheckResult(this.state.courseId, this.state.lesson.sfid)
            .then(res => {
                if (res.data.success) {
                    let result = new Map(JSON.parse(res.data.body));
                    this.setState({
                        solution: result.size > 0 ? result : new Map(),
                    }, function () {
                        this._getQuesForLesson(this.state.lessonId);
                    });
                }
            }).catch(err => {
                console.log('xxxxxxx xxxxxx xxxxxxxx res user err is ', err);
            });
    }



    getResult = () => {
        this.setState({
            showResult: true,
            showSubmitButton: true
        })
    }

    submitAns = () => {
        let ansObj = this.getAnsObj();
        course.submitUsrKnowledgeCheck(ansObj)
            .then(res => {
                if (res.data.success) {
                    this.getResult();
                    this.addUserCompletedLesson();
                    this.setState({
                        isLessonCompleted: true
                    })
                }
            }).catch(err => {
                console.log('xxxxxxx xxxxxx xxxxxxxxxx err ', err);
            });
    }

    getAnsObj = () => {
        let ansMap = this.state.solution;
        let keys = [...ansMap.keys()];
        let ansArr = [];
        keys.forEach(key => {
            ansArr.push({
                lessonName: ansMap.get(key).name,
                selected: ansMap.get(key).selected,
                quesId: key,
            });
        });

        let ansObj = {
            answers: ansArr,
            courseId: this.state.courseId,
            lessonId: this.state.lesson.sfid
        }

        return ansObj;

    }

    editAns = () => {
        if (this.state.solution) {
            this.setState({
                showResult: false,
            })
        }
    }

    goToNext = () => {
        this.props.currentLesson({
            current: this.state.lessonIndex,
            go: 'NEXT'
        });
    }

    goToPrvious = () => {
        this.props.currentLesson({
            current: this.state.lessonIndex,
            go: 'PRE'
        });
    }

    _getQuesForLesson = (sid) => {
        console.log('xxxx xxx', sid);

        course.getQuesForLesson(sid)
            .then(res => {
                this.setState({
                    questions: res.data.body
                }, function () {
                    if (this.state.questions.length == this.state.solution.size) {
                        this.getResult();
                        this.setState({
                            isLessonCompleted: true
                        })
                    }

                });
            }).catch(err => {
                console.log('xxxxxxxxxxxx xxxxxx errn is ', err);
            });
    }

    addUserCompletedLesson = () => {
        let lessonVo = {
            lessonId: this.state.lesson.sfid,
            lessonName: this.state.lesson.name,
            courseId: this.state.courseId
        }

        course.addUserCompletedLesson(lessonVo)
            .then(res => {
                this.props.completedLesson(lessonVo.lessonId);
            }).catch(err => {
                console.log('xxxxxxxxxxxxx ', err)
            });
    }

    render() {

        const solution = this.state.solution;
        return (
            <div>
                <div className="container">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h3 className="lession-title">{this.state.courseTitle + ': ' + this.state.lesson.name}</h3>
                        </div>
                        <div className="spacer"></div>
                        <div className="col-md-12 col-sm-12 col-xs-12">

                            <div className="image-ls">
                                <div className="panel-collapse collapse in">
                                    <div className="panel-body panel-body-video" hidden={this.state.lesson.videoid__c == undefined || null ? true : false}>
                                        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}><iframe src={"https://player.vimeo.com/video/" + this.state.lesson.videoid__c + "?byline=0&portrait=0"} style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="spacer"></div>

                        <div className="is_complete">

                        </div>
                        <h6>{this.state.lesson.description__c}</h6>

                        {

                            <div className="Knowledge_Check">
                                <h4>Knowledge Check</h4>
                                <div className="col-md-12">
                                    {
                                        this.state.questions.map((question, index) =>
                                            <div className="radio-buttons" key={index}>
                                                <div className="question"> <span className="text-01">Q.{index + 1} &nbsp; {question.question__c}</span></div>
                                                <div className="options">
                                                    <div hidden={question.answer_a__c ? false : true}>
                                                        <input
                                                            defaultChecked={solution.size > 0 && solution.get(question.sfid).selected == "A" ? true : false}
                                                            value="A"
                                                            name={'radio' + index}
                                                            type="radio"
                                                            onChange={this.handleChange.bind(this, question)}
                                                        /> &nbsp;
                                                            <span>
                                                            {
                                                                !this.state.showResult ? (question.answer_a__c) : (
                                                                    <span>
                                                                        {
                                                                            solution.get(question.sfid).selected == "A" ? (
                                                                                <span style={{ color: solution.get(question.sfid).answer == "A" ? "green" : "red" }}>
                                                                                    {question.answer_a__c
                                                                                    }
                                                                                </span>
                                                                            ) : (
                                                                                    <span style={{ color: solution.get(question.sfid).answer == "A" ? "green" : "black" }}>

                                                                                        {question.answer_a__c
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                        }
                                                                    </span>
                                                                )
                                                            }

                                                        </span>
                                                    </div>
                                                    <div hidden={question.answer_b__c ? false : true}>

                                                        <input
                                                            defaultChecked={solution.size > 0 && solution.get(question.sfid.selected) == "B" ? true : false}
                                                            value="B"
                                                            name={'radio' + index}
                                                            type="radio"
                                                            onChange={this.handleChange.bind(this, question)}
                                                        />&nbsp;
                                                            <span>
                                                            {
                                                                !this.state.showResult ? (question.answer_b__c) : (
                                                                    <span>
                                                                        {
                                                                            solution.get(question.sfid).selected == "B" ? (
                                                                                <span style={{ color: solution.get(question.sfid).answer == "B" ? "green" : "red" }}>
                                                                                    {question.answer_b__c
                                                                                    }
                                                                                </span>
                                                                            ) : (
                                                                                    <span style={{ color: solution.get(question.sfid).answer == "B" ? "green" : "black" }}>

                                                                                        {" " + question.answer_b__c
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                        }
                                                                    </span>
                                                                )
                                                            }

                                                        </span>
                                                    </div>
                                                    <div hidden={question.answer_c__c ? false : true}>
                                                        <input
                                                            defaultChecked={solution.size > 0 && solution.get(question.sfid).selected == "C" ? true : false}
                                                            value="C"
                                                            name={'radio' + index}
                                                            type="radio"
                                                            onChange={this.handleChange.bind(this, question)}
                                                        />&nbsp;
                                                            <span>
                                                            {
                                                                !this.state.showResult ? (question.answer_c__c) : (
                                                                    <span>
                                                                        {
                                                                            solution.get(question.sfid).selected == "C" ? (
                                                                                <span style={{ color: solution.get(question.sfid).answer == "C" ? "green" : "red" }}>
                                                                                    {question.answer_c__c
                                                                                    }
                                                                                </span>
                                                                            ) : (
                                                                                    <span style={{ color: solution.get(question.sfid).answer == "C" ? "green" : "black" }}>

                                                                                        {question.answer_c__c
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                        }
                                                                    </span>
                                                                )
                                                            }

                                                        </span>
                                                    </div>
                                                    <div hidden={question.answer_d__c ? false : true}>
                                                        <input
                                                            defaultChecked={solution.size > 0 && solution.get(question.sfid).selected == "D" ? true : false}
                                                            value="D"
                                                            name={'radio' + index}
                                                            type="radio"
                                                            onChange={this.handleChange.bind(this, question)}
                                                        />&nbsp;
                                                            <span>
                                                            {
                                                                !this.state.showResult ? (question.answer_d__c) : (
                                                                    <span>
                                                                        {
                                                                            solution.get(question.sfid).selected == "D" ? (
                                                                                <span style={{ color: solution.get(question.sfid).answer == "D" ? "green" : "red" }}>
                                                                                    {question.answer_d__c
                                                                                    }
                                                                                </span>
                                                                            ) : (
                                                                                    <span style={{ color: solution.get(question.sfid).answer == "D" ? "green" : "black" }}>

                                                                                        {question.answer_d__c
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                        }
                                                                    </span>
                                                                )
                                                            }

                                                        </span>
                                                    </div>
                                                    <div hidden={question.answer_e__c ? false : true}>
                                                        <input
                                                            defaultChecked={solution.size > 0 && solution.get(question.sfid).selected == "E" ? true : false}
                                                            value="E"
                                                            name={'radio' + index}
                                                            type="radio"
                                                            onChange={this.handleChange.bind(this, question)}
                                                        />&nbsp;
<span>
                                                            {
                                                                !this.state.showResult ? (question.answer_e__c) : (
                                                                    <span>
                                                                        {
                                                                            solution.get(question.sfid).selected == "E" ? (
                                                                                <span style={{ color: solution.get(question.sfid).answer == "E" ? "green" : "red" }}>
                                                                                    {question.answer_e__c
                                                                                    }
                                                                                </span>
                                                                            ) : (
                                                                                    <span style={{ color: solution.get(question.sfid).answer == "E" ? "green" : "black" }}>

                                                                                        {question.answer_e__c
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                        }
                                                                    </span>
                                                                )
                                                            }

                                                        </span>                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    }
                                </div>


                                <div className="submit">
                                    <div hidden={this.state.isLessonCompleted || this.state.questions.length <= 0 ? true : false}>
                                        <div className="btn-group">
                                            <Button bsStyle="success" onClick={this.getResult}>Check</Button>

                                            <Button bsStyle="danger" onClick={this.submitAns}>Submit</Button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        }





                    </div>

                </div>

                <div className="spacer"> </div>
                <div className="pull-left" hidden={this.state.lessonIndex <= 0 ? true : false}>
                    <Button onClick={this.goToPrvious} bsStyle="success">Previous Lesson</Button>
                </div>
                <div className="pull-right" hidden={this.state.lessonIndex == this.state.totalLesson - 1 ? true : false}>
                    <Button onClick={this.goToNext} bsStyle="success">Next Lesson</Button>
                </div>



            </div>
        );
    }
};
export default SingleLession;