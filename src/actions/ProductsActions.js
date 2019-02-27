import { ProductsActions } from '../constants/ActionTypes'
import config from '../constants/Config'
import axios from 'axios'

/**
 * GET Products 
 */
export const getProductSuccess = (payload) => {
  return {
    type: ProductsActions.GET_PRODUCTS_SUCCESS,
    payload
  }
}
export const getProduct = (data) => {
  return dispatch => {
    dispatch({ type: ProductsActions.GET_PRODUCTS_REQUEST })
    let url = `${config.endpoint.PRODUCTS}items/${data.id}`
    return axios
      .get(config.apiGateway.URL + url)
      .then(response => {
        dispatch(getProductSuccess(response.data))
      })
      .catch(error => {
        dispatch({ type: ProductsActions.GET_PRODUCTS_FAILURE })
      })
  }
}

/**
 * GET Products Search
 */
export const getProductsSearchSuccess = (payload) => {
  return {
    type: ProductsActions.GET_PRODUCTS_SUCCESS,
    payload
  }
}
export const getProductsSearch = (data) => {
  return dispatch => {
    dispatch({ type: ProductsActions.GET_PRODUCTS_REQUEST })
    let url = `${config.endpoint.PRODUCTS}items/search?q=${data.search}`
    return axios
      .get(config.apiGateway.URL + url)
      .then(response => {
        dispatch(getProductsSearchSuccess(response.data))
      })
      .catch(error => {
        dispatch({ type: ProductsActions.GET_PRODUCTS_FAILURE })
      })
  }
}

