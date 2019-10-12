import React from 'react'
import PropTypes from 'prop-types'

const InfoItem = ({ title, children, hideOn, isColumn }) => (
  <div
    className={`column ${
      isColumn ? 'is-12' : 'is-half-mobile'
    } level is-marginless ${hideOn ? `is-hidden-${hideOn}` : ''}`}
  >
    <div className='level-item has-text-centered'>
      <div>
        <p className='heading'>{title}</p>
        <div className='title is-size-6-touch is-size-5-desktop no-wrap'>
          {children || '–'}
        </div>
      </div>
    </div>
  </div>
)

export default class Level extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        label: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.node
        ]),
        hideOn: PropTypes.string
      })
    ).isRequired,
    isColumn: PropTypes.bool
  }
  static defaultProps = {
    isColumn: false
  }
  render () {
    const { items, isColumn } = this.props
    return (
      <div className='columns is-mobile is-multiline'>
        {items.map(({ title, label, hideOn }) => (
          <InfoItem
            key={title}
            title={title}
            hideOn={hideOn}
            isColumn={isColumn}
          >
            {label}
          </InfoItem>
        ))}
      </div>
    )
  }
}
