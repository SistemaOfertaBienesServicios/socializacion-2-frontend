import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Modal = ({
  isActive,
  toggleModal,
  onSubmit,
  title,
  noFooter,
  primaryButton,
  secondaryButton,
  children,
  requestInProgress,
  modalStyles,
  disabled
}) => {
  if (!isActive) return null
  const header = (
    <header className='modal-card-head'>
      <div className='modal-card-title'>{title}</div>
      <button className='delete' aria-label='close' onClick={toggleModal} />
    </header>
  )
  const footer = !noFooter ? (
    <footer className='modal-card-foot'>
      <button
        className={classNames('button is-success', {
          'is-loading': requestInProgress
        })}
        onClick={onSubmit}
        disabled={disabled || requestInProgress}
      >
        {primaryButton}
      </button>
      <button
        className='button'
        onClick={toggleModal}
        disabled={requestInProgress}
      >
        {secondaryButton}
      </button>
    </footer>
  ) : null
  return (
    <div className={classNames('modal', { 'is-active': isActive })}>
      <div className='modal-background' onClick={toggleModal} />
      <div className='modal-card' style={modalStyles}>
        {header}
        <section className='modal-card-body'>{children}</section>
        {footer}
      </div>
    </div>
  )
}

export default Modal

Modal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  noFooter: PropTypes.bool,
  primaryButton: PropTypes.string,
  secondaryButton: PropTypes.string,
  requestInProgress: PropTypes.bool,
  modalStyles: PropTypes.object,
  disabled: PropTypes.bool
}

Modal.defaultProps = {
  isActive: false,
  onSubmit: () => {},
  title: '',
  noFooter: false,
  primaryButton: 'Aceptar',
  primaryIcon: 'check',
  secondaryButton: 'Cancelar',
  secondaryIcon: 'cancel',
  requestInProgress: false,
  modalStyles: {},
  disabled: false
}
