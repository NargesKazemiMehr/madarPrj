import React from "react";
import Navbar from "../Components/Navbar/navbar";
import { Grid } from "@material-ui/core";
import { Route } from 'react-router-dom'
import K from "../Pages/k";
const Dashboard = () => {
    return (
        <Grid container >

            <Navbar />
            <Route path="/k" component={K} />
        </Grid>
    )
}

export default Dashboard;