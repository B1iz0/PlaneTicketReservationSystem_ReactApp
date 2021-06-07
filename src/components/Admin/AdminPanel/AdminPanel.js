import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { blueGrey, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    adminPanel: {
        position: 'sticky',
        height: 'auto',
        maxWidth: '100px',
        left: 0,
        padding: '10px',
        backgroundColor: indigo[400],
        color: blueGrey[50],
    },
}));

const AdminPanel = () => {
    const classes = useStyles();

    return(
        <Toolbar className={classes.adminPanel}> 
            <Grid>
                <Typography align='center'>Admin</Typography>
                <Button href='/admin/users'>Users</Button>
                <Button>Companies</Button>
                <Button>Flights</Button>
            </Grid>
        </Toolbar>
    );
};

export default AdminPanel;