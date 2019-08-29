import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import './profile.css';
import Publicprofile from './Publicprofile';



const Auth = new AuthService();

class profile extends Component {
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
                <div className="mainbar">
                    <div className="container">
                        
                    </div>
                </div>
                <Publicprofile/>
            </div>
        );
    }
};
export default profile;