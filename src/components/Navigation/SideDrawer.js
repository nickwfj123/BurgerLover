import React from 'react';
import Logo from './Logo';
import Items from './Items';
import classes from './SideDrawer.css';
import Backdrop from '../PopUps/Backdrop';
import Aux from '../../hoc/Auxiliary';

const sideDrawer = (props) => {
    let sideMove = [classes.sideDrawer, classes.Close];
    if (props.show) {
        sideMove = [classes.sideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop purchasing={props.show} backdrop={props.close} />
            <div className={sideMove.join(' ')}>
                <Logo height="11%" margin="15px" />
                <nav>
                    <Items />
                </nav>
            </div>
        </Aux>
    )
};

export default sideDrawer;