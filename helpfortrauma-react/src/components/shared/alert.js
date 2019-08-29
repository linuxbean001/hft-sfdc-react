import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class AlertMsg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: this.props.msg,
            time: this.props.time * 1000 || 3000,
            showSpinner: this.props.spinner || false,
            style: this.props.style || '',
            showAlert: true
        };
    }

    componentDidMount() { 
        setTimeout(() => {
            this.setState({
                showAlert: false
            }, function () {
                this.props.reset(true);
            })
        }, this.state.time);
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.showAlert ? (
                            <Alert bsStyle={this.state.style}>
                              
                                    {
                                        this.state.showSpinner ? (
                                            <i className="fas fa-spinner icon-flipped"></i> 
                                        ):(null)
                                    }
                             
                                    &nbsp; &nbsp;
                               <strong>{this.state.msg}</strong>
                            </Alert>
                        ) : (null)
                    }
                </div>
            </div>
        );
    }
}

export default AlertMsg;
