import React from 'react';
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import f from '../../img/f.jpeg'
import logo from "../../img/logo.jpg";
import { Formik } from "formik";
import * as Yup from "yup";
import http from "../../Services/httpService";
import config from "../../config.json";
import Error from "../../Components/Error/error";
import "../../index.css";

const Login = ({ loggedIn }) => {
    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .required("Please input this field"),
        passWord: Yup.string()
            .required("Please input this field")
    })

    const handleSubmit = async (values) => {
    
        let newValues = {
            Email: values.userName,
            Password: values.passWord,

        }
        await http.post(`${config.apiLogin}/Login`, newValues).then((response) => {
            console.log(response)
            if (response.status == '200') {
                //alert('OK')
                loggedIn(true);
            }
            else if (response.status === '') {
            }

        })
    }


    return (
        <>
            <Grid item xs={12} sm={6}>
                <img
                    src={f}
                    style={{ width: '100%', height: '600px', maxHeight: '700px', minWidth: '250px', objectFit: 'cover' }}
                    alt='brand' />
            </Grid>
            <Grid container item xs={12} sm={6} alignItems="center" direction="column" justify="space-between" style={{ padding: 10 }}>
                <div />
                <div style={{ display: "flex", flexDirection: "column", width: "50%", maxWidth: '50%', minWidth: "250px" }} >
                    <Grid container justify='center'>
                        <img
                            src={logo}
                            width={200}
                            alt='logo'
                        />
                    </Grid>
                    <Formik
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setSubmitting(true)
                            handleSubmit(values);
                            resetForm()
                            setSubmitting(false)

                        }}
                        initialValues={{
                            userName: '',
                            passWord: ''

                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
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
                                    <Button type="submit" disabled={isSubmitting} color="primary" variant="contained" >Log in</Button>
                                </form>

                            </>
                        )}
                    </Formik>

                </div>
                <div />
            </Grid>
        </>
    )
}

export default Login;