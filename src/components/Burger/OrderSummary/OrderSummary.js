import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Button from "../../UI/Button/Button";
import { withRouter } from "react-router-dom";

class OrderSummary extends Component {
    // This can be afunctional component not necessarily need to be a class
    // componentWillUpdate() {
    //     console.log("[OrderSummary] willUpdate");
    // }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            (igKey) => (
                <li key={igKey}>
                    <span style={{ textTransform: "capitalize" }}>{igKey}</span>
                    : {this.props.ingredients[igKey]}
                </li>
            )
        );

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p>
                    <strong>Total Price:</strong>{" "}
                    {this.props.totalPrice.toFixed(2)}
                </p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
                    CANCEL
                </Button>
                <Button
                    btnType="Success"
                    clicked={this.props.purchaseContinued}
                >
                    CONTINUE
                </Button>
            </Aux>
        );
    }
}

export default withRouter(OrderSummary);
