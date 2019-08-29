import React, { Component } from 'react';
import EventService from '../../../services/EventService';
import {
    withRouter
} from 'react-router-dom';
const AssService = new EventService();
class FinishAssesment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        // this.setState({
        //     result: this.props.location.state.result,
        //     assId: this.props.location.state.assId,
        //     assName: this.props.location.state.assName
        // }, function () {
        //     console.log('xxxxx xxxxxxxxxx xxxxxxxxxxx ', this.state.assName
        //     );
        //     this.setState({
        //         keys: [...this.state.result.keys()]
        //     }, function () {
        //         this.setState({
        //             loading: false
        //         })
        //     })
        // })
    }
    reviewResult = () => {
        console.log('xxxxxxxx xxxxxxxxxx xxxxxxxxxx view Result');
        this.props.history.push('/hft/Assessments/ReviewResult');
    }

    render() {
        return (
            <div>
                <div class="jumbotron text-xs-center">
                    <h1 class="display-3">Thank You!</h1>
                    <p class="lead"><strong>Please check your email</strong> for further instructions on how to complete your account setup.</p>
                    <hr></hr>
                    <p class="lead">
                        <button class="btn btn-primary btn-sm" onClick={this.reviewResult}>Review Results</button>
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(FinishAssesment);
