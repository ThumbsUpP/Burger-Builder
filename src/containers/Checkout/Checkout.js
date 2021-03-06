import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() { 
        let summary = <Redirect to="/" />
        if (this.props.ingrdnts) {
            const orderedRedirect = this.props.ordered ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {orderedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ingrdnts}
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler} />
                    <Route 
                    path={this.props.match.path + "/contact-data"} 
                    component={ContactData} />
                </div>
            )
        }
        return summary;
    };
};

const mapStateToProps = state => {
    return {
        ingrdnts: state.burgerBuilder.ingredients,
        ordered: state.order.ordered
    };
};
 
export default connect(mapStateToProps)(Checkout);