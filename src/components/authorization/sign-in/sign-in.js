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

import { useDispatch } from 'react-redux'
import { setJwtToken } from '../../../redux/jwtTokenSlice';

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
    }
  }));

const SignIn = () => {
    const dispatch = useDispatch()

    let history = useHistory();
    const classes = useStyles();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isEmailNotValid, setEmailNotValid ] = useState(false);
    const [ isPasswordNotValid, setPasswordNotValid ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ emailErrorMessage, setEmailErrorMessage ] = useState('Email is required.');
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('Password is required.');

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

    async function formSubmitButtonClickHandler(e) {
        e.preventDefault();

        let isEmailValid = await checkEmail();
        let isPasswordValid = await checkPassword();

        if (!(isEmailValid && isPasswordValid)) return;

        await API.post('/users/authenticate', {
            email: email,
            password: password
        })
        .then(response => {  
            localStorage.setItem('jwtToken', response.data.jwtToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            dispatch(setJwtToken(response.data.jwtToken));
            history.push('/');
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                setErrorMessage(error.response.data.message);
            }
        });
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
                        <label className={classes.errorSignIn}>
                            {errorMessage}
                        </label>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={formSubmitButtonClickHandler}>
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
    );
};

export default SignIn;