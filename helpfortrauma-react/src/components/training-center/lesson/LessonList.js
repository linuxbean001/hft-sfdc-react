import React, { Component } from 'react';

class LessonList extends Component {
    /* *****************************Constructor******************* */
    constructor(props) {
        super(props);
        this.state = {
            lessons: this.props.lessonsList
        };
    }

    /* *****************************Methods********************** */
    componentDidMount() {
        this._getLessons();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentLessonToList) {
            let index = nextProps.currentLessonToList + 1;
            let lesson = this.state.lessons[index];
            this.props.nextLessonIs({
                lesson: lesson,
                lessonIndex: index
            });
            // this.goToLesson(lesson, index);
            // this.props.goLesson({
            //     lesson: lesson,
            //     lessonIndex: index
            // });
        }
    }


    _getLessons = () => {
        let lessons = this.state.lessons;
        lessons.sort((a, b) => {
            return a.position__c - b.position__c
        });

        this.setState({
            lessons: lessons
        })
    }

    goToLesson = (lesson, index) => {
        this.props.goLesson({
            lesson: lesson,
            lessonIndex: index
        });
    }

    /* *****************************Template********************* */
    render() {
        return (
            <div>
                <div className="form-group">
                    <h4>Progress Bar</h4>
                    <div className="progress progress-striped active">
                        <div className="progress-bar progress-bar-secondary" role="progressbar" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100" style={{ width: '42%' }}>
                            <span className="sr-only">42.7% Bounce Rate</span>
                        </div>
                    </div>
                </div>
                <h4>Lesson Navigation</h4>
                <ul className="timeline">

                    {
                        this.state.lessons.map((lesson, index) =>
                            <li key={index} className="completed">
                                <a href="javascript:void(0)" onClick={this.goToLesson.bind(this, lesson, index)}>{lesson.name}</a>
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
        );
    }
}

export default LessonList;
