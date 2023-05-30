import {
  CREATE_ORDER_REQUREST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUREST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUREST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../Constraints/orderConstant";
import axios from "axios";
import { URLConstant } from "../Constraints/URLConstant";

export const createOrder = (order) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: CREATE_ORDER_REQUREST,
    });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`${url}order/addnew`, order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// it will get all the orders
export const myOrdersActions = () => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: MY_ORDER_REQUREST,
    });

    const { data } = await axios.get(`${url}order/myorders`);

    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// it will get the single order details
export const getOrderDetails = (orderID) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: ORDER_DETAILS_REQUREST,
    });

    const { data } = await axios.get(`${url}order/${orderID}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ! ======================================
// !      admin Actions
// ! ======================================

// TODO : for getting a all orders action
export const AdminAllOrders = () => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: ALL_ORDERS_REQUEST,
    });

    const { data } = await axios.get(`${url}order/admin/orders`);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : for update order for process
export const EditOrderProcess = (orderID, Data) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: UPDATE_ORDER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${url}order/admin/${orderID}`,
      Data,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : for update order for process
export const AdminDeleteOrder = (orderID) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: DELETE_ORDER_REQUEST,
    });

    const { data } = await axios.delete(`${url}order/admin/${orderID}`);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// for clearing the errors
export const clearErrorOrders = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
