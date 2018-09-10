import React from 'react';

import classes from "./Order.module.css";

const order = (props) => {

    const ingredients = [];

    for (let key in props.ingredients) {
        ingredients.push({
            name: key, 
            amount: props.ingredients[key]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return (
            <span key={ig.name} style={{textTransform: "capitalize", display: "inline-block", margin: "0 .5rem", padding:"5px", border: "1px solid #ccc", borderRadius: "3px"}}>
                {ig.name} {ig.amount}
            </span>
        ); 
    })

    return (
        <div className={classes.Order} >
            <p>Ingredients:{ingredientOutput} </p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
}
 
export default order;