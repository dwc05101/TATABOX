import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Main from "./components/main_component";
import MakeClass from "./components/make_class_component";
import Management from './components/student_manage_component';
import AttendanceCheck from './components/attendance_check';
import GradeReport from "./components/grade_report_component";
import Custom from "./components/customize_seat";
import StudentSide from "./components/student_side";
import EditAttendance from "./components/edit_attendance_compent";
import StudentReport from "./components/student_report";
import Firebase from './firebase';

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
        <Route path="/management/:classname" exact
          component = {props=><Management Firebase={fb} {...props}/>}
        ></Route>
        <Route path="/custom"
          component = {props => <Custom Firebase = {fb} {...props}/>}
        ></Route>
        <Route path="/management/:classname/:sid"
          component = {props=><EditAttendance Firebase={fb} {...props}/>}
        ></Route>
        <Route path="/check/:classname" 
          component = {props => <AttendanceCheck Firebase = {fb} {...props}/>}
        ></Route>
        <Route path="/grade/:classname"
          component={props => <GradeReport Firebase={fb} {...props}/>}
        ></Route>
        <Route path="/student/:classname/:date" exact
          component={props => <StudentSide Firebase={fb} {...props}/>}
        ></Route>
        <Route path="/student/:classname/:date/:sid"
          component={props => <StudentReport Firebase={fb} {...props}/>}
        ></Route>
      </Router>
    );
  }
}


export default App;
