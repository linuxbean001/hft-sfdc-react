import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Line as LineChart } from 'react-chartjs';
import AuthService from '../../../services/AuthService';
import EventService from '../../../services/EventService';
import { assTypeQues } from '../../../const/assTypeQues' 
import './style.css';

const Auth = new AuthService();
const eventService = new EventService();

class HomeNext extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      loading: true,
      chartMap: new Map()
    };
  }

  componentDidMount() {
    if (!Auth.loggedIn()) {
      this.props.history.replace('login');
    }
    this._init();
  }

  _init = () => {
    eventService.getAssResult()
      .then(res => {
        if (res.data.success) {
          this.setState({
            score: new Map(JSON.parse(res.data.body)),
          }, function () {
            this.setTrsChart();
          });
          console.log('xxxxxxxx xxxxxxx xxxxxxxx score ', this.state.score);
        }
      }).catch(err => {
        console.log('xxxxxxxx xxxxxxx xxxxxxxx err ', err);
      });
  }

  setTrsChart = () => {
    let vvvv = this.state.score.get('TRS');
     let drsArr=vvvv.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
    let labelArr = [];
    let dataArr = [];
    drsArr.forEach((val,i) => {
      let dateOfAss = this.getDate(val.createddate);
      labelArr.push(dateOfAss);
      let sum = parseInt(val.question_1__c) + parseInt(val.question_2__c) + parseInt(val.question_3__c) + parseInt(val.question_4__c) + (parseInt(val.question_5__c) + parseInt(val.question_6__c)) / 2 + parseInt(val.question_7__c) + parseInt(val.question_8__c) + parseInt(val.question_9__c) + parseInt(val.question_10__c) + parseInt(val.question_11__c);

      let avg = sum / assTypeQues.TRS - 1;
      avg= Math.round(avg)
      dataArr.push(avg);
     
    });

    console.log('xxxxxxxx xxxxxxxx xxxxxxxxxx labelArr', dataArr);
    this.state.chartMap.set('TRS', {
      labelArr,
      dataArr
    });
    this.setState({
      loading: false
    })
  }

  getDate = (dateOfAss) => {
    let dateAss = dateOfAss;
    if (dateAss == null) {
      dateAss = new Date();
      return dateAss.getFullYear() + "-" + (dateAss.getMonth() + 1) + "-" + dateAss.getDate();
    }
    console.log(dateAss);
    return dateAss.slice(0, 10);
  }

  showChart = (labelArr, dataArr) => {
    return {
      labels: [...labelArr],
      datasets: [
        {
          label: 'My Second dataset',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: [...dataArr],
        },

      ]
    }
  }

  render() {
    const options = {
      scaleShowGridLines: true,
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      scaleGridLineWidth: 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      legendTemplate: '<ul className=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
    }

    const styles = {
      graphContainer: {
        border: '1px solid black',
        padding: '15px',
        marginBottom: '30px'
      }
    }

    if (this.state.loading) {
      return 'Loading...'
    }
    const drs = this.state.chartMap.get('TRS');
    
    return (

      <div>
        {/* <div className="row form-group head_div head_div_custom">
          <h2 className="text-center">Welcome from our Founders<i className="fa fa-times" aria-hidden="true"></i></h2>
        </div>
        <div className="row louandlinda">
          <div className="col-md-2 col-xs-4 col-sm-3">
            <img src={require('./images/louandlinda.png')} className="img-responsive img-rounded" />
          </div>
          <div className="col-md-10 col-xs-8 col-sm-9">
            <p>Dr. Louis Tinnin (a psychiatrist) and his wife Dr. Linda Gantt (an art therapist) created the Instinctual Trauma Response Model to help people who have survived all types of traumas. After 30 years of research and development in a variety of academic and clinical settings, the ITR model is now available to you and many therapists who are helping their clients reduce or eliminate the debilitating symptoms caused by trauma. If you take the time to learn the method and do the tasks described, we know you will have lasting results.</p>
            <p>Give us your <a href="#">feedback</a>. We look forward to hearing from you.</p>
          </div>
        </div> */}
        <div className="row louandlinda m-t-30">
          <div className="col-md-4 ng-scope" >
            <h3>Get Started</h3>
            <ul>
              <li><Link to={'/hft/Assessments'}>Take the Assessments</Link></li>
              <li><Link to={"/hft/grounding"}>Learn About Grounding and Practice it</Link></li>
              <li><Link to={"/sp-canvas"}>Create your Safe Place</Link></li>
              <li><Link to={'/timeline-canvas'}>Add events to the Timeline</Link></li>
              <li><Link to={"/hft/Graphic-Narrative"}>Do your first Graphic Narrative & Re-presention</Link></li>
              <li><Link to={"/hft/Parts-Map"}>Create a Part Map</Link></li>
              <li><Link to={"/hft/Externalized-Dialogue"}>Do an Externalized Dialogue</Link></li>
              <li><Link to={'/hft'}>Repeat...</Link></li>
            </ul>
          </div>
          <div className="col-md-8">
            <h2>My Trauma Recovery Scale Results</h2>
            <div className="test-statics-wrapper">
              <div className="chart-container">
                <h5>{this.state.assessment}</h5>
                <div style={styles.graphContainer}>
                  {
                    drs && drs.labelArr.length > 0 ? (<LineChart data={this.showChart(drs.labelArr, drs.dataArr)}
                      options={options}
                      width="600" height="250" />) : (
                        <h3>Assement Not Taken</h3>
                      )
                  }

                </div>
              </div>
            </div>
            <div className="info-text text-center">
            <span>TRS</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeNext;