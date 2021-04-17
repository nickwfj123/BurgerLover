import React from 'react';
import classes from './CheckoutSummary.css';
import Button from '../PopUps/Button';
import Burger from '../Burger/Burger';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ margin:'auto'}}>
                <Burger IngOrder={props.IngOrder}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
        
    )
}

export default checkoutSummary;