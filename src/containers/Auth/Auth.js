import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";

import classes from "./Auth.module.css";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your email",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
                fieldName: "email",
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Your password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 7,
                },
                valid: false,
                touched: false,
                fieldName: "password",
            },
        },

        isSignup: true,
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControl = updateObject(this.state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity(
                event.target.value,
                this.state.controls[controlName].validation
            ),
            touched: true,
        });

        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updatedControl,
        });

        this.setState({ controls: updatedControls });
    };

    swicthAuthModeHandler = () => {
        this.setState((prevState) => ({ isSignup: !prevState.isSignup }));
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        const form = formElementArray.map((formEl) => (
            <Input
                key={formEl.id}
                elementName={formEl.config.fieldName}
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value}
                changed={(event) => {
                    this.inputChangedHandler(event, formEl.id);
                }}
                invalid={!formEl.config.valid}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
            />
        ));

        const containerClassesArr = [classes.Container];
        if (this.props.authLoading) containerClassesArr.push(classes.Light);
        const containerClasses = containerClassesArr.join(" ");

        const spinnerClassesArr = [classes.Spinner];
        if (this.props.authLoading) spinnerClassesArr.push(classes.Show);
        const spinnerClasses = spinnerClassesArr.join(" ");

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p className={classes.ErrorMessage}>
                    {this.props.error.message}
                </p>
            );
        }

        let authRedirect = null;
        if (this.props.token !== null) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={containerClasses}>
                {authRedirect}
                <div className={spinnerClasses}>
                    <Spinner />
                </div>
                <h2>{this.state.isSignup ? "SIGN UP" : "SIGN IN"}</h2>
                {errorMessage}
                <form className={classes.Form} onSubmit={this.submitHandler}>
                    {form}
                    <div className={classes.ButtonsContainer}>
                        <Button btnType="Success">SUBMIT</Button>
                        <Button
                            clicked={(e) => {
                                e.preventDefault();
                                this.swicthAuthModeHandler();
                            }}
                            btnType="Danger"
                        >
                            SWITCH TO{" "}
                            {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authLoading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.idToken,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthPathRedirect("/")),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
