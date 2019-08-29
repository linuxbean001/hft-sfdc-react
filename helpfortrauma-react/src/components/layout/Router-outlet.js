import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import RegisterService from '../../services/RegisterService';
import About from '../about/About';
import Intro from '../hft/Intro';
import LoginLayout from '../login/LoginLayout';
import RegLayout from '../register/RegLayout';
import Lcenter from '../training-center/Lcenter';
import Footer from './Footer';
import Header from './Header';
import LandingPage from './LandingPage';
import Certification from '../certification/Certification';
import FindProfessional from '../find-professional/FindProfessional';
import CeCredits from '../ce-credits/CeCredits';

const Auth = new AuthService();
const Reg = new RegisterService();

class RouterOutlet extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    Reg.removeCreatedUser();
    Reg.removeCreatedUserCredentials();
  }

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/login');
  }

  componentWillMount() {

  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/about' component={About} />
              <Route path='/login' component={LoginLayout} />
              <Route path='/register' component={RegLayout} />
              <Route path='/Learning-center' component={Lcenter} />
              <Route path='/hft' component={Intro} /> 
              <Route path='/certification' component={Certification} />
              <Route path='/find-a-professional' component={FindProfessional} />
              <Route path='/ce-credits' component={CeCredits} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default RouterOutlet;