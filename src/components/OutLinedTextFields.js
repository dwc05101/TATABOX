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
import { darkBlack } from 'material-ui/styles/colors';
import user from '../images/user_white.png';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
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
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    fontSize: '20px',
    width: "80%",
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
  bd : '',
  room:'',
  step:0,
  selectedOption: null,
  isVisible: false,
  preview: 0, 
  error:false,
  firebase:null,
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
    this.errorhandle = this.errorhandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.firebase = this.props.Firebase.fb;

    this.state = {
      code: '',
      name: '',
      prof: '',
      bd : '',
      room:'',
      step:0,
      selectedOption: null,
      isVisible: false,
      preview: 0, 
      error:false,
      firebase:null,
      userID:'',
      userName:'',
      userDept:'',
      userSchl:'',
      userClas:'hi',
      userImgs:'',
      synch:false
    }


    let that = this;
    new Promise(function(resolve, reject){
      that.firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          that.setState({userID : user.uid});
          // console.log(`constructor userid`,user.uid);
          resolve();
        } else {
            alert("Oops! you are signed out!");
            window.location.pathname = "TATABOX/";
        }
      });
    })
    .then(function(result) {
      that.firebase.database().ref('/AUTH/'+that.state.userID).once('value').then(function(snapshot) {
      // console.log(`snapshot`,snapshot.val());
      var username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
      var userdept = (snapshot.val() && snapshot.val().dept) || 'Anonymous';
      var userschl = (snapshot.val() && snapshot.val().schl) || 'Anonymous';
      var userclas = (snapshot.val() && snapshot.val().clas) || '';
      // added
      var userimgs = (snapshot.val() && snapshot.val().imgs) || user;
      // console.log(`name`,username);
      // console.log(`dept`,userdept);
      // console.log(`schl`,userschl);
      // console.log(`clas`,userclas);
      // console.log(`imgs`,userimgs);
      that.setState({userName: username, userDept: userdept, userSchl: userschl, userClas: userclas, userImgs: userimgs, synch: true});
    });
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.isFull();
  };

  cancel(){
    window.location.pathname = "TATABOX/make";
    this.setState(initialState);
  }

  roomchange = event => {
    if (this.state.bd=='E11' && event.target.value=='311') {
      this.setState({
        room: event.target.value,
        isVisible : true,
        preview : 1,
      })
    }else if(this.state.selectedOption!=null && event.target.value!=''){
      this.setState({
        room: event.target.value,
        isVisible : true,
        preview : 2,
      })
    }else {
      this.setState({
        room: event.target.value,
        isVisible : false,
        preview : 0,
      })
    }
    this.isFull();
  }

  buildingchange = (selectedOption) => {
    if (this.state.room =='311' && selectedOption.value=='E11'){
      this.setState({ selectedOption , bd: selectedOption.value, preview : 1 , isVisible : true,});
    }else if(this.state.room!=''){
      this.setState({ selectedOption, bd: selectedOption.value, preview : 2 , isVisible : true,})
    }else{
      this.setState({ selectedOption , bd: selectedOption.value, preview : 0 });
    }
    this.isFull();
  }

  onSubmit(){
    let that = this;
    console.log(`onSubmit`);
    let newcode = this.state.userClas +","+this.state.code;

    //class Info sending..
    this.firebase.database().ref('/classInfo/').push({
      code : this.state.code,
      name : this.state.name,
      prof : this.state.prof,
      bd : this.state.bd,
      room : this.state.room,
    });
    
    //user info update
    this.firebase.database().ref('/AUTH/'+this.state.userID).set({
      name : that.state.userName,
      dept : that.state.userDept,
      schl : that.state.userSchl,
      clas : newcode,
      imgs : that.state.userImgs
    });
    this.moveStep();
    this.setState(initialState);
    window.location.pathname = "TATABOX/make";
  }

  isFull(){
    if(this.state.code!='' && this.state.name!='' && this.state.prof!='' && this.state.bd!='' && this.state.room!=''){
      this.setState({error : false});
    }
  }

  moveStep(){
    console.log(`this.state.userID`,this.state.userID);
    if(this.state.step==0){
      this.errorhandle();
      if(!this.state.error){
        this.setState({step : 1,});
      }
      else{
        this.setState({step : 0});
      }
    }else{
      this.setState({step : 0,});
    }
  }
  errorhandle(){
    if(this.state.code==''){
      this.state.error=true;
    }
    if(this.state.name==''){
      this.state.error=true;
    }
    if(this.state.prof==''){
      this.state.error=true;
    }
    if(this.state.bd==''){
      this.state.error=true;
    }
    if(this.state.room==''){
      this.state.error=true;
    }
  }

  render() {
    if(!this.state.synch) return null;
    // console.log(`outlined firebase`,this.firebase);
    const { classes } = this.props;
    const { selectedOption } = this.state;
    let prev;
    if (this.state.preview==2){
      prev = require('../images/ready.png');
    }else{
      prev = require('../images/seat.png');
    }
    let step;
    if (this.state.step==0) {
      step =
        <div>
          <img id="step" src = {require('../images/step1.png')} style={{width:'100%'}}/>
          <div id = "fullbox">
            <div id = "infobox">
              <form className={classes.container} noValidate autoComplete="off">
                <div style={{width: "100%"}}>
                <TextField
                  id="outlined-code"
                  label="CourseCode"
                  className={classes.textField}
                  value={this.state.code}
                  onChange={this.handleChange('code')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-name"
                  label="CourseName"
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
                /></div>
                <div style={{width: "100%", marginTop:12, marginLeft:'10%'}} >
                  <Select
                      placeholder="Building"
                      styles={customStyles}
                      value={selectedOption}
                      onChange={this.buildingchange}
                      options={currencies}
                    />
                </div>
                <div style={{width: "100%"}}>
                <TextField
                  id="outlined-number"
                  label="Classroom"
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
                { this.state.error ? (
                  <p style={{color:'red', fontSize:'20px'}}>You have to enter all information !</p>
                ) : null }
                </div>
                
              </form>
            </div>
            <div id = "seatbox">
              <div id="seatlay" style={{width: "100%"}}>
                Preview for Seat
                <div>{ this.state.isVisible ? (
                  <img id = 'seat' src = {prev} style={{marginTop:30}}/>
                ) : null }
                </div>
              </div>
              <div id="buttondiv" style={{width: "50%", height: "10vh", position: 'absolute' ,bottom:0}}>
                <Button variant="contained" color="secondary" onClick={this.props.closeModal} className={classes.margin}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={this.moveStep}  className={classes.margin}>
                    Next
                </Button>
              </div>
            </div>
          </div>
      </div>
    }else{
      step = 
      <div>
        <img id="step" src = {require('../images/step2.png')} style={{width:'100%'}}/>
        <div style={{marginTop:"10%",fontSize:"20px", height:"80%",}}>
            <Typography component="h2" variant="h5" gutterBottom>
            </Typography>
            <p style={{fontSize:'25px'}}><b>You have to invite students to class</b></p><br/>
            <p>Invitation link : <u style={{color:'#0040a8'}}>https://tatabox.com/happyta</u></p><br/>
            <Button variant="contained" >Send</Button>
            <p><br/>Click 'Send' button to send invitation link to students.</p><br/>
            </div>
        <div style={{height:"20%"}}>
            <Button variant="contained" color="secondary" onClick={this.moveStep} className={classes.margin}>
                            Back
                        </Button>
            <Button variant="contained" color='primary' onClick={this.onSubmit} className={classes.margin}>
                            Done!
                        </Button>
            
        </div>
      </div>
    }
    return (<div style={{textAlign: "center"}}>
      {step}
        </div>);
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);