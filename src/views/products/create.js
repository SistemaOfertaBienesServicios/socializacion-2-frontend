import React from 'react'
import API from 'api'
import notify from 'components/notify'
import Loading from 'components/loading'
import clx from 'classnames'
import store from 'store'
import Modal from 'components/modal'
import NewProductForm from 'views/products/new-product'

/**
 * @typedef { {name: string, price: number, quantity: number, id: number} } Product
 * @typedef {{ products: Product[], isLoading: boolean, count: number, allowedProducts: array, isModalOpen: boolean }} State
 */
export default class CreateProductTable extends React.Component{
  
  /**
   * @type { State }
   */
  state = {
    products: [],
    isLoading: false,
    count: 0,
    allowedProducts: [],
    isModalOpen: false
  }

  componentDidMount () {
    this.getAllowedProducts()
  }

  componentDidUpdate (prevProps) {
    const { location } = this.props
    if (!location || !prevProps.location) return

    if (prevProps.location.search !== location.search) this.getAllowedProducts()
  }

  getAllowedProducts = async () => {
    this.setState( { isLoading: true } )
    try {
      const { data } = {data:[{id: 1, name: 'Agua', price: 123, provider: 'BBVA', quantity: 12}, {id: 2, name: 'Pollo', price: 321, provider: 'KFC', quantity: 100}]} //await API.Products.getAllowed()
      const allowedProducts = data.map(product => product.name)
      this.setState({isLoading: false, allowedProducts: allowedProducts})
    } catch (error) {
      notify.error('Hubo un error al momento de obtener los productos permitidos.')
    } finally {
      this.setState({ isLoading: false })
    }
  }

  sendNewProducts = async () => {
    const { products } = this.state
    this.setState( { isLoading: true } )
    try {
      const provider = store.get('type')
      const { data } = {data: 'success'} //await API.Products.create(products, provider)
      this.setState({ isLoading: false })
      notify.success(data)
      notify.success('Productos agregar con éxito.')
    } catch (error) {
      notify.error('Hubo un error al momento de agregar los productos.')
    } finally {
      this.setState({ isLoading: false })
    }
  }

  onChangeQuantity = (id, event) => {
    const { products } = this.state 
    this.setState( { products: products.map((product) => { 
      return product.id === id ? Object.assign(product, {quantity: event.target.value}) : product
    })})
  }

  onChangePrice = (id, event) => {
    const { products } = this.state 
    this.setState( { products: products.map((product) => { 
      return product.id === id ? Object.assign(product, {price: event.target.value}) : product
    })})
  }

  onChangeName = (id, event) => {
    const { products } = this.state 
    this.setState( { products: products.map((product) => { 
      return product.id === id ? Object.assign(product, {name: event.target.value}) : product
    })})
  }

  addRow = () => {
    this.setState( (prevProps) => ({ products: [...prevProps.products, {id: prevProps.count, name: '', price: 0, quantity: 0}] , count: prevProps.count + 1 }))
  }

  removeRow = (id) => {
    this.setState( (prevProps) => ({ products: prevProps.products.filter( product => product.id !== id ) }) )
  }

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }))
  }

  render () {
    const { allowedProducts, products, isLoading, isModalOpen } = this.state
    if (allowedProducts.length === 0 ) return <Loading />
    return (
      <div className='section margin-15'>
        <div className='flex-between'>
          <h1 className='title'>Crear Productos</h1>
          <button className='button is-primary' onClick={this.toggleModal}>
            <span>Crear</span>
          </button>
        </div>
        <table className="table is-fullwidth is-narrow m-t-15">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Disponibles</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id }) => (
              <tr 
                key={id}
                className='cursor-default center-td'
              >
                <td>{id}</td>
                <td>
                  <div className="control">
                    <div className="select">
                      <select
                        onChange={ (event) => { this.onChangeName(id, event) } }
                      >
                        {allowedProducts.map( ap =>
                          (<option>{ap}</option>)
                        )}
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    style={{width:'10em'}}
                    type='number'
                    className='input'
                    onChange={ (event) => { this.onChangePrice(id, event) } }
                  />
                </td>
                <td>
                  <input
                    style={{width:'10em'}}
                    type='number'
                    className='input'
                    onChange={ (event) => { this.onChangeQuantity(id, event) } }
                  />
                </td>
                <td>
                  <a 
                    className={
                      clx(
                        'button is-danger',
                        {
                          'is-loading': isLoading,
                          'disabled': isLoading
                        }
                      )
                    }
                    onClick={() => this.removeRow(id)}
                  >
                    Eliminar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='text-center'>
          <a 
            style={{marginRight: '1em'}}
            className={
              clx(
                'button is-success',
                {
                  'is-loading': isLoading,
                  'disabled': isLoading
                }
              )
            }
            onClick={() => this.addRow()}
          >
            Agregar producto
          </a>
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
            onClick={() => this.sendNewProducts()}
          >
            Enviar
          </a>
        </div>
        <Modal
          isActive={isModalOpen}
          toggleModal={this.toggleModal}
          onSubmit={this.sendNewProducts}
          title='Crear producto'
          requestInProgress={isLoading}
          noFooter={true}
        >
          <NewProductForm />
        </Modal>
      </div>
    )
  }
}
