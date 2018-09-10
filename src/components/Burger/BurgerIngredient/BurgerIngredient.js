import React from "react";

import classes from "./BurgerIngredient.module.css";

import bacon from '../../../assets/images/bacon.png';
import salad from '../../../assets/images/salad.png';
import cheese from '../../../assets/images/cheese.png';
import meat from '../../../assets/images/beef.png';

const burgerIngredient = (props) => {
    let ingredient = null;

    switch(props.type) {
        case ("meat"):
            ingredient = <img src={meat} alt="meat"/>;
            break;
        case ("cheese"):
            ingredient = <img style={classes} src={cheese} alt="slice of cheese"/>;
            break;
        case ("salad"):
            ingredient = <img src={salad} alt="salad"/>;
            break;
        case ("bacon"):
            ingredient = <img src={bacon} alt="slice of bacon"/>;
            break;
        default:
            ingredient = null;
    }
    
    return ingredient;
};

export default burgerIngredient;