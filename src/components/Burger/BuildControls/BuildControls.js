import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad", price: 0.5},
  { label: "Bacon", type: "bacon", price: 0.7},
  { label: "Cheese", type: "cheese", price: 0.4},
  { label: "Meat", type: "meat", price: 1.3},
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <div className={classes.BuildControlsTitleContainer}>
      <p className={classes.BuildControlsTitle}>Pick your best burger!</p>
    </div>
    {controls.map((ctrl) => (
      <BuildControl
        price={ctrl.price}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        key={ctrl.label}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
      />
    ))}

    <p className={classes.Price}>
      Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
    </p>

    <button
      className={classes.OrderButton}
      onClick={props.ordered}
      disabled={!props.purchasable}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
    </button>
  </div>
);

export default BuildControls;
