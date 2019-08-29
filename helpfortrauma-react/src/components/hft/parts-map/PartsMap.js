import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../../services/AuthService';
import EventService from '../../../services/EventService';
import ReviewPageService from '../../../services/ReviewPageService';
import './PartsMap.css';

const Auth = new AuthService();
const event = new EventService();
const Review = new ReviewPageService();

class PartsMap extends Component {
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

      Review.addPartmaptStatus(eventVo)
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
          <div className="pull-left"><span className="head_title">Parts Map</span></div>
          <div className="pull-right event_btn">
          <Link to={'/pm-canvas'} target='_blank' className="btn btn-info">Begin Parts Map</Link>
          {/* <button type="button" className="btn btn-info"> 
            <span>Begin Parts Map</span>
          </button> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 text-left">
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a>About the Parts Map</a>
                    </h4>
                  </div>
                  <div className="panel-collapse collapse in">
                    <div className="panel-body panel-body-video">
                      <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                        <iframe src="https://player.vimeo.com/video/224858824" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                      </div>
                      <script src="https://player.vimeo.com/api/player.js"></script>
                    </div>
                  </div>
                  <div className="panel-body ng-binding">
                    <p>When first beginning to work with the concept of internal parts, we may not be aware of all of them. This is where the Parts Map is very helpful. When parts function as a team there is little difficulty in dealing with the demands of everyday life. However, when we are under psychological stress our parts may start running the show resulting in a dysfunctional system. Using the externalized dialogue and the parts map can help to identify self, parts, their relationships, and their place in one’s mental landscape. </p><p>Mapping parts becomes an easy task once the parts have been acknowledged. In the Parts Map section use a text box to designate each part. Using the same color can show that some  are closer to each other than to other parts.  You can also change the sizes of the text boxes to indicate their relative weight in the system. The parts on the map can be moved and resized as connections and alliances are discovered. Use the externalized dialogue to explore these links. </p><p>Over time, the Parts Map will change with more information and with changes to the individual parts.</p>
                  </div>
                </div>
              </div>
          </div>
        </div>

      </div>
    );
  }
};
export default PartsMap;