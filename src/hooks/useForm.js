import { useState } from 'react'

export function useForm(initialValues = {}) {
  const [values, setValues]   = useState(initialValues)
  const [errors, setErrors]   = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }))
  }

  const setFieldValue = (name, value) => setValues(prev => ({ ...prev, [name]: value }))

  const setFieldError  = (name, error) => setErrors(prev => ({ ...prev, [name]: error }))

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return { values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldError, reset }
}