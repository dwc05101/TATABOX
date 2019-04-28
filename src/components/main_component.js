import React, {Component} from 'react';
import './main_component.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Firebase from '../firebase';
import {Link} from 'react-router-dom';
import { func } from 'prop-types';
import Modal from 'react-awesome-modal';



class Main extends Component{
    constructor(props){
      super(props);

      this.state = {
        user_id : "",
        user_pw : "",
        up_modal : false,
        find_modal : false
      }

      this.onChangeID = this.onChangeID.bind(this);
      this.onChangePW = this.onChangePW.bind(this);
      this.openUp = this.openUp.bind(this);
      this.closeUp = this.closeUp.bind(this);
      this.openFind = this.openFind.bind(this);
      this.closeFind = this.closeFind.bind(this);
    }

    openUp(){
        this.setState({
            up_modal : true
        })
    };

    closeUp(){
        this.setState({
            up_modal : false
        })
    };

    openFind(){
        this.setState({
            find_modal : true
        })
    };

    closeFind(){
        this.setState({
            find_modal : false
        })
    }


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
  
    onSubmit(e){
        
    }
  
    componentDidMount(){
        return;
    }
  
  
    render(){
      return (
        <body>
            <div className="App">
                <div className = "box1">
                    <div className = "main-logo"> TATA BOX </div>
                    <div className = "main-explanation">The best helper of TA</div>
                </div>
                <div className = "box2">
                    <h1 style={{marginTop: "20%"}}>Welcome.</h1>
                    <form onSubmit={this.onSubmit} autoComplete="false">
                        <div align="left" style={{marginTop:"20%",marginLeft:"15%",fontWeight:"bold",color:"#808080"}}>
                            <label>
                                Email
                            </label>
                        </div>
                        <br/>
                        <div>
                            <TextField
                            id="user_id"
                            value={this.state.user_id}
                            onChange={this.onChangeID}
                            margin="normal"
                            style={{width:"70%"}}
                            />
                        </div>
                        <br/>
                        <br/>
                        <div align="left" style={{marginLeft:"15%",fontWeight:"bold",color:"#808080"}}>
                            <label>
                                Password
                            </label>
                        </div>
                        <br/>
                        <TextField
                        id="user_pw"
                        value={this.state.user_pw}
                        type="password"
                        onChange={this.onChangePW}
                        margin="normal"
                        style={{width:"70%"}}
                        />
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.onSubmit} style={{
                            marginTop:"10%",width:"40%",borderRadius: 35,
                            backgroundColor: "#4C9900",
                            padding: "18px 36px",
                            fontSize: "18px"}}>
                            Sign In
                        </Button>
                        <div style={{color:"#0000FF",textDecorationLine: 'underline', marginTop:"8%"}}>
                            <text onClick={this.openUp}>Sign Up</text>
                        </div>
                        <div style={{color:"#0000FF",textDecorationLine: 'underline', marginTop:"2%"}}>
                            <text onClick={this.openFind}>Forgot Password?</text>
                        </div>
                    </form>
                    <Modal visible={this.state.up_modal} width="500" height="350" effect="fadeInUp" onClickAway={()=> this.closeUp()}
                            style={{padding: "10"}}
                    >
                        This is Up modal.
                    </Modal>
                    <Modal visible={this.state.find_modal} width="500" height="350" effect="fadeInUp" onClickAway={()=> this.closeFind()}
                            style={{padding: "10"}}
                    >
                        This is Find modal.
                    </Modal>
                </div>
            </div>
        </body>
      );
    }
  }
  
  export default Main;
  