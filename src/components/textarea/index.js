import React, { Component } from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'

// Error messages
const ERROR_TXT = {
  REQUIRED: 'Este campo es requerido'
}

class TextArea extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isValid: true,
      errorText: '',
      validateOnChange: false
    }
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.validate = this.validate.bind(this)
  }

  onFocus (e) {
    const { selectAllOnFocus, onFocus } = this.props
    onFocus()
    if (selectAllOnFocus) e.target.select()
  }

  onBlur () {
    this.validate()
    if (!this.state.validateOnChange) this.setState({ validateOnChange: true })
    this.props.onBlur()
  }

  handleKeyDown (e) {
    if (e.key === 'Enter') this.props.onEnter()
  }

  // When the field changes, it updates the value locally and calls the passed callback function
  // so it can also update values on the parent component
  onChange (e) {
    if (this.state.validateOnChange) this.validate()
    this.props.onChange(e)
  }

  // Validates if selected value matches the requirements.
  // Sets on state the validation result and error message
  // Returns boolean with the validation result.
  validate () {
    const { required, minLength, maxLength, value } = this.props
    let isValid = !(required || minLength)
    let errorText = ''
    if (required) {
      isValid = !validator.isEmpty(value)
      errorText = isValid ? '' : ERROR_TXT.REQUIRED
    }
    // Check also for validity in the next validations
    // Prevents from passing validation if a previous condition decided it was invalid
    if (isValid) {
      if (minLength) {
        isValid = validator.isLength(String(value), { min: minLength })
        errorText =
          errorText || `El campo debe contener al menos ${minLength} caracteres`
      }
      if (maxLength) {
        isValid = validator.isLength(String(value), { max: maxLength })
        errorText =
          errorText || `El campo debe contener máximo ${maxLength} caracteres`
      }
    }
    this.setState({ isValid, errorText })
    return isValid
  }

  render () {
    const {
      label,
      className,
      placeholder,
      disabled,
      required,
      info,
      minLength,
      maxLength,
      rows,
      value
    } = this.props
    const { isValid, errorText } = this.state
    return (
      <div className='field'>
        {label && (
          <span className='label'>{required ? `${label} *` : label}</span>
        )}
        <p className={`control ${info ? 'has-info' : ''}`}>
          <textarea
            rows={rows}
            className={`textarea ${className} ${isValid ? '' : 'is-danger'}`}
            placeholder={placeholder}
            disabled={disabled}
            value={value || ''}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyDown={this.handleKeyDown}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
          />
          {info && (
            <span className='icon info-icon'>
              <span className='tooltip'>{info}</span>
              <i className='mdi mdi-information-outline' />
            </span>
          )}
          <span className={`help is-danger ${isValid ? 'is-hidden' : ''}`}>
            {errorText}
          </span>
        </p>
      </div>
    )
  }
}

export default TextArea

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
  required: PropTypes.bool,
  selectAllOnFocus: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnter: PropTypes.func,
  info: PropTypes.string
}

TextArea.defaultProps = {
  value: '',
  className: '',
  placeholder: '',
  label: '',
  rows: 3,
  disabled: false,
  required: false,
  selectAllOnFocus: false,
  autoFocus: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onEnter: () => {}
}
