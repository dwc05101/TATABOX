import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import user from '../images/user_white.png';
import ProfilePop from './profilePop.js'

import "./make_class_component.css";

class GradeReport extends Component{
    constructor(props){
        super(props);
        this.firebaseO = this.props.Firebase;
        this.firebase = this.firebaseO.fb; 
        this.state={
            students : [],
            user_name: '...',
            userID: '',
            user_img: user,
            synch: false,
            firebase : props.Firebase.fb,
            classname: props.match.params.classname,
            init : false
        };

        let {match} = this.props;

        let that = this;
        this.handleLogout = this.handleLogout.bind(this);
        this.handleback = this.handleback.bind(this);

        new Promise(function(resolve, reject){
            that.firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    that.setState({user_name : user.displayName, userID : user.uid});
                    resolve();
                } else {
                    alert("Oops! you are signed out!");
                    window.location.pathname = "TATABOX/";
                }
            });
        }).then(function(result) {
                that.firebase.database().ref('/AUTH/'+that.state.userID).once('value').then(function(snapshot) {
                var userimgs = (snapshot.val() && snapshot.val().imgs) || user;
                that.setState({user_img: userimgs, synch: true, classname: match.params.classname});
            });
        })
    }

    componentDidMount(){
        var classname = this.state.classname;
        var students = [];
        this.state.firebase.database().ref("/classInfo").once("value").then(function(snapshot){
            snapshot.forEach(function(child){
                if(child.val().name === classname){     
                    students = child.val().students;
                }
            })
        })
        .then(()=>{
            this.setState({
                students : students,
                init : true
            })
        })
    }

    handleLogout() {
        this.firebase.auth().signOut();
      }

    makeTable(){
        return(this.state.students.map(student=>{
            var attendanceString = this.getAttendanceString(student.attendance);
            var attendanceScore = this.getAttendanceScore(student.attendance);

            return(
                <TableRow key={student.name}>
                    <TableCell>{student.sid}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{attendanceString}</TableCell>
                    <TableCell>{attendanceScore}</TableCell>
                </TableRow>
            )
        }))
    }

    getAttendanceString(target){
        var count = 0;
        var attendanceString = "";
        for(var i = 0; i<target.length; i++){
            if(target[i].attend==="attend"){
                count++;
            }
        }
        attendanceString += count.toString();
        attendanceString += "/";
        attendanceString += target.length.toString();

        return attendanceString;
    }

    getAttendanceScore(target){
        var count = 0;
        var precision = Math.pow(10,2);
        for(var i = 0; i<target.length; i++){
            if(target[i].attend==="attend"){
                count++;
            }
        }

        return Math.ceil((count*100/target.length) * precision) / precision;
    }

    handleback(){
        let classname_ = this.state.classname;
        window.location.pathname="TATABOX/check/" + classname_;
    }

    gotoMade() {
        window.location.pathname="TATABOX/class";
    }

    render(){
        let {match} = this.props;

        let $profileImg = null;
        if (this.state.synch) {
            console.log(this.state.user_img);
            $profileImg = (<img src={this.state.user_img} id = 'user_img'/>);
        } else {
            $profileImg = (<img src={user} id = 'user_img'/>);
        }

        if(this.state.init){

        return(
            <div id = 'full'>
                <div id = 'headbar3'>
                    <h1 id = 'logo'style={{marginTop:"5px", cursor: "pointer"}} onClick={this.gotoMade}>TATABOX</h1>
                    <h2 style={{color: "white",float:"left", marginLeft: "15px",marginTop:"29px"}}>{match.params.classname}</h2>
                    <div id = 'img_cropper'>
                        <ProfilePop profileImg = {$profileImg} user_name = {this.state.user_name} logout={this.handleLogout}></ProfilePop>
                    </div>
                    <div id = 'backtoclass' style={{marginRight:"2vh",marginTop:"3vh",paddingLeft:"0px"}} onClick={this.handleback}>
                        <h3>Back to Class</h3>
                    </div>
                    <div id = 'backtoclass' onClick={this.handleback}>
                        <img style={{width:"30px", height:"30px"}} src = {require('../images/back.png')}></img>
                    </div>
                </div>
                <div id = 'body' style={{display:"flex", alignItems:"center",paddingTop:"1%",paddingBottom:"1%"}}>
                    <h1 style={{marginLeft:"1.5%",whiteSpace:"nowrap"}}>Grade Report</h1>
                </div>
                <div id = 'body2' style={{backgroundColor:"#FFFFFF"}}>
                    <Table>
                        <TableHead>
                            <TableRow style={{backgroundColor:"#7eab54"}}>
                                <TableCell style={{color:"white",fontWeight:"bold",fontSize:"20px"}}>Student ID</TableCell>
                                <TableCell style={{color:"white",fontWeight:"bold",fontSize:"20px"}}>Name</TableCell>
                                <TableCell style={{color:"white",fontWeight:"bold",fontSize:"20px"}}>Attendance</TableCell>
                                <TableCell style={{color:"white",fontWeight:"bold",fontSize:"20px"}}>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.makeTable()}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
    }

}

export default GradeReport;