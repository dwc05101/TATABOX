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
import user from '../images/user_white.png';

import StudentItem from "./student_item";

import './make_class_component.css';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

var ReactGridLayout = require('react-grid-layout');

var layout = [];
var checkedList;
var pos_count;
var backup = [];

var classInfo;
var classKey;

class Management extends Component{
    constructor(props){
        super(props)

        this.state={
            students: [],
            user_name: '...',
            user_img: user,
            open: false,
            modal_visible: false,
            synch: false,
            userID: '',
            classname: props.match.params.classname,
            search_value: "",
            firebase : props.Firebase.fb,
            init : false
        }

        let {match} = this.props;

        let that = this;
        new Promise(function(resolve, reject){
            that.state.firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    that.setState({user_name : user.displayName, userID : user.uid});
                    resolve();
                } else {
                    alert("Oops! you are signed out!");
                    window.location.pathname = "TATABOX/";
                }
            });
        }).then(function(result) {
                that.state.firebase.database().ref('/AUTH/'+that.state.userID).once('value').then(function(snapshot) {
                var userimgs = (snapshot.val() && snapshot.val().imgs) || user;
                that.setState({user_img: userimgs, classname: match.params.classname, synch: true});
            });
        })

        backup = this.state.students;

        this.handleGrade = this.handleGrade.bind(this)
        this.handleback = this.handleback.bind(this)
        this.handleDelete = this.handleDelete.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onRequestSearch = this.onRequestSearch.bind(this);
        
    }

    componentDidMount(){
        var students = [];
        var classname = this.state.classname;
        this.state.firebase.database().ref("/classInfo").once("value").then(function(snapshot){
            snapshot.forEach(function(child){
                if(child.val().name === classname){
                    students = child.val().students;
                    classInfo = child.val();
                    classKey = child.key;
                }
            })
        })
        .then(()=>{
            layout = [];
            checkedList = [];
            pos_count = 0;
            backup = students;
            this.setState({
                init : true,
                students : students
            });
        });
    }

    makeStudentList(){
        var classname = this.state.classname;
        return(this.state.students.map(student=>{
            var layout_component = {
                i: student.name,
                x: 0,
                y: pos_count,
                w: 12,
                h: 4,
                isResizable : false
            }
            var link = "/TATABOX/management/"+classname+"/"+student.sid;
            layout.push(layout_component);
            pos_count += 4;
            return(
                <div key={student.name}>
                    <StudentItem student={student} classname={this.state.classname}/>
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

    gotoMade() {
        window.location.pathname="TATABOX/class";
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
        let classname_ = this.state.classname;
        window.location.pathname = "TATABOX/grade/" + classname_;
    }
    handleback(){
        let classname_ = this.state.classname;
        window.location.pathname="TATABOX/check/" + classname_;
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

        classInfo.students = std_list;

        this.state.firebase.database().ref("/classInfo/"+classKey).set(classInfo)
        .then(
            ()=>{
                this.setState({
                    students: std_list
                });
            }
        )
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
        let {match} = this.props;

        let $profileImg = null;
        if (this.state.synch) {
            console.log(this.state.user_img);
            $profileImg = (<img src={this.state.user_img} id = 'user_img'/>);
        } else {
            $profileImg = (<img src={user} id = 'user_img'/>);
        }

        if(this.state.init){
            return(
                <div id = 'full'>
                    <div id = 'headbar'>
                        <h1 id = 'logo'style={{marginTop:"5px", cursor:"pointer"}} onClick={this.gotoMade}>TATABOX</h1>
                        <h2 style={{color: "white",float:"left", marginLeft: "15px",marginTop:"29px"}}>{match.params.classname}</h2>
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
                            <h3 id = 'userid'>{this.state.user_name}</h3>
                        <div id = 'img_cropper'>
                            {$profileImg}
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
                    <div id = 'body2' style={{backgroundColor:'#ffffff'}} onClick={this.checkBoxClick}>
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
        else{
            return(
                <div></div>
            )
        }
    }

}

export default Management;