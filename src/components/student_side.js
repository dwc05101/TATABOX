import React, {Component} from 'react';

import "./make_class_component.css";

import alphabet from "../data/alphabet";
import { parse } from 'url';

var classInfo;
var classKey;

class StudentSide extends Component{

    constructor(props){
        super(props);
        this.state = {
            firebase : props.Firebase.fb,
            classname : props.match.params.classname,
            date : props.match.params.date,
            sid : '',
            row : 0,
            seat : 0,
            rows : [],
            seats : [],
            init : false,
            done : false,
            available : false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        let that = this;

        this.state.firebase.database().ref("/classInfo").on("value",function(snapshot){
            snapshot.forEach(child=>{
                if(child.val().name===that.state.classname){
                    classInfo = child.val();
                    classKey = child.key;
                    that.setState({
                        available : child.val().available,
                    });
                }
            })
        })
    }

    componentDidMount(){
        var classname = this.state.classname;
        var sid = this.state.sid;
        this.state.firebase.database().ref("/classInfo").once("value").then(function(snapshot){
            snapshot.forEach(function(child){
                if(child.val().name === classname){
                    classInfo = child.val();
                    classKey = child.key;
                    return;
                }
            })
        })
        .then(()=>{
            var rows = [];
            var seats = [];

            for(var i = 0; i<classInfo.layout.length; i++){
                rows.push({
                    num : i,
                    label : alphabet[i]
                });
                var temp = [];
                for(var j = 0; j<classInfo.layout[i].length; j++){
                    if(classInfo.layout[i][j]===1){
                        temp.push(j);
                    }
                }
                seats.push(temp);
            }
            this.setState({
                seats : seats,
                rows : rows,
                init : true
            })
        })
    }

    MakeRowOption(){
        return(
            <select value={this.state.row} onChange={this.handleChange("row")}>
                {this.state.rows.map(row=>{
                    return(
                        <option value={row.num}>{row.label}</option>
                    )
                })}
            </select>
        )
    }
    MakeSeatOption(row){
        var target = this.state.seats[row];
        return(
            <select value={this.state.seat} onChange={this.handleChange("seat")}>
                {target.map(seat=>{
                    return(
                        <option value={seat}>{seat}</option>
                    )
                })}
            </select>
        )
    }

    parseRow(row){
        return (this.state.rows[row]===undefined) ? "" : this.state.rows[row].label;
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
          });
    }

    handleSubmit(event) {
        var found = false;
        var target;
        var attendanceStructure = {
            date : this.state.date,
            attend : "attend",
            row : this.state.row,
            seat : this.state.seat
        }
        event.preventDefault();
        for(var i = 0; i<classInfo.students.length; i++){
            if(classInfo.students[i].sid === this.state.sid){
                found = true;
                target = classInfo.students[i];
                break;
            }
        }

        if(!found){
            window.alert("Please check your Student ID.");
            return;
        }

        for(var i = 0; i<target.attendance.length; i++){
            if (target.attendance[i].date===this.state.date){
                target.attendance[i] = attendanceStructure;
                break;
            }
        }

        for(var i = 0; i<classInfo.students.length; i++){
            if(classInfo.students[i].sid === this.state.sid){
                classInfo.students[i] = target;
                break;
            }
        }

        console.log(classInfo);
        console.log(target);

        this.state.firebase.database().ref("/classInfo/"+classKey).set(classInfo)
        .then(
            ()=>{
                this.setState({
                    done : true
                })
            }
        );
    }

    render(){
    if(this.state.available){
        if(this.state.init){
            if(this.state.done){
                return(
                    <div className="center" style={{width:"100vw",height:"100vh",backgroundColor:"white"}}>
                        <h3>Thank you for participation!</h3>
                    </div>
                )
            }else{
            return(
                <div style={{padding:"10vh",backgroundColor:"white",width:"100vw",height:"100vh"}}>
                    <h1>Attendance Check</h1><br/>
                    <h3>classname : {this.state.classname}</h3>
                    <h3>Date : {this.state.date}</h3>
                    <br/>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Student ID:
                            <input type="text" name="sid" value={this.state.sid} onChange={this.handleChange("sid")} />
                        </label>
                        <br/>
                        <label> 
                            Seat Row:
                            {this.MakeRowOption()}
                        </label>
                        <br/>
                        <label>
                            Seat Number:
                            {this.MakeSeatOption(this.state.row)}
                        </label>
                        <br/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )
            }
        }
        else{
            return(
                <div></div>
            )
        }
    }else{
        if(this.state.done){
            return(
                <div className="center" style={{width:"100vw",height:"100vh",backgroundColor:"white"}}>
                    <h3>Please move to :</h3>
                    {" "}
                    <p>https://dwc05101.github.io/TATABOX/student/{this.state.classname}/{this.state.date}/{this.state.sid}</p>
                </div>
            )
        }else{
            return(
                <div className="center" style={{width:"100vw",height:"100vh",backgroundColor:"white"}}>
                    <h3>This link is not available.</h3>
                </div>
            )
        }
        
    }
}
}

export default StudentSide;