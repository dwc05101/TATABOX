import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './make_class_component.css';

var dates = ["3/11","3/13","3/18","3/20","3/25","3/27","4/1","4/3","4/8","4/10","4/22","4/24","4/29","5/1","5/5","5/7","5/10","5/12","5/16","5/18","5/22","5/24","5/27","5/29"];


var dateCount;

class StudentItem extends Component{

    constructor(props){
        super(props);

        const student = props.student

        var upper = [];
        var bottom = [];
        for(var i = 0 ; i<dates.length; i+=2){
            if(student.attendance[i]===undefined){
                upper.push("vacant");
            }else{
                upper.push(student.attendance[i]);
            }
        }
        for(var j = 1 ; j<dates.length; j+=2){
            if(student.attendance[j]===undefined){
                bottom.push("vacant");
            }else{
                bottom.push(student.attendance[j]);
            }
        }

        this.state = {
            student : student,
            checked : false,
            upper : upper,
            bottom : bottom,
            classname : props.classname
        }
        
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleCheckbox(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        this.setState({
            checked : value
        })
    }

    setProfile(){
        if(this.state.student.imgpath==="gwangoo.png"){
            return(
                <img style={{}} src = {require("../images/gwangoo.png")}></img>
            )
        }
        if(this.state.student.imgpath==="seokhyun.png"){
            return(
                <img src = {require("../images/seokhyun.png")}></img>
            )
        }
        else{
            return(
                <img src = {require("../images/user.png")}></img>
            )
        }
    }

    makeAttendanceRow(start){
        if(start===0){
            dateCount = -2;
            return(
                this.state.upper.map(
                    value => {
                        dateCount+=2;
                        if(value==="vacant"){
                            return(
                                <td>
                                    <div className="box">
                                    </div>
                                </td>
                            )
                        }
                        var date = value.date.split("-");
                        if(value.attend==="attend"){
                            return(
                                <td>
                                    <div className="box" style={{backgroundColor:"#779ECB"}}>
                                        {date[1]+"/"+date[2]}
                                    </div>
                                </td>
                            )
                        }
                        if(value.attend==="absent"){
                            return(      
                                <td>
                                    <div className="box" style={{backgroundColor:"#A9A9A9"}}>
                                        {date[1]+"/"+date[2]}
                                    </div>
                                </td>
                            )
                        }
                        if(value.attend==="reported"){
                            return(
                                <td>
                                    <div className="box" style={{backgroundColor:"#ff6666"}}>
                                        {date[1]+"/"+date[2]}
                                    </div>
                                </td>
                            )
                        }
                    }
                )
            )
        }
        if(start===1){
            dateCount = -1;
            return(
                this.state.bottom.map(
                    value => {
                        dateCount+=2;
                        if(value==="vacant"){
                            return(
                                <td>
                                    <div className="box">
                                    </div>
                                </td>
                            )
                        }
                        var date = value.date.split("-");
                        if(value.attend==="attend"){
                            return(
                                <td>
                                    <div className="box" style={{backgroundColor:"#779ECB"}}>
                                        {date[1]+"/"+date[2]}
                                    </div>
                                </td>
                            )
                        }
                        if(value.attend==="absent"){
                            return(
                                <td>
                                    <div className="box" style={{backgroundColor:"#A9A9A9"}}>
                                        {date[1]+"/"+date[2]}
                                    </div>
                                </td>
                            )
                        }
                        if(value.attend==="reported"){
                            return(
                                <td>
                                    <div className="box" style={{backgroundColor:"#ff6666"}}>
                                        {date[1]+"/"+date[2]}
                                    </div>
                                </td>
                            )
                        }
                    }
                )
            )
        }
    }

    render(){
        var link = "/TATABOX/management/"+this.state.classname+"/"+this.state.student.sid;
        return(
            <Paper className="center">
                <Grid container className="center" spacing = {24}>
                    <Grid item xs={1}>
                        <input
                            style={{zoom:"2"}}
                            name={this.state.student.name}
                            type="checkbox"
                            checked={this.state.checked}
                            onChange={this.handleCheckbox}/>
                    </Grid>
                    <Grid item xs={11} onClick={()=>{
                        window.location.pathname= link;
                        }}>
                        <Grid container className="center" spacing={24}>
                            <Grid item xs={1} style={{padding:"0px"}}>
                                {this.setProfile()}
                            </Grid>
                            <Grid item xs={1}>
                                <Grid container spacing = {24} style={{height:"100%"}}>
                                    <Grid className="center"item xs={12}>
                                        {this.state.student.sid}
                                    </Grid>
                                    <Grid className="center"item xs={12}>
                                        {this.state.student.name}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <Grid container spacing = {24} style={{height:"100%"}}>
                                    <Grid className="center" item xs={12}>
                                        {this.props.student.dept}
                                    </Grid>
                                    <Grid className="center" item xs={12}>
                                        {this.props.student.email}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8} style={{height:"inherit"}}>
                                <table style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
                                    <tbody>
                                    <tr>
                                        {this.makeAttendanceRow(0)}
                                    </tr>
                                    <tr>
                                        {this.makeAttendanceRow(1)}
                                    </tr>
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default StudentItem;