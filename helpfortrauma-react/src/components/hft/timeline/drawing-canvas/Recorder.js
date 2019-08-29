import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { ReactMic } from 'react-mic';
import EasyTimer from '../../../../../node_modules/easytimer.js';
import RecorderService from '../../../../services/RecorderService';
import DataCacheService from '../../../../services/DataCacheService';
import './Recorder.css';
const theEndImg = require('../../../../const/theEndImg');
const recService = new RecorderService();
const dataCacheService = new DataCacheService();
class Recorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: '',
            drawingImg: [],
            index: 0,
            drawingId: 0,
            id: 0,
            interval: 3000,
            autoPlay: false,
            recoderBox: false,
            showPlayButton: true,
            timer: new EasyTimer(),
            timeValues: "",
            autoSlide: false,
            currentSlide: {},
            player: {},
            myArray:[]
        };
        this.tick = this.tick.bind(this);
         this.handleAutoPlay=this.handleAutoPlay.bind(this);

    }

    componentDidMount() {
        this._getDrawingImages();
        this._init();
    }

    startRecording = (index, val) => {
        index = index || this.state.index;
        val = val || this.state.currentSlide;
        this._initTimer();
        let id = 0;
        if (val.rid) {
            id = val.rid
        }
        this.setState({
            record: true,
            index: index,
            drawingId: val.did,
            id: id,
            recoderBox: true
        });
    }

    _initTimer() {
        let { timer } = this.state;
        timer.start();
        timer.addEventListener("secondsUpdated", this.tick);
    }

    tick(e) {
        let { timer } = this.state;
        const timeValues = timer.getTimeValues().toString();
        this.setState({ timeValues: timeValues });
    }

    stopRecording = (index, val) => {
        index = index || this.state.index;
        val = val || this.state.currentSlide;
        this.setState({
            record: false,
            index: index,
            recoderBox: false,
            timer: new EasyTimer()
        });

    }

    _addRecording = (recording) => {
        const body = {
            drawingId: this.state.drawingId,
            recording: recording,
            id: this.state.id
        };
        console.log('xxxx add recording', body);
        
        let myArray1 = this.state.myArray.map((val, index) => {
            if(val.did===body.drawingId){
            val.recording= body.recording;
            }
            return val;
            })
            
            this.setState({drawingImg:myArray1});

        recService.addUpdateRecording(body)
            .then(data => {
                this.setState({
                    id: 0
                })
              
                this._getDrawingImages();
            }).catch(err => {
                console.log('xxx xxxxxxx xxxxxxxxxx ', err);

            });
    }

    onData(recordedBlob) {
    }

    onStop = (recordedBlob) => {
       
        var reader = new FileReader();
        reader.readAsDataURL(recordedBlob.blob);
        reader.onloadend = () => {
            let base64data = reader.result;
            this._addRecording(base64data);
        }
    }
    _init = () => {
        const recorder = JSON.parse(localStorage.getItem('RECORDER'));
        const orderResults = recorder.data.body.sort((a, b) => parseFloat(a.did) - parseFloat(b.did));
        let endData = orderResults.find(v => v.title.match(/the end/i));
        let otherData = orderResults.filter(v => !v.title.match(/the end/i));
        otherData.push(endData);
        const sorting = ['Before', 'Startle', 'Fight or Flight', 'Freeze', 'Altered State', 'Automatic Obedience', 'Self-Repair', 'After', 'The End'];

        otherData = otherData.map(function (item) {
            var n = sorting.indexOf(item.title);
            sorting[n] = '';
            return [n, item]
        }).sort().map(function (j) { return j[1] });

        if (recorder.data) {
            this.setState({
                drawingImg: otherData,
                currentSlide: otherData[0]
            });
        }

        this.state.player = {audio: this.audio};
        this.setState({
            player: this.state.player
        });
        this.audio.onplay = () => {
            this.state.player.isPlaying = true;
            this.setState({
                player: this.state.player
            });
        }
        this.audio.onpause = () => {
            this.state.player.isPlaying = false;
            this.state.player.paused = true;
            this.setState({
                player: this.state.player
            });
        }
        this.audio.onended = () => {
            this.state.player.isPlaying = false; 
            this.state.player.paused = false;
            this.state.player.ended = true;
            this.setState({
                player: this.state.player
            });
            this.audioEnded();
        }
        this.audio.onerror = err => {
            this.audioEnded(err);
        }
    }
    _getDrawingImages = () => {
        const eventId = JSON.parse(localStorage.getItem('event')).eventId;

        recService.getRecordingWithDrawing(eventId)
            .then(data => {
               
                const orderResults = data.data.body.sort((a, b) => parseFloat(a.did) - parseFloat(b.did));
                let endData = orderResults.find(v => v.title.match(/the end/i));
                let otherData = orderResults.filter(v => !v.title.match(/the end/i));
                otherData.push(endData);
                const sorting = ['Before', 'Startle', 'Fight or Flight', 'Freeze', 'Altered State', 'Automatic Obedience', 'Self-Repair', 'After', 'The End'];

                otherData = otherData.map(function (item) {
                    var n = sorting.indexOf(item.title);
                    sorting[n] = '';
                    return [n, item]
                }).sort().map(function (j) { return j[1] });

                this.setState({
                    drawingImg: otherData,
                    currentSlide: otherData[this.state.index],
                    myArray:otherData
                });
            }).catch(err => {
                console.log('xxxxxxxxxxxxxx err is trt ', err);
            });
    }

    playAudio = (aud, isDirectPlay) => {
        if(isDirectPlay){
            const autoSlide = false
            this.setState({ autoSlide });
            this.pause();
        }
        
        aud = aud || this.state.currentSlide.recording;
        this.audio.src = aud;
        this.audio.play();
        this.setState({
            showPlayButton: !this.state.showPlayButton
        });
        return this.audio;
    }

    pauseAudio = (aud) => {
        this.audio.pause();
        this.setState({
            showPlayButton: !this.state.showPlayButton
        });
        return this.audio;
    }

    _getDuration = (aud) => {
        let audio = new Audio();
        audio.src = aud;
        const durationP = new Promise(resolve =>
            audio.addEventListener('loadedmetadata', () => {
                if (audio.duration === Infinity) {
                    audio.currentTime = Number.MAX_SAFE_INTEGER
                    audio.ontimeupdate = () => {
                        audio.ontimeupdate = null
                        resolve(audio.duration)
                        audio.currentTime = 0
                    }
                }
                else
                    resolve(audio.duration);
            })
        )
        return durationP

    }

    getImgSrc = (img) => {
        let imgSrc = img.replace('{"', "").replace('"}', "");
        return imgSrc;
    }

    handleAutoPlay = (val) => {
        val = this.state.index;
        if (this.state.autoSlide === true) {
            let rec = this.state.drawingImg[val];
            if (rec.recording) {

                this._getDuration(rec.recording)
                    .then(res => {
                        let time = res * 1000;

                        this.setState({
                            interval: time,
                            
                        });
                        this.playAudio(rec.recording);

                    }).catch(err => {
                        console.log('x xxxxxxx xxxxxx err is ', err);
                    })
            } else {
                this.setState({
                    interval: 2000,
                });
            }
        }
      
    }

    getValues = (val) => {

        // this.handleAutoPlay(val);
    }

    isSlideShow = index => {
        this.setState({
            index,
            currentSlide: this.state.drawingImg[index]
        })
        if (this.state.autoSlide === true) {
            let rec = this.state.drawingImg[index];
            if (rec.recording) {
                this.playAudio(rec.recording);
                
            } else {
                setTimeout(() => 
                this.slider.slickNext(), 2000);
            }
        }
    }
    audioEnded = () => {
        if (this.state.autoSlide === true) {
            console.log(this.state.index, this.state.drawingImg.length)
            if(this.state.index >= this.state.drawingImg.length-1){
                this.state.autoSlide = false;
                this.setState({
                    state: this.state.autoSlide
                });
            } else{
                setTimeout(() => 
                    this.slider.slickNext(), 2000);
            }
        }
    }
    slideShow = () => {
        this.setState({
            testvalue: true
        });
    }

    play = () => {
        this.slider.slickPlay();
    }
    pause = () => {
        this.slider.slickPause();
    }
    toggle = () => {
        const isRequiredCaller = this.state.index == 0;
        const autoSlide = !this.state.autoSlide
        this.setState({ autoSlide });
        console.log(autoSlide, isRequiredCaller);
        setTimeout(() => {
            if (autoSlide) {
                this.slider.slickGoTo(0);
                isRequiredCaller && this.isSlideShow(0);
                
            } else {
                this.pauseAudio();
            }

        }, 500);

    }
    _slideChange=()=>{
        this.pauseAudio();
        this.setState({
            showPlayButton: true,
        });
    }
   
    next = () => {
        this.slider.slickNext()
    }

    prev = () => {
        this.slider.slickPrev()
    }

    render() {

        var settings = {
            centerMode: true,
            infinite: false,
            centerPadding: '5px',
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 150,
            nextArrow: <></>,
            prevArrow: <></>,
            afterChange: (slideNum) => {
                this.setState({currentSlide: this.state.drawingImg[slideNum], index: slideNum});
                if(slideNum >= this.state.drawingImg.length - 1 && this.state.autoSlide) {
                    this.toggle();
                }
            }
        };
        return (
            <div className="main-content">
            {this.state.recoderBox ? (
                    <div className="inline-group recorder-btn presentation-controls">
                        <button className="btn button btn-danger btn-lg" onClick={ () => this.stopRecording() }>Stop</button>
                        <b style={{ color: 'white' }}>
                            {' ' + this.state.timeValues}</b>
                    </div>
                ): (
                    <div className="inline-group recorder-btn presentation-controls">
                
                        {!this.state.autoPlay && this.state.currentSlide.recording && !this.state.player.isPlaying ? <button className="btn button btn-info btn-lg" onClick={ () => this.playAudio(null, true) }>Play</button> : <></>}
                        {!this.state.autoPlay && this.state.player.isPlaying ? <button className="btn button btn-warning btn-lg" onClick={ () => this.pauseAudio() }>Pause</button> : <></>}
                        {this.state.player.isPlaying ? <></> : 
                            <>
                                {!this.state.autoPlay ? <button className="btn button btn-danger btn-lg" onClick={ () => this.startRecording() }>
                                    {this.state.currentSlide.recording ? 'Re-' : ''}Record
                                </button> : <></>}
                                <button className="btn button btn-default btn-lg" onClick={ () => this.prev() }>Prev</button>
                                <button className="btn button btn-default btn-lg" onClick={ () => this.next() }>Next</button>
                                
                            </>
                        }
                        <button className="btn button btn-success btn-lg" onClick={() => this.toggle() }>
                            {this.state.autoSlide ? 'Pause' : 'Play'} SlideShow
                        </button>
                    </div>
                )}
             
            <div className="slider-content">
                
                <div className="recored_wave">
                    <ReactMic
                        record={this.state.record}
                        className={"sound-wave " + (this.state.recoderBox == false ? 'hidden' : '')}
                        onStop={this.onStop}
                        onData={this.onData}
                        strokeColor="#000000"
                       
                    />
                </div>
                
                <audio ref={(audio) => { this.audio = audio }} src=""></audio>
                <Slider {...settings} ref={slider => (this.slider = slider)} beforeChange={this.getValues} afterChange={ this.isSlideShow } >
                    {
                        this.state.drawingImg.map((value) =>

                            (
                                <div key={value.did}>
                                    <h4 className="text-center">{value.title}</h4>
                                    <div className="recording_drawing" data-id={value.did}>
                                        
                                        {
                                            value.title.match(/the end/i) !== null ?
                                                <>
                                                    <img src={this.getImgSrc(theEndImg.img)} />
                                                    <div className="self-discovery"><Link to={"/hft/Parts-Map"} className="arrow_box">Continue to Parts Map</Link></div>
                                                </>
                                                :
                                                <>
                                                    <img src={this.getImgSrc(value.img)} />

                                                </>
                                        }
                                      
                                    </div>
                                </div>
                            )

                        )
                    }
                    <></>
                    <></>
                </Slider>

            </div>
            </div>
        );
    }
}

export default Recorder;
