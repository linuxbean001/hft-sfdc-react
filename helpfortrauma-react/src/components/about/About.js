import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import './About.css';
import Articles from './articles/Articles';
import Library from './library/Library';
import PublicAbout from './PublicAbout';
import Topics from './trauma-topics/Topics';
import Videos from './videos/Videos';



const Auth = new AuthService();

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }



    componentDidMount() {

    }

    render() {
        return (
            <div>
                {
                    Auth.loggedIn() ? (
                        <div>
                            <div className="mainbar about-header">
                                <div className="container">
                                    <button type="button" className="btn mainbar-toggle" data-toggle="collapse" data-target=".mainbar-collapse">
                                        <i className="fa fa-bars"></i>
                                    </button>
                                    <div className="mainbar-collapse collapse ">
                                        <ul className="nav navbar-nav mainbar-nav">
                                            <li>
                                                <Link to={'/about'}>  <i className="far fa-list"></i>Trauma Topics</Link>
                                            </li>
                                            <li>
                                                <Link to={'/about/videos'} >  <i className="fal fa-video"></i>Videos
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/about/articles'} >  <i className="fal fa-book-alt"></i>Articles
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/about/library'} >  <i className="fal fa-graduation-cap"></i>Library
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="content">
                                    <div className="content-container">
                                        <div className="Lcenter">
                                            <Switch>
                                                <Route exact path='/about' component={Topics} />
                                                <Route path='/about/videos' component={Videos} />
                                                <Route path='/about/articles' component={Articles} />
                                                <Route path='/about/library' component={Library} />
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <PublicAbout />
                        )
                }


            </div>
        );
    }
};
export default AboutUs;