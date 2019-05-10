import React, {Component} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import {FirebaseDatabaseProvider} from "@react-firebase/database";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Main from "./components/main_component";
import MakeClass from "./components/make_class_component";
import Step from './components/step_component';
import Outline from './components/OutLinedTextFields'
import Management from './components/student_manage_component';
import ClassMade from './components/class_made_component'
import AttendanceCheck from './components/attendance_check';
import GradeReport from "./components/grade_report_component";

import students from "./data/student_pairs";
import Firebase from './firebase';

class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    var fb = new Firebase();
    return (
      <Router basename="/TATABOX">
        <Route path="/" exact component={props => <Main/>}  Firebase = {fb}></Route>
        <Route path="/make" component={props => <MakeClass/>}></Route>
        <Route path="/test" component={props => <Outline/>}></Route>
        <Route path="/management" component = {props=><Management students={students}/>}></Route>
        <Route path="/made" component={props => <ClassMade/>}></Route>
        <Route path="/check" component={props => <AttendanceCheck/>}></Route>
        <Route path="/grade" component={props => <GradeReport students={students}/>}></Route>
      
      </Router> 
    );
  }
}

export default App;
