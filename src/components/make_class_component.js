import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import Step from './step_component';
import Main from './main_component';
import Button from '@material-ui/core/Button';
import Outline from './OutLinedTextFields'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import OutLinedTextFields from './OutLinedTextFields';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });
  
  const currencies = [
    {
      value: 'N1',
      label: 'N1 (김병호 김삼열 IT융합빌딩)',
    },
    {
      value: 'N4',
      label: 'N4 (인문사회과학동)',
    },
    {
      value: 'E11',
      label: 'E11 (창의학습관)',
    },
    {
      value: 'E2-2',
      label: 'E2-2 (산업경영학동)',
    },
    {
      value: 'E6-5',
      label: 'E6-5 (궁리실험관)',
    },
  ];

class MakeClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            code: '',
            name: '',
            prof: '',
            bd: '',
            room: ''
        }
    }
 
    openModal() {
        this.setState({
            visible : true,
            overflow : "visible"
        });
    }
 
    closeModal() {
        this.setState({
            visible : false
        });
    }
    
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
 
    render() {
        const { classes } = this.props;
        let step1;
        step1 = 
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-code"
          label="Course Code"
          className={classes.textField}
          value={this.state.code}
          onChange={this.handleChange('code')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Course Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-prof"
          label="Professor"
          className={classes.textField}
          value={this.state.prof}
          onChange={this.handleChange('prof')}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-select-building"
          select
          label="Building"
          className={classes.textField}
          value={this.state.bd}
          onChange={this.handleChange('bd')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select Building"
          margin="normal"
          variant="outlined"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-number"
          label="Class Room"
          value={this.state.room}
          onChange={this.handleChange('room')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
      </form>

        return (
            <section>
                <h1>React-Modal Examples</h1>
                <OutLinedTextFields/>
            </section>
        );
    }
}
MakeClass.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(MakeClass);