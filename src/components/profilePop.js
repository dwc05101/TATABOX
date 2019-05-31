import React, { Component } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
},
});

class ProfilePop extends Component {
  constructor(props) {
    super(props);
    this.state={
      anchorEl: null,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    //setAnchorEl(event.currentTarget);
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
    //setAnchorEl(null);
  }
  
  render(){
    const { classes }= this.props;
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popover' : null;
    return (
      <div>
        <div aria-describedby={id} variant="contained" onClick={this.handleClick}>
          {this.props.profileImg}
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
            <Typography className={classes.typography}>{this.props.user_name}</Typography>
            <Button variant="contained" color="secondary" className={classes.margin} onClick={this.props.logout}>Logout</Button>
          </Popover>
      </div>
    );
  }
}

export default withStyles(styles)(ProfilePop);