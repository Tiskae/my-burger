import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Orders/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
    // componentWillMount() {

    // REDUX now got this covered 😎😎😎

    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // ["salad", "1"]
    //         if (param[0] === "price") {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     this.setState({ ingredients, totalPrice: price });
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.push("/checkout/contact-data");
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? (
                <Redirect to="/" />
            ) : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ings}
                    />
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData}
                    />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
};

// matchDispatchToProps got nerfed 😒
export default connect(mapStateToProps)(Checkout);
