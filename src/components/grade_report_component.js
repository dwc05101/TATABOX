import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import "./make_class_component.css";

class GradeReport extends Component{
    constructor(props){
        super(props);
        this.state={
            students : props.students,
            username : "Gwangjo Gong"
        };
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
            if(target[i]===1){
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
            if(target[i]===1){
                count++;
            }
        }

        return Math.ceil((count*100/target.length) * precision) / precision;
    }

    handleback(){
        window.location.pathname="./check";
    }

    render(){
        return(
            <div id = 'full'>
                <div id = 'headbar'>
                    <h1 id = 'logo'style={{marginTop:"5px"}}>TATABOX</h1>
                    <h2 style={{color: "white",float:"left", marginLeft: "15px",marginTop:"29px"}}>CS374 : Introduction to HCI</h2>
                    <h3 id = 'userid'>{this.state.username}</h3>
                    <div id = 'img_cropper'>
                        <img id = 'user_img' src = {require('../images/user_img.png')} >
                        </img>
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
                <div id = 'body2'>
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
    }

}

export default GradeReport;