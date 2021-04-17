import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer';


class Layout extends Component {
    state = {
        showSide: false
    }

    sideClose = () => {
        this.setState({ showSide: false })
    }

    toggle = () => {
        this.setState((prevState)=>{
            return ({ showSide: !prevState.showSide })
        })
    }

    render () {
        return (
            <Aux>
                <SideDrawer show={this.state.showSide} close={this.sideClose} />
                <Toolbar toggle={this.toggle} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;