import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Suspense fallback={<Spinner />}>
                    <Route path="/auth" component={Auth} />
                </Suspense>
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Suspense fallback={<Spinner />}>
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/auth" component={Auth} />
                    </Suspense>
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div className="App">
                <Layout>{routes}</Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoLogin: () => dispatch(actions.authCheckState()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
