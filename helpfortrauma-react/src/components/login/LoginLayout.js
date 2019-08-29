import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';

class LoginLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route path='/login/forget-password' component={ForgetPassword} />
                    <Route path='/login/reset-password/:token' component={ResetPassword} />

                </Switch>
            </div>
        );
    }
}

export default LoginLayout;
