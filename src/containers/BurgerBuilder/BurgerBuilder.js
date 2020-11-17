import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios-orders";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal.js";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner.js";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";
import classes from "./BurgerBuilder.module.css";

const BurgerBuilder = ( props ) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients;
  });

  const price = useSelector(state => {
    return state.burgerBuilder.totalPrice;
  });

  const error = useSelector(state => {
    return state.burgerBuilder.error;
  });

  const isAuthenticated = useSelector(state => {
    return state.auth.token !== null;
  });

  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientDeleted = (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(() => actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
  
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sum, currentEl) => {
        return sum + currentEl;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if(isAuthenticated){
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };
  
    const disabledInfo = {
      ...ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (ings) {
      burger = (
        <div className={classes.BurgerBuilderLayout}>
          <BuildControls 
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientDeleted}
            disabled={disabledInfo}
            totalPrice={price}
            purchasable={updatePurchase(ings)}
            ordered={purchaseHandler}
            isAuth={isAuthenticated}
            className={classes.BuildControlsLayout}
          />
          <Burger 
            ingredients={ings} 
            className={classes.BurgerLayout}
          />
        </div>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ings}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          totalPrice={price}
        />
      );
      if (props.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <div>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }

// const mapStateToProps = state => {
//   return {
//     ings: state.burgerBuilder.ingredients,
//     price: state.burgerBuilder.totalPrice,
//     error: state.burgerBuilder.error,
//     isAuthenticated: state.auth.token !== null,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//     onIngredientDeleted: (ingName) => dispatch(actions.removeIngredient(ingName)),
//     onInitIngredients: () => dispatch(actions.initIngredients()),
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//     onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
//   }
// }

export default WithErrorHandler(BurgerBuilder, axios);
 
// export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
