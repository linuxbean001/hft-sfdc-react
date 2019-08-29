import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import PmService from '../../../../services/PmService';
import EdService from '../../../../services/EdService';
import AuthService from '../../../../services/AuthService';
import './EdCanvas.css'
const PmApi = new PmService();
const EdApi = new EdService();
const Auth = new AuthService();

export default class EdCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      deleteShowModel: false,
      loading: true,
      dialogVo: {},
      chatDialoge: [],
      rowToEdit: -1,
      addEditStatus: true,
      dialogIdForDelete: '',
    }
  }

  componentDidMount() {

    if (!Auth.loggedIn()) {
      this.props.history.replace('/login');
    } else {
      this.getFonts();
      this.getDialogeTitle();
    }
  }

  closDialogueModal = () => {
    this.setState({
      showModal: false
    });
  }

  addDialogueModal = () => {
    this.state.dialogVo["id"] = '';
    this.state.dialogVo['title'] = '';
    this.state.dialogVo['usrid'] = '';
    this.state.dialogVo['recordtypeid'] = '';
    this.setState({
      addEditStatus: true,
    });
    this.openaDialogueModal();
  }
  openaDialogueModal = () => {
    this.setState({
      showModal: true,
    });
  }

  getDialogeTitle = () => {
    EdApi.getDialogueTitle()
      .then(res => {
        this.setState({ chatDialoge: res.data.body });
        console.log('xxxxxxxx', res);
      }).catch(err => {
        console.log('xxxxxxx xxxxxxxxxxxx xxxxxxxxxxxxxx error from comp ', err);
      });
  }
  addDialogue = () => {
    this.state.dialogVo["usrid"] = EdApi.getProfile().id;
    EdApi.AddDialogue(this.state.dialogVo)
      .then(res => {
        console.log('xxxxxxxxxx xxxxxxxxx ', res);
        this.closDialogueModal();
        this.getDialogeTitle();
      }).catch(err => {
        console.log('xxxxxxxxxx xxxxxxxxx err from com ' + err)
      });
  }
  openDeleteDialogue = (id) => {

    this.setState({
      deleteShowModel: true,
      dialogIdForDelete: id
    });
  }

  closeDeleteDialogue = () => {
    this.setState({
      deleteShowModel: false,
      dialogIdForDelete: ''
    });
  }

  confirmDeleteDialog = () => {
    EdApi.deleteDialogue(this.state.dialogIdForDelete)
      .then(res => {
        console.log('xxxxxxxxxx xxxxxxxxx ', res)
        this.closeDeleteDialogue();
        this.getDialogeTitle();
      }).catch(err => {
        console.log('xxxxxxxxxx xxxxxxxxx err from com ' + err)
      });
  }
  editDialogueClick = () => {
    EdApi.editDialogue(this.state.dialogVo)
      .then(res => {
        console.log('xxxxxxxxxx xxxxxxxxx ', res)
        this.closDialogueModal();
        this.getDialogeTitle();
      }).catch(err => {
        console.log('xxxxxxxxxx xxxxxxxxx err from com ' + err)
      });
  }

  editDialogueModal = (event) => {
    this.state.dialogVo["id"] = event.id;
    this.state.dialogVo['title'] = event.name;
    this.state.dialogVo['recordtypeid'] = event.recordtypeid;
    this.state.dialogVo["usrid"] = EdApi.getProfile().id;
    this.setState({
      addEditStatus: false
    })
    this.openaDialogueModal();
  }
  handleChange = (e) => {
    this.state.dialogVo[e.target.id] = e.target.value;
    console.log(this.state.dialogVo);
    if (e.target.id == 'color') {
      this.setState({
        fontColor: e.target.value
      })
    }

    if (e.target.id == 'font') {
      this.setState({
        fontFamily: e.target.value
      })
    }
  }

  handleFontTypeChange = (e) => {
    const result = this.state.fontsClone.filter(font => font.category == e.target.value);
    this.setState({
      fonts: result
    });
  }

  getTitle = (e) => {
    console.log('xxxx xxxxxxx ', e);
  }

  editDialogue = (index, row) => {
    this.setState({
      dialogVo: row,
      rowToEdit: index,
    }, function () {
      this.openaDialogueModal();
    })
  }

  getFonts = () => {
    PmApi.getFonts()
      .then(res => {
        this.setState({
          fonts: res.data.items
        }, function () {
          console.log(this.state.fonts);
          this.setState({
            fontsClone: this.state.fonts,
            loading: false
          })
        });
      }).catch(err => {

      });
  }


  render() {
    if (this.state.loading) {
      return 'loading....';
    }
    return (
      <div>
        <div className="col-md-12 p-sidebar padd-right-0 ed-canvas-style">
          <div className="col-md-3 sidebar text-center pad-top-15 padd-left-0 padd-right-0">

            <div className="col-xs-2 padd-right-0 back-gr">

              <ul className="nav nav-tabs tabs-left">
                <li className="active"><a href="#dialogue" data-toggle="tab"><i className="fa fa-comment"></i></a></li>
                <li><a href="#profile" data-toggle="tab"><i className="fa fa-video-camera"></i></a></li>
                <li><a href="#font" data-toggle="tab"><i className="fa fa-user"></i></a></li>
                <li><a href="#settings" data-toggle="tab"><i className="fa fa-info-circle" aria-hidden="true"></i></a></li>
              </ul>
            </div>
            <div className="col-xs-10 tab-cont">
              <div className="tab-content">
                <div className="tab-pane active" id="dialogue">
                  <div className="spacer"></div>
                  <div className="form-group">
                    <button className="button btn btn-warning btn-full">Dialogue</button>
                  </div>
                  {this.state.chatDialoge ?
                    this.state.chatDialoge.map((value) =>
                      <div key={value.id} className="dialogues form-group">
                        <div id="dialogue-id-1" className="dialogue-list">
                          <h4>{value.name}</h4>
                          <div className="dialogue-list-config">
                            <button className="button btn btn-sm btn-primary btn-space"><i className="fal fa-pencil" aria-hidden="true" onClick={this.editDialogueModal.bind(this, value)}></i>
                            </button>
                            <button className="button btn btn-sm btn-primary btn-space" onClick={this.openDeleteDialogue.bind(this, value.id)}><i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                    : ""}

                  <div className="form-group">
                    <button onClick={this.addDialogueModal} className="button btn btn-warning btn-full">New Dialogue</button>
                  </div>
                  <div className='canvas-container-custom canvas-container col-md-9 float-right p-0 '>
                    <div className='canvas-dialogue-container' data="dialogue-id-1">
                      <div className="conversation-message ng-scope right" >
                        <div className="message-text ng-scope" >
                          <span className="ng-binding">hello</span>
                        </div>
                      </div>
                      <div className="conversation-message ng-scope left" >
                        <div className="message-text ng-scope" >
                          <span className="ng-binding">hello</span>
                        </div>
                      </div>
                      <div className="conversation-message ng-scope right" >
                        <div className="message-text ng-scope" >
                          <span className="ng-binding">hello</span>
                        </div>
                      </div>
                      <div className="conversation-message ng-scope left" >
                        <div className="message-text ng-scope" >
                          <span className="ng-binding">hello</span>
                        </div>
                      </div>
                      <div className="conversation-message ng-scope right" >
                        <div className="message-text ng-scope" >
                          <span className="ng-binding">hello</span>
                        </div>
                      </div>
                      <div className="conversation-message ng-scope left" >
                        <div className="message-text ng-scope" >
                          <span className="ng-binding">hello</span>
                        </div>
                      </div>
                      <div className="conversation-message ng-scope right" >
                        <div className="message-text ng-scope" >
                          <span className="ng-binding">hello</span>
                        </div>
                      </div>
                      <div className="conversation-message ng-scope left" >
                        <div className="message-text ng-scope" >
                          <span className="ng-binding">hello</span>
                        </div>
                      </div>
                    </div>
                    <div className='canvas-dialogue-container-input'>
                      <div className='canvas-dialogue-container-input-l col-md-6 float-left'>
                        <h2>Self</h2>
                        <textarea rows="4" cols="50"></textarea>
                      </div>
                      <div className='canvas-dialogue-container-input-l col-md-6 float-left'>
                        <h2>Good</h2>
                        <textarea rows="4" cols="50"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="profile">
                  <div className="spacer"></div>

                  <div className="form-group">
                    <button className="button btn btn-warning btn-full">Videos</button>
                  </div>

                  <div className="dialogues form-group">
                    <div id="Videos-id-1" className="dialogue-list">
                      <h4>Test</h4>
                      <div className="dialogue-list-config">
                        <button className="button btn btn-sm btn-primary btn-space"><i className="fal fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button className="button btn btn-sm btn-primary btn-space"><i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                    <div id="Videos-id-2" className="dialogue-list">
                      <h4>Test</h4>
                      <div className="dialogue-list-config">
                        <button className="button btn btn-sm btn-primary btn-space"><i className="fal fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button className="button btn btn-sm btn-primary btn-space"><i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <button onClick={this.openaDialogueModal} className="button btn btn-warning btn-full">NEW DIALOGUE</button>
                  </div>
                  <div className='canvas-container-custom-profile canvas-container-custom canvas-container col-md-9 float-right p-0 '>
                    <div className='canvas-dialogue-videos canvas-dialogue-container-input'>
                      <div className='canvas-dialogue-container-input-l col-md-6 float-left'>
                        <h2>Recording as "Self"</h2>
                        <img src={require('./images/ed-info-1.png')} className="ed-img-responsive" />
                      </div>
                      <div className='canvas-dialogue-container-input-l col-md-6 float-left'>
                        <h2>Recording as "part"</h2>
                        <img src={require('./images/ed-info-1.png')} className="ed-img-responsive" />
                      </div>
                      <div className='canvas-dialogue-container-input-l col-md-12 float-left'>
                        <h3>When using the Video Externalized Dialogue,<br></br>
                          adjust your position for the camera.<br></br>
                          Like the example, you shlould be close up when recording as "self"<br></br>
                          and farther away when recording as "part"</h3>
                        <button className="btn btn-primary">Begin Video Externalized Dialogue</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane pick-font" id="font">

                  <span>font</span>


                </div>

                <div className="tab-pane" id="settings">
                  <div className="spacer"></div>
                  <div className="form-group">
                    <button className="button btn btn-warning btn-full">Info</button>
                  </div>
                  <div className="form-group">
                    <h3>Add your parts to the map. The center circle is the “SELF". Adjust the map as your parts change or become more aligned with your “Self”.</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>

        </div>

        <Modal className="static-modal-confirm" show={this.state.deleteShowModel} onHide={this.closeDialog}>

          <Modal.Body>

            <Modal.Title>Are you sure ?</Modal.Title>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeDeleteDialogue} bsStyle="warning">Cancel</Button>
            <Button onClick={this.confirmDeleteDialog} bsStyle="primary">Proceed</Button>
          </Modal.Footer>
        </Modal>


        <div className="modal-dialogue">
          <Modal className="static-modal-confirm" show={this.state.showModal} onHide={this.closDialogueModal}>

            <Modal.Body>
              <div className="form-group">
                <input type="text" id="title" placeholder={'Give a name to the feeling, part or voice'} onChange={this.handleChange.bind(this)} defaultValue={this.state.dialogVo.title} />
              </div>
              <div className="form-group">
                <h3 style={{ "color": this.state.fontColor, "fontFamily": this.state.fontFamily }}>Select a font and color</h3>
              </div>
              <div className="form-group">
                <select className="form-control" defaultValue="none" onChange={this.handleFontTypeChange.bind(this)}>
                  <option value="none" disabled>Select Font Type</option>
                  <option value="serif">Serif</option>
                  <option value="sans-serif">Sans Serif</option>
                  <option value="display">Display</option>
                  <option value="handwriting">Handwriting</option>
                  <option value="monospace">Monospace</option>
                </select>
              </div>

              <div className="form-group">
                <div className="col-md-9 padding-0">
                  <select className="form-control" defaultValue={this.state.dialogVo.font} id="font" onChange={this.handleChange.bind(this)}>
                    <option value="none" disabled>Select Font</option>
                    {
                      this.state.fonts && this.state.fonts.map((font, index) =>
                        <option key={index} value={font.family} style={{ "fontFamily": font.family, "cursor": "pointer" }} >{font.family}</option>
                      )
                    }
                  </select>
                </div>
                <div className="col-md-3 colorPick">
                  <input type="color" id="color" value={this.state.dialogVo.color} placeholder={'Give a name to the feeling, part or voice'} onChange={this.handleChange.bind(this)} />
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.closDialogueModal} bsStyle="warning">Cancel</Button>
              {this.state.addEditStatus ? <Button onClick={this.addDialogue.bind(this)} bsStyle="primary">Add</Button> : <Button onClick={this.editDialogueClick.bind(this)} bsStyle="primary">Edit</Button>}

            </Modal.Footer>
          </Modal>
        </div>

      </div>
    )
  }
} 
