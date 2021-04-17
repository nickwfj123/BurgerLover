import React, { Component } from 'react';

import Button from '../PopUps/Button';
import classes from './ContactData.css';
import axios from '../../axios';
import Spinner from '../PopUps/spinner';
import Input from '../../components/PopUps/Input';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'Cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false
            }
        },
        overallValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.IngOrder)
        this.setState({ loading: true });
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }
        const order = {
            IngOrder: this.props.IngOrder,
            price: this.props.price,
            contactInfo: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    checkValidation(value, rules) {
        let isValid = true;
        if (!rules) {
            return true
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid
    }

    inputChanged = (event, key) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[key]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[key] = updatedFormElement;

        let overallValid = true;
        for (let key in updatedOrderForm) {
            overallValid = updatedOrderForm[key].valid && overallValid;
        }
        this.setState({ orderForm: updatedOrderForm, overallValid });
        console.log(this.state.overallValid)
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            // console.log(key)
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        // console.log(formElementArray)

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementtype={formElement.config.elementType}
                        elementconfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChanged(event, formElement.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.overallValid}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;