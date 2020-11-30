import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";

import classes from "./Checkout.module.css";

const Checkout = (props) => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.push({ pathname: "/checkout/contact-data" });
  };

    let summary = <Redirect to="/" />
    if(props.ings) {
      summary = (
        <div className={classes.Checkout}>
          <CheckoutSummary
            className={classes.Summary}
            ingredients={props.ings}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutContinuedHandler}
          />
          <ContactData className={classes.ContactData}/>
        </div>
      );
    }

    return (
      <div>
        {summary}
      </div>
    )
  }

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  }
}


export default connect(mapStateToProps)(Checkout);