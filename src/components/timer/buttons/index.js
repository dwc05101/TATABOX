import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: red
    },
});

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
});

function Buttons(props) {
    const {classes} = props;
    const label = props.timingEvents.length % 2 === 0
        ? 'Start'
        : 'Stop'
    if (label == 'Start') {
        return (
            <div className='timer-buttons-start'>
                <MuiThemeProvider theme={theme}>
                    <Button variant="contained" style = {buttonStyle} fullWidth = "true" size = "large" color = "primary" className={classes.button} onClick = {props.handleClick}>
                        {label}
                    </Button>
                </MuiThemeProvider>
            </div>
        )
    } else {
        return (
            <div className='timer-buttons-stop'>
                <MuiThemeProvider theme={theme}>
                    <Button variant="contained" style = {buttonStyle} fullWidth = "true" size = "large" color = "secondary" className={classes.button} onClick = {props.handleClick}>
                        {label}
                    </Button>
                </MuiThemeProvider>
            </div>
        )
    }
    
}

export default withStyles(styles)(Buttons);