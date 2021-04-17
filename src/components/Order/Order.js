import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const Ings = [];
    for (let IngName in props.IngOrder) {
        Ings.push({
            name: IngName,
            amount: props.IngOrder[IngName]
        })
    }

    const IngsOutput = Ings.map(ig => {
        return <span
            style={{
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }} key={ig.name}> {ig.name} {ig.amount} </span>
    })
    // console.log(Ings)

    return (
        <div className={classes.Order}>
            <p>Ingredients: {IngsOutput}</p>
            <p>Price: <strong>${props.price.toFixed(1)}</strong></p>
        </div>
    )
}

export default Order;