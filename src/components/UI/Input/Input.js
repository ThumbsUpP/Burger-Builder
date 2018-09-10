import React from 'react';

import classes from "./Input.module.css";

const input = (props) => {

    let inputElement = null;

    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push([classes.Invalid])
    }

    switch (props.elementType) {
        case ("input"):
            inputElement = <input 
                onChange={props.change}
                className={inputClasses.join(" ")} 
                {...props.elementConfig} 
                value={props.value} />;
            break;
        case ("textarea"):
            inputElement = <textarea 
                onChange={props.change}
                className={inputClasses.join(" ")} 
                {...props.elementConfig} 
                value={props.value} />;
            break;
        default:
            inputElement = <input 
                onChange={props.change}
                className={inputClasses.join(" ")} 
                {...props.elementConfig} 
                value={props.value} />;      
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}
 
export default input;