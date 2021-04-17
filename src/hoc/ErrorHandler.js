import React, { Component } from 'react';
import PopUp from '../components/PopUps/PopUp';
import Aux from './Auxiliary';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error:null })
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(null, error => {
                this.setState({ error })
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmed = () => {
            this.setState({ error: null})
        }

        render() {
            return (
                <Aux>
                    <PopUp 
                    purchasing={this.state.error}
                    backdrop={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </PopUp>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

    export default errorHandler;