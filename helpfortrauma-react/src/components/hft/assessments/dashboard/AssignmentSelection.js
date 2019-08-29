import React, { Component } from 'react';
import { assType } from '../../../../const/assessment-type';
import EventService from '../../../../services/EventService';
import AlertMsg from '../../../shared/alert';
import '../Assessments.css';
import { Link } from 'react-router-dom';

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

const AssService = new EventService();

class AssignmentSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortName: '',
      beginAss: false,
      AssessmentStatus: true,
      showAlert: false
    };
    this.onSortChange = this.onSortChange.bind(this);
    this.buttonFormatterView = this.buttonFormatterView.bind(this);
    this.buttonFormatterBegin = this.buttonFormatterBegin.bind(this);
  }

  componentDidMount() {
  }

  onSortChange(sortName, sortOrder) {
    console.info('onSortChange', sortName, sortOrder);
    this.setState({
      sortName
    });
  }

  buttonFormatterView(cell, row) {
    return <button className="btn btn-primary" onClick={this.viewReport.bind(this, row)}>View Results</button>
  }

  buttonFormatterBegin(cell, row) {
    console.log('xxxxxxxxx row', row);
    return <button className="btn btn-primary" onClick={this.beginAssessment.bind(this, row)}>Begin</button>
  }

  _setActionProps = (propKey) => {
    this.props.action({
      key: propKey
    });
  }

  viewReport = (row) => {
    this.props.history.push({
      pathname: '/hft/Assessments/AssReport',
      state: { assessment: row.code }
    });
  }

  beginAssessment(row) {
    this.setState({
      selectedAss: row.code
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

  resetAlert = (reset) => {
    if (reset) {
      this.setState({
        showAlert: false
      })
    }
  }

  _goToRequestAssessment = () => {
    this._setActionProps('REQUEST_ASSESMENT');
  }

  render() {
    const options = {
      sortName: this.state.sortName,
      onSortChange: this.onSortChange
    };

    return (
      <div>
        <div className="row form-group head_div">
          <div className="pull-left"><span className="head_title">Assessments</span></div>
          <div className="pull-right">
            <Link to={'/hft/Assessments/request'} className="btn btn-info">Request Assessment from Someone Else</Link>
          </div>
          {
            this.state.showAlert ? (
              <div className="col-md-offset-3 col-md-6 text-center">
                <AlertMsg msg={this.state.alertMsg} reset={this.resetAlert} style='warning' /></div>
            ) : (null)
          }
        </div>
        <div className="row assessments-button-custom">
          <div className="col-md-12 text-left assessments-style">

            <BootstrapTable className="BootstrapTable-custom" data={assType} options={options} striped hover>
              <TableHeaderColumn hidden={true} isKey dataSort={true} dataField='code'>Assessment Code</TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField='name'>Assessment Name</TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField='description'>Description</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.buttonFormatterBegin}></TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.buttonFormatterView}></TableHeaderColumn>
            </BootstrapTable>

            {/* <div className="col-md-12 text-left assessments-button btn-padd">
              <div className="text-center">
                <Link to={'/hft/Assessments/request'} className="btn btn-default pad-top">Request Assessment from Someone Else</Link>
                <Link to={'/hft/Assessments/self-type'} className="btn btn-default pad-top"> New Assessment for Myself </Link>
                <Link to={'/hft/Assessments/AssReport'} className="btn btn-default pad-top">Assessment Reports</Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
};
export default AssignmentSelection;