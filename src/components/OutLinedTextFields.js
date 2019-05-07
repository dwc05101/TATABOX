import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import MakeClass from './make_class_component.js'
import Typography from '@material-ui/core/Typography';

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

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    fontFamily: ["Montserrat", "sans-serif"].join(",")
  }),
};

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


const initialState = {
      code: '',
      name: '',
      prof: '',
      bd: '',
      room: '',
      visible: false,
      step:0
};



class OutlinedTextFields extends React.Component {

  constructor(props){
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.moveStep = this.moveStep.bind(this);
    this.buildingchange = this.buildingchange.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  
  state = {
    bd : '',
    room:'',
    selectedOption: null,
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  cancel(){
    window.location.pathname = "/make";
    this.setState(initialState);
  }

  buildingchange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  onSubmit(){
    //send class info to DB
    window.location.pathname = "/make";
    this.moveStep();
    this.setState(initialState);
  }

  moveStep(){
    this.setState({
      step : (this.state.step + 1)%2
    });
  }

  render() {
    const { classes } = this.props;
    const { selectedOption } = this.state;
    let step;
    if (this.state.step==0) {
      step =
        <div>
          <div className ="step1" style={{backgroundColor:"rgb(255, 82, 111)"}}><p>STEP1</p></div>
      <div className ="step2" style={{backgroundColor:"pink"}}><p>STEP2</p></div>
        <div className = "infobox">
        <form className={classes.container} noValidate autoComplete="off">
          <div>
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
            <Select
                placeholder="Building"
                styles={customStyles}
                value={selectedOption}
                onChange={this.buildingchange}
                options={currencies}
              />
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

          <div>
          <Button variant="contained" color="secondary" onClick={this.cancel}>
            Cancel
          </Button>

          <Button variant="contained" color="primary" onClick={this.moveStep}>
            Next
          </Button>
          </div>
          </div><br/>
        </form></div><div className = "seatbox"><img id = 'seat' src = {require('../images/seat.png')}></img></div></div>
    }else{
      step = <div>
      <div className ="step1" style={{backgroundColor:"pink"}}><p>STEP1</p></div>
      <div className ="step2" style={{backgroundColor:"rgb(255, 82, 111)"}}><p>STEP2</p></div>
      <div className = "infobox">
          <Typography component="h2" variant="h5" gutterBottom>
          Invite other TAs
          </Typography>
          <Button variant="contained" >
                          Invite
                      </Button>
          <br/>
          <Button variant="contained" color="secondary" onClick={this.moveStep}>
                          Back
                      </Button>
          <Button variant="contained" color='primary' onClick={this.onSubmit}>
                          Finish
                      </Button>
          
      </div>
      </div>
    }
    
    return (<div>
      {step}
        </div>);
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);