import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>
                Current price: <strong>{props.price.toFixed(2)}</strong>
            </p>
            {controls.map((el) => (
                <BuildControl
                    label={el.label}
                    key={el.type}
                    added={() => props.ingredientAdded(el.type)}
                    removed={() => props.ingredientRemoved(el.type)}
                    disabled={props.disabledInfo[el.type]}
                />
            ))}
            <button
                disabled={!props.purchasable}
                className={classes.OrderButton}
                onClick={props.ordering}
            >
                {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
            </button>
        </div>
    );
};

export default buildControls;
