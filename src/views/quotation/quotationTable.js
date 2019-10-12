// Libraries
import React, { Fragment } from 'react'
import clx from 'classnames'

/**
 * @typedef {import('api').Quotation} Quotation
 * @param {{quotations: Quotation[], onSelect: function, selected: any}} Props
 */
const QuotationTable = ({ quotations, onSelect, selected }) =>
  quotations.length > 0 ? (
    <Fragment>
      <h1 className='title'>Cotizaciones</h1>
      <table className='table is-striped is-hoverable is-fullwidth'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Provider</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation, i) => (
            <tr
              onClick={() => {
                onSelect(quotation)
              }}
              className={clx({
                'is-selected': quotation.id === (selected ? selected.id : null)
              })}
              key={quotation.id}
              id={`${quotation.id}`}
            >
              <td>{i}</td>
              <td>{quotation.providerId}</td>
              <td>{quotation.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  ) : (
    <div className='notification'>No hay cotizaciones</div>
  )

export default QuotationTable
