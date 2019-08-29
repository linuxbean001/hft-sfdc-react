import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../../services/AuthService';
import EventService from '../../../services/EventService';
import ReviewPageService from '../../../services/ReviewPageService';

import './GraphicNarrative.css';
import Modal from 'react-awesome-modal';
import data from './data/data.json';

const Auth = new AuthService();
const event = new EventService();
const Review = new ReviewPageService();

class GraphicNarrative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
    };
  }

  // launchCanvas(e) {
  //   localStorage.setItem('event', JSON.stringify(this.state.event));
  // }
  openModal() {
      this.setState({
          visible : true
      });
  }

  closeModal() {
      this.setState({
          visible : false
      });
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        event: {
          eventId: this.props.location.state.eventId,
          eventTitle: this.props.location.state.eventTitle
        }
      })
      console.log('xxxxxx xxxxx ev ', this.props.location.state.eventTitle);
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

    console.log('xxxxxxxxxxx raghav', eventVo);

    Review.addGNStatus(eventVo)
        .then(data => {
            console.log('xxxxxxxxxxxx stastus', data);
           
        }).catch(err => {
            console.log('xxxxx xxxxx ', err);
        });

}
render() {
    var arr = [];
    Object.keys(data).forEach(function(key) {
      arr.push(data[key]);
    });
    console.log(arr);

    return (
      <div>
        <div className="row form-group head_div">
          <div className="pull-left"><span className="head_title">Graphic Narrative</span></div>
          <div className="pull-right event_btn event_btn_custom">
            {/* <button type="button" className="btn btn-info" onClick={() => this.openModal()}>
              <span>Begin Graphic Narrative</span>
            </button> */}
            <Link to={"/timeline-canvas"} target='_blank' className="btn btn-info">  <span>Begin Graphic Narrative</span></Link>
            {/* <Modal 
                visible={this.state.visible}
                width="400"
                height="160"
                effect="fadeInUp"
                onClickAway={() => this.closeModal()}
            >
                <div className="openModal-style">
                    <a className="close-openModal" href="javascript:void(0);" onClick={() => this.closeModal()}>x</a>
                    <h1>Begin the Graphic Narrative by creating an event on your <a href="/timeline-canvas">Timeline</a></h1>
                </div>
            </Modal> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 text-left">
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a>Graphic Narrative</a>
                    </h4>
                  </div>
                  <div className="panel-collapse collapse in">
                    <div className="panel-body panel-body-video">
                      <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                        <iframe src="https://player.vimeo.com/video/224861127" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                      </div>
                      <script src="https://player.vimeo.com/api/player.js"></script>
                    </div>
                  </div>
                  <div className="panel-body ng-binding">
                    <p>The Graphic Narrative is a simple but extremely powerful process and is done in the same way for any event. </p>
                    <p>To begin, we recommend that you review the grounding instructions. Then select a “Safe Place” to use as a “go to” whenever you may need to ground yourself. You can make this drawing on paper or do it under the “Safe Place” tab of the drawing section. You might choose a special photograph for your “Safe Place.” This is an image you can use to calm yourself when needed. </p>
                    <p>The Graphic Narrative is a series of drawings, starting with a “Before” picture, going through each aspect of the Instinctual Trauma Response, and ending with an “After” picture. The “Before” picture sets the scene like a curtain being raised in a play and the “After” picture shows that the event is over, and the curtain comes down. </p>
                    <p>Beginning with the ‘Before’ picture, the Instinctual Trauma Response consists of a cascade of automatic reactions including the initial 'Startle', then the attempted ‘Fight/Flight' or “Thwarted Intention”, followed by the 'Freeze', 'the Altered State of Consciousness, ‘Automatic Obedience’, the ‘Self-Repair' and finally the ‘After’picture. Some of these phases happened in milliseconds, but they are important to recognize the feelings and body sensations that went along with them. For some examples of body sensations, see the “Non-verbal ITR” list in the Resource Section.</p>
                    <p>Each picture in the Graphic Narrative depicts the event as viewed from the perspective of an observer. The drawings present the entire experience from beginning to end. If you feel you didn't go through every phase during a particular event, such as “automatic Obedience” you can omit that phase. You might add a transition picture to show a change of location such as going to the hospital in an ambulance. Feel free to add any pages you may need to tell the story. It may take some time to familiarize yourself with the functions of the drawing section such as selecting and using the tools. You can also draw your story on paper if you prefer. </p>
                    <p>You don't have to be an artist to do the Graphic Narrative. Simple freehand drawings are good enough but you can add pictures from your device, or take photographs and add them as well. Try to use as many colors and details as possible or whatever is helpful in telling the story.</p>
                    <p>If you have no detailed memory or historical information for a preverbal trauma you can construct the story from what might have been. Drawing allows you to access these non-verbal memories you may not be conscious of.</p>
                    <p>You need to pace your drawing sessions so that you do not spend too much time in them. The average amount of time needed to complete a Graphic Narrative is an hour, so you should plan on having an hour-long session. If it looks as if you will not be able to do all the drawings in a single session make certain that you have done at least the 'Before', 'Self-repair' and 'After' pictures before stopping. You can see that the trauma is over when you do the “After” drawing. You can finish the other drawings later. It's important to take a break after an hour, but you can return for another hour the same day to finish the rest of the pictures. </p>
                    <p>When you are finished drawing and adding notes of the feelings and body sensations, go to each page in turn and record what happened in the “third person” with drama and empathy as if you are telling the story of someone else. Use the past tense. For example: “Baby Mary saw a bright light and felt the cold table. She was alone and afraid.”</p>
                    <p>End the story decisively with an emphatic “That was then. This is now. The story is finished. The End.” </p>
                    <p>Once you have completed the recording, play it back to yourself. You may choose to do this with your therapist or a compassionate witness (someone you can trust who was NOT involved in the event.) When you listen to the recording and watch the event, look at it as an observer who is witnessing a story of someone else. You will see that it is in the past and is finally over. </p>
                    <p>After listening to your 're-presentation' of the entire event, and paying careful attention to the emotions and body sensations connected to it, you will have closure to the event. Now, the story will be re-coded into long-term memory and you will have freedom from the symptoms originally caused by the trauma.</p>
                    <p>To complete the process, you need to do the Externalized Dialogue. This is described in the next section. Doing the Graphic Narrative gets easier the more you do. Although the difficulty may vary, the process is the same with any trauma at any age. When you bring closure to traumatic memory, it retires the trauma and permits repair of dissociation with the externalized dialogue. The benefit is permanent and well worth the time and effort spent. </p>
                    <p>Again we recommend you practice a grounding technique before watching a Graphic Narrative. Let your therapist or compassionate witness know your choice of grounding so they can assist if needed. See the sample Graphic Narrative we have included.</p>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>
    );
  }
};

export default GraphicNarrative;

export class Tabs extends Component {
  
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeTabIndex: this.props.defaultActiveTabIndex ? this.props.defaultActiveTabIndex : 0
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }
  
    // Toggle currently active tab
    handleTabClick(tabIndex) {
        this.setState({
            activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        });
    }
  
    // Encapsulate <Tabs/> component API as props for <Tab/> children
    renderChildrenWithTabsApiAsProps() {
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                onClick : this.handleTabClick,
                tabIndex: index,
                isActive: index === this.state.activeTabIndex
            });
        });
    }
  
    // Render current active tab content
    renderActiveTabContent() {
        const {children} = this.props;
        const {activeTabIndex} = this.state;
        if(children[activeTabIndex]) {
            return children[activeTabIndex].props.children;
        }
    }
  
    render() {
        return (
            <div className="tabs">
                <div className="col-md-12">
                  <div className="row-custom ">
                    <div className="col-md-12 col-sm-12 p-0">
                      <div className="tabs-active-content">
                          {this.renderActiveTabContent()}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
};

export const Tab = (props) => {
    var key = props.itemkey;
    var st = '';
    if(key == '0'){
      st = 'active';
    }
    return (
        <li className=" lesson-item ng-scope">
            <a  className= {`tab-link   icon-class-${key} ${props.isActive ? 'active' : ''}`}
                onClick={(event) => {
                    event.preventDefault();
                    props.onClick(props.tabIndex);
                }}>
                <span className="bubble lesson-bubble"></span><span className="stacked-text lesson-stacked-text ng-binding"><span className="action-icon"><i className="glyphicon "></i></span>{props.title}</span>
            </a>
        </li>
    )
};

class MyAppChild extends React.Component {
  render() {
    return <li className="lesson-item ng-scope"><span className="bubble lesson-bubble"></span><span className="stacked-text lesson-stacked-text ng-binding"><span className="action-icon"><i className="glyphicon "></i></span>{this.props.title}</span></li>;
  }
}
