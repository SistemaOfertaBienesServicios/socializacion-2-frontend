// Librerías
import React, { Fragment, Component } from 'react'
// Componentes
import API from 'api'
import notify from 'components/notify'
import { LoadingTable } from 'components/loading'
import QuotationTable from './quotationTable.js'
import QuotationDetail from './quotationDetail.js'
import store from 'store'

/**
 * @typedef {import('api').Quotation} Quotation
 * @typedef {{ quotations: Quotation[], isLoading: boolean, selected: Quotation | null }} State
 */
class QuotationList extends Component {
  /**
   * @type { State }
   */
  state = {
    quotations: [],
    isLoading: false,
    selected: null,
  }

  async getQuotations () {
    try {
      const providerId = store.get('provider_id')
      this.setState({ isLoading: true })
      const data = await API.Quotations.getAll(providerId)
      this.setState({ quotations: data })
    } catch (error) {
      notify.error('Hubo un error al momento de obtener los créditos.')
    } finally {
      this.setState({ isLoading: false })
    }
  }

  /**
   * @param {Quotation} quotation
   */
  onSelect = quotation => {
    this.setState({ selected: quotation })
  }

  componentDidMount () {
    this.getQuotations()
  }

  componentDidUpdate = prevProps => {
    if (!this.props.location || !prevProps.location) return

    if (this.props.location.search !== prevProps.location.search) {
      this.getQuotations()
    }
  }

  render () {
    const { quotations, isLoading, selected } = this.state
    return (
      <div className='section'>
        <div className='columns'>
          <div className='column'>
            {isLoading ? (
              <LoadingTable />
            ) : (
              <Fragment>
                <QuotationTable
                  quotations={quotations}
                  onSelect={this.onSelect}
                  selected={selected}
                />
              </Fragment>
            )}
          </div>
          <div className='column'>
            {selected ? (
              <QuotationDetail quotation={selected} />
            ) : (
              <div className='notification'>
                No has seleccionado ninguna cotización
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default QuotationList
