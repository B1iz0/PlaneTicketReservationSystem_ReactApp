import React from 'react';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';

const FormTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField 
      {...field}
      {...props}
      label={label}
      variant='outlined'
      error={meta.touched && meta.error != null}
      helperText={meta.touched && meta.error ? meta.error : null}
    />
  )
};

export default FormTextField;