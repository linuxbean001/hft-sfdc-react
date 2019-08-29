import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CoursesService from '../../services/CoursesService';

const course = new CoursesService();

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plans: [],
            cart: [],
            liveCourseCart: [],
            showModal: false,
            showModalDialog: false,
            loading: true,
            liveTrainingDates: [],
            selectedDate: ''
        };
        this.closeDialog = this.closeDialog.bind(this);
    }



    componentDidMount() {
        this._getCoursePlans();
    }



    handleChange = (event) => {
        this.setState({
            selectedDate: event.target.value
        });
    }

    _getCoursePlans = () => {
        course.getCourses()
            .then(res => {
                console.log('XXXXXXXXXXXXXXXX courses are ', res.data.body);
                this.setState({ plans: res.data.body }, function () {
                    this._getLiveCoursePlans();
                });
            }).catch(err => {
                console.log('XXXXXXXXXXXXXXXX courses are ', err);
            });
    }

    _getLiveCoursePlans = () => {
        course.getLiveCourses()
            .then(res => {
                console.log('XXXXXXXXXXXXXXXX live courses are ', res.data.body);
                this.setState({ liveCoursePlans: res.data.body }, function () {
                    this.setState({
                        loading: false
                    })
                });
            }).catch(err => {
                console.log('XXXXXXXXXXXXXXXX live err ', err);
            });
    }

    bookLiveCourse = () => {
        this.setState({
            liveCourseCart: [...this.state.liveCourseCart, { course: this.state.selectedLiveCoursePlan, selectedDate: this.state.selectedDate }]
        }, function () {
            // this.checkLiveCourse(this.state.selectedLiveCoursePlan);
            // this.getTotalItemNo();
            console.log('xxxxxxxxx xxxxxxxxx xxxxxxx cart is live ', this.state.liveCourseCart);
            this.closeDialog();

        });
    }

    confirmOrder = () => {
        this.props.history.push({
            pathname: '/register/confirm',
            state: {
                cartData: this.state.cart,
                liveCourseCartData: this.state.liveCourseCart,
            }
        })
        // this.props.history.replace('/register/confirm');
    }

    check = (event) => {
        // console.log('xxxxx', this.state.cart);
        return this.state.cart.includes(event);
    }

    checkLiveCourse = (event) => {
        let isRowExists = false;
        this.state.liveCourseCart.forEach(row => {
            if (row.course == event) {
                isRowExists = true;
            }
        });
        return isRowExists;
    }

    addToCart = (plan) => {
        let planArr = this.state.cart;
        planArr.push(plan);
        this.setState({
            cart: planArr,
        });

        console.log('xxxxxxxxx xxxxxxxxx xxxxxxx cart is ', this.state.cart);

    }

    addToLiveCourseCart = (plan) => {
        this.setState({
            liveTrainingDates: []
        }, function () {
            this.setState({
                liveTrainingDates: [...this.state.liveTrainingDates, plan],
                selectedLiveCoursePlan: plan
            }, function () {
                this.setState({
                    selectedDate: '',
                    showModalDialog: true
                });
            });
        });

    }



    closeDialog() {
        this.setState({ showModalDialog: false });
    }

    getTotalItemNo = () => {
        return this.state.liveCourseCart.length + this.state.cart.length;
    }



    render() {
        // if (this.state.loading) {
        //     return '...loading 11';
        // }

        // console.log('xxxxxxxxxxx--',recommended);
        return (
            <div className="about-us">
                <div className="page-block page_block_below_fold" id="page_block_below_registration">
                    <div className="border-holder">
                        <div className="container">
                            <div className="block-inner">
                                <div className="border-holder-left col-md-12">

                                </div>

                            </div>
                        </div>
                    </div>
                </div>



                <div className="page-block  page_block_custom" id="page_block_below_checkout_content">
                    <div className="border-holder">
                        <div className="container">
                            <div className="block-inner">
                                <div className="block-inner-main">
                                    {this.state.loading ? (
                                        <h3>Loading...</h3>
                                    ) : (

                                            <div className="border-holder-left col-md-12 form-border-holder-left-login">
                                                <div className="page-element widget-container widget-headline widget-form">

                                                    <h3>User Courses</h3>
                                                    <div className="table">
                                                        {this.state.plans.map((event, index) =>
                                                            <div className="row_table" key={index}>
                                                                <div className="cell_table col-md-8">
                                                                    <h5>{event.title__c}</h5> <p>{event.description_short__c}</p>
                                                                </div>
                                                                <div className="cell_table col-md-2">{'$' + event.cost__c}
                                                                </div>
                                                                <div className="cell_table col-md-2"> <button disabled={this.check(event)} className="button btn btn-warning btm-sm" onClick={this.addToCart.bind(this, event)}>Add to Cart </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <h3>User Live Courses</h3>
                                                    <div className="table">
                                                        {this.state.liveCoursePlans.map((event, index) =>
                                                            <div className="row_table" key={index}>
                                                                <div className="cell_table col-md-8">
                                                                    <h5>{event.name}</h5>
                                                                    {/* <p>
                                                                        {event.location_address__c}
                                                                        {event.location_city_state__c}
                                                                        {event.location_phone__c}

                                                                    </p> */}
                                                                </div>
                                                                <div className="cell_table col-md-2">{'$' + event.cost__c}
                                                                </div>
                                                                <div className="cell_table col-md-2">
                                                                    <button disabled={this.checkLiveCourse(event)} onClick={this.addToLiveCourseCart.bind(this, event)}
                                                                        className="button btn btn-warning btm-sm">Add to Cart</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>


                                                </div>
                                                <div className="pull-right">
                                                    <Button onClick={this.confirmOrder} bsStyle="info">{this.state.cart.length > 0 || this.state.liveCourseCart.length > 0 ? "(" + this.getTotalItemNo() + ") Checkout" : "Checkout"}
                                                    </Button>
                                                </div>
                                            </div>




                                        )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <Modal className="static-modal-confirm" show={this.state.showModalDialog} onHide={this.closeDialog}>

                    <Modal.Body>
                        <h2>Please select date</h2>
                        <div>
                            {
                                this.state.liveTrainingDates.map((date, index) =>
                                    <label className="container_checkbox" key={index}>
                                        <div><strong>{date.date_s__c}</strong></div>
                                        <div> <span>{date.location_address__c}</span>
                                            <span>{date.location_city_state__c}</span>
                                            <span>{date.location_phone__c}</span>
                                        </div>
                                        <input type="radio" name={"myself-input" + index} checked={this.state.selectedDate === date.date_s__c} value={date.date_s__c} onChange={this.handleChange.bind(this)}></input>
                                        <span className="checkmark"></span>
                                    </label>
                                )}
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="danger" bsSize="small" onClick={this.closeDialog}>Cancel</Button>
                        <Button bsStyle="success" bsSize="small" onClick={this.bookLiveCourse} >Book</Button>
                    </Modal.Footer>
                </Modal>




            </div>
        );
    }
};
export default Checkout;