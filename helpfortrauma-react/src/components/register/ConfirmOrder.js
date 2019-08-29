import React, { Component } from 'react';
import Stripe from './stripe/Stripe';
import CoursesService from '../../services/CoursesService';
import AuthService from '../../services/AuthService';
import RegisterService from '../../services/RegisterService';

const Course = new CoursesService();
const Auth = new AuthService();
const Reg = new RegisterService();



class ConfirmOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartData: this.props.location.state.cartData,
            liveCourseCartData: this.props.location.state.liveCourseCartData,
        };

        this.paymemtTrue = this.paymemtTrue.bind(this)
        this.buyCourses = this.buyCourses.bind(this)
        this.login = this.login.bind(this);
        console.log('prop is ', props);
    }

    componentDidMount() {
        this.getTotal();
    }

    makePayment = () => {
        this.props.history.replace('/register/');
    }

    getTotal = () => {
        let sum = 0;
        this.state.cartData.forEach(value => {
            sum = sum + value.cost__c
        });
        this.setState({
            total: sum
        })
    }

    paymemtTrue = (paymemtSuccess) => {
        if (paymemtSuccess) {
            this.buyCourses();
        }
    }

    buyCourses() {
        let courseVo = {
            courses: this.state.cartData,
            usrId: Reg.getCreatedUser().id,
            username: Reg.getCreatedUser().username__c
        }
        Course.buyCourses(courseVo)
            .then(result => {
                if (result.data.success) {
                    // this.props.location.history('/login');
                    this.login();
                }
            }).catch(err => {
                console.log('xxxxx xxxxxxx xxxxxxxx  errr', err);
            });
    }

    login() {
        const user = Reg.getCreatedUserCredentials();
        Auth.login(user.email, user.pass)
            .then(res => {
                if (res.data.success) {
                    Reg.removeCreatedUser();
                    Reg.removeCreatedUserCredentials();
                    this.props.history.replace('/Learning-center');
                }
            }).catch(err => {
                console.log('xxxxx xxxxxxx xxxxxxxx  errr', err);
            })

    }

    removeFromCart = (index) => {
        let arr = this.state.cartData;
        arr.splice(index, 1);
        this.setState({
            cartData: arr
        }, function () {
            this.getTotal();
        })
    }

    removeFromLiveCourseCart = (index) => {
        let arr = this.state.liveCourseCartData;
        arr.splice(index, 1);
        this.setState({
            liveCourseCartData: arr
        }, function () {
        });
    }

    render() {
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
                                    <div className="border-holder-left col-md-12 form-border-holder-left-login">
                                        <div className="page-element widget-container widget-headline widget-form">
                                            <h3>User Course</h3>
                                            <div className="table">
                                                {this.state.cartData.map((event, index) =>
                                                    <div className="row_table" key={index}>
                                                        <div className="cell_table col-md-8">
                                                            <h5>{event.title__c}</h5> <p>{event.description_short__c}</p>
                                                        </div>

                                                        <div className="cell_table col-md-2">
                                                            {'$' + event.cost__c}
                                                        </div>

                                                        <div className="cell_table col-md-2"> <button className="button btn btn-danger btm-sm" onClick={this.removeFromCart.bind(this, index)}>
                                                            Remove </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="table">
                                                {this.state.liveCourseCartData.map((event, index) =>
                                                    <div className="row_table" key={index}>
                                                        <div className="cell_table col-md-8">
                                                            <h5>{event.course.name}</h5>
                                                        </div>

                                                        <div className="cell_table col-md-2">
                                                            {event.selectedDate}
                                                        </div>

                                                        <div className="cell_table col-md-2"> <button className="button btn btn-danger btm-sm" onClick={this.removeFromLiveCourseCart.bind(this, index)}>
                                                            Remove </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <h3>Total :{this.state.total}</h3>
                                            </div>

                                        </div>
                                        <div className="pull-right">
                                            <Stripe total={this.state.total} paymemtSuccess={this.paymemtTrue} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmOrder;
