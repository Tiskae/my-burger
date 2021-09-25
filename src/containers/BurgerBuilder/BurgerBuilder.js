import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {...}
    // }

    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((el) => ingredients[el])
            .reduce((acc, currVal) => acc + currVal, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(
        //         encodeURIComponent(i) +
        //             "=" +
        //             encodeURIComponent(this.state.ingredients[i])
        //     );
        // }
        // queryParams.push("price=" + this.state.totalPrice);
        // const queryString = queryParams.join("&");
        this.props.onPurchaseInit();
        this.props.history.push({
            pathname: "/checkout",
            // search: "?" + queryString,
        });
    };

    render() {
        const disabledInfo = { ...this.props.ings };

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? (
            <p style={{ textAlign: "center" }}>
                ingredients cannot be fetched!
            </p>
        ) : (
            <Spinner />
        );
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordering={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );
        }

        let orderSummary = <Spinner />;

        if (this.props.ings)
            orderSummary = (
                <OrderSummary
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.props.ings}
                    totalPrice={this.props.price}
                />
            );

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    backdropClicked={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) =>
            dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) =>
            dispatch(actions.setAuthPathRedirect(path)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
