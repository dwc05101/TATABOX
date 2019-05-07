import React, {Component} from 'react';
import './main_component.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Firebase from '../firebase';
import {Link} from 'react-router-dom';
import { func } from 'prop-types';
import Modal from 'react-awesome-modal';
import user from '../images/user.png';



class Main extends Component{
    constructor(props){
      super(props);

      this.state = {
        user_id : "",
        user_pw : "",
        up_modal : false,
        find_modal : false,
        sign_up_id : "",
        sign_up_pw : "",
        sign_up_name : "",
        sign_up_school : "",
        sign_up_dept : ""
      }
      
      this.handleChange = this.handleChange.bind(this);
      this.openUp = this.openUp.bind(this);
      this.closeUp = this.closeUp.bind(this);
      this.openFind = this.openFind.bind(this);
      this.closeFind = this.closeFind.bind(this);
    }


    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

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

  
    onSubmit(e){
        window.location.pathname = "/make";
    }
  
    componentDidMount(){
        return;
    }
  
  
    render(){
      let picture_instruction = "Click icon to\nadd profile image";
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
                            onChange={this.handleChange("user_id")}
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
                        onChange={this.handleChange("user_pw")}
                        margin="normal"
                        style={{width:"70%"}}
                        />
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.onSubmit} style={{
                            marginTop:"10%",width:"40%",borderRadius: 10,
                            backgroundColor: "#4C9900",
                            padding: "18px 36px",
                            fontSize: "20px"}}>
                            Sign In
                        </Button>
                        <div style={{color:"#0000FF",textDecorationLine: 'underline', marginTop:"8%"}}>
                            <text onClick={this.openUp}>Sign Up</text>
                        </div>
                        <div style={{color:"#0000FF",textDecorationLine: 'underline', marginTop:"2%"}}>
                            <text onClick={this.openFind}>Forgot Password?</text>
                        </div>
                    </form>
                    <Modal className = "signup-modal" visible={this.state.up_modal} width="600" height="600" effect="fadeInUp" onClickAway={()=> this.closeUp()}>
                        <div className = "title-box" align="center" style={{fontSize: "30px", fontWeight:"bold"}}>
                            <label className = "title"> SIGN UP </label>
                        </div>
                        <div className = "pic-id-pw">
                            <div className = "pic">
                                <div className = "pic-select">
                                    <div className = 'picture-container'>
                                        <img src={user} alt={"user"}/>
                                    </div>
                                </div>
                                <div className = 'instruction-container'>
                                    <div className = 'pic-instruction'>
                                        {picture_instruction.split('\n').map( line => {return (<span>{line}<br/></span>)})}                                        
                                    </div>
                                </div>
                            </div>
                            <div className = "id-pw">
                                <div className = "id">
                                    <div className = "id-text" align="left" style={{marginLeft: "10%", fontSize: "24px", fontWeight:"bold",color:"#808080"}}>
                                        <label style = {{verticalAlign: "middle"}}>
                                            Email
                                        </label>
                                    </div>
                                    <div className = "id-input" >
                                        <TextField
                                        id="user_id"
                                        value={this.state.sign_up_id}
                                        onChange={this.handleChange("sign_up_id")}
                                        margin="normal"
                                        style={{width:"80%"}}
                                        />
                                    </div>
                                </div>
                                <div className = "pw">
                                    <div className = "pw-text" align="left" style={{marginLeft: "10%", fontSize: "24px", fontWeight:"bold",color:"#808080"}}>
                                        <label style = {{verticalAlign: "middle"}}>
                                            Password
                                        </label>
                                    </div>
                                    <div className = "pw-input">
                                        <TextField
                                        id="user_pw"
                                        value={this.state.sign_up_pw}
                                        onChange={this.handleChange("sign_up_pw")}
                                        margin="normal"
                                        style={{width:"80%"}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "name-school">
                                <div className = "name">
                                    <div className = "name-text" align="left" style={{marginLeft: "10%", fontSize: "24px", fontWeight:"bold",color:"#808080"}}>
                                        <label style = {{verticalAlign: "middle"}}>
                                            Name
                                        </label>
                                    </div>
                                    <div className = "name-input">
                                        <TextField
                                        id="user_name"
                                        value={this.state.sign_up_name}
                                        onChange={this.handleChange("sign_up_name")}
                                        margin="normal"
                                        style={{marginLeft: "2.5%", width:"80%"}}
                                        />
                                    </div>
                                </div>
                                <div className = "school">
                                    <div className = "school-text" align="left" style={{fontSize: "24px", fontWeight:"bold",color:"#808080"}}>
                                        <label style = {{verticalAlign: "middle"}}>
                                            School
                                        </label>
                                    </div>
                                    <div className = "school-input">
                                        <TextField
                                        id="user_school"
                                        value={this.state.sign_up_school}
                                        onChange={this.handleChange("sign_up_school")}
                                        margin="normal"
                                        style={{marginRight: "10%", width:"90%"}}
                                        />
                                    </div>
                                </div>
                        </div>
                        <div className = "dept">
                            <div className = "dept-text" align="left" style={{marginLeft: "5%", fontSize: "24px", fontWeight:"bold",color:"#808080"}}>
                                <label style = {{verticalAlign: "middle"}}>
                                    Dept/Occupation
                                </label>
                            </div>
                            <div className = "dept-input">
                                <TextField
                                id="user_dept"
                                value={this.state.sign_up_dept}
                                onChange={this.handleChange("sign_up_dept")}
                                margin="normal"
                                style={{width:"90%"}}
                                />
                            </div>
                        </div>
                        <div className = "signup-button-container">
                            <Button className = "signup-button" variant="contained" color="primary" onClick={this.onSubmit} style={{
                                width:"25%",borderRadius: 10,
                                backgroundColor: "#4C9900",
                                fontSize: "20px"}}>
                                {/*padding: "18px 36px", */}
                                Sign Up
                            </Button>
                        </div>
                    </Modal>
                    <Modal visible={this.state.find_modal} width="600" height="600" effect="fadeInUp" onClickAway={()=> this.closeFind()}

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
  