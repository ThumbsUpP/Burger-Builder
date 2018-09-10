import React from "react";

import buntop from '../../assets/images/buntop.png';
import bunbottom from '../../assets/images/bunbottom.png';

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";


const burger = (props) => {

    let ingredientsArray = Object.keys(props.ingredients).map(ingredientType => {
        return [...Array(props.ingredients[ingredientType])].map((_, index) => {
            return <BurgerIngredient key={ingredientType + index} type={ingredientType} />
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (ingredientsArray.length === 0) {
        ingredientsArray = "Start adding ingredients!"
    }
    

/*     const ingredientsArray = Object.keys(props.ingredients).map((ingredientType, index) => {
        return [...Array(Object.values(props.ingredients)[index])].map((e, i) => <BurgerIngredient key={ingredientType + i} type={ingredientType} />)
    }); */

    return (
        <div className={classes.Burger} >
            <img src={buntop} alt="top slice of burger bun"/>
                {ingredientsArray}
            <img src={bunbottom} alt="bottom slice of burger bun"/>
        </div>
    )
};

export default burger;
