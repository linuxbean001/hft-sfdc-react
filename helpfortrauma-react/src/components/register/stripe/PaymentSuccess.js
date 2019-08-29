import React, { Component } from 'react';

class PaymentSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    login = () => {
        this.props.history.replace('/login');
    }
    
    render() {
        return (
            <div>
                <h1>Payment Success </h1>
                <button onClick={this.login}>Login</button>
            </div>
        );
    }
}

export default PaymentSuccess;
