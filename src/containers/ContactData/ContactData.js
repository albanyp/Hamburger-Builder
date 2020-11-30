import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faMotorcycle, 
  faUserCheck,
  faRoad,
  faMapMarkedAlt,
  faMobileAlt,
  faBicycle,
} from '@fortawesome/free-solid-svg-icons'

import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { updateObject, checkValidity} from "../../shared/utility";
import * as actions from "../../store/actions/index";


const ContactData = (props) => {
  const history = useHistory();
  const [orderForm, setOrderForm] = useState({ 
    name: {
      elementType: "input",
      elementConfig: {
        type:"text",
        placeholder: "Your Name"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      icon: faUserCheck,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type:"text",
        placeholder: "Street"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      icon: faRoad,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type:"text",
        placeholder: "ZIP Code"
      },

      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
      icon: faMapMarkedAlt,
    },
    phone: {
      elementType: "input",
      elementConfig: {
        type:"number",
        placeholder: "Phone Number"
      },
      value: "",
      validation: {
        required: true,
        minLength: 10,
        maxLength: 10,
      },
      valid: false,
      touched: false,
      icon: faMobileAlt,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [{value: "fastest", displayValue: "Fastest"},
                  {value: "cheapest", displayValue: "Cheapest"}]
      },
      value: "Fastest",
      validation: {},
      valid: true,
      icon: faBicycle,
    },
  });
  
  const [formIsValid, setFormIsValid] = useState(false)

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for(let formElementIdentifier in orderForm){
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };
      
    props.onOrderBurger(order, props.token);
    history.push("/");
  };

  const formElementsArray = [];
    for(let key in orderForm){
      formElementsArray.push({
        id: key,
        config: orderForm[key],
      });
    };

    const inputChangeHandler = (event, inputIdentifier) => {

      const updatedFormElement = updateObject(orderForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, orderForm[inputIdentifier]),
        touched: true,
      });
  
      const updatedOrderForm = updateObject(orderForm, {
        [inputIdentifier]: updatedFormElement,
      });
  
      let formIsValid = true;
  
      for(let inputIdentifier in updatedOrderForm){
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
  
      setOrderForm(updatedOrderForm);
      setFormIsValid(formIsValid);
    }  

    let form = (
      <form 
        className={classes.FormContainer}
        onSubmit={orderHandler}
      >
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            icon={formElement.config.icon}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value} 
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button disabled={!formIsValid} btnType="Success">
          ORDER
        </Button>
      </form>
    );

    if (props.loading) {
      form = <Spinner />;
    }

    const iconStyle = {color: "#f2a30f", fontSize: "32px"}

    return (
      <div className={classes.ContactDataContainer}>
        <div className={classes.ContactData}>
          <div className={classes.FormTitle}>You're almost there!</div>
            <FontAwesomeIcon 
              icon={faMotorcycle} 
              style={iconStyle}
            />
          {form}
        </div>
      </div>
    );
  }


const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));
