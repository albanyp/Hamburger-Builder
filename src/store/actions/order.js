import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders"

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
}

export const purchaseBurgerFailed = (error) => {
    console.log(error);
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error,
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => { 
        dispatch(purchaseBurgerStart());
        console.log(token);
        axios
        .post(`/orders.json?auth=${token}`, orderData)
        .then((response) => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch((error) => {
            dispatch(purchaseBurgerFailed(error));
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        console.log(token);
        console.log(userId);
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        console.log(queryParams);
        console.log(`/orders.json${queryParams}`)
        axios
        .get(`/orders.json${queryParams}`)
        .then((response) => {
            console.log(response.data);
          const fetchedOrders = [];
          for (let key in response.data) {
            fetchedOrders.push({ ...response.data[key], id: key });
          }
          dispatch(fetchOrderSuccess(fetchedOrders))
        })
        .catch((err) => {
            dispatch(fetchOrdersFailed(err));
        });
    }
}