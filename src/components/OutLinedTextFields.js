import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import './step_component.css';
import user from '../images/user_white.png';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {purple} from '@material-ui/core/colors'
import students from '../data/student_pairs';
import UploadCsv from './uploadCsv.js'
import firebase from '@firebase/app';

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
});

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
    this.roomchange = this.roomchange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.firebase = this.props.Firebase.fb;
    this.componentDidMount = this.componentDidMount.bind(this);
    this.cancel = this.cancel.bind(this);

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
      userClas:[],
      userImgs:'',
      synch:false,
      message:'',
      test:false,
      userSeat: [],
      Seats:[],
      init: false,
      layout: {},
    }

    this.indenth = 1;
    this.indentw = 1;

    let that = this;
    
    new Promise(function(resolve, reject) {
      that.firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        // User is signed in.
            that.setState({username : user.displayName, userID: user.uid})
            resolve();
        } else {
          alert("Oops! you are signed out!");
          window.location.pathname = "TATABOX/";
        }
      });
    }).then(function(result) {
      /* get&set seat layout*/
      that.firebase.database().ref('/AUTH/'+that.state.userID+'/seat').once('value').then(function(snapshot) {
        if (snapshot.val() == null) {
          that.setState({ init: true })
          return false
        }
        // first, set DateIndex
        let seat = snapshot.val().seat;
        // console.log(seat);
        var seat_array = seat;
        var w = seat_array[0].length;
        var h = seat_array.length;
        var seat_size;

        if(w > h){
          seat_size = w;
          that.indenth = Math.floor((w-h)/2)+1;
        }
        else if (w%2 === h%2){
          seat_size = h;
          that.indentw = Math.floor((h-w)/2)+1;
        }else{
          seat_size = h+1;
          that.indentw = Math.floor((h-w+1)/2)+1;
        }

        //screen & numbers
        that.state.Seats.push(
          <div class = "screen" >screen</div>
        )
        for(var i = 0; i< seat_size+1; i++){
          if( i< that.indentw ){
            that.state.Seats.push(
              <div class = "none-seat" ></div>
            )
          }else if( i >= that.indentw && i < that.indentw+w ){
            that.state.Seats.push(
              <div class = "number-seat" >{i-1}</div>
            )
          }else{
            that.state.Seats.push(
              <div class = "none-seat" ></div>
            )
          }
        }

        for(var i = 1; i< seat_size; i++){
          if(i >= that.indenth && i<that.indenth+h){
            that.state.Seats.push(
              <div class = "alphabet-seat" >{String.fromCharCode(64+i-that.indenth+1)}</div>
            )
          }else{
            that.state.Seats.push(
              <div class = "none-seat" ></div>
            )
          }
          for(var j = 1; j < seat_size+1; j ++){
            if(i<that.indenth|| j<that.indentw|| i >= h+that.indenth || j >= w + that.indentw ){
              that.state.Seats.push(
                <div class = "none-seat"></div>
              )
            }else if( seat_array[i-that.indenth][j-that.indentw] === 1){
              that.state.Seats.push(
                <div class = "seat" id = { (i-that.indenth) + "-" + (j-that.indentw)} hindex={i-that.indenth} windex={j-that.indentw} onClick = {that.openattendModal}></div>
              )
            }else if( seat_array[i-that.indenth][j-that.indentw] === 0){
              that.state.Seats.push(
                <div class = "none-seat"></div>
              )
            }
          }
        }
        that.setState({seat_size: seat_size, layout: seat, init: true});
      });
    })

  }


  componentDidMount(){
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
      var lst = [];
      var mtjson = JSON.stringify(lst);
      var username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
      var userdept = (snapshot.val() && snapshot.val().dept) || 'Anonymous';
      var userschl = (snapshot.val() && snapshot.val().schl) || 'Anonymous';
      var userclas = (snapshot.val() && snapshot.val().clas) || mtjson;
      // added
      var userimgs = (snapshot.val() && snapshot.val().imgs) || user;
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

  onSubmit(studentslst,imgfiles){
    let that = this;
    let newcode = JSON.parse(this.state.userClas);
    newcode.push(this.state.code);
    var stringJson = JSON.stringify(newcode);

    //class Info sending..
    this.firebase.database().ref('/classInfo/').push({
      code : this.state.code,
      name : this.state.name,
      prof : this.state.prof,
      bd : this.state.bd,
      room : this.state.room,
      students: studentslst,
      layout: this.state.layout
    });
    
    //user info update
    this.firebase.database().ref('/AUTH/'+this.state.userID).set({
      name : that.state.userName,
      dept : that.state.userDept,
      schl : that.state.userSchl,
      clas : stringJson,//newcode,
      imgs : that.state.userImgs
    });

    
    


    
    new Promise(function(resolve, reject){
      //upload students images
      for(var i =0; i<imgfiles.length; i++){
        let file = imgfiles[i];
        const storage = that.firebase.storage();
        const storageRef = storage.ref();
        var uploadTask = storageRef.child('images/' + file.name).put(file);

        uploadTask.on('state_changed', function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
          });
        });
    }
      resolve();
    })
    .then(function(result) {
      that.moveStep();
      that.setState(initialState);
      window.location.pathname = "TATABOX/class";
     })
  

  }

  isFull(){
    if(this.state.code!='' && this.state.name!='' && this.state.prof!='' && this.state.bd!='' && this.state.room!=''){
      this.setState({error : false});
    }
  }
  cancel(){
    this.setState(initialState);
    this.props.closeModal();
  }

  moveStep(){
    console.log(`this.state.userID`,this.state.userID);
    if(this.state.step==0){
      let that = this;
      let bool;
      if(that.state.code=='' || that.state.name=='' || that.state.prof=='' || that.state.bd=='' || that.state.room==''){
        that.state.error=true;
        that.state.message='You have to enter all information.'
        that.state.test=true;
      }else{
        new Promise(function(resolve, reject){
          let code = that.state.code
          that.firebase.database().ref('/classInfo/').once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
              let curr = childSnapshot.val().code
              if(code==curr){
                bool=true;
                resolve();
              }
            })
          resolve();
        })
        .then(function(result) {
          console.log(`touch this`)
          if(bool){
            that.state.error=true;
            that.state.message='This class already exists.'
            
            that.setState({step : 0});
          }
          else{
            that.state.error=false;
            that.setState({step : 1,});
          }
         })
      })
    }
  }else{
    this.setState({step : 0});
  }
}

  gotoCustom() {
    window.location.pathname = "/TATABOX/custom"
  }
  

  render() {
    console.log(this.state.init, this.state.synch);
    if (!this.state.init) return null;
    if (!this.state.synch) return null;
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
    //STEP1
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
                  <p style={{color:'red', fontSize:'20px'}}>{this.state.message}</p>
                ) : null }
                </div>
                
              </form>
            </div>
            <div id = "seatbox">
              <div id="seatlay" style={{width: "100%", alignItems: "center"}}>
                <div style={{height: "4vh"}}>
                  <text>Preview for Seat</text>
                </div>
                
                <div style={{height: "35vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                  <div style={{height: "5vh"}}>
                    <MuiThemeProvider theme={theme}>
                      <Button variant="contained" color="primary" onClick={this.gotoCustom}>
                          Customize Seat!
                      </Button>
                    </MuiThemeProvider>
                  </div>
                  <div className="wrapper" style={{border: "1px solid black", height:"30vh", width: "100%"}}>
                    {this.state.Seats}
                  </div>
                </div>
              </div>
              <div id="buttondiv" style={{width: "50%", height: "10vh", position: 'absolute' ,bottom:0}}>
                <Button variant="contained" color="secondary" onClick={this.cancel} className={classes.margin}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={this.moveStep}  className={classes.margin}>
                    Next
                </Button>
              </div>
            </div>
          </div>
      </div>
    }else{ //STEP2
      step = 
      <div>
        <img id="step" src = {require('../images/step2.png')} style={{width:'100%'}}/>
        <UploadCsv onSubmit={this.onSubmit} moveStep={this.moveStep}/>
      </div>
    }
    document.documentElement.style.setProperty('--seat-size', this.state.seat_size);
    return (
      <div style={{textAlign: "center"}}>
        {step}
      </div>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);