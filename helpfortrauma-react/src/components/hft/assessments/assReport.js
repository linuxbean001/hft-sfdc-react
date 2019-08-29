import React, { Component } from 'react';
import { Line as LineChart } from 'react-chartjs';
import { assTypeQues } from '../../../const/assTypeQues';
import EventService from '../../../services/EventService';
const eventService = new EventService();

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
    legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}

const styles = {
    graphContainer: {
        border: '1px solid black',
        padding: '15px',
        marginBottom: '30px'
    }
}
class AssReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            chartMap: new Map()
        };
    }

    componentDidMount() {
        this.setState({
            assessment: this.props.location.state.assessment 
        }, function () {
            this._init();
        })
    }

    _init = () => {
        eventService.getAssResult()
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        score: new Map(JSON.parse(res.data.body)),
                    }, function () {
                        this.setChartLayout();
                    });

                }
            }).catch(err => {
                console.log('xxxxxxxx xxxxxxx xxxxxxxx err ', err);
            });
    }

    setChartLayout = () => {
        let keys = [...this.state.score.keys()];
        keys.forEach(val => {

            switch (val) {
                case 'TRS':
                    this.setTrsChart();
                    break;

                case 'SCL-45':
                    this.setSclChart();
                    break;

                case 'DES-II':
                    this.setDesChart();
                    break;

                case 'DRS':
                    this.setDrsChart();
                    break;

                case 'ACE':
                    this.setAceChart();
                    break;
            }
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

    setDrsChart = () => {
        let drsArr = this.state.score.get('DRS');
        let labelArr = [];
        let dataArr = [];
        drsArr.forEach(val => {
            let dateOfAss = this.getDate(val.createddate);
            labelArr.push(dateOfAss);
            let sum = parseInt(val.question_1__c) + parseInt(val.question_2__c) + parseInt(val.question_3__c) + parseInt(val.question_4__c) + parseInt(val.question_5__c) + parseInt(val.question_6__c);
            let avg = sum / assTypeQues.DRS;
            dataArr.push(avg);
        });

        this.state.chartMap.set('DRS', {
            labelArr,
            dataArr
        });
    }

    setAceChart = () => {
        let drsArr = this.state.score.get('ACE');
        let labelArr = [];
        let dataArr = [];
        drsArr.forEach(val => {
            let dateOfAss = this.getDate(val.createddate);
            labelArr.push(dateOfAss);
            let sum = parseInt(val.question_1__c) + parseInt(val.question_2__c) + parseInt(val.question_3__c) + parseInt(val.question_4__c) + parseInt(val.question_5__c) + parseInt(val.question_6__c);
            let avg = sum / assTypeQues.ACE;
            dataArr.push(avg);
        });

        this.state.chartMap.set('ACE', {
            labelArr,
            dataArr
        });
    }

    setSclChart = () => {
        let drsArr = this.state.score.get('SCL-45');
        let labelArr = [];
        let dataArr = [];
        drsArr.forEach(val => {
            let dateOfAss = this.getDate(val.createddate);
            labelArr.push(dateOfAss);
            let sum = parseInt(val.question_1__c) + parseInt(val.question_2__c) + parseInt(val.question_3__c) + parseInt(val.question_4__c) + parseInt(val.question_5__c) + parseInt(val.question_6__c) + parseInt(val.question_7__c) + parseInt(val.question_8__c) + parseInt(val.question_9__c) + parseInt(val.question_10__c) + parseInt(val.question_11__c) + parseInt(val.question_12__c) + parseInt(val.question_13__c) + parseInt(val.question_14__c) + parseInt(val.question_15__c) + parseInt(val.question_16__c) + parseInt(val.question_17__c) + parseInt(val.question_18__c) + parseInt(val.question_19__c) + parseInt(val.question_20__c) + parseInt(val.question_21__c) + parseInt(val.question_22__c) + parseInt(val.question_23__c) + parseInt(val.question_24__c) + parseInt(val.question_25__c) + parseInt(val.question_26__c) + parseInt(val.question_27__c) + parseInt(val.question_28__c) + parseInt(val.question_29__c) + parseInt(val.question_30__c) + parseInt(val.question_31__c) + parseInt(val.question_32__c) + parseInt(val.question_33__c) + parseInt(val.question_34__c) + parseInt(val.question_35__c) + parseInt(val.question_36__c) + parseInt(val.question_37__c) + parseInt(val.question_38__c) + parseInt(val.question_39__c) + parseInt(val.question_40__c) + parseInt(val.question_41__c) + parseInt(val.question_42__c) + parseInt(val.question_43__c) + parseInt(val.question_44__c) + parseInt(val.question_45__c);
            let avg = sum / assTypeQues.SCL_45;
            dataArr.push(avg);
        });

        this.state.chartMap.set('SCL-45', {
            labelArr,
            dataArr
        })
    }

    setTrsChart = () => {
        let drsArr = this.state.score.get('TRS');
        let labelArr = [];
        let dataArr = [];
        drsArr.forEach(val => {
            let dateOfAss = this.getDate(val.createddate);
            labelArr.push(dateOfAss);
            let sum = parseInt(val.question_1__c) + parseInt(val.question_2__c) + parseInt(val.question_3__c) + parseInt(val.question_4__c) + (parseInt(val.question_5__c) + parseInt(val.question_6__c)) / 2 + parseInt(val.question_7__c) + parseInt(val.question_8__c) + parseInt(val.question_9__c) + parseInt(val.question_10__c) + parseInt(val.question_11__c);

            let avg = sum / assTypeQues.TRS - 1;
            dataArr.push(avg);
        });

        this.state.chartMap.set('TRS', {
            labelArr,
            dataArr
        });

    }

    setDesChart = () => {
        let drsArr = this.state.score.get('DES-II');
        let labelArr = [];
        let dataArr = [];
        drsArr.forEach(val => {
            let dateOfAss = this.getDate(val.createddate);
            labelArr.push(dateOfAss);
            let sum = parseInt(val.question_1__c) + parseInt(val.question_2__c) + parseInt(val.question_3__c) + parseInt(val.question_4__c) + parseInt(val.question_5__c) + parseInt(val.question_6__c) + parseInt(val.question_7__c) + parseInt(val.question_8__c) + parseInt(val.question_9__c) + parseInt(val.question_10__c) + parseInt(val.question_11__c) + parseInt(val.question_12__c) + parseInt(val.question_13__c) + parseInt(val.question_14__c) + parseInt(val.question_15__c) + parseInt(val.question_16__c) + parseInt(val.question_17__c) + parseInt(val.question_18__c) + parseInt(val.question_19__c) + parseInt(val.question_20__c) + parseInt(val.question_21__c) + parseInt(val.question_22__c) + parseInt(val.question_23__c) + parseInt(val.question_24__c) + parseInt(val.question_25__c) + parseInt(val.question_26__c) + parseInt(val.question_27__c) + parseInt(val.question_28__c);
            let avg = sum / assTypeQues.DES_II;
            dataArr.push(avg);
        });

        this.state.chartMap.set('DES-II', {
            labelArr,
            dataArr
        });

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
        if (this.state.loading) {
            return 'Loading...'
        }
        const drs = this.state.chartMap.get(this.state.assessment);
        console.log('xxxxxxxx xxxxxxxxxxx')
        // const trs = this.state.chartMap.get('TRS');
        // const ace = this.state.chartMap.get('ACE');
        // const scl = this.state.chartMap.get('SCL-45');
        // const des = this.state.chartMap.get('DES-II');
        return (
            <div>
                <div className="row form-group head_div">
                    <div className="pull-left"><span className="head_title">Review Result</span></div>
                </div>
                <div>
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
                {/* <div>
                    <h5>TRS</h5>
                    <div style={styles.graphContainer}>
                        {
                            trs.labelArr.length > 0 ? (<LineChart data={this.showChart(trs.labelArr, trs.dataArr)}
                                options={options}
                                width="600" height="250" />) : (
                                    <h3>Assement Not Taken</h3>
                                )
                        }

                    </div>
                </div>
                <div>
                    <h5>ACE</h5>

                    <div style={styles.graphContainer}>
                        {
                            ace.labelArr.length > 0 ? (<LineChart data={this.showChart(ace.labelArr, ace.dataArr)}
                                options={options}
                                width="600" height="250" />) : (
                                    <h3>Assement Not Taken</h3>
                                )
                        }

                    </div>
                </div>
                <div>
                    <h5>DES-II</h5>
                    <div style={styles.graphContainer}>
                        {
                            des.labelArr.length > 0 ? (<LineChart data={this.showChart(des.labelArr, des.dataArr)}
                                options={options}
                                width="600" height="250" />) : (
                                    <h3>Assement Not Taken</h3>
                                )
                        }

                    </div>
                </div>
                <div>
                    <h5>SCL-45</h5>
                    <div style={styles.graphContainer}>
                        {
                            scl.labelArr.length > 0 ? (<LineChart data={this.showChart(scl.labelArr, scl.dataArr)}
                                options={options}
                                width="600" height="250" />) : (
                                    <h3>Assement Not Taken</h3>
                                )
                        }

                    </div>
                </div> */}
            </div>
        );
    }
}

export default AssReport;
