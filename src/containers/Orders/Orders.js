import React, { useEffect } from "react";
import { connect } from "react-redux";
import Order from "../../components/CheckoutSummary/Order/Order";
import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Orders.module.css";

const Orders = (props) => {
  const { onFetchOrders, token, userId } = props;
  
   useEffect(() => {
    onFetchOrders(token, userId);
   }, [onFetchOrders, token, userId]);

    let orders = <Spinner />
    if(!props.loading){
      orders =
        props.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ));
    }
    
    return (
      <div className={classes.OrdersContainer}>
        <p className={classes.OrdersTitle}>Your Orders!</p>
        <div className={classes.Orders}>
          {orders}
        </div>
      </div>
    );
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    month: state.order.month,
    day: state.order.day,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));
