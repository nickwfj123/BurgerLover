import React, { Component } from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    let IngsArray = [];
    props.IngOrder.map((e, index) => {
        IngsArray.push(<BurgerIngredient key={index} type={e} />)
    })

    if (IngsArray.length === 0) {
        IngsArray = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top" />
            {IngsArray}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;