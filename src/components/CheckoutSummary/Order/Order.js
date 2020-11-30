import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <div
        key={ig.name}
        className={classes.IngredientsListItem}
      >
        {ig.name} ({ig.amount})
      </div>
    );
  });

  return (
    <div className={classes.Order}>
      <FontAwesomeIcon 
        icon={faHamburger} 
        style={{
          color: "#F2A30F",
          fontSize: "30px",
        }}
      />
      <div className={classes.IngredientsList}>
      <p>Ingredients:</p> 
        {ingredientOutput}
      </div>
      <p className={classes.OrderPrice}>
        <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
