import React, {Component} from 'react';
import { connect } from "react-redux";

import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

import classes from "./ContactData.module.css";

class ContactData extends Component {

    state = {
        orderForm: {
                name: {
                    elementType: "input",
                    elementConfig: {
                        type: "text",
                        placeholder: "Name"
                    },
                    value: "",
                    validationRules: {
                        required: true,
                        minLength: 2,
                        maxLength: 30
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: "input",
                    elementConfig: {
                        type: "text",
                        placeholder: "Address"
                    },
                    value: "",
                    validationRules: {
                        required: true,
                        minLength: 7,
                        maxLength: 40
                    },
                    valid: false,
                    touched: false
                },
                city: {
                    elementType: "input",
                    elementConfig: {
                        type: "text",
                        placeholder: "City"
                    },
                    value: "",
                    validationRules: {
                        required: true,
                        minLength: 2,
                        maxLength: 25
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: "input",
                    elementConfig: {
                        type: "text",
                        placeholder: "Zip Code"
                    },
                    value: "",
                    validationRules: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: "input",
                    elementConfig: {
                        type: "email",
                        placeholder: "email@domain.com"
                    },
                    value: "",
                    validationRules: {
                        required: true,
                        minLength: 7,
                        maxLength: 30
                    },
                    valid: false,
                    touched: false
                },
        },
        formIsValid: false,
    }

    componentDidMount() {
        window.scrollTo(0,document.body.scrollHeight);
    }

    confirmOrderHandler = (event) => { // Useful to prevent reloading on submit, for e.g.
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; 
        }

        const order = {
            ingredients: this.props.ingrdnts,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    checkValidity = (value, rules) => {
        let isValid= true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        // cloning the orderForm state to avoid mutating of the original state
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        // cloning deeper to access the inputIdentifier (=elementType, elementConfig, value) without mutating the original state
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validationRules);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }

    render() { 
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        
        let form = (
            <form onSubmit={this.confirmOrderHandler} >
                {formElementsArray.map(el => {
                    return (
                        <Input
                            key={el.id}
                            elementType={el.config.elementType}
                            elementConfig={el.config.elementConfig}
                            value={el.config.value}
                            change={(event) => this.inputChangeHandler(event, el.id)}
                            invalid={!el.config.valid}
                            shouldValidate={el.config.validationRules}
                            touched={el.config.touched} />
                        );
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER NOW</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact information:</h4>
                {form}
            </div>
        );
    }
}
 
const mapStateToProps = state => {
    return {
        ingrdnts: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.orderBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));