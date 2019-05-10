import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './make_class_component.css';

class StudentItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            student : props.student,
            checked : false
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
    }

    render(){
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
                    <Grid item xs={11}>
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
                                        <td>
                                            <div className="box" style={{backgroundColor:"#779ECB"}}>
                                                3/11
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box" style={{backgroundColor:"#779ECB"}}>
                                                3/18
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box" style={{backgroundColor:"#779ECB"}}>
                                                3/25
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                4/1
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                4/8
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                4/22
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                4/29
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/5
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/10
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/16
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/22
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/27
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="box" style={{backgroundColor:"#779ECB"}}>
                                                3/13
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box" style={{backgroundColor:"#A8A8A8"}}>
                                                3/20
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box" style={{backgroundColor:"#FF6961"}}>
                                                3/27
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                4/3
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                4/10
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                4/24
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/1
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/7
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/12
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/18
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/24
                                            </div>
                                        </td>
                                        <td>
                                            <div className="box">
                                                5/29
                                            </div>
                                        </td>
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