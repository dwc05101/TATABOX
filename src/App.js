import React, {Component} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import firebase from './firebase';
import {FirebaseDatabaseProvider} from "@react-firebase/database";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";


import Main from './components/main_component';


class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Router>
        
        <Route path="/" exact component={props => <Main/>}></Route>
      </Router> 
    );
  }
}

export default App;
