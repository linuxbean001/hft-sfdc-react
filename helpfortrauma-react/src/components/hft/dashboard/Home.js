import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import AuthService from '../../../services/AuthService';
import EventService from '../../../services/EventService';
import './style.css';

const Auth = new AuthService(); 
const AssService = new EventService();

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      drs:false,
      trs:false,
      des:false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTerm = this.handleChangeTerm.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this); 

  }

  componentDidMount() {
    // this.setState({
    //     assessment: this.props.location.state.assessment 
    // }, function () {
    //     this._init();
    // })
    this._init();
    this._init_status();
}
handleChange(event) {
    this.setState({
      size: event.target.value,
      checkAssessment: event.target.value
    });

  }

  handleChangeTerm(event) {
    this.setState({
      term: event.target.value,
      termStatus: event.target.value
    });

  }

  handleChangeEmail(event) {
    this.setState({
      termEmail: event.target.value
    });

  }
  _init = () => {
    AssService.getAssResult_home()
        .then(res => {
            if (res.data.success) {
              const data = res.data.body;
              //console.log('xxxxxxxxxxxxxx result xxx', data);
              
               const drs = data.some(d=>d.assesment_type__c=== "DRS");
               const trs = data.some(d=>d.assesment_type__c=== "TRS");
               const des = data.some(d=>d.assesment_type__c=== "DES-II"); 
               this.setState({drs,trs,des});
            }
        }).catch(err => {
            console.log('xxxxxxxx xxxxxxx xxxxxxxx err ', err);
        });
}

_init_status = () => {
    AssService.getReviewStatus()
        .then(res => {
          const data = res.data.body;
          console.log('xxxxxxxxx result',data);
          
            if (res.data.success) {
             
              const timeline=data[0].add_event_to_the_timeline__c;
              const parstmap =data[0].create_a_parts_map__c;
              const safeplace=data[0].create_your_safe_place__c;
              const ex_dialogue=data[0].do_an_externalized_dialogue__c;
              const g_narrative=data[0].do_your_first_graphic_narrative_repre__c;
              const grounding=data[0].learn_about_grounding_and_practice__c;
              this.setState({timeline,parstmap,safeplace,ex_dialogue,g_narrative,grounding});
              
            }
            if((data[0].add_event_to_the_timeline__c==true) && (data[0].create_a_parts_map__c==true) && (data[0].create_your_safe_place__c==true)&& (data[0].do_an_externalized_dialogue__c==true)&& (data[0].do_your_first_graphic_narrative_repre__c==true)&& (data[0].learn_about_grounding_and_practice__c==true)){
              this.props.history.replace('/hft/Home-dashboard');
            }
        }).catch(err => {
            console.log('xxxxxxxx xxxxxxx xxxxxxxx err ', err);
        });
}  
beginAssessment(row) {
    this.setState({
      selectedAss: row
    }, function () {
      AssService.isUsrAllowedForAss(this.state.selectedAss)
        .then(res => {
          if (res.data.success) {
            if (res.data.body) {
              this.props.history.push({
                pathname: '/hft/Assessments/selfAssessment',
                state: { assessment: this.state.selectedAss }
              });
            } else {
              this.setState({
                showAlert: true,
                alertMsg: res.data.message
              })
            }
          }
        }).catch(err => {
          console.log('xxxxxxx xxxxx error is ', err);
        });
    });
  }
  render() {

    return (

      <div>
        <div className="row form-group head_div">
					<div className="pull-left"><span className="head_title">DashBoard</span></div>
				</div>
        <div className="col-md-3 sidebar-p">
          <h3>Take the Assessments</h3>
          <div className="row side-panel">
          
          <span className="box-pointer" onClick={this.beginAssessment.bind(this, 'DRS')} ><label className="container_checkbox"><strong>DRS</strong><br></br>

              <input type="Checkbox" checked={this.state.drs} name="myself-input2" value="DRS" onChange={this.handleChange}></input>
              <span className="checkmark"></span>
            </label>
            </span>
            <span className="box-pointer" onClick={this.beginAssessment.bind(this, 'TRS')}>
            <label className="container_checkbox"><strong>TRS</strong><br></br>

              <input type="checkbox" checked={this.state.trs} name="myself-input3" value="TRS" onChange={this.handleChange}></input>
              <span className="checkmark"></span>
            </label>
            </span>
            <span className="box-pointer" onClick={this.beginAssessment.bind(this, 'DES-II')}>
            <label className="container_checkbox"><strong>DES-II</strong><br></br>

<input checked={this.state.des} type="checkbox" name="myself-input5" value="DES-II" onChange={this.handleChange}></input>
<span className="checkmark"></span>
</label>
</span>
          </div>
        </div>
        <div className="col-md-9 right-panel">
          <div className="row">
            <div className="col-md-6">
             <Link to={"/hft/grounding"}> <label className="container_checkbox"><strong>Learn About Grounding and Practice</strong><br></br>

                <input type="checkbox" checked={this.state.grounding} name="Grounding-practice" value="Grounding-practice" onChange={this.handleChange}></input>
                <span className="checkmark"></span>
              </label>
              </Link>
            </div>
            <div className="col-md-6">  
            <Link to={"/sp-canvas"} target='_blank'>
            <label className="container_checkbox"><strong>Create your Safe Place
</strong><br></br>

              <input type="checkbox" checked={this.state.safeplace} name="safe-place" value="safe-place" onChange={this.handleChange}></input>
              <span className="checkmark"></span>
            </label>
            </Link>
            </div>
            <div className="col-md-6">
            <Link to={'/timeline-canvas'} target='_blank' >
              <label className="container_checkbox"><strong>Add events to the Timeline</strong><br></br>

                <input type="checkbox" checked={this.state.timeline} name="timeline" value="timeline"  onChange={this.handleChange}></input>
                <span className="checkmark"></span>
              </label>
              </Link>
            </div>
            <div className="col-md-6"> 
            <Link to={"/hft/Graphic-Narrative"}>
             <label className="container_checkbox"><strong>Do your first Graphic Narrative & Re-presentation
</strong><br></br>

              <input type="checkbox" checked={this.state.g_narrative} name="graphic-narrative" value="graphic-narrative" onChange={this.handleChange}></input>
              <span className="checkmark"></span>
            </label>
            </Link>
            </div>
            <div className="col-md-6"> 
            <Link to={"/hft/Parts-Map"}>
             <label className="container_checkbox"><strong>Create a Parts Map
</strong><br></br>

              <input type="checkbox" checked={this.state.parstmap} name="parts-map" value="parts-map" onChange={this.handleChange}></input>
              <span className="checkmark"></span>
            </label>
            </Link>
            </div>
            <div className="col-md-6">  
            <Link to={"/hft/Externalized-Dialogue"}>
            <label className="container_checkbox"><strong>Do an Externalized Dialogue
</strong><br></br>

              <input type="checkbox" checked={this.state.ex_dialogue} name="externalized-dialogue" value="externalized-dialogue" onChange={this.handleChange}></input>
              <span className="checkmark"></span>
            </label>
            </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;