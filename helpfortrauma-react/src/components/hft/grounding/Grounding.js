import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../../services/AuthService';
import EventService from '../../../services/EventService';
import ReviewPageService from '../../../services/ReviewPageService';

const Auth = new AuthService();
const event = new EventService();
const Review = new ReviewPageService();
class Grounding extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  componentDidMount() {
    if (!Auth.loggedIn()) {
      this.props.history.replace('/login');
  } else {
    this._init();
     
  }
    if (this.props.location.state) {
      console.log('xxxxxx xxxxx ev ' + this.props.location.state.eventId);

    }
  }
  _init= ()=> {
  
      const eventVo = {
          'usrid': event.getProfile().id
         
      }

      console.log('xxxxxxxxxxx raghav', eventVo);

      Review.addGroundingStatus(eventVo)
          .then(data => {
              console.log('xxxxxxxxxxxx stastus', data);
             
          }).catch(err => {
              console.log('xxxxx xxxxx ', err);
          });
  
  }
    render() {
        return (
            <div>
                <div className="row form-group head_div">
                    <div className="pull-left"><span className="head_title">Grounding</span></div> 
                    <div className="pull-right event_btn event_btn_custom">
                      {/* <button type="button" className="btn btn-info" >
                        <span>Safe Place 11</span>
                      </button> */}
                      <div className="pull-right event_btn">
                        <Link to={'/sp-canvas'} target='_blank' className="btn btn-info">Create your Safe Place</Link>
                    </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-9 text-left">
                        <div className="panel-group">
                          <div className="panel panel-default">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a>Learn About Grounding</a>
                              </h4>
                            </div>
                            <div className="panel-collapse collapse in">
                              <div className="panel-body panel-body-video">
                                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                                  <iframe src="https://player.vimeo.com/video/224860311" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                                </div>
                                <script src="https://player.vimeo.com/api/player.js"></script>
                              </div>
                            </div>
                            <div className="panel-body ng-binding">
                            	<p>Grounding is keeping yourself in the here-and-now. When you are grounded you feel connected to your body and your environment. You can clearly see the room you are in, hear the sounds in it, and keep track of time. You can willfully move your body; you can easily name and describe what is around you.If you become ungrounded, you may feel as if you are floating or have lost track of the location of your physical body. You may think a past trauma is about to happen again.Grounding techniques can use any of the senses or mental operations, such as doing long division or naming items around you that start with a particular letter.</p><p>I’m going to describe some techniques that use different senses. After you learn about these techniques, select two or three to practice in advance so that you can apply them whenever you need them. </p><p>Here’s a visual one. Look above eye level and name 3 things. Look at eye level and name 3 things. Look below eye level and name 3 things. You can repeat as needed.</p><p>This is a technique that involves your body. Put your feet on the floor and your hands on your knees. Press down on your knees. Feel how the floor supports your feet. Put the small of your back against the back of the chair. Feel how the chair supports you. Change positions; if you are sitting, stand up, if your are standing, sit down. Walk around the room or go outside.</p><p>Here’s where you can use your sense of touch. Rub a grounding stone, or something with a lot of texture, or a stuffed animal. Put a piece of ice on the inside of your wrist or elbow. </p><p>Grounding techniques that use smell are powerful. Use a pleasant smell such as lavender, cinnamon, or chamomile. Put a cotton ball soaked in favorite cologne in a small plastic bag and keep it in a pocket of your shirt or blouse so you can smell it when needed. Be careful to select smells you like, not ones that may trigger you.</p><p>Remember to practice these techniques in case you begin to lose touch with your environment.</p>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Grounding;
