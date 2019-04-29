import React, {Component} from 'react';
import './step_component.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MakeClass from './make_class_component';

class Step extends Component{
    constructor(props){
      super(props);

      this.state = {
        course_code : "",
        course_name : "",
        course_prof : "",
        building : "",
        classroom : "",
        step : 0
      }

      this.onChangeCode = this.onChangeCode.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeProf = this.onChangeProf.bind(this);
      this.onChangeBD = this.onChangeBD.bind(this);
      this.onChangeRoom = this.onChangeRoom.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.moveStep = this.moveStep.bind(this);
    
    }
  
    onChangeCode(e){
      this.setState({
        course_code : e.target.value
      });
    };

    onChangeName(e){
        this.setState({
          course_name : e.target.value
        });
      };

    onChangeProf(e){
      this.setState({
        course_prof : e.target.value
      });
    };

    onChangeBD(e){
        this.setState({
          building : e.target.value
        });
      };

    onChangeRoom(e){
        this.setState({
          classroom : e.target.value
        });
      };
    moveStep(){
      this.setState({
        step : (this.state.step + 1)%2
      });
    }

    onSubmit(e){
        //submit
    }

  
    componentDidMount(){
      return;
    }
  
  
    render(){
        let step1;
        step1 = <div className="App">
                    <div className ="step1"><h4>STEP1</h4></div>
                    <div className ="step2"><h4>STEP2</h4></div>
                    <div className ="infobox">
                        <h2>Infomation about Course</h2>
                        <form onSubmit={this.onSubmit}>
                            <div align="left" style={{marginLeft:"15%",fontWeight:"bold"}} >
                                <label>
                                    Course Code
                                </label>
                                <TextField
                                id="course_code"
                                value={this.state.course_code}
                                onChange={this.onChangeCode}
                                margin="normal"
                                align="right"
                                style={{width:"70%"}}
                                />
                            </div>
                            <br/>
                            <div align="left" style={{marginLeft:"15%",fontWeight:"bold"}}>
                                <label>
                                    Course Name
                                </label>
                                <TextField
                                id="course_name"
                                value={this.state.course_name}
                                onChange={this.onChangeName}
                                margin="normal"
                                style={{width:"70%"}}
                                />
                            </div>
                            <br/>
                            <div align="left" style={{marginLeft:"15%",fontWeight:"bold"}}>
                                <label>
                                    Professor Name
                                </label>
                                <TextField
                                id="course_prof"
                                value={this.state.course_prof}
                                onChange={this.onChangeProf}
                                margin="normal"
                                style={{width:"70%"}}
                                />
                            </div>
                            <br/>
                            <div align="left" style={{marginLeft:"15%",fontWeight:"bold"}}>
                                <label>
                                    Building
                                </label>
                                <TextField
                                id="buiding"
                                value={this.state.buiding}
                                onChange={this.onChangeBD}
                                margin="normal"
                                style={{width:"70%"}}
                                />
                            </div>
                            <br/>
                            <div align="left" style={{marginLeft:"15%",fontWeight:"bold"}}>
                                <label>
                                    Classroom
                                </label>
                                <TextField
                                id="classroom"
                                value={this.state.classroom}
                                onChange={this.onChangeRoom}
                                margin="normal"
                                style={{width:"70%"}}
                                />
                            </div>
                            <br/>
                            <Button variant="contained" color="secondary" >
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={this.moveStep}>
                                Next
                            </Button>
                            <div>

                            </div>
                        </form>
                    </div>
                    <div className="seatbox">Seat layout</div>
                </div>
    let step2;
    step2=<div className="App">
            <div className ="step1" style={{backgroundColor:"pink"}}><h4>STEP1</h4></div>
            <div className ="step2" style={{backgroundColor:"rgb(255, 82, 111)"}}><h4>STEP2</h4></div>
            <div className ="infobox">
                <h2>Invite other TAs</h2>
                <Button variant="contained" >
                                Invite
                            </Button>
                <br/>
                <Button variant="contained" color="secondary" onClick={this.moveStep}>
                                Back
                            </Button>
                <Button variant="contained" color="primary" onClick={this.onSubmit}>
                                Finish
                            </Button>
                
            </div>
        </div>
    if (this.state.step==0) return (<div>{step1}</div>);
    else return (<div>{step2}</div>);
    }
  }
  
  export default Step;
  