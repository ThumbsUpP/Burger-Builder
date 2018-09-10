import React from "react";

import classes from "./BuildControl.module.css";

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
                <div className={classes.Button}>
                    <button 
                    className={classes.Less} 
                    onClick={props.ingredientRemoved} 
                    disabled={props.disabled} >-</button>
                    <span>{props.quantity}</span>
                    <span
                    className={classes.More} 
                    onClick={props.ingredientAdded} ><strong>+</strong></span>
                </div>
        </div>
    )
};

export default buildControl;