import React, { useState } from 'react';
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import f from '../img/f.jpeg'
import logo from "../img/logo.jpg";
import { Formik } from "formik";
import * as Yup from "yup";
import config from "../config.json";
import http from "../Services/httpService";
import Error from "../Components/Error/error";
import "../index.css";
import styled from "styled-components";
import { useAuthState, useAuthDispatch } from '../Context/userContext'
import { loginUser } from "../Context/actions";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Navbar from '../Components/Navbar/navbar';
const validationSchema = Yup.object().shape({
    userName: Yup.string()
        .required("Please input this field"),
    passWord: Yup.string()
        .required("Please input this field")
})


const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '10px',
        width: '100%',
        '& > * + *': {
            //marginTop: theme.spacing(1),

        },
    },
}));



const Login = ({ history }) => {

    const dispatch = useAuthDispatch() //get the dispatch method from the useDispatch custom hook
    const [showProgress, setShowProgress] = useState(false)
    const classes = useStyles();

    const handleSubmit = async (values) => {
        setShowProgress(true)


        let payload = {
            Email: values.userName,
            Password: values.passWord,
        }
        try {
            let response = await loginUser(dispatch, payload) //loginUser action makes the request and handles all the neccessary state changes
            console.log(response)
            history.push('/dashboard') //navigate to dashboard on success
        } catch (error) {
            console.log(error)
            setShowProgress(false)
        }
    }


    return <Wrapper>
        <>

            <Grid container >
                <Grid className="loginImage" item xs={12} sm={6}>
                    <img
                        src={f}
                        style={{ width: '100%', height: '600px', maxHeight: '700px', minWidth: '250px', objectFit: 'cover' }}
                        alt='brand' />
                </Grid>
                <Grid className="loginForm" container item xs={12} sm={6} alignItems="center" direction="column" justify="space-between" style={{ padding: 10 }}>
                    <div />
                    <div style={{ display: "flex", flexDirection: "column", width: "50%", maxWidth: '50%', minWidth: "250px" }} >
                        <Grid container justify='center'>

                            <img
                                src={logo}
                                width={200}
                                alt='logo'
                            />
                            <p>Sign in with your app credentials to continue.</p>
                        </Grid>
                        <Formik
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setSubmitting(true)
                                handleSubmit(values);
                                //resetForm()
                                setSubmitting(false)

                            }}
                            initialValues={{
                                userName: '',
                                passWord: ''

                            }}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                <>
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextField label="Username" name="userName" margin="normal"
                                            onBlur={handleBlur}

                                            value={values.userName} onChange={handleChange}
                                            InputProps={{ startAdornment: (<InputAdornment><AccountCircle /></InputAdornment>) }} />
                                        <Error touched={touched.userName} message={errors.userName} />

                                        <TextField label="Password" type="Password" name="passWord" margin="normal"
                                            onBlur={handleBlur}
                                            value={values.passWord} onChange={handleChange}
                                            InputProps={{ startAdornment: (<InputAdornment><LockRounded /></InputAdornment>) }} />
                                        <Error touched={touched.passWord} message={errors.passWord} />

                                        <div style={{ height: 20 }} />
                                        {showProgress &&
                                            <div className={classes.root}>
                                                <LinearProgress />
                                            </div>
                                        }

                                        <Button type="submit" disabled={isSubmitting} color="primary" variant="contained" >Log in</Button>
                                    </form>

                                </>
                            )}
                        </Formik>

                    </div>
                    <div />
                </Grid>
            </Grid>

        </>
    </Wrapper>
}

const Wrapper = styled.section`

`

export default Login;
