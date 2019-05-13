import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Modal from 'react-awesome-modal';
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import StudentItem from "./student_item";

import './make_class_component.css';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

var ReactGridLayout = require('react-grid-layout');

var layout = [];
var checkedList;
var pos_count;
var backup = [];

class Management extends Component{
    constructor(props){
        super(props)
        this.state={
            students: props.students,
            username: "Gwangjo Gong",
            user_img: '../images/user_img.png',
            open: false,
            modal_visible: false,

            search_value: "",
        }

        backup = this.state.students;

        this.handleDelete = this.handleDelete.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onRequestSearch = this.onRequestSearch.bind(this);

        checkedList = [];
        pos_count = 0;
    }

    componentDidMount(){
        this.SearchBar.focus();
    }

    makeStudentList(){
        return(this.state.students.map(student=>{
            var layout_component = {
                i: student.name,
                x: 0,
                y: pos_count,
                w: 12,
                h: 4,
                isResizable : false
            }
            layout.push(layout_component);
            pos_count += 4;
            return(
                <div key={student.name}>
                    <StudentItem student={student}/>
                </div>
            )
        })
        );
    }

    openModal(){
        this.setState({
            modal_visible : true
        })
    }

    closeModal(){
        this.setState({
            modal_visible : false
        })
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

    handleGrade = event => {
    if (this.anchorEl.contains(event.target)) {
        return;
    }
        window.location.pathname = "/grade";
    }
    handleback(){
        window.location.pathname="./check";
    }

    handleDelete(){
        var std_list = this.state.students;

        for(var j = 0; j<checkedList.length; j++){
            for(var i = 0; i<std_list.length; i++){
                if(checkedList[j]===std_list[i].name){
                    std_list.splice(i,1);
                    continue;
                }
            }
        }

        checkedList=[];
        this.setState({
            students: std_list
        });
    }

    checkBoxClick(e){
        if(e.target.type==="checkbox"){
            console.log(e.target.checked);
            if(e.target.checked){
                checkedList.push(e.target.name);
            }else{
                for(var i = 0; i<checkedList.length; i++){
                    if(checkedList[i]===e.target.name){
                        checkedList.splice(i,1);
                    }
                }
            }
        }
    }

    onChangeSearch(e){
        this.setState({
            search_value : e
        })
        if(e.trim()===""){
            if(this.state.students.length !== backup.length){
                pos_count=0;
                layout = [];
                checkedList = [];
                this.setState({
                    students : backup
                })
            }
        }

    }

    onRequestSearch(){
        console.log("hi")

        var searched = [];
        var trimmed = this.state.search_value.trim();

        pos_count=0;
        layout = [];
        checkedList = [];

        if(trimmed===""){
            if(this.state.students.length !== backup.length){
                this.setState({
                    students : backup
                })
            }
        }
        else
        {
            for(var i = 0; i < backup.length; i++){
                if(backup[i].name.toLowerCase().includes(trimmed.toLowerCase())){
                    searched.push(backup[i]);
                }
            }
            this.setState({
                students : searched
            });
        }

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
                        <Popper style={{zIndex:10010}} open={this.state.open} anchorEl={this.anchorEl} placement="bottom-end" transition disablePortal>
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
                                    <MenuItem onClick={this.handleGrade}>Grade Report</MenuItem>
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
                    <div id = 'backtoclass' style={{marginRight:"2vh",marginTop:"3vh",paddingLeft:"0px"}} onClick={this.handleback}>
                        <h3>Back to Class</h3>
                    </div>
                    <div id = 'backtoclass' onClick={this.handleback}>
                        <img style={{width:"30px", height:"30px"}} src = {require('../images/back.png')}></img>
                    </div>
                </div>
                <div id = 'body' style={{display:"flex", alignItems:"center",paddingTop:"1%",paddingBottom:"1%"}}>
                    <h1 style={{marginLeft:"1.5%", marginTop:"0.5%",whiteSpace:"nowrap"}}>Student Management</h1>
                    <Grid container spacing={24}>
                        <Grid item xs={4} style={{marginTop:"1%"}}>
                            <MuiThemeProvider>
                                <SearchBar
                                    ref={(input)=>{
                                        this.SearchBar = input;
                                        }}
                                    onChange={this.onChangeSearch}
                                    onRequestSearch={this.onRequestSearch}
                                    style={{marginLeft:"10%",width:"auto"}}
                                    hintText="Search by Name"    
                                    />
                            </MuiThemeProvider>
                        </Grid>
                        <Grid item style={{marginTop:"1%"}} xs={3}>
                            <img style={{width:"auto", height:"40px",paddingTop:"2%",marginLeft:"10%"}} src = {require("../images/color_explanation.png")}/>
                        </Grid>
                        <Grid item style={{marginTop:"1%"}} xs={2}>
                            <Button variant="contained" color="secondary" style={{marginLeft:"75%"}}
                            onClick={()=>{
                                if(window.confirm("Are you sure to delete checked students? This action is not reversible.")){
                                    this.handleDelete();
                                }
                            }}
                        >Delete</Button>
                        </Grid>
                        <Grid item style={{marginTop:"1%"}} xs={3}>
                            <Button variant="contained" color="primary" style={{marginLeft:"2%"}} onClick={this.openModal}>Send Invitation</Button>
                        </Grid>                
                    </Grid>
                </div>
                <div id = 'body2' onClick={this.checkBoxClick}>
                    <ReactGridLayout className="layout" layout = {layout} cols = {12} rowHeight={30} width={1400}>
                        {this.makeStudentList()}
                    </ReactGridLayout>
                </div>
                <Modal
                    visible={this.state.modal_visible} 
                    width="600" 
                    height="300" 
                    effect="fadeInUp" 
                    onClickAway={this.closeModal}>
                    <p style={{marginTop:"10vh",fontSize:'25px'}}><b>Send Invitation Link to Students</b></p><br/>
                    <p>Invitation link : <u style={{color:'#0040a8'}}>https://tatabox.com/happyta</u></p><br/>
                    <Button variant="contained" color="primary" onClick={this.closeModal} >Copy</Button>
                </Modal>
            </div>
        );
    }

}

export default Management;