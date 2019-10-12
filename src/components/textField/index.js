import React, { Component } from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import classNames from 'classnames'
import _isNil from 'lodash/isNil'

// Error messages
const ERROR_TXT = {
  REQUIRED: 'Este campo es requerido',
  EMAIL: 'Ingrese un e-mail válido'
}

const currency = (n = 0) => {
  n = String(n) === '' ? 0 : n
  n = parseFloat(String(n))
  return isNaN(n) ? false : n.toFixed(2)
}

class TextField extends Component {
  constructor (props) {
    super(props)
    this.data = {
      value: props.isMoney ? currency(props.value) : props.value,
      isValid: true,
      errorText: '',
      // This value acts as a flag so the component doesnt validate on every keystroke, but until it has been blurred
      validateOnChange: false
    }
    this.state = Object.assign({}, this.data)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    // If the passed value is Nil, sets the value to empty string
    if (_isNil(nextProps.value)) this.onChange({ target: { value: '' } })
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  onFocus (e) {
    let { selectAllOnFocus, onFocus } = this.props
    onFocus()
    if (selectAllOnFocus) e.target.select()
  }

  onBlur () {
    this.validate()
    if (!this.state.validateOnChange) this.setState({ validateOnChange: true })
    if (this.props.isMoney) {
      this.setState(prevState => ({ value: currency(prevState.value) }))
    }
    this.props.onBlur()
  }

  _handleKeyDown (e) {
    if (e.key === 'Enter') {
      this.props.onEnter()
    }
  }

  // When the field changes, it updates the value locally and calls the passed callback function
  // so it can also update values on the parent component
  onChange (e) {
    this.setState({ value: e.target.value }, () => {
      if (this.state.validateOnChange) this.validate()
    })
    this.props.onChange(e)
  }

  // Validates if selected value matches the requirements.
  // Sets on state the validation result and error message
  // Returns boolean with the validation result.
  validate () {
    let { type, required, minLength, maxLength } = this.props
    let { value } = this.state
    let isValid = !(required || minLength)
    let errorText = ''
    if (value === null && required) {
      isValid = validator.isLength(String(value), { min: minLength })
      errorText = ERROR_TXT.REQUIRED
    }
    if (required) {
      if (type === 'number') {
        isValid = !isNaN(value) && value !== ''
      } else {
        isValid = !validator.isEmpty(value)
      }
      errorText = isValid ? '' : ERROR_TXT.REQUIRED
    }
    // Check also for validity in the next validations
    // Prevents from passing validation if a previous condition decided it was invalid
    if (isValid) {
      if (type === 'email') {
        isValid = validator.isEmail(value)
        errorText = errorText || ERROR_TXT.EMAIL
      }
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
      type,
      className,
      placeholder,
      disabled,
      required,
      info,
      minLength,
      maxLength,
      min,
      max,
      name,
      isValid: isValidProps,
      errorText: errorTextProps
    } = this.props
    const { value, isValid, errorText } = this.state
    const isValidationControlled = isValidProps !== null
    const valid = isValidationControlled ? isValidProps : isValid
    const error = isValidationControlled ? errorTextProps : errorText
    return (
      <div className='field' style={{ width: '100%' }}>
        {label && (
          <label
            className={classNames('label', {
              'has-text-centered': className.includes('has-centered-label')
            })}
          >
            {required ? `${label} *` : label}
          </label>
        )}
        <p
          className={classNames('control is-marginless', {
            'has-info': info
          })}
        >
          <input
            className={classNames('input ' + className, {
              'is-danger': !valid
            })}
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value || ''}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyDown={this._handleKeyDown}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            min={min}
            max={max}
          />
          {info ? (
            <span className='icon info-icon'>
              <span className='tooltip'>{info}</span>
              <i className='mdi mdi-information-outline' />
            </span>
          ) : null}
          <span
            className={classNames('help is-danger no-select', {
              'is-hidden': valid
            })}
          >
            {error || ''}
          </span>
        </p>
      </div>
    )
  }
}

export default TextField

TextField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  required: PropTypes.bool,
  isMoney: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnter: PropTypes.func,
  isValid: PropTypes.bool,
  errorText: PropTypes.string
}

TextField.defaultProps = {
  value: '',
  name: '',
  className: '',
  placeholder: '',
  label: '',
  disabled: false,
  type: 'text',
  required: false,
  isMoney: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onEnter: () => {},
  isValid: null,
  errorText: null
}
