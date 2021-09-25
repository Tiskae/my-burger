import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
    const ingredients = [];
    for (let ingName in props.ingredients) {
        ingredients.push({ name: ingName, amount: props.ingredients[ingName] });
    }

    const ingOutput = ingredients.map((ing) => (
        <span
            key={ing.name}
            style={{
                textTransform: "capitalize",
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px",
            }}
        >
            {ing.name} ({ing.amount})
        </span>
    ));

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingOutput}</p>
            <p>
                Price: <strong>USD {props.price}</strong>
            </p>
        </div>
    );
};

export default order;
