import React, { Component } from 'react';
import {Prompt} from 'react-router-dom';
import './attendance_check.css';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
/*----------------------for tabs-----------------------*/
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import Modal from 'react-awesome-modal';
import Modal from '@material-ui/core/Modal';
import { Textfit } from 'react-textfit';
/*----------------------for tabs-----------------------*/
import Timer from './timer/index';
import user from '../images/user_white.png';
import { AvRepeat } from 'material-ui/svg-icons';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

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
  /*----------------------for tabs-----------------------*/
  root: {
    flexGrow:1,
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  indicator: {
    height: "0%",
    // borderRadius: "30px 30px 0px 0px"
  },
  reportTab: {
    fontSize: "24px",
    fontWeight: "bold"
  },
  absentTab: {
    fontSize: "24px",
    fontWeight: "bold"
  },
});

function shuffleArray(target) {
  var array = target
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

var DateIndex = -1;

/*----------------------for tabs-----------------------*/

function LinkTab(props) {
    return <Tab component = "a" style = {{zIndex: "1300"}} {...props} />
}

const theme = createMuiTheme({
  palette: {
    primary: {main:'rgba(255, 255, 255, 1)'},
  },
});

const reportedStyle = {
  height: "8%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px 10px 10px 10px",
  backgroundColor: "white",
  zIndex: "1400",
  fontWeight: "bold",
  fontSize: "24px",
  cursor: "pointer",
  color: "#f50057",
}

const absentStyle = {
  height: "8%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px 10px 10px 10px",
  backgroundColor: "white",
  zIndex: "1400",
  fontWeight: "bold",
  fontSize: "24px",
  cursor: "pointer",
  color: "black"
}

const noabsentStyle = {
  height: "8%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px 10px 10px 10px",
  backgroundColor: "white",
  zIndex: "1400",
  fontWeight: "lighter",
  fontSize: "16px",
  color: "gray"
}

/* let axios = require('axios');
const ax = axios.create({
  baseURL: 'http://localhost:3000/TATABOX'
}) */

class NavTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      reported: '',
      absent: '',
      loading: '',
      reportedmodalOn: false,
      absentmodalOn: false,
      reportedmodalIndex: 0,
      absentmodalIndex: 0,
      timerstate: this.props.timerstate,
    };
    this.reportList = [];
    this.absentList = [];
    this.reportInfo = [];
    this.absentInfo = [];

    this.openreportedModal = this.openreportedModal.bind(this);
    this.closereportedModal = this.closereportedModal.bind(this);
    this.openabsentModal = this.openabsentModal.bind(this);
    this.closeabsentModal = this.closeabsentModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
  }

  openreportedModal(e){
    this.setState({
      reportedmodalOn : true
    })
    this.handleClick(e)
  };

  closereportedModal(){
    this.setState({
      reportedmodalOn : false
    })
  };

  openabsentModal(e){
    this.setState({
      absentmodalOn: true
    })
    this.handleClick(e)
  }

  closeabsentModal() {
    this.setState({
      absentmodalOn: false
    })
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  shouldComponentUpdate(nextProps, nextState){
    if(JSON.stringify(nextProps) != JSON.stringify(this.props)){
      var reportedMap = {};
      var absentMap = [];

      let seatList = nextProps.seatList;
      console.log(seatList)

      /* set reported person*/
      nextProps.reportedList.forEach(function(student){
        let row =  student.attendance[DateIndex].row;
        let seat = student.attendance[DateIndex].seat;
        let reporterId = student.attendance[DateIndex].reporter;
        let reporterName;

        for (var i=0;i<seatList.length;i++) {
          if (seatList[i].sid == reporterId) {
            reporterName = seatList[i].name
          }
        }

        reportedMap[`${student.sid} ${student.name}(${alphabet[row]}${seat})`] = `${reporterId} ${reporterName}`;
      });
      /* set absent person*/
      nextProps.absentList.forEach(function(student){
        absentMap.push(`${student.sid} ${student.name}`);
      });
  
      const reportedStudents = reportedMap;
      const absentStudents = absentMap;
  
      var reportIndents = [];
      var absentIndents = [];
      var reportInfo = [];
      var absentInfo = [];

      // dictionary data form
      for (var i=0;i<Object.keys(reportedStudents).length;i++) {
        reportIndents.push(
          <div style = {reportedStyle} data-r-index={i} data-a-index={0} onClick={this.openreportedModal}>
            <Textfit style = {{pointerEvents: "none", textAlign: "center"}} mode="single" forceSingleModeWidth={false}>
              <text style = {{pointerEvents: "none"}}>{Object.keys(reportedStudents)[i]}</text>
              <br/>
              <text style = {{pointerEvents: "none", color: "gray", fontWeight: "lighter", fontSize: "16px"}}>&nbsp; reported by &nbsp; </text>
              <text style = {{pointerEvents: "none", color: "blue", fontSize: "20px"}}>{Object.values(reportedStudents)[i]}</text>
            </Textfit>
          </div>
        )
        reportIndents.push(<div style = {{height: "3%"}}></div>)
        reportInfo.push([Object.keys(reportedStudents)[i], " reported by ", Object.values(reportedStudents)[i], nextProps.reportedList[i].email])
      }
      if(reportInfo.length === 0){
        reportIndents.push(
          <div style = {reportedStyle} data-r-index={0} data-a-index={0}>
            <Textfit style = {{pointerEvents: "none"}} mode="single" forceSingleModeWidth={false}>
              <text style = {{pointerEvents: "none"}}>{Object.keys(reportedStudents)[0]}</text>
              <text style = {{pointerEvents: "none", color: "gray", fontWeight: "lighter", fontSize: "16px"}}>&nbsp; No Reported Student &nbsp; </text>
              <text style = {{pointerEvents: "none", color: "blue", fontSize: "20px"}}>{Object.values(reportedStudents)[0]}</text>
            </Textfit>
          </div>
        )
        reportIndents.push(<div style = {{height: "3%"}}></div>)
        reportInfo.push([0,0,0,0])
      }
      // list data form
      console.log(absentStudents)
      for (var i=0;i<absentStudents.length;i++) {
        
        absentIndents.push(<div style = {absentStyle} data-a-index={i} data-r-index={0}  onClick = {this.openabsentModal}>{absentStudents[i]}</div>)
        absentIndents.push(<div style = {{height: "3%"}}></div>)
        absentInfo.push([nextProps.absentList[i].sid , nextProps.absentList[i].name, nextProps.absentList[i].email])
      }

      if(absentIndents.length === 0){
        absentIndents.push(<div style = {noabsentStyle} data-a-index={0} data-r-index={0}> No Absent Student </div>)
        absentIndents.push(<div style = {{height: "3%"}}></div>)
        absentInfo.push([0,0,0])
      }

      this.reportList = reportIndents;
      this.absentList = absentIndents;
      this.reportInfo = reportInfo;
      this.absentInfo = absentInfo;
      return true
    }
    return true
  }

  componentWillMount() {
    var reportedMap = {};
    var absentMap = [];

    /* set reported person*/
    this.props.reportedList.forEach(function(student){
      reportedMap[student.sid] = student.attendance[DateIndex].reporter;
    });
    /* set absent person*/
    this.props.absentList.forEach(function(student){
      absentMap.push(student.sid);
    });

    const reportedStudents = reportedMap;
    const absentStudents = absentMap;

    var reportIndents = [];
    var absentIndents = [];
    var reportInfo = [];
    var absentInfo = [];
    // dictionary data form
    if(reportInfo.length === 0){
      reportIndents.push(
        <div style = {reportedStyle} data-a-index = {0} data-r-index={0}>
          <Textfit style = {{pointerEvents: "none"}} mode="single" forceSingleModeWidth={false}>
            <text style = {{pointerEvents: "none"}}></text>
            <text style = {{pointerEvents: "none", color: "gray", fontWeight: "lighter", fontSize: "16px"}}>&nbsp; Not Yet Started &nbsp; </text>
            <text style = {{pointerEvents: "none", color: "blue", fontSize: "20px"}}></text>
          </Textfit>
        </div>
      )
      reportIndents.push(<div style = {{height: "3%"}}></div>)
      reportInfo.push([0,0,0,0])
    }
    if(absentIndents.length === 0){
      absentIndents.push(<div style = {noabsentStyle} data-r-index={0} data-a-index={0} > Not Yet Started </div>)
      absentIndents.push(<div style = {{height: "3%"}}></div>)
      absentInfo.push([0,0,0])
    }

    this.reportList = reportIndents;
    this.absentList = absentIndents;
    this.reportInfo = reportInfo;
    this.absentInfo = absentInfo;
  }

  handleClick(e) {
    var rindex = e.target.getAttribute("data-r-index");
    var aindex = e.target.getAttribute("data-a-index");   
    this.setState({
      reportedmodalIndex: rindex,
      absentmodalIndex: aindex
    });
  }
  
  render() {
    const {classes} = this.props;
    const {value} = this.state;
    // console.log(this.reportInfo)
    // console.log(this.absentInfo)
    // console.log(this.reportList)
    // console.log(this.absentList)
    return (
      <MuiThemeProvider theme={theme}>
        <NoSsr>
          <div className = {classes.root}>
            <AppBar position = "static" style = {{color: "white"}}>
              <Tabs variant = "fullWidth" classes = {{indicator: classes.indicator}} value = {value} onChange = {this.handleChange}>
                <LinkTab label={<span className ={classes.reportTab}>Reported</span>} style = {{backgroundColor: "#ef9a9a", /* borderRadius: "20px 20px 0px 0px" */}}/>
                <LinkTab label={<span className ={classes.reportTab}>Absent</span>}  style = {{backgroundColor: "#9e9e9e", /* borderRadius: "20px 20px 0px 0px" */}}/>
              </Tabs>
            </AppBar>
            {value === 0 && 
            <Typography component = "div" style = {{ padding: 8*3, backgroundColor: "#ef9a9a", height: "90%"}}>
              {this.props.children}{this.reportList}
            </Typography>}
            {value === 1 && 
            <Typography component = "div" style = {{ padding: 8*3, backgroundColor: "#9e9e9e", height: "90%"}}>
              {this.props.children}{this.absentList}
            </Typography>}
          </div>
            <Modal open={this.state.reportedmodalOn} onClose={this.closereportedModal}>
              <div style={{position: "absolute", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", width: "500px", height: "400px", backgroundColor: "#ef9a9a", outline: "none", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{width: "480px", height: "380px", backgroundColor: "white", borderRadius: "10px"}}>
                  <div onClick={this.closereportedModal} style = {{top: "0"}}>
                      <img style={{width:"30px", height:"30px", float: "right"}} src = {require('../images/closeModal.png')}></img>
                  </div>
                  <div style = {{width: "480px", height: "320px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <img style={{width:"40px", height:"40px"}} src = {require('../images/reported.png')}></img>
                    <br/>
                    <text style = {{color: "red", fontWeight: "bold", fontSize: "30px"}}>{this.reportInfo[this.state.reportedmodalIndex][0]}</text>
                    <text style = {{color: "gray", fontWeight: "light", marginBottom:"20px", fontSize: "15px"}}> {this.reportInfo[this.state.reportedmodalIndex][3]}</text>
                    <text style = {{color: "gray", fontWeight: "lighter", fontSize: "30px"}}>{this.reportInfo[this.state.reportedmodalIndex][1]}</text>
                    <text style = {{color: "blue", fontSize: "30px"}}>{this.reportInfo[this.state.reportedmodalIndex][2]}</text>
                  </div>
                </div>
              </div>
            </Modal>
            <Modal open={this.state.absentmodalOn} onClose={this.closeabsentModal}>
              <div style={{position: "absolute", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", width: "500px", height: "300px", backgroundColor: "#9e9e9e", outline: "none", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{width: "480px", height: "280px", backgroundColor: "white", borderRadius: "10px"}}>
                  <div onClick={this.closeabsentModal} style = {{top: "0"}}>
                      <img style={{width:"30px", height:"30px", float: "right"}} src = {require('../images/closeModal.png')}></img>
                  </div>
                  <div style = {{width: "480px", height: "210px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <img style={{width:"40px", height:"40px"}} src = {require('../images/absent.png')}></img>
                    <br/>
                    <text style = {{fontSize: "30px"}}>Absent</text>
                    <text style = {{color: "red", fontWeight: "bold", fontSize: "30px"}}>{this.absentInfo[this.state.absentmodalIndex][0]} {this.absentInfo[this.state.absentmodalIndex][1]}</text>
                    <text style = {{color: "gray", fontWeight: "light", marginTop:"10px", fontSize: "15px"}}>{this.absentInfo[this.state.absentmodalIndex][2]}</text>
                  </div>
                </div>
              </div>
            </Modal>
        </NoSsr>
      </MuiThemeProvider>
    )
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

NavTabs = withStyles(styles)(NavTabs);
/*----------------------for tabs-----------------------*/

var globalDB;
var globalDate;
var classInfo;
var classKey;

var backup;

var studentInit = false;
var done = false;

var started = false;


window.onbeforeunload = function(){
  if(window.confirm("\0/")){
    return;
  }
};

class AttendanceCheck extends Component{
  constructor(props) {
    super(props);

    globalDB = props.Firebase.fb.database();
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    globalDate = date;
    var link = "https://dwc05101.github.io/TATABOX/student/"+props.match.params.classname+"/"+date;
    this.state = {
        visible : false,
        init : false,
        synch: false,
        checkDone : false,
        open: false,
        code: '',
        name: '',
        prof: '',
        bd: '',
        room: '',
        username: '...',
        userID: '',
        user_img: user,
        absent: '',
        reported: '',
        classname: props.match.params.classname,
        date : date,
        link : link,
        firebase : props.Firebase.fb,
        /*----- student attendance------*/
        dataindex: 0,
        seatlist :[],
        absentlist :[],
        reportedlist : [],
        timerstate: "begin",
        Seats : [],
        seat_size: 10,
        /*---- modal state-------*/
        hindex: 0,
        windex: 0,
        attendmodalOn: false,
        reportedmodalOn: false,
        done : "",
        //classname: match.params.classname,
    }

    this.openreportedModal = this.openreportedModal.bind(this);
    this.closereportedModal = this.closereportedModal.bind(this);
    this.openattendModal = this.openattendModal.bind(this);
    this.closeattendModal = this.closeattendModal.bind(this);
    this.handClick = this.handClick.bind(this);
    this.gotoManagement = this.gotoManagement.bind(this)
    let {match} = this.props;

    this.firebaseO = this.props.Firebase;
    this.firebase = this.firebaseO.fb;
    this.indentw = 1;
    this.indenth = 1;
    this.Info = {"0-0": [0,0,0,0,0,0]};

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
      /* get user img*/
      that.firebase.database().ref('/AUTH/'+that.state.userID).once('value').then(function(snapshot) {
        var userimgs = (snapshot.val() && snapshot.val().imgs) || user;
        that.setState({user_img: userimgs, classname: match.params.classname});
      });
    }).then(function(result) {
      /* get&set seat layout*/
      that.firebase.database().ref('/classInfo/').once('value').then(function(snapshot) {
        snapshot.forEach(function(child){
          if(child.val().name === that.state.classname){
            // first, set DateIndex
            
            if(child.val().done !== undefined){
              //This class is done
              // console.log("HEY:"+child.val().done)
              that.setState({
                done : child.val().done
              });
            }

            backup = child.val();
            classKey = child.key;

            var seat_array = child.val().layout;
            
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
                  <div class = "number-seat" >{i - that.indentw}</div>
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
                    <div class = "seat" id = { (i-that.indenth) + "-" + (j-that.indentw)} hindex={i-that.indenth} windex={j-that.indentw}></div>
                  )
                }else if( seat_array[i-that.indenth][j-that.indentw] === 0){
                  that.state.Seats.push(
                    <div class = "none-seat"></div>
                  )
                }
              }
            }
            that.setState({seat_size: seat_size, init:true});
          }
      })
      /* allow render after synch is set*/
      })
      .then(function(result){
        /* get class students & mount listener to FB*/
        var classname = that.state.classname;
        that.state.firebase.database().ref("/classInfo").on("value", function(snapshot){
            // console.log("changed");
            snapshot.forEach(function(child){
                if(child.val().name === classname){
                  classInfo = child.val();
                  // first, set DateIndex
                  if(child.val().students[0].attendance===undefined){
                    DateIndex = 0;
                    that.setState({
                      reportedlist: [],
                      absentlist: [],
                    })
                  }else{
                    if(DateIndex === -1)DateIndex = child.val().students[0].attendance.length-1;

                  var sub_reportedlist = [];
                  var sub_absentlist = [];

                  child.val().students.forEach(function(student){
                    if(student.attendance !== undefined){
                        if(student.attendance[DateIndex].date === globalDate){
                          if(student.attendance[DateIndex].attend === "reported"){
                            sub_reportedlist.push(student);
                            that.state.seatlist.push(student);
                          }
                          else if(student.attendance[DateIndex].attend === "attend"){
                            that.state.seatlist.push(student);
                          }
                          else if(student.attendance[DateIndex].attend === "absent"){
                            sub_absentlist.push(student);
                          }
                        }
                    }
                  })

                  
                  that.state.seatlist.forEach(function(student){
                    var today = student.attendance[DateIndex];
                    var square = document.getElementById((today.row)+ "-"+(today.seat));
                    var seatList = Object.values(that.state.seatlist);
                    // var student = student;
                    if(square !== null){
                      if(today.attend === "attend"){
                        square.style.backgroundColor = "green";
                        square.onclick = that.openattendModal;
                        
                        that.Info[(today.row)+ "-" +(today.seat)] = ["a" ,`${student.sid} ${student.name}(${alphabet[today.row]}${today.seat})`,0,0,0,0];
                      }else if(today.attend === "reported"){
                        square.style.backgroundColor = "red";
                        square.onclick = that.openreportedModal;
                        let reporterId = student.attendance[DateIndex].reporter;
                        let reporterName;

                        for (var i=0;i<seatList.length;i++) {
                          if (seatList[i].sid == reporterId) {
                            reporterName = seatList[i].name;
                          }
                        }

                        that.Info[(today.row)+ "-" +(today.seat)] = ["r", `${student.sid} ${student.name}(${alphabet[today.row]}${today.seat})`,student.email, "reported by", reporterId + " " + reporterName];
                      }
                    }
                  })

                  that.setState({
                    reportedlist: sub_reportedlist,
                    absentlist: sub_absentlist,
                  })
                  }
                }
            })
        });
      })
      .then(()=>{
        /* allow render after synch is set*/
        that.setState({synch: true});
      });
    });
  }

  handleTimerClick(e){
    if(e.target.innerText === "RESET"){
      if(!started){
        if(window.confirm("This will RESET WHOLE PROCEDURE. Are you sure?"))
            window.location.reload();
      }
    }
    if(e.target.innerText === "START"){
      classInfo.available = true;
      started = true;
      if(!studentInit){
        //Initialize
        studentInit = true;
        var defaultStructure = {
          date : globalDate,
          attend : "absent"
        }
        classInfo.students.map(student=>{
          if(student.attendance === undefined){
            var attendanceArray = [];
            attendanceArray.push(defaultStructure);
            student.attendance = attendanceArray;
          }else{
            student.attendance.push(defaultStructure);
          }
        })
      }
      globalDB.ref("/classInfo/"+classKey).set(classInfo);
    }
    if(e.target.innerText === "STOP"){
      classInfo.available = false;
      started = false;
      globalDB.ref("/classInfo/"+classKey).set(classInfo);
    }
  }

  changeState = state =>{
    this.setState({
      timerstate: state
    });
  }
  
  getState = () => {
    return this.state.timerstate;
  }

  openattendModal(e){
    this.setState({
      attendmodalOn: true
    })
    this.handClick(e)
  }
  closeattendModal() {
    this.setState({
      attendmodalOn: false
    })
  }

  openreportedModal(e){
    this.setState({
      reportedmodalOn : true
    })
    this.handClick(e)
  };

  closereportedModal(){
    this.setState({
      reportedmodalOn : false
    })
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
  if (this.anchorEl.contains(event.target)) {
    return;
  }
    this.setState({ open: false });
  };


  handClick(e){
    var hindex = e.target.getAttribute("hindex");
    var windex = e.target.getAttribute("windex");
    this.setState({
      hindex: hindex,
      windex: windex
    });
  }

  gotoManagement() {
    let classname_ = this.state.classname;
    window.location.pathname = "TATABOX/management/" + classname_;
  }

  gotoMade() {
    window.location.pathname="TATABOX/class"
  }

  componentDidUpdate(){
    if(!done){
      window.onbeforeunload = () => {
        globalDB.ref("/classInfo/"+classKey).set(backup);
      };
    }else{
      window.onbeforeunload = undefined;
    }
  }

  onConfirm(){
    let that = this;
    if(window.confirm("You CANNOT CHECK ATTENDACNE after confirm. Are you sure to confirm today's attendance check?")){
      done = true;
      classInfo.done = globalDate;
      var attendanceList = [];
      for(var i = 0; i<classInfo.students.length; i++){
          for(var j = 0; j<classInfo.students[i].attendance.length; j++){
              if(classInfo.students[i].attendance[j].date === globalDate){
                  if(classInfo.students[i].attendance[j].attend === "attend"){
                      attendanceList.push({
                          sid : classInfo.students[i].sid,
                          row : classInfo.students[i].attendance[j].row,
                          seat : classInfo.students[i].attendance[j].seat
                      })
                  }
              }
          }
      }

      classInfo.report = shuffleArray(attendanceList);

      globalDB.ref("/classInfo/"+classKey).set(classInfo)
      .then(()=>{
        window.location.reload();
      }) 
    }
  }

  render() {


    let {match} = this.props;

    let $profileImg = null;
    if (this.state.synch) {
        $profileImg = (<img src={this.state.user_img} id = 'user_img'/>);
    } else {
        $profileImg = (<img src={user} id = 'user_img'/>);
    }

    let that = this;

    document.documentElement.style.setProperty('--seat-size', this.state.seat_size);


    if(this.state.done===this.state.date){
      done = true;
      if(document.getElementById("timer")!==null){
        document.getElementById("timer").style.display = "none";
        document.getElementById("link").style.display = "none"; 
        document.getElementById("confirm").style.display = "none"; 
        document.getElementById("done").style.visibility = "visible"; 
      }
    }

    if (!this.state.synch) return null;
    if (!this.state.init) return null;

    // console.log(this.Info);

    return(
        <body id = 'full2'>
          <Prompt
            when={!done}
            message={"You have not confirmed your attendance check. Are you sure to leave?"}
            />
            <div id = 'headbar2'>
              <h1 id = 'logo'style={{marginTop:"5px", cursor: "pointer"}} onClick={this.gotoMade}>TATABOX</h1>

              <h2 style={{color: "white",float:"left", marginLeft: "15px",marginTop:"29px"}}>{match.params.classname}</h2>


              <div id = 'button-container'>
                <Button
                    id = 'menu_button2'
                    buttonRef={node => {
                    this.anchorEl = node;
                    }}
                    aria-owns={this.state.open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                >
                <img
                  id = "menu-img2"
                  src = {require('../images/menu.png')}
                  >
                </img>
                </Button>
                <Popper open={this.state.open} style = {{zIndex: "1500"}} anchorEl={this.anchorEl} placement="bottom-end" transition disablePortal>
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList>
                            <MenuItem onClick={this.gotoManagement}>Management</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
              </div>

              <h3 id = 'user_id2'>{this.state.username}</h3>

              <div id = 'img-container'>
                {$profileImg}
              </div>
              
            </div>
            <div id = "content" style={{backgroundColor:"#ffffff"}} onClick={this.handleClick}>
              <div id = "timer-layout">
                <div id = "link">
                      <h3>URL : </h3>
                      <u style={{color:'#0040a8'}}>{this.state.link}</u>
                </div>
                <div id = "timer" onClick={this.handleTimerClick}>
                  <Timer setTState = {this.changeState} getTState = {this.state.timerstate}  />
                </div>
                <div id = "layout" class = "wrapper" style={{border:"1px solid black",margin:"1%",padding:"3%"}}>
                      {this.state.Seats}
                </div>
                <div id = "confirm" className="center" style={{height:"5vh",width:"100%"}}>
                  <Button variant="contained" color="secondary" style={{width:"200px"}} onClick={this.onConfirm}>
                      finish
                  </Button>
                </div>
                <div id = "done" className="center" style={{width:"100%", height:"5vh",visibility:"hidden"}}>
                  <h3>You've done today's attendance check!</h3>
                </div>
                <Modal open={this.state.attendmodalOn} onClose={this.closeattendModal}>
                  <div style={{position: "absolute", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", width: "500px", height: "300px", backgroundColor: "green", outline: "none", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div style={{width: "480px", height: "280px", backgroundColor: "white", borderRadius: "10px"}}>
                      <div onClick={this.closeattendModal} style = {{top: "0"}}>
                          <img style={{width:"30px", height:"30px", float: "right"}} src = {require('../images/closeModal.png')}></img>
                      </div>
                      <div style = {{width: "480px", height: "210px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <img style={{width:"40px", height:"40px"}} src = {require('../images/attended.png')}></img>
                        <br/>
                        <text style = {{color: "blue", fontSize: "30px"}}>{this.Info[(this.state.hindex) + "-" + (this.state.windex)][1]}</text>
                      </div>
                    </div>
                  </div>
                </Modal>
                <Modal open={this.state.reportedmodalOn} onClose={this.closereportedModal}>
                  <div style={{position: "absolute", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", width: "500px", height: "400px", backgroundColor: "#ef9a9a", outline: "none", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div style={{width: "480px", height: "380px", backgroundColor: "white", borderRadius: "10px"}}>
                      <div onClick={this.closereportedModal} style = {{top: "0"}}>
                          <img style={{width:"30px", height:"30px", float: "right"}} src = {require('../images/closeModal.png')}></img>
                      </div>
                      <div style = {{width: "480px", height: "320px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <img style={{width:"40px", height:"40px"}} src = {require('../images/reported.png')}></img>
                        <br/>
                        <text style = {{color: "red", fontWeight: "bold", fontSize: "30px"}}>{this.Info[(this.state.hindex) + "-" + (this.state.windex)][1]}</text>
                        <text style = {{color: "gray", fontWeight: "light", marginBottom:"15px", fontSize: "15px"}}> {this.Info[(this.state.hindex) + "-" + (this.state.windex)][2]}</text>
                        <text style = {{color: "gray", fontWeight: "lighter", fontSize: "30px"}}>{this.Info[(this.state.hindex) + "-" + (this.state.windex)][3]}</text>
                        <text style = {{color: "blue", fontWeight: "bold", fontSize: "30px"}}>{this.Info[(this.state.hindex) + "-" + (this.state.windex)][4]}</text>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
              <div id = "report-tab">
                <NavTabs styles = {{height: "100%"}} renderupdater = {this.state.renderupdater} timerstate = {this.state.timerstate} reportedList = {this.state.reportedlist} absentList = {this.state.absentlist} seatList = {this.state.seatlist} ></NavTabs>
              </div>
            </div>
        </body>
    )
  }
}

export default AttendanceCheck;