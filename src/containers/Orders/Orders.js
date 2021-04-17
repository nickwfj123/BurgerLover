import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../hoc/ErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true 
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res=> {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }

                for ( let i of fetchedOrders) {
                    const IngCounts = [];
                    for ( let j of i.IngOrder) {
                        j in IngCounts ? IngCounts[j] += 1 : IngCounts[j] = 1
                   }
                   i.IngOrder = IngCounts
                // console.log(IngCounts)
                }
                // console.log(fetchedOrders)
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch( error => {
                this.setState({loading: false});
            })
    }


    render() {
        return (
            <div>

                {this.state.orders.map(order => (
                    <Order
                    key={order.id}
                    IngOrder ={order.IngOrder}
                    price={order.price}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);