import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { withRouter } from "react-router-dom";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient key={ingKey + 1} type={ingKey} />;
      });
    })
    .reduce((arr, currentValue) => {
      return arr.concat(currentValue);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);

/*
- The withRouter object is used when you need the props
  of a component that's loaded using a Route

*/
