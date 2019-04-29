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

//guseul


class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Router>
        <Route path="/" exact component={props => <Main/>}></Route>
        <Route path="/make" component={props => <MakeClass/>}></Route>
        <Route path="/test" component={props => <Outline/>}></Route>

      </Router> 
    );
  }
}

export default App;
