import React, {Component} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import firebase from './firebase';
import {FirebaseDatabaseProvider} from "@react-firebase/database";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

<<<<<<< HEAD

import Main from './components/main_component';
=======
//hi
//hello
>>>>>>> d7861dffec8decb4e6d3e376af8a65c0087cea3b


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
