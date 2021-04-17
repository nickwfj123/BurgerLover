import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerCtrl from '../../components/Burger/BurgerCtrl/BurgerCtrl';
import PopUp from '../../components/PopUps/PopUp';
import OrderSummary from '../../components/PopUps/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/PopUps/spinner';
import errorHandler from '../../hoc/ErrorHandler';


const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 1.0,
    cheese: 0.5,
    meat: 1.0
}

class BurgerBuildr extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        orderDisabled: true,
        purchasing: false,
        IngOrder: [],
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burgerlover-48558-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                let IngOrder = [ ...this.state.IngOrder ];
                for (let ing in response.data) {
                    for (let i = 0; i < response.data[ing]; i++) {
                        IngOrder.push(ing)
                    }
                }
                this.setState({ ingredients: response.data, IngOrder });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    purchasing = () => {
        this.setState({ purchasing: true })
    }

    backdrop = () => {
        this.setState({ purchasing: false })
    }

    continue = () => {
        const queryParams = [];
        for (let i of this.state.IngOrder) {
            queryParams.push(encodeURIComponent(i));
        }
        queryParams.push('price=' + this.state.totalPrice )
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        })
    }

    orderDisabled = (ings) => {
        const ingredients = ings;
        let sum = 0;
        for (let ing in ingredients) {
            sum = sum + ingredients[ing];
            this.setState({ orderDisabled: sum <= 0 })
        }
    }

    addIngHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIng = { ...this.state.ingredients };
        updatedIng[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICE[type];
        const newPrice = this.state.totalPrice + priceAddition;

        const IngOrder = [...this.state.IngOrder]
        IngOrder.push(type)

        this.setState({ ingredients: updatedIng, totalPrice: newPrice, IngOrder })
        this.orderDisabled(updatedIng);
    }

    deleteIngHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // if (oldCount > 0) {
        const updatedCount = oldCount - 1;
        const updatedIng = { ...this.state.ingredients };
        updatedIng[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICE[type];
        const newPrice = this.state.totalPrice - priceDeduction;

        const IngOrder = [...this.state.IngOrder]
        const index = IngOrder.indexOf(type);
        if (index > -1) {
            IngOrder.splice(index, 1)
        }

        this.setState({ ingredients: updatedIng, totalPrice: newPrice, IngOrder })
        this.orderDisabled(updatedIng);
    }


    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }


        let ordersummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded......</p> : <Spinner />;


        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger originalIng={this.state.originalIng} IngOrder={this.state.IngOrder} />
                    <BurgerCtrl
                        add={this.addIngHandler}
                        delete={this.deleteIngHandler}
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        orderDisabled={this.state.orderDisabled}
                        purchasing={this.purchasing} />
                </Aux>
            );
            ordersummary = <OrderSummary
                ingredients={this.state.ingredients}
                cancel={this.backdrop}
                continue={this.continue}
                price={this.state.totalPrice} />;
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

export default errorHandler(BurgerBuildr, axios);