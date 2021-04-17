import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]

    let errorInfo = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        errorInfo = <p className={classes.errorInfo}>Info Can't Be Empty! :(</p>
            if (props.shouldValidate.minLength) {
                errorInfo = <p className={classes.errorInfo}>ZIP Code Must Be 5 Digits!</p>
            }
    }

    switch (props.elementtype) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementconfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementconfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementconfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementconfig}
                value={props.value}
                onChange={props.changed}
            />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {errorInfo}
        </div>
    );

};

export default input;