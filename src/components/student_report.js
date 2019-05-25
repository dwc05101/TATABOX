import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import "./make_class_component.css";

import alphabet from "../data/alphabet";

var classInfo;
var classKey;

class StudentReport extends Component{
    constructor(props){
        super(props);
        this.state={
            firebase : props.Firebase.fb,
            sid : props.match.params.sid,
            classname : props.match.params.classname,
            date : props.match.params.date,
            init : false,
            done : false,
            target: ""
        }

        this.onNo = this.onNo.bind(this);
        this.onYes = this.onYes.bind(this);
    }

    componentDidMount(){
        let that = this;
        this.state.firebase.database().ref("/classInfo").once("value").then(snapshot=>{
            snapshot.forEach(child=>{
                if(child.val().name===this.state.classname){
                    classInfo = child.val();
                    classKey = child.key;
                }
            })
        })
        .then(()=>{
            var report = classInfo.report;
            var target;
            for(var i=0; i<report.length; i++){
                if(report[i].sid===this.state.sid){
                    target = (i+1 === report.length) ? report[0] : report[i+1];
                    break;
                }
            }
            this.setState({
                init : true,
                target : target
            })
        })
    }

    onYes(){
        if(window.confirm("Are you sure? This is NOT REVERSIBLE.")){
            this.setState({
                done : true
            });
        }
    }

    onNo(){
        if(window.confirm("Are you sure? This is NOT REVERSIBLE.")){
            var reportStructure = {
                date : this.state.date,
                attend : "reported",
                row : this.state.target.row,
                seat : this.state.target.seat,
                reporter : this.state.sid
            }
            for(var i = 0; i<classInfo.students.length; i++){
                if(classInfo.students[i].sid === this.state.target.sid){
                    for(var j = 0; j<classInfo.students[i].attendance.length; j++){
                        if(classInfo.students[i].attendance[j].date === this.state.date){
                            classInfo.students[i].attendance[j] = reportStructure;
                            break;
                        }
                    }
                    break;
                }
            }
            this.state.firebase.database().ref("/classInfo/"+classKey).set(classInfo)
            .then(()=>{
                this.setState({
                    done : true
                });
            });
        }
    }


    render(){
        if(!this.state.done){
            if(this.state.init){
                return(
                    <div style={{backgroundColor:"white",width:"100vw",height:"100vh"}}>
                        <div className = "center" style={{height:"60vh"}}>
                            <h3>
                                Please check there is a student at seat
                                {" "}
                                {alphabet[parseInt(this.state.target.row)]}{this.state.target.seat}
                            </h3>
                        </div>
                        <div style={{position:"relative"}}>
                            <Button variant="contained" color="primary" onClick={this.onYes} style={{float:"left",marginLeft:"20vw"}}>YES</Button>
                            <Button variant="contained" color="secondary" onClick={this.onNo} style={{float:"right",marginRight:"20vw"}}>NO</Button>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div></div>
                )
            }
        }else{
            return(
                <div className="center" style={{backgroundColor:"white",width:"100vw",height:"100vh"}}>
                    <h3>Thank you for cooperation!</h3>
                </div>
            )
        }
    }

}

export default StudentReport;