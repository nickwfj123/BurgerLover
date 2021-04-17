import React from 'react';
import classes from './BurgerBtn.css';

const burgerBtn = (props) => (
    <div className={classes.burgerBtn}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.delete} disabled={props.disabled}><strong>-</strong></button>
        <button className={classes.More} onClick={props.add}><strong>+</strong></button>
    </div>
);

export default burgerBtn;