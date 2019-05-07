import React, {Component} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import firebase from './firebase';
import {FirebaseDatabaseProvider} from "@react-firebase/database";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Main from "./components/main_component";
import MakeClass from "./components/make_class_component";
import Step from './components/step_component';
import Outline from './components/OutLinedTextFields'
import Management from './components/student_manage_component';



class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Router basename="/TATABOX">
        
        <Route path="/" exact component={props => <Main/>}></Route>
        <Route path="/make" component={props => <MakeClass/>}></Route>
        <Route path="/test" component={props => <Outline/>}></Route>
        <Route path="/management" component = {props=><Management/>}></Route>
      </Router> 
    );
  }
}

export default App;
