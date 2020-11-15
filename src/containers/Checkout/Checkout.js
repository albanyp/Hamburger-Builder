import React from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";
import { connect } from "react-redux";
// import * as actions from "../../store/actions/index";

const Checkout = (props) => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.push({ pathname: "/checkout/contact-data" });
  };

    let summary = <Redirect to="/" />
    if(props.ings) {
      const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={props.ings}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutContinuedHandler}
          />
          <Route
            path={`${props.match.path}/contact-data`}
            component={ContactData}
          />
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


/*
- If mapDispatchToProps had to be used, mapStateToProps
  should be passed as null, since mapDispatchToProps
  needs to be second argument
  connect(null, mapDispatchToProps)(Checkout);


*/