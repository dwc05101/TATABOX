import React, {Component} from 'react';
import './main_component.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



class Main extends Component{
    constructor(props){
      super(props);

      this.state = {
        user_id : "",
        user_pw : ""
      }

      this.onChangeID = this.onChangeID.bind(this);
      this.onChangePW = this.onChangePW.bind(this);
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
        <div className="App">
            <div className = "box1" >
                box1
            </div>
            <div className = "box2">
                <h1 style={{marginTop: "20%"}}>Welcome.</h1>
                <form onSubmit={this.onSubmit}>
                    <div align="left" style={{marginTop:"15%",marginLeft:"15%",fontWeight:"bold"}}>
                        <label>
                            ID
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
                    <div align="left" style={{marginLeft:"15%",fontWeight:"bold"}}>
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
                    <Button variant="contained" color="primary" onClick={this.onSubmit} style={{marginTop:"10%",width:"20%"}}>
                        Sign In
                    </Button>
                    <div>

                    </div>
                </form>
            </div>
        </div>
  
      );
    }
  }
  
  export default Main;
  