import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactData from './ContactData';
import CheckoutSummary from '../Order/CheckoutSummary'

import { connect } from 'react-redux';


class Checkout extends Component {
    // state = {
    //     IngOrder: [],
    //     price: 0
    // }

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const IngOrder = [];
    //     let price = 0;
    //     for ( let i of query.entries() ) {
    //         if (i[0] === 'price') {
    //             price = +i[1];
    //         } else {
    //             IngOrder.push(i[0])
    //         }
    //     }
    //     this.setState({ IngOrder, price })       
    // }

    checkoutCancel = () => {
        this.props.history.goBack()
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                IngOrder={this.props.ingOrder} 
                checkoutCancel={this.checkoutCancel} 
                checkoutContinue={this.checkoutContinue}
                />
                <Route path={this.props.match.path + '/contact-data'}
                component={ContactData}/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        ingOrder: state.ingOrder,
        price: state.totalPrice
    }
} 

export default connect(mapStateToProps)(Checkout);