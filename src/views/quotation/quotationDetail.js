// Libraries
import React, { Fragment } from 'react'

/**
 * @typedef {import('api').Product} Product
 * @param {{product: Product}} Props
 */
const ProductCard = ({ product }) => (
  <div className='card block'>
    <header className='card-header'>
      <p className='card-header-title no-margin-bottom'>
        {product.id}
      </p>
      <p className='card-header-title no-margin-bottom'>
        {product.name}
      </p>
      <p className='card-header-title no-margin-bottom'>
        {product.quantity}
      </p>
    </header>
  </div>
)

/**
 * @typedef {import('api').Quotation} Quotation
 * @param {{quotation: Quotation}} Props
 */
const QuotationDetail = ({ quotation }) => (
  <Fragment>
    <article className="message">
      <div className="message-header">
        <p>{`Cotización de ${quotation.username}`}</p>
        <p>{`Total: ${quotation.total}`}</p>
      </div>
      <div className="message-body">
        <table className='table is-striped is-hoverable is-fullwidth'>
          <tbody>
            {quotation.products.map(product => (
              <tr>
                <td colSpan={3}>
                  <ProductCard key={product.id} product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  </Fragment>
)
export default QuotationDetail

