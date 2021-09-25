import { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderActions from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your name",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                fieldName: "name",
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your street",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                fieldName: "street",
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Your ZIP code",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
                fieldName: "zip code",
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your country",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                fieldName: "country",
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your email",
                },
                value: "",
                validation: {
                    isEmail: true,
                    required: true,
                },
                valid: false,
                touched: false,
                fieldName: "e-mail",
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" },
                    ],
                },
                value: "fastest",
                validation: {},
            },
        },
    };

    orderHandler = (event) => {
        event.preventDefault();
        // alert("Ordered successfully!");
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] =
                this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId,
        };

        this.props.onOrderBurger(this.props.token, order);
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(
            this.state.orderForm[inputIdentifier],
            {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    this.state.orderForm[inputIdentifier].validation
                ),
                touched: true,
            }
        );

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement,
        });
        this.setState({ orderForm: updatedOrderForm });
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map((el) => (
                    <Input
                        key={el.id}
                        elementName={el.config.fieldName}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        changed={(event) =>
                            this.inputChangedHandler(event, el.id)
                        }
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                    />
                ))}
                <Button btnType="Success">ORDER NOW</Button>
            </form>
        );
        if (this.props.loading) form = <Spinner />;
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (token, orderData) =>
            dispatch(orderActions.purchaseBurger(token, orderData)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(ContactData, axios));
