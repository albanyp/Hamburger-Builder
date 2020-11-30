import React from "react";
import classes from "./OrderSummary.module.css";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(
      (ingKey) => {
        return (
          <li key={ingKey}>
            <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
            {props.ingredients[ingKey]}
          </li>
        );
      }
    );
    return (
      <div className={classes.OrderSummary}>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
        </p>
        <Button clicked={props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
        <Button clicked={props.purchaseCancelled} btnType="Danger">
          CANCEL
        </Button>
      </div>
    );
  };

export default OrderSummary;
