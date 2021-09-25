import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
    let inputEl = null;
    let errorEl = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        errorEl = (
            <p className={classes.ErrorMessage}>
                Please enter a valid {props.elementName}
            </p>
        );
    }

    switch (props.elementType) {
        case "input":
            inputEl = (
                <input
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;

        case "textarea":
            inputEl = (
                <textarea
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case "select":
            inputEl = (
                <select
                    className={inputClasses.join(" ")}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map((el) => (
                        <option key={el.value} value={el.value}>
                            {el.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputEl = (
                <input
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
            {errorEl}
        </div>
    );
};

export default input;
