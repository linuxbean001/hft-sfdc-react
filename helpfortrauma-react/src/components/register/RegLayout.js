import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Checkout from './Checkout';
import ConfirmOrder from './ConfirmOrder';
import Register from './Register';
import PaymentSuccess from './stripe/PaymentSuccess';
import Stripe from './stripe/Stripe';

class RegLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/register' component={Register} />
                    <Route path='/register/checkout' component={Checkout} />
                    <Route path='/register/confirm' component={ConfirmOrder} />
                    <Route path='/register/payment' component={Stripe} />
                    <Route path='/register/success' component={PaymentSuccess} />
                </Switch>
            </div>
        );
    }
}

export default RegLayout;
