import React, { Component } from 'react';
import AuthService from '../../../services/AuthService';
import EventService from '../../../services/EventService';
import ReviewPageService from '../../../services/ReviewPageService';
import { Link } from 'react-router-dom';

import './externalizedDialogue.css';
const Auth = new AuthService();
const event = new EventService();
const Review = new ReviewPageService();

class ExternalizedDialogue extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  componentDidMount() {
    if (this.props.location.state) {
      console.log('xxxxxx xxxxx ev ' + this.props.location.state.eventId);
    }

    if (!Auth.loggedIn()) {
      this.props.history.replace('/login');
    }else{
      this._init();
    }
  }
  _init= ()=> {
  
    const eventVo = {
        'usrid': event.getProfile().id
       
    }

    Review.addEDialogueStatus(eventVo)
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
          <div className="pull-left"><span className="head_title">Externalized Dialogue</span></div>
          <div className="pull-right event_btn">
          <Link to={'/ed-canvas'} target='_blank' className="btn btn-info">Begin Externalized Dialogue</Link>
          {/* <button type="button" className="btn btn-info">
            <span>Begin Externalized Dialogue</span>
          </button> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 text-left">
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a>About the Externalized Dialogue</a>
                    </h4>
                  </div>
                  <div className="panel-collapse collapse in">
                    <div className="panel-body panel-body-video">
                      <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                        <iframe src="https://player.vimeo.com/video/224862111" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                      </div>
                      <script src="https://player.vimeo.com/api/player.js"></script>
                    </div>
                  </div>
                  <div className="panel-body ng-binding">
                    <p>When you have finished the story and the Self Discovery, it’s now time to reach out to the “part” of you that experienced the event.  Often, this part of you has been stuck in the past but it affects your present-day life.  It’s important to communicate with this part to bring internal peace.</p><p>An example of a part from the past can be one that is distrusting, fearful, or angry.  Considering what had happened there is good reason for this, but it usually does not serve the present-day self to be stuck in these past emotions. </p><p>After completing the story, these parts can be addressed and encouraged to now participate in present day life.  We accomplish this through dialoguing with the part.  It’s not unusual for that part to be experienced as strong thoughts or voices. You can name the part an emotion, like “Fear” or “Sadness” or you can use your name at that age, for example or “Mary at 2.” </p><p>The Externalized Dialogue can even be done before a Graphic Narrative if there is a part or voice you want to give attention to for any reason. It may even be necessary to dialogue with a part to get agreement for you to do the Graphic Narrative. You will find these dialogues are important tools to use the rest of your life to keep internal peace.</p><p>The dialogue process requires some simple steps. </p><p>Those steps are, recognizing the part or voice, talking with it, writing, or video recording it, and reviewing the recording. You and your part  will take turns in this exercise. </p><p>To start, invite the part  to talk, addressing it as 'you'. Now it’s time for the part to speak. In each turn, address the part as 'you' or by name. This process continues back and forth like a conversation. </p><p>When dialoguing with your parts, you may be surprised at the material that comes to the surface and how quickly important issues arise. This is an example of how powerful the technique is.</p><p>There are three basic rules for doing a dialogue: 1) Take turns. 2) Don't interrupt. 3) Try to use complete sentences.The dialogue with parts can begin with an exploration of their roles and origins. </p><p>Many times, a part’s role began as an attempt to help. For instance, according to a young part’s logic, suicide might be regarded as the only solution to intense psychological pain. Sometimes the part has never considered any other options. Suicidal thoughts are more common than many people think. It’s important to understand that such thoughts are only from one part of you. Now your present day self can have a successful dialogue and negotiate with the part to find a more mature and effective solution.</p><p>If the first response from a part is negative, don’t be discouraged. For example if your part says, “Why should I talk to you now when you want me to go away?” You can respond with “I know, but this time I will listen.” Your role as the present day self is to be open minded and willing to deal with whatever comes up from a part. Your hope is to eventually gain the trust of the part. </p><p>As you continue the dialogue process there will be growing recognition of you as the team leader. You can provide a source of safety as you treat your parts or voices as something to be understood, not something to be silenced. The more you know about the part, the closer you will be to developing a mutual understanding.</p><p>Be aware that sometimes parts can show themselves by persistent body sensations such as headaches, stomach aches or other unexplained physical ailments. Do a dialogue with such a part, just as you would with any other.</p><p>After you come to a logical stopping place, thank the part for participating, and set up a time to dialogue again. Make certain you stick to your word.</p><p>Review the dialogue by reading it aloud or replaying the videos.We all have parts. Be patient with yours.</p><p>It’s common for your parts to have different opinions so be curious about that and be willing to listen. This is a process that gets easier with practice. </p><p>The Externalized Dialogue is an important tool you must use frequently to maintain your gains. If you stop doing this form of communication, your symptoms may return. If you continue using it, it will help you on your path to greater inner peace.</p>
                  </div>
                </div>
              </div>
          </div>
        </div>

      </div>
    );
  }
};
export default ExternalizedDialogue;