import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel } from '@fortawesome/pro-solid-svg-icons';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dcanvas from './components/hft/timeline/drawing-canvas/Dcanvas';
import RouterOutlet from './components/layout/Router-outlet';
import PmCanvas from './components/hft/parts-map/Parts-map canvas/pmCanvas';
import TimelineCanvas from './components/hft/timeline/timeline-canvas/TimelineCanvas';
import EdCanvas from './components/hft/externalized-dialogue/ed-canvas/EdCanvas';
import SPcanvas from './components/hft/grounding/saft-place/sp-canvas';

library.add(faStroopwafel);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWeb: ''
    };

    this.getChildData = this.getChildData.bind(this);
    this.getChildDataFromLc = this.getChildDataFromLc.bind(this);
  }

  componentDidMount() {

  }

  getChildData(val) {
    console.log(val)
    this.setState({ showWeb: val });
  }

  getChildDataFromLc(val) {
    console.log(val)
    this.setState({ showWeb: val });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
            <Route path='/sp-canvas' component={SPcanvas} />
              <Route path='/pm-canvas' component={PmCanvas} />
              <Route path='/drawing-canvas' component={Dcanvas} />
              <Route path='/ed-canvas' component={EdCanvas} />
              <Route path='/timeline-canvas' component={TimelineCanvas} />
              <Route path='/' component={RouterOutlet} />
            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;