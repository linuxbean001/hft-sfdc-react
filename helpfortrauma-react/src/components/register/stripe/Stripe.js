import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import PaymentService from '../../../services/PaymentService'

const payment = new PaymentService();

class Stripe extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onToken = (token) => {
        console.log('xxxxxxx xxxxxxx xxxxxxxxx token is ', token);
        payment.goToStripe({ token: token })
            .then(data => {
                if (data.data.success) {
                    console.log('xxxxxxxxx xxxxxxxx xxxxxxxx payment success', data);
                    this.props.paymemtSuccess(data.data.success);
                }
                console.log('xxxxx xxxxxxx xxxxxxxx data is ', data);
            }).catch(err => {
                console.log('xxxxx xxxxxxx xxxxxxxx err is ', err);

            })
        // fetch('/save-stripe-token', {
        //     method: 'POST',
        //     body: JSON.stringify(token),
        // }).then(response => { 
        //     response.json().then(data => {
        //         alert(`We are in business, ${data.email}`);
        //     });
        // });


    }

    render() {
        return (
            <div>
                <StripeCheckout
                    token={this.onToken}
                    image="https://www.amsterdambachelor.com/wp-content/uploads/2014/09/Payment-Button.png"
                    stripeKey="pk_test_3d3SAwNd5NNxXDb2NJz3GR1N"
                    amount={this.props.total * 100} 
                    currency="USD"
                >
                    <button className="btn btn-primary">
                        {this.props.label || 'Take this course'} ({'$' + this.props.total })
                    </button>
                </StripeCheckout>
            </div>
        );
    }
}

export default Stripe;
