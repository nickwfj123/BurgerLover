import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerCtrl from '../../components/Burger/BurgerCtrl/BurgerCtrl';
import PopUp from '../../components/PopUps/PopUp';
import OrderSummary from '../../components/PopUps/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/PopUps/spinner';
import errorHandler from '../../hoc/ErrorHandler';

import { connect } from 'react-redux';
import * as actionTypes from '../../redux/action'; 

class BurgerBuildr extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        purchasing: false,
        // IngOrder: [],
        loading: false,
        error: false
    }

    // componentDidMount() {
    //     axios.get('https://burgerlover-48558-default-rtdb.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             let IngOrder = [ ...this.state.IngOrder ];
    //             for (let ing in response.data) {
    //                 for (let i = 0; i < response.data[ing]; i++) {
    //                     IngOrder.push(ing)
    //                 }
    //             }
    //             this.setState({ ingredients: response.data, IngOrder });
    //         })
    //         .catch(error => {
    //             this.setState({ error: true })
    //         })
    // }

    purchasing = () => {
        this.setState({ purchasing: true })
    }

    backdrop = () => {
        this.setState({ purchasing: false })
    }


    // pass data through query
    // continue = () => {
    //     const queryParams = [];
    //     for (let i of this.props.ingOrder) {
    //         queryParams.push(encodeURIComponent(i));
    //     }
    //     queryParams.push('price=' + this.props.price )
    //     const queryString = queryParams.join('&');
    //     this.props.history.push({
    //         pathname: '/checkout',
    //         search: queryString
    //     })
    // }

    continue = () => {
        this.props.history.push('/checkout');
    }

    orderDisabled = (ings) => {
        const ingredients = ings;
        let sum = 0;
        for (let ing in ingredients) {
            sum = sum + ingredients[ing];
        }
        return sum <= 0
    }

    // addIngHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIng = { ...this.state.ingredients };
    //     updatedIng[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const newPrice = this.state.totalPrice + priceAddition;

    //     const IngOrder = [...this.state.IngOrder]
    //     IngOrder.push(type)

    //     this.setState({ ingredients: updatedIng, totalPrice: newPrice, IngOrder })
    //     this.orderDisabled(updatedIng);
    // }

    // deleteIngHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     // if (oldCount > 0) {
    //     const updatedCount = oldCount - 1;
    //     const updatedIng = { ...this.state.ingredients };
    //     updatedIng[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICE[type];
    //     const newPrice = this.state.totalPrice - priceDeduction;

    //     const IngOrder = [...this.state.IngOrder]
    //     const index = IngOrder.indexOf(type);
    //     if (index > -1) {
    //         IngOrder.splice(index, 1)
    //     }

    //     this.setState({ ingredients: updatedIng, totalPrice: newPrice, IngOrder })
    //     this.orderDisabled(updatedIng);
    // }


    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let ordersummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded......</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger IngOrder={this.props.ingOrder} />
                    <BurgerCtrl
                        add={this.props.Add}
                        delete={this.props.Remove}
                        disabled={disabledInfo}
                        totalPrice={this.props.price}
                        orderDisabled={this.orderDisabled(this.props.ings)}
                        purchasing={this.purchasing} />
                </Aux>
            );
            ordersummary = <OrderSummary
                ingredients={this.props.ings}
                cancel={this.backdrop}
                continue={this.continue}
                price={this.props.price} />;
        }

        if (this.state.loading) {
            ordersummary = <Spinner />
        }

        return (
            <Aux>
                <PopUp purchasing={this.state.purchasing} backdrop={this.backdrop}>
                    {ordersummary}
                </PopUp>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        ingOrder: state.ingOrder,
        price: state.totalPrice
    }
} 


const mapDispatchToProps = dispatch => {
    return {
        Add: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingName}),
        Remove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuildr, axios));