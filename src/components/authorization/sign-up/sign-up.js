import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import API from '../../../api';
import { useHistory } from "react-router-dom";

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
  }));

const SignUp = () => {
    let history = useHistory();
    const classes = useStyles();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatedPassword, setRepeatedPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');

    const [ isEmailNotValid, setEmailNotValid ] = useState(false);
    const [ isPasswordNotValid, setPasswordNotValid ] = useState(false);
    const [ isRepeatedPasswordNotValid, setRepeatedPasswordNotValid ] = useState(false);
    const [ isFirstNameNotValid, setFirstNameNotValid ] = useState(false);
    const [ isLastNameNotValid, setLastNameNotValid ] = useState(false);

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ emailErrorMessage, setEmailErrorMessage ] = useState('Email is required.');
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('Password is required.');
    const [ repeatedPasswordErrorMessage, setRepeatedPasswordErrorMessage ] = useState('Repeat password.');
    const [ firstNameErrorMessage, setFirstNameErrorMessage ] = useState('First name is required.');
    const [ lastNameErrorMessage, setLastNameErrorMessage ] = useState('Last name is required.');

    const checkEmail = () => {
        if (email === '') {
            setEmailNotValid(true);
            setEmailErrorMessage('Email is required.');
            return false;
        }
        if (email === 'admin') {
            setEmailNotValid(false);
            return true;
        }
        if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)) {
            setEmailNotValid(false);
            return true;
        }
        setEmailNotValid(true);
        setEmailErrorMessage('Incorrect entry.');
        return false;
    }

    const checkPassword = () => {
        if (password === ''){
            setPasswordNotValid(true);
            setPasswordErrorMessage('Password is required.');
            return false;
        }
        if (/(?=.*[0-9])(?=.*[a-zA-Z]){6,}/.test(password)) {
            setPasswordNotValid(false);
            return true;
        } else {
            setPasswordNotValid(true);
            setPasswordErrorMessage('At least 6 characters (both Latin letter and digit).');
            return false;
        }
    }

    const checkRepeatedPassword = () => {
        if (repeatedPassword !== password){
            setRepeatedPasswordNotValid(true);
            setRepeatedPasswordErrorMessage('Password do not match.')
            return false;
        }
        setRepeatedPasswordNotValid(false);
        return true;
    }

    const checkFirstName = () => {
        if (firstName === ''){
            setFirstName(true);
            setFirstNameErrorMessage('First name is required.');
            return false;
        }
        setFirstNameNotValid(false);
        return true;
    }

    const checkLastName = () => {
        if (lastName === ''){
            setLastNameNotValid(true);
            setLastNameErrorMessage('Last name is required.');
            return false;
        }
        setLastNameNotValid(false);
        return true;
    }

    function formSubmitButtonClickHandler(e) {
        e.preventDefault();
        if (!checkEmail()) return;
        if (!checkPassword()) return;
        if (!checkRepeatedPassword()) return;
        if (!checkFirstName()) return;
        if (!checkLastName()) return;
        API.post('/users/registration', {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
        .then(response => {
            history.push('/Main');
            console.log(response);
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                setErrorMessage(error.response.data.message);
            }
            console.log(error)
        });
    }

    return(
        <>
            <Container maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography> 
                    <form className={classes.form}>
                        <TextField
                            error = {isEmailNotValid}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={e => setEmail(e.target.value)}
                            autoFocus
                            helperText={isEmailNotValid ? emailErrorMessage : ""}
                        />
                        <TextField
                            error = {isPasswordNotValid}
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
                            helperText={isPasswordNotValid ? passwordErrorMessage : ""}
                        />
                        <TextField
                            error = {isRepeatedPasswordNotValid}
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
                            helperText={isRepeatedPasswordNotValid ? repeatedPasswordErrorMessage : ""}
                        />
                        <TextField
                            error = {isFirstNameNotValid}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="firstname"
                            label="First Name"
                            name="firstName"
                            required
                            onChange={e => setFirstName(e.target.value)}
                            helperText={isFirstNameNotValid ? firstNameErrorMessage : ""}
                        />
                        <TextField
                            error = {isLastNameNotValid}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            required
                            onChange={e => setLastName(e.target.value)}
                            helperText={isLastNameNotValid ? lastNameErrorMessage : ""}
                        />
                        <label className={classes.errorSignIn}>
                            {errorMessage}
                        </label>
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
                                {"Have an account? Sign In"}
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
};

export default SignUp;