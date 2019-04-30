import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';

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
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.moveStep = this.moveStep.bind(this);
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  makeList(){
    return(currencies.map(option => {
      return(
      <MenuItem key={option.value} value={option.value} style={{zindex:"100"}}>
        {option.label}
      </MenuItem>
      )
    }))
  }

  openModal(){
    this.setState({
      visible: true
    })
  }

  closeModal(){
    this.setState({
      visible: false
    })
  }

  onSubmit(){
    this.closeModal();
    //send class info to DB
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
    let step;
    if (this.state.step==0) {
      step =
        <div>
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
            style={{zindex:'2'}}
            helperText="Please select Building"
            margin="normal"
            variant="outlined"
          >
            {this.makeList()}
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
          <Button variant="contained" color="secondary" onClick={() => this.closeModal()}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.moveStep}>
            Next
          </Button></div><br/>
        </form></div><div className = "seatbox">Seat BOX</div></div>
    }else{
      step = <div className="App">
      <div className ="step1" style={{backgroundColor:"pink"}}><h4>STEP1</h4></div>
      <div className ="step2" style={{backgroundColor:"rgb(255, 82, 111)"}}><h4>STEP2</h4></div>
      <div className ="infobox">
          <h2>Invite other TAs</h2>
          <Button variant="contained" >
                          Invite
                      </Button>
          <br/>
          <Button variant="contained" color="secondary" onClick={this.moveStep}>
                          Back
                      </Button>
          <Button variant="contained" color="primary" onClick={() => this.onSubmit()}>
                          Finish
                      </Button>
          
      </div>
      </div>
    }
    
    return (<div>
      <Button variant="contained" color="primary" onClick={this.openModal}>Open Modal</Button>
      <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp">{step} </Modal>
        </div>);
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);