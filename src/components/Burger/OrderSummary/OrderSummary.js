import React from 'react';

import Button from "../../UI/Button/Button";

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map( key => {
        return (
            <li key={key}>
            <span style={{textTransform: "capitalize"}} >{key}</span>: {props.ingredients[key]}
            </li>
        )
    });

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>Delicious <strong>Shack Burger</strong> with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong> Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <div style={{display: "flex", justifyContent: "center"}}>
            <Button btnType="Danger" click={props.orderCancel}>CANCEL</Button>
            <Button btnType="Success" click={props.orderContinue}>CHECKOUT</Button>
            </div>
        </React.Fragment>
    )
};
 
export default orderSummary;