import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'

import API from 'api'
import { allUsersEndPoint } from 'constants'
import { setToken } from 'services/token-service'
import { checkEmail, checkPassword } from 'services/authorizationValidation'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  errorSignIn: {
    color: '#ff0000',
  },
}))

const SignIn = () => {
  let history = useHistory()
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailNotValid, setEmailNotValid] = useState(false)
  const [isPasswordNotValid, setPasswordNotValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] =
    useState('Email is required.')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(
    'Password is required.'
  )

  async function formSubmitButtonClickHandler(e) {
    e.preventDefault()

    let emailValidationResult = await checkEmail(email)
    setEmailNotValid(emailValidationResult.isNotValid)
    setEmailErrorMessage(emailValidationResult.errorMessage)

    let passwordValidationResult = await checkPassword(password)
    setPasswordNotValid(passwordValidationResult.isNotValid)
    setPasswordErrorMessage(passwordValidationResult.errorMessage)

    if (emailValidationResult.isNotValid || passwordValidationResult.isNotValid)
      return

    await API.post(`${allUsersEndPoint}/authenticate`, {
      email: email,
      password: password,
    })
      .then((response) => {
        setToken(response.data)
        history.push('/')
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
          setErrorMessage(error.response.data.message)
        }
      })
  }

  return (
    <>
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
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
            <label className={classes.errorSignIn}>{errorMessage}</label>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={formSubmitButtonClickHandler}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
}

export default SignIn
