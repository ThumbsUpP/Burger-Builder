import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
];

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginTop: "1rem"
}
    
const buildControls = (props) => {
    return (
        <div className={classes.BuildControls} >
            <div style={containerStyle}>
                {controls.map(control => {
                    return <BuildControl 
                        key={control.type} 
                        label={control.label} 
                        ingredientAdded={() => props.ingredientAdded(control.type)}
                        ingredientRemoved={() => props.ingredientRemoved(control.type)}
                        quantity={props.quantity[control.type]}
                        disabled={props.disabled[control.type]} />
                })}
                <p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
                <button 
                    className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.order} >{props.isAuth ? "ORDER NOW" : "SIGN UP AND ORDER NOW"}</button>
            </div>    
        </div>
    )
};

export default buildControls;