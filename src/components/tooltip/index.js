import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

export default class Tooltip extends React.PureComponent {
  static propTypes = {
    render: PropTypes.element,
    text: PropTypes.string.isRequired
  }
  render () {
    const { render, text } = this.props
    if (!text) return render
    return (
      <span data-tip={text}>
        {render}
        <ReactTooltip multiline />
      </span>
    )
  }
}
