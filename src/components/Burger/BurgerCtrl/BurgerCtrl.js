import React from 'react';
import classes from './BurgerCtrl.css';
import BurgerBtn from './BurgerBtn';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'}
];

const burgerCtrl = (props) => (
    <div className={classes.burgerCtrl}>
        <p>Total Price is: {props.totalPrice.toFixed(2)} </p>
        {controls.map(ctrl=>(
            <BurgerBtn 
            key={ctrl.label} 
            label={ctrl.label} 
            type={ctrl.type} 
            add={() => props.add(ctrl.type)}
            delete={() => props.delete(ctrl.type)} 
            disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={props.orderDisabled}
        onClick={props.purchasing}
        >
            Order
        </button>
    </div>
)

export default burgerCtrl;