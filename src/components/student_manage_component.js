import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import user from '../images/user_white.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import ProfilePop from './profilePop.js'
import Slider from 'react-slick';

import StudentItem from "./student_item";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './make_class_component.css';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

var ReactGridLayout = require('react-grid-layout');
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

var layout = [];
var checkedList = [];
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
            checked : false,
            firebase : props.Firebase.fb,
            init : false,
            width : 0,
            dialogOn: false,
        }

        let {match} = this.props;
        this.firebase = this.props.Firebase.fb;
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
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onRequestSearch = this.onRequestSearch.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.checkBoxClick = this.checkBoxClick.bind(this);
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
            const width = document.getElementById('full').clientWidth;
            this.setState({
                width: width
            })
        }).then(() => {
            if (this.state.width == 0) {
                this.setState({
                    init : false,
                })
            }
        })
    }

    handleLogout() {
        this.firebase.auth().signOut();
      }

    makeStudentList(){
        var classname = this.state.classname;
        if(this.state.students===undefined)
            return(
                <div>
                </div>
            )
        return(this.state.students.map(student=>{
            var layout_component = {
                i: student.name,
                x: 0,
                y: pos_count,
                w: 12,
                h: 4,
                isResizable : false,
                static : true
            }
            var link = "/TATABOX/management/"+classname+"/"+student.sid;
            layout.push(layout_component);
            pos_count += 4;
            return(
                <div key={student.name}>
                    <StudentItem student={student} width={this.state.width} firebase={this.state.firebase} classname={this.state.classname}/>
                </div>
            )
        })
        );
    }

    openDialog = e => {
        this.setState({
            dialogOn: true
        })
    }

    closeDialog = e => {
        this.setState({
            dialogOn: false,
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
        window.location.pathname="TATABOX/class/";
    }

    handleDelete(){

        var std_list = backup;

        for(var j = 0; j<checkedList.length; j++){
            for(var i = 0; i<std_list.length; i++){
                if(checkedList[j]===std_list[i].name){
                    std_list.splice(i,1);
                    continue;
                }
            }
        }

        pos_count=0;
        layout = [];
        checkedList = [];

        classInfo.students = std_list;

        this.state.firebase.database().ref("/classInfo/"+classKey).set(classInfo)
        .then(
            ()=>{
                this.setState({
                    students: std_list,
                    checked : false,
                    search_value : ""
                });
            }
        )
    }

    checkBoxClick(e){
        if(e.target.type==="checkbox"){
            if(e.target.checked){
                checkedList.push(e.target.name);
                this.setState({
                    checked : true
                })
            }else{
                for(var i = 0; i<checkedList.length; i++){
                    if(checkedList[i]===e.target.name){
                        checkedList.splice(i,1);
                    }
                } 
                if(checkedList.length === 0){
                    this.setState({
                        checked : false
                    })
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
            $profileImg = (<img src={this.state.user_img} id = 'user_img'/>);
        } else {
            $profileImg = (<img src={user} id = 'user_img'/>);
        }

        var disabled = true

        if(this.state.checked){
            disabled = false;
        }

        
        if(this.state.init){
            var settings = {
                dots: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
              };
            return(
                <div id = 'full'>
                    <div id = 'headbar3'>
                        <h1 id = 'logo'style={{marginTop:"5px", cursor:"pointer"}} onClick={this.gotoMade}>TATABOX</h1>
                        <h2 style={{color: "white",float:"left", marginLeft: "15px",marginTop:"29px"}}>{match.params.classname}</h2>
                        <div id = 'menu'>
                            <Button
                                className="center"
                                id = 'menu_button'
                                buttonRef={node => {
                                    this.anchorEl = node;
                                    }}
                                onClick = {this.openDialog}
                            >
                            <p style={{color:'white'}}>help</p>
                            </Button>
                            <Dialog TransitionComponent={Transition} open={this.state.dialogOn} onClose={this.closeDialog}>
                                <DialogTitle>{"HELP"}</DialogTitle>
                                <DialogContent style={{overflowX:"hidden"}}>
                                    <Slider {...settings}>
                                        <div>
                                            <img src={require("../images/std_step_0.gif")}></img>
                                            <br/>
                                            You can see students' overall attendance here.
                                            <br/>
                                        </div>
                                        <div>
                                            <img src={require("../images/std_step_1.gif")}></img>
                                            <br/>
                                            You can see detailed information when you click on each student.
                                            <br/>
                                        </div>
                                        <div>
                                            <img src={require("../images/std_step_2.gif")}></img>
                                            <br/>
                                            You can edit student's attendance.
                                            <br/>
                                        </div>
                                        <div>
                                            <img src={require("../images/std_step_3.gif")}></img>
                                            <br/>
                                            You can search & delete students.
                                            <br/>
                                        </div>
                                    </Slider>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.closeDialog} color="primary">
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div id = 'img_cropper'>
                            <ProfilePop profileImg = {$profileImg} user_name = {this.state.user_name} logout={this.handleLogout}></ProfilePop>
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
                                        value = {this.state.search_value}
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
                                <Button variant="contained" disabled={disabled} color="secondary" style={{marginLeft:"75%"}}
                                onClick={()=>{
                                    if(window.confirm("Are you sure to delete checked students? This action is not reversible.")){
                                        this.handleDelete();
                                    }
                                }}
                            >Delete</Button>
                            </Grid>
                            <Grid item style={{marginTop:"1%"}} xs={3}>
                                <Button variant="contained" color="primary" style={{marginLeft:"2%"}} onClick={this.handleGrade}>Grade Report</Button>
                            </Grid>                
                        </Grid>
                    </div>
                    <div id = 'body2' style={{backgroundColor:'#ffffff'}} onClick={this.checkBoxClick}>
                        <ReactGridLayout className="layout" layout = {layout} cols = {12} rowHeight={30} width={this.state.width*0.90}>
                            {this.makeStudentList()}
                        </ReactGridLayout>
                    </div>
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