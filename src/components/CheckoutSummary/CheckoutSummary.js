import React from "react";
import Burger from "../../components/Burger/Burger";

import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <div className={classes.BurgerSummaryContainer}>
        <Burger 
          className={classes.SummaryBurger}
          ingredients={props.ingredients}
        />
      </div>
    </div>
  );
};

export default CheckoutSummary;
