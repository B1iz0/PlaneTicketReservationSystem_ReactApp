import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {
  setIsSimpleSuccessNotificationActive,
  setSimpleSuccessNotificationText,
} from 'reduxStore/notificationsSlice';
import { postUser } from 'api/userRequests';

import FormTextField from '../../FormTextField';

const AdminUserCreationForm = ({ onSubmit }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const onSubmitRegistration = async (values) => {
    const [token, errorRegistration] = await postUser(values);
    if (errorRegistration) {
      setErrorMessage(errorRegistration.response.data.message);
    }
    if (token) {
      dispatch(setIsSimpleSuccessNotificationActive(true));
      dispatch(
        setSimpleSuccessNotificationText(
          'The user was registered successfully!'
        )
      );
      onSubmit();
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(6, 'At least 6 characters')
          .matches(/(?=.*[0-9])(?=.*[a-zA-Z])/, 'Only Latin letters and digits')
          .required('Required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
      })}
      onSubmit={(values) => {
        onSubmitRegistration(values);
      }}
    >
      {({ handleSubmit, handleReset }) => (
        <Form>
          <Grid container spacing={2} justify="flex-end">
            <Grid item xs={12} lg={6}>
              <FormTextField
                required
                fullWidth
                label="First name"
                name="firstName"
                type="text"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormTextField
                required
                fullWidth
                label="Last name"
                name="lastName"
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                required
                fullWidth
                label="Repeat password"
                name="passwordConfirm"
                type="password"
              />
            </Grid>
            {errorMessage && (
              <Grid item xs={12}>
                <Typography color="error" variant="h6">
                  {errorMessage}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Button
                type="reset"
                variant="outlined"
                onClick={() => {
                  setErrorMessage('');
                  handleReset();
                }}
              >
                Clear
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AdminUserCreationForm;
