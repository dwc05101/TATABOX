import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    palette: {
      primary: red,
    },
})

const buttonStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px'
}

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
})

function Reset(props) {
    const {classes} = props;
    const label = props.timingEvents.length;

    if (label % 2 == 1) {
        return (
            <div className = 'reset-button'>
                <MuiThemeProvider theme={theme}>
                    <Button variant="contained" style = {buttonStyle} disabled = "true" fullWidth = "true" size = "large" color = "primary" className={classes.button} onClick = {props.handleClick}>
                        Reset
                    </Button>
                </MuiThemeProvider>
            </div>
        )
    } else {
        return (
            <div className = 'reset-button'>
                <MuiThemeProvider theme={theme}>
                    <Button variant="contained" style = {buttonStyle} fullWidth = "true" size = "large" color = "primary" className={classes.button} onClick = {props.handleClick}>
                        Reset
                    </Button>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(Reset);