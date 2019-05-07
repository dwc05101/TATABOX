import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './make_class_component.css';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import students from '../data/student_pairs';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

var ReactGridLayout = require('react-grid-layout');
const data = students;

var layout = [];
var checkboxList = [];
var pos_count;

class Management extends Component{
    constructor(props){
        super(props)
        this.state={
            username: "Gwangjo Gong",
            user_img: '../images/user_img.png',
            open: false
        }
        pos_count = 0;
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    componentDidMount(){
        return;
    }

    handleCheckbox(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        for(var i=0; i<checkboxList.length; i++){
            if(checkboxList[i].name===name){
                checkboxList[i].checked = value;
                break;
            }
        }
    }

    findCheckBox(name){
        for(var i = 0; i < checkboxList.length; i++){
            if(checkboxList[i].name === name){
                return checkboxList[i];
            }
        }
    }

    makeStudentList(){
        return(data.map(student=>{
            var layout_component = {
                i: student.name,
                x: 0,
                y: pos_count,
                w: 12,
                h: 4,
                isResizable : false
            }
            layout.push(layout_component);
            checkboxList.push({
                name : student.name,
                checked : false
            });
            pos_count += 4;
            return(
                <div key={student.name}>
                    <Paper className="center">
                        <Grid container className="center" spacing = {24}>
                            <Grid item xs={1}>
                                <input
                                    name={student.name}
                                    type="checkbox"
                                    checked={this.findCheckBox(student.name).checked}
                                    onChange={this.handleCheckbox}/>
                            </Grid>
                            <Grid item xs={11}>
                                <Grid container className="center" spacing={24}>
                                    <Grid item xs={1}>
                                        Place for picture
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Grid container spacing = {24} style={{height:"100%"}}>
                                            <Grid className="center"item xs={12}>
                                                {student.sid}
                                            </Grid>
                                            <Grid className="center"item xs={12}>
                                                {student.name}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Grid container spacing = {24} style={{height:"100%"}}>
                                            <Grid className="center" item xs={12}>
                                                {student.dept}
                                            </Grid>
                                            <Grid className="center" item xs={12}>
                                                {student.email}
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
                </div>
            )
        })
        );
    }

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    }

    handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
        return;
    }
        this.setState({ open: false });
    }

    render(){
        return(
            <div id = 'full'>
                <div id = 'headbar'>
                    <h1 id = 'logo'style={{marginTop:"5px"}}>TATABOX</h1>
                    <h2 style={{color: "white",float:"left", marginLeft: "15px",marginTop:"29px"}}>CS374 : Introduction to HCI</h2>
                    <div id = 'menu'>
                        <Button
                            className="center"
                            id = 'menu_button'
                            buttonRef={node => {
                            this.anchorEl = node;
                            }}
                            aria-owns={this.state.open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                        >
                        <img
                            id = "menu-img"
                            src = {require('../images/menu.png')}
                            >
                        </img>
                        </Button>
                        <Popper style={{zIndex:10010}} open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                    <MenuItem onClick={this.handleClose}>Export</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Grade Report</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                        </Popper>
                    </div>
                        <h3 id = 'userid'>{this.state.username}</h3>
                    <div id = 'img_cropper'>
                        <img id = 'user_img' src = {require('../images/user_img.png')} >
                        </img>
                    </div>
                </div>
                <div id = 'body' style={{display:"flex", alignItems:"center"}}>
                    <h1 style={{marginLeft:"1.5%"}}>Student Management</h1>
                    <Button variant="contained" color="secondary" style={{marginLeft:"65%"}}>Delete</Button>
                    <Button variant="contained" color="primary" style={{marginLeft:"2%"}}>Send Invitation</Button>
                </div>
                <div id = 'body2'>
                    <ReactGridLayout className="layout" layout = {layout} cols = {12} rowHeight={30} width={1400}>
                        {this.makeStudentList()}
                    </ReactGridLayout>
                </div>
            </div>
        );
    }

}

export default Management;