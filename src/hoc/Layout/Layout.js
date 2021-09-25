import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../Auxilliary/Auxilliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/Toolbar/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSidedraw: false,
    };

    sidedrawOpenHandler = () => {
        this.setState({ showSidedraw: true });
    };

    sidedrawCloseHandler = () => {
        this.setState({ showSidedraw: false });
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    showSidedraw={this.sidedrawOpenHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSidedraw}
                    closed={this.sidedrawCloseHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null ? true : false,
    };
};

export default connect(mapStateToProps)(Layout);
