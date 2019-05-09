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
import './step_component.css';

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
    this.roomchange = this.roomchange.bind(this);
  }
  
  state = {
    code: '',
    name: '',
    prof: '',
    bd : '',
    room:'',
    selectedOption: null,
    isVisible: false,
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

  roomchange = event => {
    if (this.state.selectedOption!=null) {
      this.setState({
        room: event.target.value,
        isVisible : true,
      })
      console.log(`room change bd selected`);
    }else {
      this.setState({
        room: event.target.value,
      })
      console.log(`room change bd not selected`);
    }
  }

  buildingchange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  onSubmit(){
    //send class info to DB
    window.location.pathname = "/made";
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
          <img id="step" src = {require('../images/step1.png')} style={{width:'100%'}}/>
          <div id = "fullbox">
            <div id = "infobox">
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
                  onChange={this.roomchange}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  variant="outlined"
                />
                </div>
              </form>
            </div>
            <div id = "seatbox">
              <div id="seatlay" style={{width: "50vh", height: "50vh"}}>
                Preview for Seat
                <div>{ this.state.isVisible ? (
                  <img id = 'seat' src = {require('../images/seat.png')}/>
                ) : null }
                </div>
              </div>
              <div id="buttondiv" style={{width: "50vh", height: "10vh"}}>
                <Button variant="contained" color="secondary" onClick={this.cancel}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={this.moveStep}>
                  Next
                </Button>
              </div>
            </div>
          </div>
      </div>
    }else{
      step = <div>
      <img id="step" src = {require('../images/step2.png')} style={{width:'100%'}}/>
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