import React, { Component } from 'react';
import AuthService from '../../../services/AuthService'; 
import { Link } from 'react-router-dom';
import './Timeline.css';
const Auth = new AuthService();

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        if (this.props.location.state) {
            console.log('xxxxxx xxxxx ev ' + this.props.location.state.eventId); 
        }
    }

    render() {
        return (
            <div>
                <div className="row form-group head_div">
                    <div className="pull-left"><span className="head_title">Timeline</span></div>
                    <div className="pull-right event_btn">
                        <Link to={'/timeline-canvas'} target='_blank' className="btn btn-info">Open Timeline</Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-9 text-left">
                        <div className="panel-group">
                          <div className="panel panel-default"> 
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a>The Time Line</a>
                              </h4>
                            </div>
                            <div className="panel-collapse collapse in">
                              <div className="panel-body panel-body-video">
                                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                                  <iframe src="https://player.vimeo.com/video/224860735" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                                </div>
                                <script src="https://player.vimeo.com/api/player.js"></script>
                              </div>
                            </div>
                            <div className="panel-body ng-binding">
                                <p>Some people have had very few significant traumas in their lives; others have had a large number in both childhood and adulthood. Making a chronological list of your traumas and the age you were when they happened will give you a sense of how best to use our method. Looking through a family scrapbook is often a good way to jog your memory. </p><p>If you have a preverbal trauma (such as a major operation or a long stay in the hospital) and one or two events in childhood or adolescence (such as a car accident or a natural disaster) you can process the traumas with or without a therapist using this app. On the other hand, if you have a large number of traumas throughout your life we highly recommend that you work with a trained therapist. Regardless of the number of events, you should start with your life in the womb or at  birth.  Imagine the effects on a baby if the mother had a trauma during pregnancy. Many infants or mothers can have PTSD from a complicated birth. As you organize your trauma list, pay particular attention to the time between your birth and when you turned three. During this preverbal time, most people don’t consciously remember much, but you may have symptoms from events that happened then, but have persisted into adulthood. We call these early traumas, 'foundation' traumas. </p><p>Think of a house where there are cracks in the basement that need to be repaired before other work can be done. These cracks may not be so easy to see, but the very structure of the house is affected. Any other work done prior to repairing the foundation would be a waste of time and money. It’s the same with people. The things that happened to us in early childhood have significant effects on our lives even if we do not have the words to describe them.You may remember more events as you start this work. They can be added at anytime. </p><p> From the timeline, move on the Graphic Narrative. You will do one Graphic Narrative for each event.</p>
                            </div>
                          </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
};
export default Timeline;