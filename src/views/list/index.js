import React from 'react'
import API from 'api'
import notify from 'components/notify'
import Loading from 'components/loading'
import clx from 'classnames'

/**
 * @typedef {import('api').Product & {selected: boolean, inputQuantity: number;}} Product
 * @typedef {{ products: Product[], isLoading: boolean }} State
 */
export default class ProductTable extends React.Component{
  
  /**
   * @type { State }
   */
  state = {
    products: [],
    isLoading: false
  }

  componentDidMount () {
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
      const { data } = {data:[{id: 1, name: 'Agua', price: 123, provider: 'BBVA', quantity: 12}, {id: 2, name: 'Pollo', price: 321, provider: 'KFC', quantity: 100}]} //await API.Products.getAll()
      this.setState({isLoading: false, products: data.map( (product) => Object.assign(product, {selected: false, inputQuantity: 0}))})
    } catch (error) {
      notify.error('Hubo un error al momento de obtener los productos.')
    } finally {
      this.setState({ isLoading: false })
    }
  }

  sendProducts = async () => {
    const { products } = this.state
    this.setState( { isLoading: true } )
    try {
      const selectedProducts = products.filter( (product) => product.selected === true )
      const productsToSend = selectedProducts.map((product) => Object.assign({}, {name: product.name,  quantity: product.inputQuantity}))
      const { data } = {data: 'success'} //await API.Quotation.create(productsToSend)
      this.setState({ isLoading: false })
      notify.success(data)
      notify.success('Cotización enviada, por favor revise su correo, para obtener la respuesta de su cotización.')
    } catch (error) {
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
            {products.map(({ id, name, quantity, provider, price }) => (
              <tr 
                key={id}
                className='cursor-default center-td'
              >
                <td>{id}</td>
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
          <a 
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
          </a>
        </div>
      </div>
    )
  }
}
