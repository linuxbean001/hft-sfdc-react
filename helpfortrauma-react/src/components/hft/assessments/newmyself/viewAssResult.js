import React, { Component } from 'react';

/* ***************************** Global *************************** */


class ViewAssResult extends Component {
    /* ***************************** Constructor ********************** */
    constructor() {
        super();

        this.state = {
            AssessmentStatus: true,
            showAlert: false
        };
        this.MyselfSubmit = this.MyselfSubmit.bind(this);
    }

    /* ***************************** Methods *************************** */
    componentDidMount() {

    }

    /* ***************************** Template ************************** */
    render() {

        return (
            <div>

            </div>
        );
    }
}

export default ViewAssResult;
