import React from 'react';
import classes from './PopUp.css';
import Aux from '../../hoc/Auxiliary';
import Backdrop from './Backdrop';

const popUp = (props) => {
    const ordersummary = props.purchasing ? 
            <div className={classes.Modal}>
                <div>{props.children}</div>
            </div> : null;
    return <Aux>
        <Backdrop purchasing={props.purchasing} backdrop={props.backdrop} />
        {ordersummary}
    </Aux>
};

export default popUp;