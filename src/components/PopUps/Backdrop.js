import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => (
    props.purchasing ? <div className={classes.backdrop} onClick={props.backdrop}></div> : null
);

export default backdrop;