/*
  API Wrapper
  The intent of this module is to have a single place in the app where all API calls are located
  The syntax for a new API call can be inferred from the existing exported classes, it supports the HTTP methods GET, POST, PUT and DELETE
  All four methods call the request function that parses and prepares the data before making the actual request, the URL parameters are converted to a query string and headers / auth are added in this step
  The response is a promise that must be resolved from the place it was called
*/
import store from 'store'
import queryString from 'query-string'
import _isEmpty from 'lodash/isEmpty'
import { navigate } from '@reach/router'
import notify from 'components/notify'

/**
 * @typedef {{
 *  username: string;
 *  password: string;
 * }} Credentials
 * @typedef {{
 *  id: number;
 *  name: string;
 *  price: number;
 *  quantity: number;
 *  provider: string;
 * }} Product
 * @typedef {{
 *  name: string;
 *  quantity: number;
 * }} ProductQuatation
 * @typedef {{
 *  id: number;
 *  total: number;
 *  products: Product[];
 *  username: string;
 *  providerId: number;
 * }} Quotation
 */

const handleServerErrors = async response => {
  try {
    const json = await response.json()
    if (response.status === 204) return null
    if (response.status >= 200 && response.status < 300) return json
    if (response.status === 401) {
      store.clearAll()
      navigate('/login')
    }
    if (response.status >= 500) {
      notify.error(
        `Error del servidor ${JSON.stringify(json.errors.detail, null, 2)}`
      )
    }
    throw json.errors
  } catch (error) {
    throw error
  }
}

// Make the actual request
const request = async (method, endpoint, queryArray, body) => {
  if (_isEmpty(endpoint)) return
  const query = !_isEmpty(queryArray)
    ? typeof queryArray === 'string'
      ? queryArray
      : `?${queryString.stringify(queryArray)}`
    : ''
  const url = `${process.env.API_SERVER}/v1${endpoint}${query}`

  const fetchParams = {
    method: method,
    headers: {
      'content-type': 'application/json',
      Authorization: store.get('token')
    }
  }
  if (body) Object.assign(fetchParams, { body: JSON.stringify(body) })

  try {
    const response = await window
      .fetch(url, fetchParams)
      .then(handleServerErrors)
      .then(jsonRespose => {
        if (process.env.DEBUG) {
          console.log(`${method}: ${endpoint}${query}`, jsonRespose)
        }
        return jsonRespose
      })
    return response
  } catch (error) {
    throw error
  }
}

// HTTP GET
function Get (route, query, params) {
  return request('GET', route, query, params)
}
// HTTP POST
function Post (route, query, params, data) {
  return request('POST', route, query, data)
}
// HTTP PUT
function Put (route, query, params, data) {
  return request('PUT', route, query, data)
}
// HTTP DELETE
function Delete (route, query, params, data) {
  return request('DELETE', route, query, data)
}

// --------------------------------------------------------------------------
// Endpoints
// --------------------------------------------------------------------------

export class Login {
  /**
   * @param { Credentials } credentials
   * @returns { Promise<{
    *    data: { token: string; }
    *  }>}
    */
  static SignIn (credentials) {
    return Post('/login', {}, '', credentials)
  }
}

export class Products {

  /**
   * @returns { Promise<{
   *  data: Product[]
   * }>}
   */
  static getAll(){
    return Get('/products', {}, '')
  }

  /**
    * @param { { name: string, quantity: number, price: number }[] } newProducts
    * @returns { Promise<{
    *  data: string
    * }>}
    */
   static create(newProducts, provider){
     return Put(`/products/${provider}`, {}, '', newProducts)
   }
}

export class Quotations {

  /**
   * @param { ProductQuatation[] } productsQuatation
   * @returns { Promise<{
   *  data: string
   * }>}
   */
  static create(productsQuatation){
    return Post('/quotations', {}, '', productsQuatation)
  }

  /**
   * @returns { Promise<{
   *  data: Quotation[]
   * }>}
   */
  static getAll(provider){
    return Get('/quotations/'+provider, {}, '')
  }
}

export default {
  Login,
  Products,
  Quotations
}
