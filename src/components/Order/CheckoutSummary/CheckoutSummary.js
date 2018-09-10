import React from 'react';

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary} >
            <h2>Here's your Shack Burger!</h2>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
            btnType="Success"
            click={props.checkoutContinue} >ORDER NOW</Button>
            <Button
            btnType="Danger"
            click={props.checkoutCancel} >CANCEL</Button>
        </div>
    );
}
 
export default checkoutSummary;