import React from 'react';
import classes from './Toolbar.css';
import Logo from './Logo';
import Items from './Items';
import Menu from './Menu'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Menu toggle={props.toggle}/>
        <Logo height="85%" />
        <nav className={classes.disapear}>
            <Items />
        </nav>
    </header>
)

export default toolbar;