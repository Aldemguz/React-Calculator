import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import style from './style';

const Result = ({ classes, result }) => {
    return( 
        <Grid
            className={classes.container} 
            container 
            justify='flex-end'
            alignItems='center'
        >
            <span className={classes.overflow}>{result}</span>
        </Grid>
    )
}

export default withStyles(style)(Result);