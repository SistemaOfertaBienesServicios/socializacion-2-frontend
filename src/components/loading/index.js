import React from 'react'

const triple = elem =>
  [...new Array(3)].map((_, i) => React.cloneElement(elem, { key: i }))

export const LoadingTable = () => (
  <table className='table waiting-for-data is-fullwidth'>
    <thead>
      <tr>
        {triple(
          <th>
            <div />
          </th>
        )}
      </tr>
    </thead>
    <tbody>
      <tr>
        {triple(
          <td>
            <div />
          </td>
        )}
      </tr>
    </tbody>
  </table>
)

const Loading = () => (
  <div className='loading'>
    <br />
    <i className='mdi mdi-loading mdi-spin mdi-36px' />
  </div>
)

export default Loading
