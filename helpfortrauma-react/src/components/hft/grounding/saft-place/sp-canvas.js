import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';
import CalculateSize from 'calculate-size';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { Button, Modal } from 'react-bootstrap';
import { CirclePicker, SketchPicker } from 'react-color';
import Fullscreen from "react-full-screen";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import ReactTooltip from 'react-tooltip';
import AuthService from '../../../../services/AuthService';
import EventService from '../../../../services/EventService';
import ReviewPageService from '../../../../services/ReviewPageService';
import SPlaceService from '../../../../services/SPlaceService';
import './sp-canvas.css';

const Auth = new AuthService();
const event = new EventService();
const Review = new ReviewPageService();
const SP = new SPlaceService();
class SPcanvas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: '100%',
      bgEditor: '#fff',
      tool: Tools.Pencil,
      lineColor: 'black',
      height: '100vh',
      lineWidth: 3,
      undoSteps: '',
      canUndo: false,
      canRedo: false,
      image: '',
      showColorPicker: false,
      showCirclePicker: false,
      showRectanglePicker: false,
      showUploadPicker: false,
      showSizePicker: false,
      showPencilPicker: false,
      hideCirclePicker: false,
      showTextPicker: false,
      isFull: false,
      hideSaveBtn: false,
      showEraserPicker: false,

      hideRectanglePicker: false,
      background: '#000',
      fillColor: 'transparent',
      value: 3,
      menuSelected: 0,
      editTitleBox: false,
      drawings: [],
      visible: false,
      newArray: [],
      arr: [],

      showMoreColorPicker: false,
      showSaveCanvas: false,
      drawingImg: [],
      editedDrawing: 0,
      showCrossBtn: false,
      eventTitle: '',
      hideRecorder: true,
      box_title: '',
      fields: {},
      newTitleName: '',
      showModalDialog: false,
      DrawingIndex: '',
      showTimeModalDialog: false,
      showSelectPicker:false,
      imagePreviewUrl2: ''
      
    };

    this.isBlur = this.isBlur.bind(this);
    this.enableDrawingMode = this.enableDrawingMode.bind(this);
    this.enableSelectMode = this.enableSelectMode.bind(this);
    this.enableLineMode = this.enableLineMode.bind(this);
    this._redo = this._redo.bind(this);
    this._undo = this._undo.bind(this);
    this.showColorPicker = this.showColorPicker.bind(this);
    this.showCirclePicker = this.showCirclePicker.bind(this);
    this.showRectanglePicker = this.showRectanglePicker.bind(this);
    this.showUploadPicker = this.showUploadPicker.bind(this);

    this.showSizePicker = this.showSizePicker.bind(this);
    this.showPencilPicker = this.showPencilPicker.bind(this);
    this.showTextPicker = this.showTextPicker.bind(this);
    this.hideCirclePicker = this.hideCirclePicker.bind(this);
    this.hideRectanglePicker = this.hideRectanglePicker.bind(this);
    this.hideColorPicker = this.hideColorPicker.bind(this);
    this.hideUploadPicker = this.hideUploadPicker.bind(this);
    this.hideAllPicker = this.hideAllPicker.bind(this);
    this.hideSizePicker = this.hideSizePicker.bind(this);
    this.handleChangeCompleteColor = this.handleChangeCompleteColor.bind(this);
    this.getImage = this.getImage.bind(this);
    this.addText = this.addText.bind(this);
    this.showMoreColorPicker = this.showMoreColorPicker.bind(this);
    this.showSaveCanvas = this.showSaveCanvas.bind(this);
    this.showCrossBtn = this.showCrossBtn.bind(this);
    this.hideDrawingSlide = this.hideDrawingSlide.bind(this);

    this.handleDownloadClick = this.handleDownloadClick.bind(this);
    this.showEraserPicker = this.showEraserPicker.bind(this);
    this.confirmBtn = this.confirmBtn.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleTimeComplete = this.handleTimeComplete.bind(this);

  }

  componentDidMount() {
    if (!Auth.loggedIn()) {
      this.props.history.replace('/login');
    } else {
      this.setState({ showColorPicker: false });
      this.hideAllPicker();
      this._init();
      this._getImageToDb();
    }

  }
  _init = () => {
    const eventVo = {
      'usrid': event.getProfile().id
    }

    Review.addSpStatus(eventVo)
      .then(data => {
        console.log('xxxxxxxxxxxx stastus', data);
      }).catch(err => {
        console.log('xxxxx xxxxx ', err);
      });

  }
  handleTimeComplete() {
    this.setState({ showTimeModalDialog: true });
  }
  _getImageSize = (text, fontSize) => {
    const size = CalculateSize(text, {
      font: 'sans-serif',
      fontSize: fontSize + 'px'
    });

    return size;
  }

  getImage() {
    let size = this._getImageSize(this.refs.textData.value, this.refs.textSize.value);
    const addTextVo = {
      'text': this.refs.textData.value,
      'size': parseInt(this.refs.textSize.value, 10),
      'width': size.width,
      'height': size.height
    }
    size = {};
  }

  addText() {
    this._sketch.addText(this.refs.textData.value);
  }

  isBlur() {
    this.hideAllPicker();
  }

  handleDownloadClick(event) {
    const eventId = JSON.parse(localStorage.getItem('event')).eventId;
  }

  _saveToDb = (json) => {
    const eventId = event.getProfile().id;
    const drawingVo = {
      eventId: eventId,
      data: this.state.drawings,
      jsun: json
    }

    SP.addSafePlace(drawingVo)
      .then(data => {
        this.setState({
          editedDrawing: 0
        });

        this._getImageToDb();
      }).catch(err => {
        console.log('xxxxxxxxxxxxxx err is ', err);
      });
  }
  _getImageToDb = () => {
    const eventId = event.getProfile().id;
    SP.getDrawing(eventId)
      .then(data => {
        this._sketch.fromJSON(data.data.body[0].jsun);
      }).catch(err => {
        console.log('xxxxxxxxxxxxxx err is ', err);
      });
  }
  _save = () => {
    let drawings = [];
    drawings = this.state.drawings;
    const json = JSON.stringify(this._sketch.toJSON());
    drawings.push(this._sketch.toDataURL());
    this.setState({ drawings: this._sketch.toDataURL(), hideSaveBtn: false });
    this._saveToDb(json);
    this._clear();

  }

  _setColorPicker = () => {
    let colors = ['#4D4D4D', '#999999', '#E6E6E6', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#194d33', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'];
    return colors;
  }

  handleChangeSizeRect = value => {
    this.setState({
      reactLineWidth: value,
      lineWidth: this.state.reactLineWidth
    });
  };

  handleChangeSizeLine = value => {
    this.setState({
      lineLineWidth: value,
      lineWidth: this.state.lineLineWidth
    });
  }

  hideAllPicker() {
    this.setState({
      showColorPicker: false,
      showRectanglePicker: false,
      showUploadPicker: false,
      showCirclePicker: false,
      showSizePicker: false,
      showTextPicker: false,
      showPencilPicker: false,
      showEraserPicker: false
    });

  }

  hideCirclePicker() {

    this.setState({
      showColorPicker: false,
      showRectanglePicker: false,
      showUploadPicker: false,
      showCirclePicker: true,
      showSizePicker: false,
      showTextPicker: false,
      showPencilPicker: false,
      showEraserPicker: false,
      showSelectPicker:false
    });

  }
  hideRectanglePicker() {

    this.setState({
      showColorPicker: false,
      showRectanglePicker: true,
      showUploadPicker: false,
      showCirclePicker: false,
      showSizePicker: false,
      showTextPicker: false,
      showPencilPicker: false,
      showEraserPicker: false,
      showSelectPicker:false

    });

  }
  hideColorPicker() {
    this.setState({
      showColorPicker: true,
      showRectanglePicker: false,
      showUploadPicker: false,
      showCirclePicker: false,
      showSizePicker: false,
      showTextPicker: false,
      showPencilPicker: false,
      showEraserPicker: false,
      showSelectPicker:false
    });
  }
  hideUploadPicker() {
    this.setState({
      showColorPicker: false,
      showRectanglePicker: false,
      showUploadPicker: true,
      showCirclePicker: false,
      showSizePicker: false,
      showTextPicker: false,
      showPencilPicker: false,
      showEraserPicker: false,
      showSelectPicker:false
    });
  }

  hideEraserPicker() {
    this.setState({
      showColorPicker: false,
      showRectanglePicker: false,
      showUploadPicker: false,
      showCirclePicker: false,
      showSizePicker: false,
      showTextPicker: false,
      showPencilPicker: false,
      showEraserPicker: true,
       showSelectPicker:false
    });
  }

  getImgSrc = (img) => {
    let imgSrc = img.replace('{"', "").replace('"}', "");
    return imgSrc;
  }

  hideSizePicker() {
    this.setState({
      showColorPicker: false,
      showRectanglePicker: false,
      showUploadPicker: false,
      showCirclePicker: false,
      showSizePicker: true,
      showTextPicker: false,
      showPencilPicker: false,
      showEraserPicker: false,
      showSelectPicker:false
    });
  }
  hideTextPicker() {
    this.setState({
      showColorPicker: false,
      showRectanglePicker: false,
      showUploadPicker: false,
      showCirclePicker: false,
      showSizePicker: false,
      showTextPicker: true,
      showPencilPicker: false,
      showEraserPicker: false,
      showSelectPicker:false
    });
  }
  hidePencilPicker() {
    this.setState({
      showColorPicker: false,
      showRectanglePicker: false,
      showUploadPicker: false,
      showCirclePicker: false,
      showSizePicker: false,
      showTextPicker: false,
      showPencilPicker: true,
      showEraserPicker: false,
      showSelectPicker:false
    });
  }

  handleChangeCompleteColor = (color) => {

    this.setState({
      lineColor: color.hex,
      fillColor: color.hex,
      background: color.hex
    });

  };

  showColorPicker(event) {
    this.hideColorPicker();
    this.setState({ showColorPicker: !this.state.showColorPicker });
  }

  showCirclePicker(event) {
    this.hideCirclePicker();
    this.setState({ showCirclePicker: !this.state.showCirclePicker });
  }

  showRectanglePicker(event) {
    this.hideRectanglePicker();
    this.setState({
      showRectanglePicker: !this.state.showRectanglePicker,
      lineWidth: this.state.reactLineWidth
    });
  }

  showUploadPicker(event) {
    this.hideUploadPicker();
    this.setState({ showUploadPicker: !this.state.showUploadPicker });
  }

  showSizePicker(event) {
    this.hideSizePicker();
    this.setState({ showSizePicker: !this.state.showSizePicker });
  }

  showTextPicker(event) {
    this.hideTextPicker();
    this.setState({ showTextPicker: !this.state.showTextPicker });
  }

  showPencilPicker(event) {
    this.hidePencilPicker();
    this.setState({
      showPencilPicker: !this.state.showPencilPicker,
      lineWidth: this.state.lineLineWidth
    });
  }

  showMoreColorPicker(event) {
    this.setState({ showMoreColorPicker: !this.state.showMoreColorPicker });
  }

  showSaveCanvas(event) {
    this.setState({ showSaveCanvas: !this.state.showSaveCanvas });
  }

  hideDrawingSlide(event) {
    this.setState({
      showSaveCanvas: !this.state.showSaveCanvas,
      hideSaveBtn: !this.state.hideSaveBtn,
    });
  }

  showCrossBtn(event) {
    this.setState({ showCrossBtn: !this.state.showCrossBtn });
  }

  showEraserPicker(event) {
    this.hideEraserPicker();
    this.setState({ showEraserPicker: !this.state.showEraserPicker });

  }

  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  }

  enableLineMode() {
    this._setLineColor();
    this.setState({
      tool: Tools.Line
    });
  }

  enableEraser = () => {
    this.setState({
      lineColor: 'white',
      tool: Tools.Brush,
    })
  }

  _setLineColor = () => {
    if (this.state.lineColor == 'white') {
      this.setState({
        lineColor: 'black'
      })
    }
  }

  _enableCircleMode = () => {
    this._setLineColor();
    this.setState({
      tool: Tools.Circle,
      fillColor: 'transparent'
    });
  };

  _enableRecteMode = () => {
    this._setLineColor();
    this.setState({
      tool: Tools.Rectangle,
      fillColor: 'transparent'
    });
  };

  _enableFillRectMode = () => {
    this._setLineColor();
    this.setState({
      tool: Tools.Rectangle,
      fillColor: this.state.lineColor
    });
  }

  enableDrawingMode() {
    this._setLineColor();
    this.setState({
      tool: Tools.Brush,
      lineColor: 'black',
      lineLineWidth: 3
    });
  }

  enableSelectMode() {
    this.setState({
      tool: Tools.Select,
      showSelectPicker: !this.state.showSelectPicker
    });

  }

  addTransition = () => {
    this.setState({
      editedDrawing: 0
    });
    this._clear();
    this._save();
  }

  _undo() {
    if (this._sketch.canUndo()) {
      this._sketch.undo();
      this.setState({
        canUndo: this._sketch.canUndo(),
        canRedo: this._sketch.canRedo()
      });
    }
  }

  _redo() {
    if (this.state.canRedo) {
      this._sketch.redo();
      this.setState({
        canUndo: this._sketch.canUndo(),
        canRedo: this._sketch.canRedo()
      });
    }
  }

  getColor(color) {
    console.log('xxxxx xxxxxx xxxxxxxxxxxxx color is ', color);
  }

  isActive(e) {

    this.setState({ menuSelected: e.currentTarget.dataset.id });
  }

  _onSketchChange = () => {
    let prev = this.state.canUndo;
    let now = this._sketch.canUndo();
    if (prev !== now) {
      this.setState({ canUndo: now });
    }
  };

  _clear = () => {
    this._sketch.clear();
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
      drawings: []
    });
  }

    deleteSelected = () => {
    this._sketch.removeSelected(); 
}
removeSelected = () => {
  const activeObj = this._sketch.getSelected();

  const payload = {
    action: 'remove',
    is_final: true,
    id: activeObj.id,
    sender: this.state.myUsername
  };
}
_enableFillCircleMode = () => {
    this._setLineColor();
    this.setState({
      tool: Tools.Circle,
      fillColor: this.state.lineColor
    })
  }

  _addImg = (url) => {

    if (url) {
      this._sketch.addImg(url);
    }
  }

  _addImgFromUrl = () => {
    this._addImg(this.refs.imgFromurl.value);
    console.log('xxxxxx xxxxxxxxx xxx img is ', this.refs.imgFromurl.value);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
       
      this._addImg(this.state.imagePreviewUrl);
    }

    reader.readAsDataURL(file);
  }

  _handleImageChange2=(e)=> {
  
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl2: reader.result
      });
     
      console.log('img xxxxxx', this.state.imagePreviewUrl2);
      this._saveImgToDb();
     
     // this._addImg(this.state.imagePreviewUrl);
    }
    
    reader.readAsDataURL(file);
  }
   _saveImgToDb = () => {
    const eventId = JSON.parse(localStorage.getItem('event')).eventId;
    const drawingVo = {
      eventId: eventId,
      data: this.state.imagePreviewUrl2,
      jsun: ""
    }
    console.log('xxxxxxxxxx vvvvvv xxxxxxxx',drawingVo);

    SP.addSafePlace(drawingVo)
      .then(data => {
        this.setState({
          editedDrawing: 0
        });

        this._getImageToDb();
      }).catch(err => {
        console.log('xxxxxxxxxxxxxx err is ', err);
      });
  }
  onSlideChange = (e) => {
    console.log('Item`s position during a change: ', e.item);
    console.log('Slide`s position during a change: ', e.slide);
  };

  onSlideChanged = (e) => {
    console.log('Item`s position after changes: ', e.item);
    console.log('Slide`s position after changes: ', e.slide);
  };

  editImage = (item) => {

    console.log('img index is', item);
    this._sketch.fromJSON(item.jsun);
    this.setState({
      editedDrawing: item.id,
      DrawingIndex: item.title,
      showSaveCanvas: true,

    });
    this.hideDrawingSlide();
  }

  editTitleBox = (item_id) => {
    this.setState({
      editTitleBox: item_id
    });

  }

  hideTitleBoxName = () => {
    this.setState({
      editTitleBox: false
    });

  }

  hideDiv = (val) => {
    if (!val) {
      this.setState({
        hideRecorder: true
      })
    }
  }

  showRecorder = () => {
    this.setState({
      hideRecorder: false
    });
    this.goFull();
  }

  changeInFullScreen = (isFull) => {
    if (!isFull && !this.state.hideRecorder) {
      this.setState({
        hideRecorder: true,
        tool: Tools.Pencil,
      });
      this.setState({ isFull });
    }
  }

  handleInputChange = (event) => {
    console.log('xxxxxxxxx xxxxxxxxx xxxxxxxx event target ', event.target.value);
    this.setState({
      newTitleName: event.target.value
    });

  }

  confirmBtn() {
    this.props.history.replace('/hft/grounding');
  }

  openDialog() {
    this.setState({ showModalDialog: true });
  }

  closeDialog() {
    this.setState({
      showModalDialog: false,
      showTimeModalDialog: false

    });
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  openDialogEvent() {
    this.openDialog();
  }

  render() {
    const { lineLineWidth } = this.state;
    const { reactLineWidth } = this.state;

    return (
      <div>
        <Fullscreen
          enabled={this.state.isFull}
          onChange={this.changeInFullScreen}
        >
          {
            !this.state.hideRecorder ? (
              <div>

              </div>
            ) : (
                <div>
                  <div className="canvas-head">
                    <nav className="navbar navbar-inverse navbar-expand-md navbar-dark">
                      <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">

                          <div className="navbar-header navbar-left">

                          </div>
                          <ul className="nav navbar-nav navbar-right">

                            <li onClick={this.isActive.bind(this)} data-id="18" className={(this.state.menuSelected == 18 ? 'isSelected' : '')}><a href="javascript:void(0)" onClick={this._save} disabled><div data-tip='Save' data-for='save' ><span className="canvas-hd-pd"><i className="fas fa-save"></i>&nbsp; Save</span></div>
                              <ReactTooltip id='save' getContent={() => { return }} />
                            </a></li>
                            <li onClick={this.isActive.bind(this)} data-id="22" className={(this.state.menuSelected == 22 ? 'isSelected' : '')}><a href="javascript:void(0)"><div data-tip='Help' data-for='help' ><span className="canvas-hd-pd"><i className="fas fa-question-circle"></i>&nbsp; Help</span></div>
                              <ReactTooltip id='help' getContent={() => { return }} />
                            </a></li>
                            <li onClick={this.isActive.bind(this)} onClick={this.openDialogEvent.bind(this)} data-id="3" className={(this.state.menuSelected == 3 ? 'isSelected' : '')}><a href="javascript:void(0)"><div data-tip='Exit' data-for='exit' ><span className="canvas-hd-pd"><i className="fas fa-sign-out-alt"></i>&nbsp; Exit</span></div>
                              <ReactTooltip id='exit' getContent={() => { return }} />
                            </a></li>
                          </ul>
                        </div>

                      </div>
                    </nav>

                  </div>
                  <div className="toolbar__box--middle-left">

                    <div id="main-toolbar" className="toolbar toolbar--vertical fadeInUp--mobile mobile--hidden">

                      <ul className="tools__menu">
                        <li onClick={this.isActive.bind(this)} id="aww-toolbar-color" data-id="6" className={"tools__item " + (this.state.menuSelected == 6 ? 'isSelected' : '')}>

                          <div className="tools__item--button" data-tip='Color' data-for='colorP' onClick={this.showColorPicker} ><i className="fas fa-palette"></i></div>

                          <ReactTooltip id='colorP' getContent={() => { return }} />

                          {
                            this.state.showColorPicker
                              ? (
                                <div className="toolbox fadeInLeft">
                                  <div className="form-group">
                                    <CirclePicker
                                      colors={this._setColorPicker()}
                                      color={this.state.background} onChangeComplete={this.handleChangeCompleteColor} />
                                  </div>
                                  <div className="form-group addColorBtn" onClick={this.showMoreColorPicker}>
                                    <div className="pull-right">
                                      <i className="fas fa-plus"></i>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    {
                                      this.state.showMoreColorPicker
                                        ? (
                                          <SketchPicker
                                            color={this.state.background}
                                            onChangeComplete={this.handleChangeCompleteColor}
                                          />
                                        )
                                        : (
                                          null
                                        )
                                    }

                                  </div>

                                </div>
                              )
                              : (
                                null
                              )
                          }

                        </li>
                        <li onClick={this.isActive.bind(this)} id="aww-toolbar-eraser" data-id="7" className={"tools__item " + (this.state.menuSelected == 7 ? 'isSelected' : '')} >

                          <div data-tip='Eraser' data-for='eraser' className="tools__item--button" onClick={this.showEraserPicker}><i className="fas fa-eraser"></i></div>
                          <ReactTooltip id='eraser' getContent={() => { return }} />
                          {
                            this.state.showEraserPicker
                              ? (
                                <div className="toolbox fadeInLeft">
                                  <div data-tip='Eraser' data-for='eraser' className="tools__item--button" onClick={this.hideAllPicker}>
                                    <div className="funBtn" onClick={this.enableEraser}><i className="fas fa-eraser"></i></div>
                                  </div>

                                  <div onClick={this.isActive.bind(this)} data-id="4" className="tools__item--button" onClick={this.hideAllPicker} >
                                    <div onClick={this._clear}>
                                      <div data-tip='Clear' data-for='clear' >
                                        <span className="canvas-hd-pd"><i className="fas fa-quidditch"></i></span>
                                      </div>
                                      <ReactTooltip id='clear' getContent={() => { return }} />
                                    </div>
                                  </div>
                                  <div className='slider slider-px'>
                                    <Slider
                                      min={1}
                                      max={30}
                                      value={lineLineWidth}
                                      onChange={this.handleChangeSizeLine}
                                    />
                                  </div>

                                </div>
                              )
                              : (
                                null
                              )
                          }

                        </li>

                        <li onClick={this.isActive.bind(this)} id="aww-toolbar-pencil" data-id="8" className={"tools__item " + (this.state.menuSelected == 8 ? 'isSelected' : '')}>

                          <div data-tip='Pencil' data-for='pencil' className="tools__item--button" onClick={this.showPencilPicker} ><i className="far fa-pencil"></i></div>
                          <ReactTooltip id='pencil' getContent={() => { return }} />

                          {
                            this.state.showPencilPicker
                              ? (
                                <div className="toolbox fadeInLeft">
                                  <div onClick={this.hideAllPicker} data-tip='Pencil' data-for='pencil' className="tools__item--button" >
                                    <div className="funBtn" onClick={this.enableDrawingMode}><i className="far fa-pencil"></i></div>
                                  </div>
                                  <div onClick={this.hideAllPicker} className="tools__item--button aww-toolbar-pencil">
                                    <div className="funBtn" onClick={this.enableDrawingMode}><i className="fas fa-marker"></i></div>
                                  </div>
                                  <div onClick={this.hideAllPicker} className="tools__item--button aww-toolbar-pencil">
                                    <div className="funBtn" onClick={this.enableLineMode}><i className="far fa-minus"></i></div>
                                  </div>

                                  <div className='slider slider-px'>
                                    <Slider
                                      min={1}
                                      max={30}
                                      value={lineLineWidth}
                                      onChange={this.handleChangeSizeLine}
                                    />
                                  </div>

                                </div>
                              )
                              : (
                                null
                              )
                          }

                        </li>

                        {/* <li onClick={this.isActive.bind(this)} id="aww-toolbar-select" data-id="9" className={"tools__item " + (this.state.menuSelected == 9 ? 'isSelected' : '')}>
                          <div onClick={this.hideAllPicker} data-tip='Select' data-for='pointer' className="tools__item--button">
                            <div className="funBtn" onClick={this.enableSelectMode} ><i className="fas fa-mouse-pointer"></i></div>
                          </div>
                          <ReactTooltip id='pointer' getContent={() => { return }} />
                        </li> */}

                        <li onClick={this.isActive.bind(this)} id="aww-toolbar-select" data-id="9" className={"tools__item " + (this.state.menuSelected == 9 ? 'isSelected' : '')}>
                          <div onClick={this.hideAllPicker} data-tip='Select' data-for='pointer' className="tools__item--button">
                            <div className="funBtn" onClick={this.enableSelectMode} ><i className="fas fa-mouse-pointer"></i></div>
                          </div>
                          <ReactTooltip id='pointer' getContent={() => { return }} />
                          {
                            this.state.showSelectPicker
                              ? (
                                <div className="toolbox fadeInLeft">
                                 
                          <div className="innerBtn" data-tip='DEL' data-for='del' onClick={this.deleteSelected}>
                            <div><i className="fas fa-trash-alt"></i>
                            </div>
                          </div>
                        
                          <ReactTooltip id='del' getContent={() => { return }} />
                         
                                </div>
                              )
                              : (
                                null
                              )
                          }
                        </li>
                        <li onClick={this.isActive.bind(this)} id="aww-toolbar-size" data-id="17" className={"tools__item " + (this.state.menuSelected == 17 ? 'isSelected' : '')}>

                          <div data-tip='Select' data-for='selectText' className="tools__item--button" onClick={this.showTextPicker}><i className="fas fa-font"></i></div>
                          <ReactTooltip id='selectText' getContent={() => { return }} />

                          {
                            this.state.showTextPicker
                              ? (
                                <div className="toolbox fadeInLeft">
                                  <div className="form-group">
                                    <input type="text" style={{ "fontFamily": "Staatliches" }} className="form-control" id="textData" ref="textData" placeholder="Enter Your Text " />
                                  </div>
                                  {/* <div className="form-group">
                                    <select className="form-control" id="textSize" ref="textSize">
                                      <option value="8">8px</option>
                                      <option value="16">16px</option>
                                      <option value="32">32px</option>
                                      <option value="64">64px</option>
                                      <option value="128">128px</option>
                                    </select>
                                  </div> */}
                                  <div className="form-group">
                                    <button className="btn btn-sm btn-info" onClick={this.addText}>OK</button>
                                  </div>

                                </div>
                              )
                              : (
                                null
                              )
                          }

                        </li>

                        <li onClick={this.isActive.bind(this)} id="aww-toolbar-rectangle" data-id="13" className={"tools__item " + (this.state.menuSelected == 13 ? 'isSelected' : '')}>
                          <div data-tip='Rectangle' data-for='rectangle' className="tools__item--button funBtn" onClick={this.showRectanglePicker} ><i className="far fa-rectangle-wide"></i></div>
                          <ReactTooltip id='rectangle' getContent={() => { return }} />
                          {
                            this.state.showRectanglePicker
                              ? (
                                <div className="toolbox fadeInLeft">
                                  <div>
                                    <div className="tools__item--button_box">
                                      <div onClick={this._enableRecteMode} ><i className="far fa-rectangle-wide"></i></div>
                                    </div>
                                    <div className="tools__item--button_box">
                                      <div onClick={this._enableFillRectMode}><i className="fas fa-rectangle-wide"></i></div>
                                    </div>
                                    <div className="tools__item--button_box">
                                      <div onClick={this._enableCircleMode} ><i className="far fa-circle"></i></div>
                                    </div>
                                    <div className="tools__item--button_box">
                                      <div onClick={this._enableFillCircleMode}><i className="fas fa-circle"></i></div>
                                    </div>

                                    <div className="toolbox__separator col-md-12"></div>
                                    <div className='slider slider-px'>
                                      <Slider
                                        min={1}
                                        max={30}
                                        value={reactLineWidth}
                                        onChange={this.handleChangeSizeRect}
                                      />
                                    </div>

                                  </div>

                                </div>
                              )
                              : (
                                null
                              )
                          }

                        </li>

                        <li onClick={this.isActive.bind(this)} id="aww-toolbar-file" data-id="14" className={"tools__item " + (this.state.menuSelected == 14 ? 'isSelected' : '')}>
                          <div data-tip='File Upload' data-for='fileUpload' className="tools__item--button funBtn" onClick={this.showUploadPicker} ><i className="fas fa-image"></i></div>
                          <ReactTooltip id='fileUpload' getContent={() => { return }} />
                          {
                            this.state.showUploadPicker
                              ? (
                                <div>
                                  <div className="toolbox fadeInLeft">

                                    <div className="image-upload tools__item--button_box" data-tip='File Upload on Canvas' data-for='uploadImg'>
                                      <label htmlFor="file-input">
                                        <i className="fas fa-file-image"></i>
                                      </label>
                                      <input id="file-input" className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)} />
                                    </div>
                                    <ReactTooltip id='uploadImg' getContent={() => { return }} />
                                    <div className="image-upload tools__item--button_box"  data-tip='Upload Safe Place Image' data-for='uploadImgDir'>
                                      <label htmlFor="file-input2">
                                      <i className="fa fa-upload" aria-hidden="true"></i>
                                        
                                      </label>
                                      <input id="file-input2" className="fileInput" type="file" onChange={(e) => this._handleImageChange2(e)} />
                                    </div>
                                    <ReactTooltip id='uploadImgDir' getContent={() => { return }} />

                                    <div className="toolbox__separator col-md-12"></div>

                                    <div className="tools__item--button_box">
                                      <input type="url" required ref='imgFromurl' className="form-control" name='urlImage' placeholder="paste url" />
                                      <button className="btn btn-sm" onClick={this._addImgFromUrl}>Add</button>
                                    </div>
                                  
                                    <div>

                                    </div>

                                  </div>

                                </div>
                              )
                              : (
                                null
                              )
                          }

                        </li>
                        <li onClick={this.isActive.bind(this)} id="aww-toolbar-undo" data-id="15" className={"tools__item " + (this.state.menuSelected == 15 ? 'isSelected' : '')}>
                          <div onClick={this.hideAllPicker} data-tip='Undo' data-for='undo' className="tools__item--button">
                            <div className="funBtn" onClick={this._undo} disabled={!this.state.canUndo} ><i className="fa fa-undo" aria-hidden="true"></i>
                            </div>
                          </div>
                          <ReactTooltip id='undo' getContent={() => { return }} />
                        </li>
                        <li onClick={this.isActive.bind(this)} data-id="16" id="aww-toolbar-redo" className={"tools__item " + (this.state.menuSelected == 16 ? 'isSelected' : '')}>
                          <div onClick={this.hideAllPicker} data-tip='Redo' data-for='redo' className="tools__item--button funBtn" onClick={this._redo}>
                            <div><i className="fa fa-redo" aria-hidden="true"></i>
                            </div>
                          </div>
                          <ReactTooltip id='redo' getContent={() => { return }} />
                        </li>
                      </ul>

                    </div>

                    {/* <div id="multipage-nav" className="toolbar__box--bottom-left mobile--centering">
                      <div className="toolbar flex--middle">
                        <div className="pagination flex--middle">
                          <div id="prev-page" className="arrow arrow--left flex--middle">
                            <i className="fas fa-caret-left"></i>
                          </div>
                          <div className="pagination--numbers">
                            <span className="pagination--boards">{this.state.DrawingIndex}</span>
                          </div>
                          <div id="next-page" className="arrow arrow--right flex--middle is--pro is--hidden">
                            <i className="fas fa-caret-right"></i>
                          </div>
                          <div id="new-page" className="arrow arrow--right flex--middle is--pro">

                            <div onClick={this.isActive.bind(this)} data-id="20" className={(this.state.menuSelected == 20 ? 'isSelected' : '')}>
                              <div onClick={this.showSaveCanvas} data-tip='Canvas' data-for='canvas'>
                                <div onClick={this.showSaveCanvas}><span> <i className="fas fa-plus-circle"></i></span></div>
                              </div>
                              <ReactTooltip id='canvas' getContent={() => { return }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className='eventTitle'> {this.state.eventTitle}</div> */}

                  </div>

                  {
                    this.state.showSaveCanvas
                      ? (
                        <div>

                          <div onClick={this.hideDrawingSlide} className="backend-div-drawing"></div>

                          <div className="drawing-container row">
                            <div className="col-md-1 col-sm-6 col-xs-12 padd-top">
                              <div className="form-group">
                                <button className="btn button btn-warning btn-sm" onClick={this.addTransition}>Add transition</button>
                              </div>
                              <div className="form-group">
                                <button onClick={this.showCrossBtn} className="btn button btn-warning btn-sm">Remove State</button>
                              </div>
                              <div className="form-group">
                                <button className="btn button btn-warning btn-sm" onClick={this.handleDownloadClick} >Download Slides </button>
                              </div>

                            </div>
                            <div className="col-md-11 col-sm-6 col-xs-12 canvas_sider" >

                              <AliceCarousel responsive={{
                                0: { items: 2 },
                                600: { items: 3 },
                                1024: { items: 9 },
                              }}

                              >

                                {
                                  this.state.drawingImg.map((value, index) =>

                                    (

                                      <div className="c-img" key={index} data-id={value.id}>
                                        <img src={this.getImgSrc(value.image)} onClick={this.editImage.bind(this, value, index)} />
                                        <div className={"labal-tx " + (this.state.editTitleBox == value.id ? 'isShow' : 'ishidden')} onClick={this.editTitleBox.bind(this, value.id)}>{value.title}</div>

                                        <div className={(this.state.editTitleBox == value.id ? 'ishidden' : 'isShow')}>
                                          <span onClick={this.editTitleBoxName.bind(this, value.id)} className="check_btn t_s"> <i className="fas fa-check"></i></span>
                                          <span className="t_s"><input type="text" ref="box_title" className="form-control" onChange={this.handleInputChange} defaultValue={value.title} /></span>
                                          <span onClick={this.hideTitleBoxName.bind(this, value.id)} className="cross_btn t_s"><i className="fas fa-times"></i></span>
                                        </div>

                                        {
                                          this.state.showCrossBtn
                                            ? (
                                              <a href="javascript:void(0)" className="cross-btn" onClick={this.deleteImagebyId.bind(this, value.id, index)}><i className="fas fa-times-circle"></i>
                                              </a>
                                            )
                                            : (
                                              null
                                            )
                                        }

                                      </div>

                                    )

                                  )
                                }

                              </AliceCarousel>
                            </div>
                          </div>
                        </div>

                      )
                      : (
                        null
                      )
                  }

                  {/* ************************* Canvas********************* */}
                  <div className="main-canvas-container" onClick={this.isBlur} style={{ background: this.state.bgEditor }}>
                    <SketchField
                      width={this.state.width}
                      height={this.state.height}
                      tool={this.state.tool}
                      lineColor={this.state.lineColor}
                      lineWidth={this.state.lineWidth}
                      undoSteps={100}
                      ref={(c) => this._sketch = c}
                      onChange={this._onSketchChange}
                      fillColor={this.state.fillColor}
                      backgroundColor='#fff'
                    />
                  </div>

                </div >
              )
          }

        </Fullscreen>

        <Modal className="static-modal-confirm" show={this.state.showModalDialog} onHide={this.closeDialog}>

          <Modal.Body>

            <Modal.Title>Are you sure ? Your all unsaved changes will be lose</Modal.Title>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeDialog}>Cancel</Button>
            <Button onClick={this.confirmBtn} bsStyle="primary">Proceed</Button>
          </Modal.Footer>
        </Modal>

        <Modal className="static-modal-confirm" show={this.state.showTimeModalDialog} onHide={this.closeDialog}>

          <Modal.Body>

            <Modal.Title> 1 Hour has passed! You should take a break. The timer has paused. Click "start timer" again whenyou're ready to continue.</Modal.Title>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeDialog}>Cancel</Button>
            {/* <Button onClick={this.confirmBtn} bsStyle="primary">Proceed</Button> */}
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default SPcanvas;