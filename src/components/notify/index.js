// Librerías
import cogoToast from 'cogo-toast'

/**
 * Muestra una notificación en el ui
 * @typedef {Object<string, string[]>} IError
 * @typedef {'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'} Position
 * @typedef {{
 *  hideAfter?: number,
 *  position?: Position,
 *  heading?: string,
 *  icon?: import('react').ReactNode
 *  bar?: object,
 *  onClick?: function
 * }} Options
 * @param {'success' | 'info' | 'loading' | 'warn' | 'error' } type
 * @returns {(message: string | IError | string[] | Error, options?: Options ) => void}
 */
const notify = type => (message, options) => {
  if (message instanceof Error) {
    return cogoToast[type]('Ha ocurrido un error', options)
  }

  if (Array.isArray(message)) {
    return message.forEach(error => {
      cogoToast[type](error, options)
    })
  }

  if (typeof message === 'object') {
    return Object.entries(message).forEach(([field, errors]) => {
      if (Array.isArray(errors)) {
        return errors.forEach(error =>
          cogoToast[type](`${field}: ${error}`, options)
        )
      } else {
        return cogoToast[type](`${field}: ${errors}`, options)
      }
    })
  }

  return cogoToast[type](message, options)
}

export default {
  success: notify('success'),
  info: notify('info'),
  loading: notify('loading'),
  warn: notify('warn'),
  error: notify('error')
}
