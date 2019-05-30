import React, { Component } from 'react';
import './make_class_component.css';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import user from '../images/user_white.png';
import Classblock from '../components/classes/index.js'
import OutLinedTextFields from './OutLinedTextFields';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { resolveCname } from 'dns';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';

import ReactDOM from 'react-dom';
import MSL_example from "../images/MSL_example.gif"
import greenplus from "../images/greenplus.png"
import classex from "../images/classex.png"
import redbutton from "../images/attendance.png"
import bluebutton from "../images/manage.png"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 160,
    },
    menu: {
      width: 200,
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    margin: {
        margin: theme.spacing.unit,
    },
  });


class MakeClass extends Component {

    constructor(props) {
        super(props);
        this.firebaseO = this.props.Firebase;
        this.firebase = this.firebaseO.fb; 
        this.state = {
            tryDelete: false,
            visible : false,
            code: '',
            name: '',
            prof: '',
            bd: '',
            room: '',
            user_name: '...',
            userID: '',
            user_img: user,
            synch: false,
            open: false,
            datas : [],
            selected: 0,
            classname: '',
            loading:true,
            deleteindex:-1,
            classlst:[],
            Seat: null,
            dialogOn: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.firebaseO = this.props.Firebase;
        this.firebase = this.firebaseO.fb; 
        this.gotoManage = this.gotoManage.bind(this);
        this.delete = this.delete.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openCaution = this.openCaution.bind(this);
        this.closeCaution = this.closeCaution.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);

        let that = this;
        let Seat;
        let seatWOtrim;

        new Promise(function(resolve, reject){
            that.firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    that.setState({userID : user.uid});
                    // console.log(`constructor userid`,user.uid);
                    resolve();
                } else {
                    // alert("Oops! you are signed out!");
                    window.location.pathname = "TATABOX/";
                }
            });
        }).then(function() {
            that.firebase.database().ref('/AUTH/'+that.state.userID+'/seatWOtrim').once('value').then(function(snapshot) {
                if (snapshot.val() != null) {
                    seatWOtrim = snapshot.val().seatWOtrim;
                }
            }).then(function() {
                that.firebase.database().ref('/AUTH/'+that.state.userID+'/seat').once('value').then(function(snapshot) {
                    if (snapshot.val() != null) {
                        Seat = snapshot.val().seat;
                    }
                }).then(function() {
                    if (seatWOtrim != null) {
                        that.setState({ Seat: Seat, visible: true})
                    } else {
                        that.setState({ Seat: Seat})
                    }
                })
            })
        })
    }

    componentDidMount(){
        let that = this;
        new Promise(function(resolve, reject){
            that.firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    that.setState({user_name : user.displayName, userID : user.uid});
                    var classes = [];
                    that.firebase.database().ref('/AUTH/'+user.uid+'/clas').once('value').then(function(snapshot){
                        var userclass = snapshot.val();
                        if(userclass != null) classes = JSON.parse(userclass);
                        that.setState({classlst:classes});
                        //classes = userclass.split(',');
                    })

                    if(classes != []){
                        that.firebase.database().ref('/classInfo/').once('value').then(function(snapshot){
                            snapshot.forEach(function(childSnapshot){
                                classes.forEach(function(classname){
                                    if(classname == childSnapshot.val().code){

                                    that.state.datas.push(
                                        {
                                            bd:childSnapshot.val().bd, 
                                            code: childSnapshot.val().code, 
                                            name:childSnapshot.val().name,
                                            prof:childSnapshot.val().prof,
                                            room: childSnapshot.val().room,
                                            students: childSnapshot.val().students,
                                            key: childSnapshot.key
                                        }
                                    )
                                    }
                                })
                                })
                                resolve();
                        });

                    }
                } else {
                    // alert("Oops! you are signed out!");
                    window.location.pathname = "TATABOX/";
                }
            });
        }).then(function(result) {
                that.firebase.database().ref('/AUTH/'+that.state.userID).once('value').then(function(snapshot) {
                var userimgs = (snapshot.val() && snapshot.val().imgs) || user;
                that.setState({user_img: userimgs, synch: true});
            });
        }).then(() => this.setState({ loading: false }));
        
    }

    openDialog() {
        this.setState({
            dialogOn: true
        })
    }

    closeDialog() {
        this.setState({
            dialogOn: false,
        })
    }

    handlelogin = user =>{
        this.setState({
            user_name : user.displayName,
        })
    }
 
    openModal() {
        this.setState({
            visible : true,
            overflow : "visible"
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    openCaution(i){
        this.setState({
            tryDelete: true,
            overflow:"visible",
            deleteindex:i,
        })
    }
    closeCaution(){
        this.setState({
            tryDelete:false,
            deleteindex:-1,
        });
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    //click delete button
    delete(){
        //TODO
        let lst = this.state.classlst;
        let index = this.state.deleteindex;
        console.log(`delete index`,index);
        console.log(`before delete`,lst);
        lst.splice(index,1);
        console.log(`after delete`,lst);

        let newstring = JSON.stringify(lst);
        console.log(`newstring`,newstring);
        //user info update
        
        var updates = {};
        updates['/AUTH/' + this.state.userID+'/clas'] = newstring;
        this.firebase.database().ref().update(updates);
        let selected = this.state.datas[index];
        console.log(`classuid`, selected.key);
        this.firebase.database().ref('/classInfo/'+selected.key).remove();
        window.location.pathname = "TATABOX/class";
        
    }

    //click check button
    handleClick(i) {
        var index = 0;
        var classname = '';
        var classname_ = '';
        let that = this;
        new Promise(function(resolve, reject) {
          //index = e.target.getAttribute("data-index")
          index = i
          classname = that.state.datas[index].name
          resolve()
        }).then(function(result) {
          that.setState({
            slected: index,
            classname: classname
          })
          classname_ = that.state.classname;
        }).then(function(result) {
          window.location.pathname = 'TATABOX/check/'+classname_;
        })
      }

    handleLogout() {
        this.firebase.auth().signOut();
    }
  
    //click management button
    gotoManage(i) {
        var index = 0;
        var classname = '';
        var classname_ = '';
        let that = this;
        new Promise(function(resolve, reject) {
          //index = e.target.getAttribute("data-index")
          index = i;
          classname = that.state.datas[index].name
          resolve()
        }).then(function(result) {
          that.setState({
            slected: index,
            classname: classname
          })
          classname_ = that.state.classname;
        }).then(function(result) {
          window.location.pathname = 'TATABOX/management/'+classname_;
        })
      }
  
    handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
      this.setState({ open: false });
    };

    render() {
        if (!this.state.synch) return null;
        if(this.state.loading) {
          console.log("loading..");
          return null;
        }

        const { classes } = this.props;
        var fireb =this.firebaseO;
        let datas = this.state.datas;


        let $profileImg = null;
        if (this.state.synch) {
            $profileImg = (<img src={this.state.user_img} id = 'user_img'/>);
        } else {
            $profileImg = (<img src={user} id = 'user_img'/>);
        }

        if(datas.length == 0){
            return (
                <body id = 'full'>
                    <div id = 'headbar3'>
                        <h1 id = 'logo'>TATABOX</h1>
                        <div id = 'menu'>
                            <Button
                                id = 'menu_button'
                                buttonRef={node => {
                                this.anchorEl = node;
                                }}
                                onClick={this.openDialog}
                            >
                                <p style={{color:'white'}}>help</p>
                            </Button>
                            <Dialog TransitionComponent={Transition} open={this.state.dialogOn} onClose={this.closeDialog}>
                                    <DialogTitle>{"To make your own CLASS"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>1. MAKE new class by CLICKING the green + button </DialogContentText>
                                    <div style={{height: "100px", width: "100px"}}>
                                        <img src={greenplus} style={{width: "100%", height: "inherit"}} alt=""/>
                                    </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.closeDialog} color="primary">
                                            OK
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                        </div>
                        <h3 id = 'userid'>{this.state.user_name}</h3>
                        <div id = 'img_cropper'>
                            {$profileImg}
                        </div>
                    </div>
                    <div id = 'makeclass' style={{backgroundColor:"#e5e5e5"}}>
                        <p id = 'clicktext1'>
                            You don't have any class yet.
                        </p>
                        <p id = 'clicktext2'>
                            Click here to create new class.
                        </p>
                        <Fab id = 'plus' aria-label="Add" onClick={() => this.openModal()} size = 'large' >
                            <AddIcon id = 'large' />
                        </Fab>
                        <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp" >
                            <OutLinedTextFields Firebase={fireb} closeModal={this.closeModal}></OutLinedTextFields>
                        </Modal>
                    </div>
                </body>
            );
        }else {
            return (
                <section>
                    <body id = 'full'>
                        <div id = 'headbar3'>
                            <h1 id = 'logo'>TATABOX</h1>
                            <div id = 'menu'>
                            <Button
                                id = 'menu_button'
                                buttonRef={node => {
                                this.anchorEl = node;
                                }}
                                onClick={this.openDialog}
                            >
                                <p style={{color:'white'}}>help</p>
                            </Button>
                            <Dialog TransitionComponent={Transition} open={this.state.dialogOn} onClose={this.closeDialog}>
                                    <DialogTitle>{"To CHECK ATTENDANCE and MANAGE your classes"}</DialogTitle>
                                    <DialogContent>                                    
                                    <div style={{height: "55px", width: "400px"}}>
                                        <img src={classex} style={{width: "100%", height: "inherit"}} alt=""/>
                                    </div>
                                    <DialogContentText>1. HOVER your mouse on the class you want to access</DialogContentText>
                                    <DialogContentText>2. To check ATTENDANCE, press  :
                                        <img src={redbutton} style={{width: "100px", height: "30px"}} alt=""/>
                                    </DialogContentText>
                                    <DialogContentText>3. To manage students, press  :
                                        <img src={bluebutton} style={{width: "80px", height: "30px"}} alt=""/>   
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.closeDialog} color="primary">
                                            OK
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            <h3 id = 'userid'>{this.state.user_name}</h3>
                            <div id = 'img_cropper'>
                            {$profileImg}
                            </div>
                        </div>
                        
                        <div id = 'makeclass2'style={{backgroundColor:"#e5e5e5",height:"88vh"}}>
                            <h4 className = 'titleT'>Today's class</h4>
                            <Classblock datas = {datas} handleClick = {this.handleClick} gotoManage = {this.gotoManage} delete={this.delete} openCaution={this.openCaution} closeCaution={this.closeCaution} tryDelete={this.state.tryDelete}>
                            </Classblock>
                            <Fab id = 'plus2' aria-label="Add" onClick={() => this.openModal()} size = 'large' >
                            <AddIcon id = 'large' />
                            </Fab>
                            
                            <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp" >
                            <OutLinedTextFields Firebase={this.firebaseO} closeModal={this.closeModal}/>
                            </Modal>
                            
                        </div>
                        <Modal visible={this.state.tryDelete} width="350" height="200" effect="fadeInUp" onClickAway={this.closeCaution} >
                            <div style={{textAlign:'center', marginTop:'20px'}}>
                                    <p>Are you sure to delete class?</p>
                                    <p>You Cannot restore deleted class.</p>
                                    <Button variant="contained" onClick={this.delete} color="secondary" className={classes.margin}>Delete</Button>
                                    <Button variant="contained" onClick={this.closeCaution} color="primary" className={classes.margin} > Cancel</Button>
                            </div>
                        </Modal>
                    </body>
                </section>
            );            
        }
                
    }
}
MakeClass.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(MakeClass);
