import React, { useState } from 'react';
import { Grid } from "@material-ui/core";
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './Pages/login';
import Dashboard from "./Pages/dashboard";


const App = () => {

  return (
    <div >
      <Grid container >
        <Route path="/login" component={Login} />

        <Route path="/dashboard" component={Dashboard} />
      </Grid>
    </div>
  )
}

export default App;
