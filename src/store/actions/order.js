import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const orderBugerSuccess = (id, orderData) => {
    return {
        type: actionTypes.ORDER_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const orderBugerFailed = error => {
    return {
        type: actionTypes.ORDER_BURGER_FAILED,
        error: error
    };
};

export const orderBurgerStart = () => {
    return {
        type: actionTypes.ORDER_BURGER_START
    };
};

export const orderBurger = (orderData, token) => {
    return dispatch => {
        dispatch(orderBurgerStart());
        axios.post("/orders.json?auth=" + token, orderData)
            .then(response => {
                dispatch(orderBugerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(orderBugerFailed(error))
            });
    };
};

export const orderInit = () => {
    return {
        type: actionTypes.ORDER_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error   
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get("/orders.json" + queryParams)
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({ 
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err))
            });
    }
}