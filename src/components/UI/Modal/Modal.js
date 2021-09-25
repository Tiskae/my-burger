import React, { Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilliary/Auxilliary";

class Modal extends Component {
    state = {
        showBackdrop: false,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children
        );
    }

    // componentWillUpdate() {
    //     console.log("[Modal.js] componentWillUpdate");
    // }

    toggleBackdropHandler = () => {
        this.setState((prevState) => ({
            showBackdrop: !prevState.showBackdrop,
        }));
        this.props.backdropClicked();
    };

    render() {
        return (
            <Aux>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show
                            ? "translateY(0)"
                            : "translateY(-100%)",
                        opacity: this.props.show ? "1" : "0",
                        visibility: this.props.show ? "visible" : "hidden",
                    }}
                >
                    {this.props.children}
                </div>
                <Backdrop
                    show={this.props.show}
                    clicked={this.toggleBackdropHandler}
                />
            </Aux>
        );
    }
}

export default Modal;
