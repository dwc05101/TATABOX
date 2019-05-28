import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import user from "../images/user.png";

import './make_class_component.css';

var dateCount;

class StudentItem extends Component{

    constructor(props){
        super(props);

        const student = props.student

        var upper = [];
        var bottom = [];

        if(student.attendance !== undefined){
            for(var i = 0 ; i<24; i+=2){
                if(student.attendance[i]===undefined){
                    upper.push("vacant");
                }else{
                    upper.push(student.attendance[i]);
                }
            }
            for(var j = 1 ; j<24; j+=2){
                if(student.attendance[j]===undefined){
                    bottom.push("vacant");
                }else{
                    bottom.push(student.attendance[j]);
                }
            }
        }

        this.state = {
            student : student,
            checked : false,
            upper : upper,
            bottom : bottom,
            classname : props.classname,
            firebase : props.firebase,
            user_img : "",
            init : false,
            width : 0,
        }
        
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.setProfile = this.setProfile.bind(this);
        // console.log(student.imgpath);
    }

    handleCheckbox(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        this.setState({
            checked : value
        })
    }

    setProfile(){
        const storage = this.state.firebase.storage();
        const storageRef = storage.ref();
        let that = this;
        if(this.state.student.imgpath === ""){
            this.setState({
                user_img : user,
                init : true
            });
        }else{
            var imgRef = storageRef.child('images/' + this.state.student.imgpath);
            imgRef.getDownloadURL().then(url=>{
                that.setState({
                    user_img : url,
                    init : true
                });
                // console.log(document.getElementById('fullPaper').clientWidth)
                that.setState({
                    width : document.getElementById('fullPaper').clientWidth
                })
            }).catch(err=>{
                console.log(err);
                that.setState({
                    user_img : user,
                    init : true
                });
            })
        }
    }

    componentDidMount(){
        this.setProfile();
    }

    makeAttendanceRow(start){
        if(start===0){
            return(
                this.state.upper.map(
                    value => {
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
            return(
                this.state.bottom.map(
                    value => {
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

    handleClick = e => {
        var link = "/TATABOX/management/"+this.state.classname+"/"+this.state.student.sid;
        window.location.pathname = link;
    }

    render(){
        var $profileImg;

        if (this.state.width != 0) {
            console.log("good")
            var imgSize = this.state.width * 0.08;
            $profileImg = (<img style={{width: imgSize,height: imgSize, borderRadius: "50%"}} src={this.state.user_img}/>);
        }        
         
        if(!this.state.init) return null;
        return(
            <Paper className="center" id="fullPaper" width="100%">
                <Grid container className="center" spacing = {24}>
                    <Grid item xs={1}>
                        <input
                            style={{zoom:"2"}}
                            name={this.state.student.name}
                            type="checkbox"
                            checked={this.state.checked}
                            onChange={this.handleCheckbox}/>
                    </Grid>
                    <Grid item xs={11} onClick ={this.handleClick}>
                        <Grid container className="center" spacing={24}>
                            <Grid item xs={1} style={{padding:"0px"}}>
                                {$profileImg}
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