import { fabric } from 'fabric';
import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { habits } from '../../../../const/pmHabits';
import AuthService from '../../../../services/AuthService';
import PmService from '../../../../services/PmService';
import { ButtonGroup, Button } from 'react-bootstrap';
import './pmCanvas.css';

const Auth = new AuthService();
const PmApi = new PmService();

class PmCanvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: '100vh',
            visible: true,
            underline: false,
            overline: false,
            linethrough: false,
            fontStyle: 'normal',
            enableOutlineWidth: false
        }
        console.log(props);
    }

    componentDidMount() {
        this.checkAuth();
        this._initPmCanvas();
        this.getFonts();
    }

    setOpacity = value => {
        this.setState({
            opacityVal: value,
        }, function () {
            this.state.pm.getActiveObject().set({
                opacity: value
            });
            this.refreshCanvas();
        });
    }

    setFontSize = (value) => {
        this.setState({
            fontSizeVal: value,
        }, function () {
            this.state.pm.getActiveObject().set({
                fontSize: value
            });
            this.refreshCanvas();
        });
    }

    getFonts = () => {
        PmApi.getFonts()
            .then(res => {
                this.setState({
                    fonts: res.data.items
                }, function () {
                    console.log(this.state.fonts)
                    this.setState({
                        fonts: this.state.fonts,
                        fontsClone: this.state.fonts
                    })
                });
            }).catch(err => {

            });
    }

    checkAuth = () => {
        if (!Auth.loggedIn()) {
            this.props.history.push('/login')
        }
    }

    showPicker = () => {
        this.setState({
            visible: false
        })
    }

    closeModel = () => {
        this.setState({
            visible: true
        })
    }

    deleteSelected = () => {
        this.state.pm.remove(this.getActiveObject());
    }

    getActiveObject = () => {
        return this.state.pm.getActiveObject()
    }

    _initPmCanvas = () => {
        this.setState({
            pm: new fabric.Canvas('c')
        }, function () {
            this.state.pm.setHeight(window.innerHeight);
            this.state.pm.setWidth(window.innerWidth);
            this.getPmImage();
        });
    }

    getPmImage = () => {
        PmApi.getPmImage()
            .then(res => {
                if (res.data.success) {
                    if (res.data.body.length == 0) {
                        this._drawCircle();
                    } else {
                        console.log('xxxx xxxx xxxxx res is res ', res.data.body[0])
                        this.state.pm.loadFromJSON(res.data.body[0].image__c, function () {
                            this.refreshCanvas();
                        });
                    }
                }
            }).catch(err => {

            })
    }

    _drawCircle = () => {
        var circle = new fabric.Circle({
            left: 600,
            top: 70,
            fill: "",
            radius: 250,
            hasControls: false,
            hasRoatatingPoint: false,
            stroke: 'red',
            strokeWidth: 3,
            selectable: false
        });

        this.state.pm.add(circle);
    }

    refreshCanvas = () => {
        this.state.pm.renderAll();
    }

    _addText = (title, font) => {
        if (!this.getActiveObject()) {
            this.state.pm.add(new fabric.IText(title, {
                left: 500,
                top: 0,
                fontFamily: font
            }));
            this.state.pm.setActiveObject(this.state.pm._objects[this.state.pm._objects.length - 1]);
        } else {
            this.setFontFamily(font);
            this.showPicker();
        }
    }

    setFontFamily = (font) => {
        this.state.pm.getActiveObject().set({
            fontFamily: font
        });
        this.refreshCanvas();
    }

    saveAsJpg = () => {
        console.log(this.state.pm.item.length);
        let href = this.state.pm.toDataURL({
            format: 'png',
            quality: 0.8
        });

        var link = document.createElement("a");
        link.download = 'pm.png';
        link.href = href;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(href);
    }

    getFontType = (event) => {
        console.log('xxxx xxxxxx xgetActiveObject ', this.getActiveObject());
        const result = this.state.fontsClone.filter(font => font.category == event.target.value);
        this.setState({
            fonts: result
        });
        console.log("exxxxx xxxxxxxxxx xxxxx event is ", this.state.fontsClone);
    }

    setTextDecoration = (decoration) => {
        if (this.getActiveObject()) {
            switch (decoration) {
                case "underline":
                    this.setState({
                        underline: !this.state.underline
                    }, function () {
                        this.getActiveObject().set({
                            underline: this.state.underline
                        });
                        this.refreshCanvas();
                    })
                    break;

                case "line-through":
                    this.setState({
                        linethrough: !this.state.linethrough
                    }, function () {
                        this.getActiveObject().set({
                            linethrough: this.state.linethrough
                        });
                        this.refreshCanvas();
                    })
                    break;

                case "overline":
                    this.setState({
                        overline: !this.state.overline
                    }, function () {
                        this.getActiveObject().set({
                            overline: this.state.overline
                        });
                        this.refreshCanvas();
                    })
                    break;

                case "italic":
                    this.setState({
                        fontStyle: this.state.fontStyle == 'normal' ? 'italic' : 'normal'
                    }, function () {
                        this.getActiveObject().set({
                            fontStyle: this.state.fontStyle
                        });
                        this.refreshCanvas();
                    })
                    break;
            }
        }
        console.log('xxxxx xxxxxxxx xxxxx text decoration ', decoration);
    }

    setTextColor = (e) => {
        if (this.getActiveObject()) {
            this.getActiveObject().set({
                fill: e.target.value
            });
            this.refreshCanvas();
        }

        // console.log()
    }

    setObjBackgroundColor = (e) => {
        if (this.getActiveObject()) {
            this.getActiveObject().set({
                backgroundColor: e.target.value
            });
            this.refreshCanvas();
        }
    }

    setStroke = (e) => {
        if (this.getActiveObject()) {
            this.getActiveObject().set({
                stroke: e.target.value,
                strokeWidth: 1
            });
            this.refreshCanvas();
        }
    }

    handleEnableOutlineWidth = (e) => {
        this.setState({
            enableOutlineWidth: e.target.checked
        }, function () {
            console.log('xxxxxx xxxxxxxxx xxxxxxx checked ', this.state.enableOutlineWidth)
        });
    }

    setOutLineWidth = (e) => {
        if (this.getActiveObject()) {
            this.getActiveObject().set({
                strokeWidth: e.target.value
            });
            this.refreshCanvas();
        }
    }

    check = () => {
        if (this.getActiveObject()) {
            this.setState({
                visible: false
            }, function () {
                this.refreshCanvas();
            });

        }
    }

    searchFonts = (e) => {
        if (e.target.value != '') {
            console.log("exxxxx xxxxxxxxxx xxxxx event is ", e.target.value);
            const result = this.state.fontsClone.filter(font => {
                return font.family.toLowerCase().includes(e.target.value.toLowerCase());
            });
            this.setState({
                fonts: result
            });
        } else {
            this.setState({
                fonts: this.state.fontsClone
            });
        }
    }

    savePartsMap = () => {
        this.state.pm.includeDefaultValues = true;
        let pmVo = {
            name: 'pm-',
            pmImage: JSON.stringify(this.state.pm)
        }

        PmApi.addPmImage(pmVo)
            .then(res => {
                console.log('xxxxxx xxxxxx xxxx pm added ', res.data);
            }).catch(err => {
                console.log('xxxxxx xxxxxx xxxx pm error ', err);
            });

    }

    render() {
        if (this.state.loading) {
            return '...loading';
        }
        const { opacityVal } = this.state;
        const { fontSizeVal } = this.state;

        return (
            <div>
                <div className="col-md-12 p-sidebar padd-right-0 pm-canvas-style">
                    <div className="col-md-12 pm-canvas-style-top">
                        <div className="mobile--hidden-custom">
                            <div id="home-button" className="toolbar__button mr--1">
                                <a href="/" target="_blank"><img src={require('./images/ic-home.svg')} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 sidebar text-center pad-top-15 padd-left-0 padd-right-0">

                        <div className="col-xs-2 padd-right-0 back-gr">

                            <ul className="nav nav-tabs tabs-left">
                                <li ><a href="#home" data-toggle="tab"><img src={require('./images/ict-select.svg')} /></a></li>
                                <li className="active"><a href="#profile" data-toggle="tab"><img src={require('./images/ict-pencil.svg')} /></a></li>
                                <li onClick={this.check}><a href="#font" data-toggle="tab"><img src={require('./images/ict-text.svg')} /></a></li>
                                {/* <li><a href="#settings" data-toggle="tab"><img src={require('./images/ic-info.svg')} /></a></li> */}
                                <li onClick={this.saveAsJpg}><a href="#download" data-toggle="tab"><img src={require('./images/ic-export.svg')} /></a></li>
                                <li onClick={this.savePartsMap}><a href="#save" data-toggle="tab"><img src={require('./images/ict-postit.svg')} /></a></li>
                            </ul>
                        </div>
                        <div className="col-xs-10 tab-cont">
                            <div className="tab-content">
                                <div className="tab-pane" id="home">
                                    <div className="spacer"></div>
                                    <div className="form-group">
                                        <button className="button btn btn-warning btn-full">Selection</button>
                                    </div>

                                    <div className="form-group">
                                        <button className="button btn btn-warning btn-full" onClick={this.deleteSelected}>Delete Selected Objects</button>
                                    </div>
                                </div>
                                <div className="tab-pane active" id="profile">
                                    <div className="habits col-md-12">
                                        <div className="spacer"></div>
                                        <div className="form-group">
                                            <button className="button btn btn-warning btn-full">Attributes</button>
                                        </div>
                                        {
                                            habits.map((habit, index) =>
                                                <div key={index}>
                                                    <h3 onClick={this._addText.bind(this, habit.title, habit.font)} style={{ "fontFamily": habit.font, "cursor": "pointer" }}>{habit.title}</h3>
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>
                                <div className="tab-pane pick-font" id="font">
                                    <div className="spacer"></div>
                                    <div className="form-group">
                                        <button className="button btn btn-warning btn-full">Pick a Font</button>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control" defaultValue="none" onChange={this.getFontType.bind(this)}>
                                            <option value="none" disabled>Select Font Type</option>
                                            <option value="serif">Serif</option>
                                            <option value="sans-serif">Sans Serif</option>
                                            <option value="display">Display</option>
                                            <option value="handwriting">Handwriting</option>
                                            <option value="monospace">Monospace</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Search" onChange={this.searchFonts.bind(this)} className="form-control" />
                                    </div>


                                    <div className="font-list">
                                        {
                                            this.state.fonts && this.state.fonts.map((font, index) =>
                                                <div key={index}>
                                                    <h3 onClick={this._addText.bind(this, "Double click to edit", font.family)} style={{ "fontFamily": font.family, "cursor": "pointer" }} >{font.family}</h3>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="font-cont" hidden={this.state.visible}>
                                        <div className="form-group">
                                            <div className="head-title">
                                                test
                                            </div>
                                            <div className="edit-text">
                                                <div className="col-md-12">
                                                    <label>Opacity</label> <span>{opacityVal}</span>
                                                    <Slider
                                                        min={0}
                                                        max={1}
                                                        step={0.1}
                                                        value={opacityVal}
                                                        onChange={this.setOpacity}
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <label>Font Size</label> <span>{fontSizeVal}</span>
                                                    <Slider
                                                        min={1}
                                                        max={100}
                                                        step={1}
                                                        value={fontSizeVal}
                                                        onChange={this.setFontSize}
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="col-md-6 pull-left">

                                                    </div>

                                                    <div className="font-style form-group">
                                                        <ButtonGroup className="mr-2">
                                                            <Button variant="secondary" onClick={this.setTextDecoration.bind(this, "underline")}><u>U</u></Button>
                                                            <Button variant="secondary" onClick={this.setTextDecoration.bind(this, "line-through")}><del>S</del></Button>

                                                            <Button variant="secondary"><span className="overline" onClick={this.setTextDecoration.bind(this, "overline")}>O</span></Button>

                                                            <Button variant="secondary" onClick={this.setTextDecoration.bind(this, "italic")}><i>i</i></Button>
                                                        </ButtonGroup>
                                                    </div>

                                                    <div className="text-color form-group">
                                                        <div className="col-md-12 form-group">
                                                            <div className="pull-left"> <label>color--------------</label></div>
                                                            <div className="pull-right"> <input type="color" id="textColor" onChange={this.setTextColor.bind(this)} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="background-color form-group">
                                                        <div className="col-md-12 form-group">
                                                            <div className="pull-left"><label>Background color</label></div>
                                                            <div className="pull-right">   <input type="color" id="bgColor" onChange={this.setObjBackgroundColor.bind(this)} /></div>
                                                        </div>
                                                    </div>

                                                    <div className="background-color form-group">
                                                        <div className="col-md-12 form-group">
                                                            <div className="pull-left">
                                                                <span className="myCheck"> <input type="checkbox" checked={this.state.enableOutlineWidth} onChange={this.handleEnableOutlineWidth.bind(this)} />
                                                                </span>
                                                                <span> <label>Outline</label></span>


                                                            </div>
                                                            <div className="pull-right">
                                                                <input type="color" id="olColor" onChange={this.setStroke.bind(this)} />

                                                            </div>

                                                        </div>
                                                        <div className="col-md-12 form-group">
                                                            <input type="number" className="form-control" min="1" disabled={!this.state.enableOutlineWidth} onChange={this.setOutLineWidth.bind(this)} />
                                                        </div>

                                                        <div className="col-md-12 form-group">
                                                            <button className="button btn btn-warning btn-custom" >Save</button>
                                                            <button onClick={this.closeModel} className="button btn btn-defulte btn-custom" >Cancel</button>
                                                        </div>



                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

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
                    <canvas id='c' />
                </div>
            </div>

        )
    }
}

export default PmCanvas;
