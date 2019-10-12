import React from 'react'
import API from 'api'
import notify from 'components/notify'
import Loading from 'components/loading'
import clx from 'classnames'
import store from 'store'
import * as SockJS from 'sockjs-client';
import Stomp from 'stompjs'

/**
 * @typedef {import('api').Product & {selected: boolean, inputQuantity: number;}} Product
 * @typedef {{ products: Product[], isLoading: boolean, stompClientTemp: any, socketClientTemp: any }} State
 */
export default class ProductTable extends React.Component{
  
  /**
   * @type { State }
   */
  state = {
    products: [],
    isLoading: false,
    socketClientTemp: null,
    stompClientTemp: null
  }

  componentDidMount () {
    this.connect();
    this.getProducts()
  }

  componentDidUpdate (prevProps) {
    const { location } = this.props
    if (!location || !prevProps.location) return

    if (prevProps.location.search !== location.search) this.getProducts()
  }

  getProducts = async () => {
    this.setState( { isLoading: true } )
    try {
      const { data } = await API.Products.getAll()
      this.setState({isLoading: false, products: data.map( (product) => Object.assign(product, { selected: false, inputQuantity: 0}))})
    } catch (error) {
      notify.error('Hubo un error al momento de obtener los productos.')
    } finally {
      this.setState({ isLoading: false })
    }
  }

  connect = () => {
    const socket = new SockJS('/sc-socializacion');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (params) {
            console.log(params)
        });
    });
    this.setState({socketClientTemp: socket,  stompClientTemp: stompClient})
  }

  sendProducts = async () => {
    const { products } = this.state
    this.setState( { isLoading: true } )
    try {
      const username = store.get('username')
      const selectedProducts = products.filter( (product) => product.selected === true )
      const productsToSend = selectedProducts.map((product) => Object.assign({}, {id: product.id, name: product.name,  quantity: product.inputQuantity}))
      const dataToSend = {products: productsToSend, username: username}
      const { data } = await API.Quotations.create(dataToSend)
      this.setState({ isLoading: false })
      notify.success(data)
      notify.success('Cotización enviada, por favor revise su correo, para obtener la respuesta de su cotización.')
    } catch (error) {
      console.log(error)
      notify.error('Hubo un error al momento de realizar la cotización.')
    } finally {
      this.setState({ isLoading: false })
    }
  }

  onChangeQuantity = (id, event) => {
    const { products } = this.state 
    this.setState( { products: products.map((product) => { 
      return product.id === id ? Object.assign(product, {inputQuantity: event.target.value}) : product
    })})
  }

  onSelectProduct = (id) => {
    const { products } = this.state 
    this.setState( { products: products.map((product) => { 
      return product.id === id ? Object.assign(product, {selected: !product.selected}) : product
    })})
  }

  render () {
    const { products, isLoading } = this.state
    if (products.length === 0 ) return <Loading />
    return (
      <div className='section margin-15'>
        <div className='flex-between'>
          <h1 className='title'>Lista de Productos</h1>
        </div>
        <table className="table is-fullwidth is-narrow m-t-15">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Cantidad Solicitada</th>
              <th>Agregar</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id, name, quantity, provider, price }, i) => (
              <tr 
                key={id}
                className='cursor-default center-td'
              >
                <td>{i}</td>
                <td>{name}</td>
                <td>
                  <input
                    style={{width:'10em'}}
                    type='number'
                    className='input'
                    id={`${id}.input`}
                    onChange={ (event) => { this.onChangeQuantity(id, event) } }
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    id={`${id}.input`}
                    onChange={ (event) => { this.onSelectProduct(id) } }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='text-center'>
          <button 
            className={
              clx(
                'button is-black',
                {
                  'is-loading': isLoading,
                  'disabled': isLoading
                }
              )
            }
            onClick={() => this.sendProducts()}
          >
            Enviar
          </button>
        </div>
      </div>
    )
  }
}
