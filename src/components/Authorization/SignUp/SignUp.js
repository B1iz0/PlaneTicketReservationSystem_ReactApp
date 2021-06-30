import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import API from 'api';
import { usersEndPoint } from 'constants';
import { setToken } from 'services/token-service';
import {
  checkEmail,
  checkPassword,
  checkRepeatedPassword,
  checkFirstName,
  checkLastName,
} from 'services/authorizationValidation';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  let history = useHistory();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isEmailNotValid, setEmailNotValid] = useState(false);
  const [isPasswordNotValid, setPasswordNotValid] = useState(false);
  const [isRepeatedPasswordNotValid, setRepeatedPasswordNotValid] =
    useState(false);
  const [isFirstNameNotValid, setFirstNameNotValid] = useState(false);
  const [isLastNameNotValid, setLastNameNotValid] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] =
    useState('Email is required.');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(
    'Password is required.'
  );
  const [repeatedPasswordErrorMessage, setRepeatedPasswordErrorMessage] =
    useState('Repeat password.');
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState(
    'First name is required.'
  );
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState(
    'Last name is required.'
  );

  async function formSubmitButtonClickHandler(e) {
    e.preventDefault();

    let emailValidationResult = await checkEmail(email);
    setEmailNotValid(emailValidationResult.isNotValid);
    setEmailErrorMessage(emailValidationResult.errorMessage);

    let passwordValidationResult = await checkPassword(password);
    setPasswordNotValid(passwordValidationResult.isNotValid);
    setPasswordErrorMessage(passwordValidationResult.errorMessage);

    let repeatedPasswordValidationResult = await checkRepeatedPassword(
      repeatedPassword,
      password
    );
    setRepeatedPasswordNotValid(repeatedPasswordValidationResult.isNotValid);
    setRepeatedPasswordErrorMessage(
      repeatedPasswordValidationResult.errorMessage
    );

    let firstNameValidationResult = await checkFirstName(firstName);
    setFirstNameNotValid(firstNameValidationResult.isNotValid);
    setFirstNameErrorMessage(firstNameValidationResult.errorMessage);

    let lastNameValidationResult = await checkLastName(lastName);
    setLastNameNotValid(lastNameValidationResult.isNotValid);
    setLastNameErrorMessage(lastNameValidationResult.errorMessage);

    if (
      emailValidationResult.isNotValid ||
      passwordValidationResult.isNotValid ||
      repeatedPasswordValidationResult.isNotValid ||
      firstNameValidationResult.isNotValid ||
      lastNameValidationResult.isNotValid
    ) {
      return;
    }

    API.post(`${usersEndPoint}/registration`, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    })
      .then((response) => {
        setToken(response.data);
        history.push('/Flights');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setErrorMessage(error.response.data.message);
        }
        console.log(error);
      });
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <TextField
            error={isEmailNotValid}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            helperText={isEmailNotValid ? emailErrorMessage : ''}
          />
          <TextField
            error={isPasswordNotValid}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            helperText={isPasswordNotValid ? passwordErrorMessage : ''}
          />
          <TextField
            error={isRepeatedPasswordNotValid}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repeatedPassword"
            label="Repeat Password"
            type="password"
            id="repeatedPassword"
            autoComplete="repeated-password"
            onChange={(e) => setRepeatedPassword(e.target.value)}
            helperText={
              isRepeatedPasswordNotValid ? repeatedPasswordErrorMessage : ''
            }
          />
          <TextField
            error={isFirstNameNotValid}
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstname"
            label="First Name"
            name="firstName"
            required
            onChange={(e) => setFirstName(e.target.value)}
            helperText={isFirstNameNotValid ? firstNameErrorMessage : ''}
          />
          <TextField
            error={isLastNameNotValid}
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            required
            onChange={(e) => setLastName(e.target.value)}
            helperText={isLastNameNotValid ? lastNameErrorMessage : ''}
          />
          <label className={classes.errorSignIn}>{errorMessage}</label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={formSubmitButtonClickHandler}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/SignIn" variant="body2">
                {'Have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
