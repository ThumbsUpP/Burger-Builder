import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {

    state = {
        order: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    orderHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                order: true
            });
        } else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }

    }

    orderContinueHandler = () => {
        this.props.onInitOrder();
        this.props.history.push("/checkout");
    }

    orderCancelHandler = () => {
        this.setState({
            order: false
        })
    }
    
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    render() {

        const disabledInfo = {...this.props.ingrdnts};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null

        let burger = <Spinner />;

        if (this.props.ingrdnts) {
            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ingrdnts}
                    orderCancel={this.orderCancelHandler}
                    orderContinue={this.orderContinueHandler} 
                    totalPrice={this.props.price} />
            );
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingrdnts}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        quantity={this.props.ingrdnts}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ingrdnts)}
                        order={this.orderHandler}
                        isAuth={this.props.isAuthenticated} />
                </React.Fragment>    
            );
        }

        return (
            <React.Fragment>
                <Modal 
                show={this.state.order}
                modalClosed={this.orderCancelHandler} >
                {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingrdnts: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrdntName) => dispatch(actions.addIngredient(ingrdntName)),
        onIngredientRemoved: (ingrdntName) => dispatch(actions.removeIngredient(ingrdntName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitOrder: () => dispatch(actions.orderInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));