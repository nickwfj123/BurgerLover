import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Button from './Button';



const orderSummary = (props) => {
    let IngsArray = [];
    for (let Ing in props.ingredients) {
        IngsArray.push(<li key={Ing} style={{ fontWeight: "bold" }}> {Ing}: {props.ingredients[Ing]} </li>)
    }
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredient:</p>
            <ul>
                {IngsArray}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>check out?</p>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;