import React, { Fragment } from 'react'
import { withFormik, Field, Form } from 'formik'
import { object, string, number } from 'yup'
import store from 'store'
import API from 'api'
import notify from 'components/notify'

const validationSchema = object().shape({
  name: string().required('Este campo es requerido'),
  price: number().required('Este campo es requerido'),
  quantity: number().required('Este campo es requerido'),
})

/**
 * @typedef {{ name: number, price: number, quantity: number }} Values
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
const NewProductForm = (props) => {
  const { isSubmitting } = props
  return (
    <Fragment>
      <Form>
        <Field
          name='name'
          label='Nombre producto'
          component={CustomInput}
        />
        <Field
          name='price'
          label='Precio'
          component={CustomInput}
          type='number'
        />
        <Field
          name='quantity'
          label='Cantidad'
          component={CustomInput}
          type='number'
        />
        <button
          className='button is-success m-t-15'
          type='submit'
          disabled={isSubmitting}
        >
          Guardar
        </button>
      </Form>
    </Fragment>
  )
}

export default withFormik({
  mapPropsToValues (props) {
    return {
      name: '',
      price: '',
      quantity: ''
    }
  },
  validationSchema,
  enableReinitialize: true,
  handleSubmit: async (values, { setSubmitting }) => {
    setSubmitting(true)
    try {
      const provider = store.get('provider_id')
      const products = [{name: values.name, price: values.price, quantity: values.quantity, provider_id: provider}]
      const { data } = await API.Products.create(products, provider)
      notify.success(data)
      notify.success('Productos creados con éxito.')
      setSubmitting(false)
    } catch (error) {
      notify.error('Hubo un error al momento de crear los productos.')
    } finally {
      setSubmitting(false)
    }
  }
})(NewProductForm)
