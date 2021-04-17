import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import catLogo from '../../assets/images/cat2.jpg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height:props.height, marginBottom:props.margin}}>
        <img src={burgerLogo} alt="" />
        {/* <img src={catLogo} alt="" /> */}
    </div>
);

export default logo;