import React, { Component } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import HorizontalTimeline from 'react-horizontal-timeline';
import { Link } from 'react-router-dom';
import './TimelineCanvas.css';
import ReactTooltip from 'react-tooltip';
import { Tabs, TabList, Tab, PanelList, Panel } from 'react-tabtab';

import AuthService from '../../../../services/AuthService';
import DCanvasService from '../../../../services/DCanvasService';
import EventService from '../../../../services/EventService';
import SPlaceService from '../../../../services/SPlaceService';

const Auth = new AuthService();
const event = new EventService();
const DCanvasSer = new DCanvasService();
const SP = new SPlaceService();
class TimelineCanvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curIdx: 0,
            prevIdx: -1,
            loading: true,
            events: [],
            eventButton: 'Create',
            before: false,
            eventIdForDel: '',
            showModal: false,
            showModalDialog: false,
            monthsList: '',
            grid: true,
            line: false
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.openDialog = this.openDialog.bind(this);

        this.addEventVo = this.addEventVo.bind(this);
        this.getAllEvent = this.getAllEvent.bind(this);
        this.getDateFormat = this.getDateFormat.bind(this);
        this.confirmBtn = this.confirmBtn.bind(this);
        this.closeDialog = this.closeDialog.bind(this);

    }

    componentDidMount() {
        if (!Auth.loggedIn()) {
            this.props.history.replace('/login');
        } else {
            this.getAllEvent();
            this.getMonths();
            this.addTimelineStatus();
            this._getImageToDb();
        }

    }

    showLarge = () => {
        this.setState({
            grid: false,

        });
    }

    showJustify = () => {
        this.setState({
            grid: true,

        });
    }
    getMonths = () => {
        const localMonths = [];
        for (let i = 0; i <= 12; i++) {
            localMonths.push(i);
        }
        this.setState({
            monthsList: localMonths
        })
    }
    getAllEvent = () => {
        event.getEventsById(event.getProfile().id)
            .then(res => {
                this.setState({ events: res.data.body.reverse(), loading: false });
                if (res.data.body.length == 0) {
                    this.addDummyData();
                }

            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxxx xxxxxxxxxxxxxx error from comp ', err);
            });
    }

    openAddEvent() {

        this.setState({

            id: '',
            name: '',
            age: '',
            description: '',
            eventTitleHd: 'Add Event',
            eventButton: 'Create',
            year: 'y',
            months: 'm',
            womb: 'w'

        });
        this.open();

    }

    openEditEvent(event) {
        this.setState({
            id: event.id,
            name: event.name,
            year: event.age_year == 0 ? '' : event.age_year,
            months: event.age_months == 0 ? '' : event.age_months,
            before: event.before_birth,
            description: event.description,
            eventTitleHd: 'Update Event',
            eventButton: 'Update',
        });
        this.open();
    }

    _downloadPdf(eventId) {
        DCanvasSer.getDrawingPdf(eventId);
    }
    addTimelineStatus = () => {
        const eventVo = {
            'usrid': event.getProfile().id,

        }
        event.addEventStatus(eventVo)
            .then(data => {
                console.log('xxxxxxxxxxxx stastus', data);

            }).catch(err => {
                console.log('xxxxx xxxxx ', err);
            });
    }
    addDummyData = () => {
        const eventVo = {
            'id': '',
            'usrid': event.getProfile().id,
            'name': 'In Womb',
            'year': 0,
            'months': 0,
            'before': true,
            'description': ''
        }

        event.addEvent(eventVo)
            .then(data => {
                this.resetCheckBox();
                this.getAllEvent();
                this.close();
            }).catch(err => {
                console.log('xxxxx xxxxx ', err);
            });
    }

    addEventVo() {
        const eventVo = {
            'id': this.refs.id.value,
            'usrid': event.getProfile().id,
            'name': this.refs.name.value,
            'year': this.state.before ? 0 : this.refs.year.value,
            'months': this.state.before ? 0 : this.refs.months.value,
            'before': this.state.before,
            'description': this.refs.description.value
        }

        console.log('xxxxxxx xxxxxxx xxxxxxxx event is ', eventVo);

        event.addEvent(eventVo)
            .then(data => {
                this.resetCheckBox();
                this.getAllEvent();
                this.close();
            }).catch(err => {
                console.log('xxxxx xxxxx ', err);
            });
    }

    _deleteEventById(id) {
        event.deleteEventById(id)
            .then(res => {
                this.getAllEvent();
                this.closeDialog();
            }).catch(err => {
                console.log('xxxxxxxxxx xxxxxxxxx err from com ' + err)
            });
    }

    getImgSrc = (img) => {
        let imgSrc = img.replace('{"', "").replace('"}', "");
        return imgSrc;
    }
    confirmBtn() {
        this._deleteEventById(this.state.eventIdForDel);
    }
    closeDialog() {
        this.setState({ showModalDialog: false, eventIdForDel: '' });
    }

    open() {
        this.setState({ showModal: true });
    }

    close() {
        this.setState({ before: false, showModal: false });
    }
    resetCheckBox = () => {
        this.setState({
            brfore: false
        });
    }
    handleInputChange = (e) => {
        this.setState({
            before: e.target.checked
        }, function () {
            if (this.state.before) {
                this.refs.year.value = '';
                this.refs.months.value = '';
            }
        });
    }
    openDialogEvent(id) {
        this.setState({ eventIdForDel: id })
        this.openDialog();
    }
    openDialog() {
        this.setState({ showModalDialog: true });
    }

    launchCnavs(event) {
        localStorage.setItem('event', JSON.stringify({
            eventId: event.id,
            eventTitle: event.name
        }));
    }

    getDateFormat(date) {
        const eventDate = new Date(date)
        const month = eventDate.getMonth() + 1;
        const day = eventDate.getDate();
        const year = eventDate.getFullYear();
        return month + "/" + day + "/" + year;

    }

    _getImageToDb = () => {

        const eventId = event.getProfile().id;
        console.log('xxxxxxxxxx ----- id', eventId);
        SP.getDrawing(eventId)
            .then(data => {
                this.setState({
                    drawingImg: data.data.body[0].safe_place_image__c,
                    
                });
               
            }).catch(err => {
                console.log('xxxxxxxxxxxxxx err is ', err);
            });
    }

    getFormatedDate(date) {
        const eventDate = new Date(date)
        const month = ("0" + (eventDate.getMonth() + 1)).slice(-2)
        const day = ("0" + (eventDate.getDate())).slice(-2)

        const year = eventDate.getFullYear();

        return month + "/" + day + "/" + year;

    }
render() {
        if (this.state.loading) {
            return '...loading';
        }
        const { curIdx, prevIdx, events } = this.state;
        const curStatus = events[curIdx];

        const tabTemplate = [];
        const panelTemplate = [];
        this.state.events.forEach((tab, i) => {
            tabTemplate.push(<Tab key={i}>
            <label className="time-title">{tab.name}</label>
            <label className="time-title">Age: {tab.age_year}</label></Tab>)
            panelTemplate.push(<Panel key={i}>
                {
                    this.state.events.length > 0 ? (
                        <div>

                            <div className="">
                                <h1 className="text-left font-35"><span > {tab.name}</span>, <span></span>
                                    <span>Age: {tab.age_year}</span></h1>
                            </div>
                            <div className="row margin-35">
                                <div className="btn-group mr-2">
                                    <button type="button" className="btn btn-primary" onClick={this.openAddEvent.bind(this)}>
                                        <span className="glyphicon glyphicon-plus"></span> Add Event To Timeline
                                            </button>
                                </div>

                                <div className="btn-group mr-2">

                                    <button type="button" className="btn btn-warning">
                                        <Link to={'/drawing-canvas'} target='_blank' onClick={this.launchCnavs.bind(this, tab)} ><span className="icon-span"> <i className="far fa-pencil-paintbrush"></i> Open Graphic Narrative</span>

                                        </Link>
                                    </button>

                                </div>
                                <div className="btn-group mr-2">
                                    <button type="button" className="btn btn-success" onClick={this.openEditEvent.bind(this, tab)}>
                                        <i className="fa fa-pencil-square-o"></i> Edit Event
                                            </button>
                                </div>
                                <div className="btn-group mr-2">
                                    <button type="button" className="btn btn-danger" onClick={this.openDialogEvent.bind(this, tab.id)}>
                                        <i className="fal fa-trash-alt"></i> Delete Event
                                            </button>
                                </div>

                                <div className="btn-group mr-2">
                                    <button type="button" className="btn btn-primary"><i className="fal fa-redo"></i> Replay</button>
                                </div>
                                <div className="btn-group mr-2">
                                    <button type="button" onClick={this._downloadPdf.bind(this, tab.id)} className="btn btn-secondary"><i className="far fa-cloud-download"></i> Download PDF</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className="btn-group mr-2">
                                <button type="button" className="btn btn-primary" onClick={this.openAddEvent.bind(this)}>
                                    <span className="glyphicon glyphicon-plus"></span> Add Event To Timeline
                                            </button>
                            </div>
                        )
                }
            </Panel>)
        })
        return (
            <div>
                <div>
                    <div className="col-md-3 trauma-timeline-sidebar-wrapper">
                        <div className="safe-place-div">
                            <div className="card">
                                <div className="card-header clearfix">
                                    <p className="pull-left"><span className="card-title">My Safe Place</span></p>
                                    <p className="pull-right">
                                        <span> <i className="fa fa-download" aria-hidden="true"></i></span>
                                        <span> <Link to={"/sp-canvas"}>Change</Link></span>
                                    </p>
                                </div>
                                <div className="card-body">
                                    <img src={this.state.drawingImg} />
                                </div>
                            </div>
                        </div>
                        <div className="contents">

                            <div className="nav-side-menu margin-35">
                                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                                <div className="menu-list">
                                    <p>Utilize the list below to help you recall events that may have happened in your life. Add the event to your trauma timeline as you recall it.</p>

                                    <ul id="menu-content" className="menu-content collapse out">

                                        <li data-toggle="collapse" data-target="#products" className="collapsed">
                                            <Link to={"/timeline-canvas"}><i className="fa fa-globe fa-lg"></i> Natural Disasters <span className="arrow"></span></Link>
                                        </li>
                                        <ul className="sub-menu collapse" id="products">
                                            <li><Link to={"/timeline-canvas"}>Fire</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Flood</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Earthquake</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Tornado</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Hurricane</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Tsunami</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Other</Link></li>
                                        </ul>

                                        <li data-toggle="collapse" data-target="#service" className="collapsed">
                                            <Link to={"/timeline-canvas"}><i className="fa fa-globe fa-lg"></i> Physical <span className="arrow"></span></Link>
                                        </li>
                                        <ul className="sub-menu collapse" id="service">
                                            <li><Link to={"/timeline-canvas"}>Accident</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Motor vehicle accident</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Domestic violence</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Assault</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Mugging</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Near drowning</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Captivity</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Torture</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Threats</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Sibling abuse</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Bullying</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Other</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Threats</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Threats</Link></li>
                                        </ul>

                                        <li data-toggle="collapse" data-target="#new" className="collapsed">
                                            <Link to={"/timeline-canvas"}><i className="fa fa-globe fa-lg"></i> Emotional <span className="arrow"></span></Link>
                                        </li>
                                        <ul className="sub-menu collapse" id="new">
                                            <li><Link to={"/timeline-canvas"}>Death of a loved one</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Witnessing serious injury or death</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Tagic news</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Humiliation</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Captivity</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Threats</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Religious</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Other</Link></li>
                                        </ul>

                                        <li data-toggle="collapse" data-target="#medical" className="collapsed">
                                            <Link to={"/timeline-canvas"}><i className="fa fa-globe fa-lg"></i> Medical <span className="arrow"></span></Link>
                                        </li>
                                        <ul className="sub-menu collapse" id="medical">
                                            <li><Link to={"/timeline-canvas"}>In womb or birth complications</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Infant surgery</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Invasive medical procedures</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Surgery</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Life-threatening illness</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Other</Link></li>

                                        </ul>

                                        <li data-toggle="collapse" data-target="#caregiver" className="collapsed">
                                            <Link to={"/timeline-canvas"}><i className="fa fa-globe fa-lg"></i> Caregiver <span className="arrow"></span></Link>
                                        </li>
                                        <ul className="sub-menu collapse" id="caregiver">
                                            <li><Link to={"/timeline-canvas"}>Adoption</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Foster care</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Day care</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Neglect</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Alcohol</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Drugs</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Prison</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Death</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Other</Link></li>
                                        </ul>

                                        <li data-toggle="collapse" data-target="#sexual" className="collapsed">
                                            <Link to={"/timeline-canvas"}><i className="fa fa-globe fa-lg"></i> Sexual <span className="arrow"></span></Link>
                                        </li>
                                        <ul className="sub-menu collapse" id="sexual">
                                            <li><Link to={"/timeline-canvas"}>Harassment</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Rape</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Abuse</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Incest</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Prostitution or other sex work</Link></li>
                                            <li><Link to={"/timeline-canvas"}>Other</Link></li>
                                        </ul>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {curStatus ? <div className="timeline-white col-md-9">
                        <div className="col-md-12 m-b-30 top-course-content" >
                            <span className="pointer" onClick={this.showLarge}><i className="fa fa-th-large" aria-hidden="true"></i></span>
                            <span className="pointer" onClick={this.showJustify}><i className="fa fa-align-justify" aria-hidden="true"></i></span>
                        </div>
                        <div className="col-md-12">

                            <div className="content_place">
                                {this.state.grid ? (
                                    <div>
                                        <div className="margin-bt">
                                            <button type="button" className="btn btn-primary" onClick={this.openAddEvent.bind(this)}>
                                                <span className="glyphicon glyphicon-plus"></span> Add Event To Timeline
                                            </button>
                                        </div>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Age</th>
                                                    <th>Create Date</th>
                                                    <th className="tbl-descr">Discription</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.events.map((user, index) =>
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.name} </td>
                                                        <td>{user.age_year}</td>
                                                        <td>{this.getFormatedDate(user.created)}</td>
                                                        <td>{user.description}</td>
                                                        <td>

                                                            <button type="button" className="btn btn-warning">
                                                                <div data-tip='Drawing Canvas' data-for='drawing-canvas' >
                                                                    <Link to={'/drawing-canvas'} target='_blank' onClick={this.launchCnavs.bind(this, user)} ><span className="icon-span"> <i className="far fa-pencil-paintbrush"></i></span>

                                                                    </Link>
                                                                </div>
                                                                <ReactTooltip id='drawing-canvas' getContent={() => { return }} />
                                                            </button>
                                                            <button type="button" className="btn btn-success" onClick={this.openEditEvent.bind(this, user)}>
                                                                <div data-tip='Edit' data-for='edit' >
                                                                    <i className="fa fa-pencil-square-o"></i>
                                                                </div>
                                                                <ReactTooltip id='edit' getContent={() => { return }} />
                                                            </button>
                                                            <button type="button" className="btn btn-danger" onClick={this.openDialogEvent.bind(this, user.id)}>
                                                                <div data-tip='Delete' data-for='delete' >
                                                                    <i className="fal fa-trash-alt"></i>
                                                                </div>
                                                                <ReactTooltip id='delete' getContent={() => { return }} />
                                                            </button>
                                                            <button type="button" className="btn btn-primary">
                                                                <div data-tip='Replay' data-for='replay' >
                                                                    <i className="fal fa-redo"></i>
                                                                </div>
                                                                <ReactTooltip id='replay' getContent={() => { return }} />
                                                            </button>
                                                            <button type="button" onClick={this._downloadPdf.bind(this, user.id)} className="btn btn-dark">
                                                                <div data-tip='Download PDF' data-for='pdf' >
                                                                    <i className="far fa-cloud-download"></i>
                                                                </div>
                                                                <ReactTooltip id='pdf' getContent={() => { return }} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )}

                                            </tbody>
                                        </Table>
                                    </div>
                                ) : (
                                        <div>
                                            <Tabs showArrowButton={true}
                                            showModalButton={false}
                                            >
                                                <TabList>
                                                    {tabTemplate}
                                                </TabList>
                                                <PanelList>
                                                    {panelTemplate}
                                                </PanelList>
                                            </Tabs>

                                        </div>
                                    )}

                                <div className="row margin-35">
                                  
                                </div>
                                <Modal show={this.state.showModal} onHide={this.close}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{this.state.eventTitleHd}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="rowcol-md-10 " align="center">
                                            <div className="form-group">
                                                <input type="hidden" className="form-control" defaultValue={this.state.id} name="id" ref="id" />

                                                <input type="text" required="required" className="form-control validate" placeholder="Name of the event" defaultValue={this.state.name} name="name" ref="name" />
                                            </div>

                                            <div>

                                                <div className="col-md-4"><label className="pull-left">Age:</label></div>
                                                <div className="col-md-4"><label className="pull-left">Months</label></div>
                                                <div className="col-md-4"><label className="pull-left visibility">Years</label></div>
                                                <div className="form-group col-sm-4 myfield">
                                                    <input type="number" required="required" className="form-control validate" placeholder="Years" defaultValue={this.state.year} name="year" ref="year" />
                                                </div>

                                                <div className="form-group col-sm-4">
                                                    <select id="type" name="type" className="form-control validate" defaultValue={this.state.months} ref="months">
                                                        {this.state.monthsList.map((value) =>
                                                            <option key={value} value={value}>{value}</option>
                                                        )}
                                                    </select>
                                                </div>

                                                {/* <div className="form-group col-sm-4">
                                                    <input type="number" required="required" className="form-control validate" placeholder="Months" defaultValue={this.state.months} name="months" ref="months" />
                                                </div> */}

                                                <div className="form-group col-sm-4 mycheck">
                                                    <label> Before Birth &nbsp; &nbsp; <input name="before" type="checkbox" checked={this.state.before} onChange={this.handleInputChange.bind(this)} /></label>
                                                </div>
                                            </div>
                                            <div className="">
                                                <textarea className="form-control" name="description" placeholder="Description" ref="description" id="description" defaultValue={this.state.description}></textarea>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>

                                        <button type="button" className="btn btn-danger" onClick={this.close}>Close</button>
                                        <button type="button" className="btn btn-success" onClick={this.addEventVo}>{this.state.eventButton}</button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal className="static-modal-confirm" show={this.state.showModalDialog} onHide={this.closeDialog}>

                                    <Modal.Body>

                                        <Modal.Title>Are you sure ?</Modal.Title>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button onClick={this.closeDialog} bsStyle="warning">Cancel</Button>
                                        <Button onClick={this.confirmBtn} bsStyle="primary">Proceed</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div> : ""}

                </div>
            </div>
        );
    }
}

export default TimelineCanvas;
