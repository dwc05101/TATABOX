import {React, Component, Fragment} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import firebase from './firebase';
import {FirebaseDatabaseProvider} from "@react-firebase/database";
import * as Modal from'react-modal';

//hi


class App extends Component{
  constructor(props){
    super(props);
  }

  state = {
    users : [],
    user_id : "",
    user_pw : ""
  };

  onChangeID(e){
    this.setState({
      user_id : e.target.value
    });
  };
  onChangePW(e){
    this.setState({
      user_pw : e.target.value
    })
  }


  componentDidMount(){
    
  }


  render(){
    return (
      <div>
        {this.state.users}
      </div>
    );
  }
}

export default App;
