import React from 'react';
import classes from './items.css';
import { NavLink } from 'react-router-dom';

const items = (props) => (
    <ul className={classes.items}>
        <li className={classes.singleItem}>
            <NavLink to='/' exact activeClassName={classes.active}>Build Burger</NavLink>
        </li>
        <li className={classes.singleItem}>
            <NavLink to='/Orders' activeClassName={classes.active}>Check Out</NavLink>
        </li>
    </ul>
);

export default items;