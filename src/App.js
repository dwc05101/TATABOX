import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Main from "./components/main_component";
import MakeClass from "./components/make_class_component";
import Management from './components/student_manage_component';
import AttendanceCheck from './components/attendance_check';
import GradeReport from "./components/grade_report_component";
import StudentSide from "./components/student_side";

import students from "./data/student_pairs";
import Firebase from './firebase';
import UploadCsv from './components/uploadCsv.js';

class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let fb = new Firebase();
    
    return (
      <Router basename="/TATABOX">
        <Route path="/" exact
          render = {props => <Main Firebase = {fb}/>}
        ></Route>
        <Route path="/class"
          render = {props => <MakeClass Firebase = {fb} />}
        ></Route>
        <Route path="/management/:classname"
          component = {props=><Management Firebase={fb} students={students} {...props}/>}
        ></Route>
        <Route path="/check/:classname"
          component = {props => <AttendanceCheck Firebase = {fb} {...props}/>}
        ></Route>
        <Route path="/grade/:classname"
          component={props => <GradeReport Firebase={fb} students={students} {...props}/>}
        ></Route>
        <Route path="/student/:classname/:date"
          component={props => <StudentSide Firebase={fb} {...props}/>}
        ></Route>
        <Route path="/test"
          component={props => <UploadCsv Firebase={fb} {...props}/>}
        ></Route>
      </Router>
    );
  }
}


export default App;
