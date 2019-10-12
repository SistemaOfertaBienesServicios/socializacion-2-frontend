import React, { Fragment } from 'react'
import { withFormik, Field, Form } from 'formik'
import { object, string } from 'yup'
import { navigate } from '@reach/router'
import store from 'store'
import API from 'api'
import notify from 'components/notify'

const validationSchema = object().shape({
  username: string().required('Este campo es requerido'),
  password: string().required('Este campo es requerido')
})

/**
 * @typedef {{ username: String, password: String }} Values
 * @param {import('formik').FieldProps<Values> & {label: string, type: string}} Props
 */
export const CustomInput = ({ field, form: { touched, errors }, ...props }) => (
  <div className='field'>
    <label htmlFor={field.name} className='label'>
      {props.label}
    </label>
    <div className='control'>
      <input
        type={props.type || 'text'}
        {...field}
        {...props}
        className='input'
        id={field.name}
      />
    </div>
    {touched[field.name] && errors[field.name] && (
      <p className='help is-danger'>{errors[field.name]}</p>
    )}
  </div>
)
/** 
 * @typedef {import('formik').FormikProps<Values>} FormikProps
 * @param {Values & FormikProps} props
*/
const loginForm = (props) => {
  const { isSubmitting } = props
  return (
    <Fragment>
      <section className='hero is-fullheight is-white is-bold unselectable'>
        <h1 className='title has-text-centered'>Sistema de Ofertas de Bienes y Servicios</h1>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <div className='columns'>
              <div className='column is-4 is-offset-4'>
                <h1 className='title'>Login</h1>
                <Form>
                  <Field
                    name='username'
                    label='Usuario'
                    component={CustomInput}
                  />
                  <Field
                    type='password'
                    name='password'
                    label='Contraseña'
                    component={CustomInput}
                  />
                  <button
                    className='button is-success m-t-15'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default withFormik({
  mapPropsToValues (props) {
    return {
      username: '',
      password: ''
    }
  },
  validationSchema,
  enableReinitialize: true,
  handleSubmit: async (values, { setSubmitting }) => {
    setSubmitting(true)
    try {
      console.log(values)
      const { data: user } = await API.Login.SignIn({username: values.username, password: values.password})
      console.log(user)
      store.set('username', user.username)
      store.set('role', user.role)
      store.set('email', user.email)
      store.set('password', user.password)
      store.set('provider_id', user.id)
      navigate('/home')
    } catch (error) {
      console.log(error)
      notify.error('Hubo un error al realizar login', { hideAfter: 5 })
    } finally {
      setSubmitting(false)
    }
  }
})(loginForm)
