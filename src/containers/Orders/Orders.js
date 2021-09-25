import React, { Component } from "react";
import Order from "../../components/Orders/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    componentDidMount() {
        // axios
        //     .get("/orders.json/")
        //     .then((response) => {
        //         let fetchedOrders = [];
        //         for (let key in response.data) {
        //             fetchedOrders.push({ ...response.data[key], id: key });
        //         }
        //         this.setState({ loading: false, orders: fetchedOrders });
        //         console.log(this.state.orders);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         this.setState({ loading: false });
        //     });
        this.props.onFectchOrders(this.props.authToken, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            this.props.orders.length === 0
                ? (orders = (
                      <p style={{ textAlign: "center" }}>
                          Seems you haven't ordered any burger in the past :(
                      </p>
                  ))
                : (orders = this.props.orders.map((order) => (
                      <Order
                          key={order.id}
                          ingredients={order.ingredients}
                          price={Number.parseFloat(order.price).toFixed(2)}
                      />
                  )));
        }

        return <div>{orders}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        authToken: state.auth.idToken,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFectchOrders: (token, userId) =>
            dispatch(actions.fetchOrders(token, userId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
