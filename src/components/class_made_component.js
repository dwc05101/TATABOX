import React, { Component } from 'react';
import './class_made_component.css';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

import OutLinedTextFields from './OutLinedTextFields';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Classblock from '../components/classes/index.js'
import { resolveCname } from 'dns';

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
  });
  
const buildings = [
  {
    value: 'N1',
    label: 'N1 (김병호 김삼열 IT융합빌딩)',
  },
  {
    value: 'N4',
    label: 'N4 (인문사회과학동)',
  },
  {
    value: 'E11',
    label: 'E11 (창의학습관)',
  },
  {
    value: 'E2-2',
    label: 'E2-2 (산업경영학동)',
  },
  {
    value: 'E6-5',
    label: 'E6-5 (궁리실험관)',
  },
];

class ClassMade extends Component {

    constructor(props) {
      super(props);
      this.state = {
          visible : false,
          code: '',
          name: '',
          prof: '',
          bd: '',
          room: '',
          username: "...",
          user_img: '../images/user_img.png',
          open: false,
          datas : [],
          synch: false,
      }

       
      this.firebaseO = this.props.Firebase;
      this.firebase = this.firebaseO.fb; 
      let that = this;
      var datas = [];
      new Promise(function(resolve, reject){
        that.firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
          // User is signed in.
          that.setState({username : user.displayName});
            var classes = [];
            
            that.firebase.database().ref('/AUTH/'+user.uid+'/clas').once('value').then(function(snapshot){
              var userclass = snapshot.val()
              classes = userclass.split(',');
            })
            that.firebase.database().ref('/classInfo/').once('value').then(function(snapshot){
              snapshot.forEach(function(childSnapshot){
                classes.forEach(function(classname){
                    if(classname == childSnapshot.val().code){
                      datas.push({bd:childSnapshot.val().bd, 
                          code: childSnapshot.val().code, 
                          name:childSnapshot.val().name,
                          prof:childSnapshot.val().prof,
                          room: childSnapshot.val().room})
                    }
                })
                })
                resolve();
                console.log(datas);
            })
            
          } else {
                alert("Oops! you are signed out!");
                window.location.pathname = "TATABOX/";
          }
        });

      }).then(function(result){
        that.setState({
            datas: datas,
            synch: true
        })
      });
    };
  
    
 
    openModal() {
        this.setState({
            visible : true
        });
    }

    gotoCheck(e){
      window.location.pathname = "TATABOX/check";
    }

    mapBuildings(){
      return buildings.map(option => {
        return(
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        )
      })
    }
 
    closeModal() {
        this.setState({
            visible : false
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
  
    handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
      this.setState({ open: false });
    };
 
    render() {
      if(!this.state.synch) return null;
        const { classes } = this.props;
        let datas  = this.state.datas;
 
        return (
            <section>
                <body id = 'full'>
                    <div id = 'headbar'>
                        <h1 id = 'logo'>TATABOX</h1>
                        <div id = 'menu'>
                            <Button
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
                            <Popper open={this.state.open} anchorEl={this.anchorEl} placement="bottom-end" transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    id="menu-list-grow"
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList>
                                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
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
                    
                    <div id = 'makeclass2'style={{backgroundColor:"#e5e5e5",height:"88vh"}}>
                        <h4 class= 'titleT'>Today's class</h4>
                          <Classblock datas = {datas}>
                          </Classblock>
                        <Fab id = 'plus2' aria-label="Add" onClick={() => this.openModal()} size = 'large' >
                          <AddIcon id = 'large' />
                        </Fab>
                        <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp">
                          <OutLinedTextFields Firebase={this.firebaseO}></OutLinedTextFields>
                        </Modal>
                    </div>
                    <div id = 'notify' style={{backgroundColor:"#e5e5e5",height:"88vh",width:"40%"}}>
                        <h4 class = 'titleT' style={{marginLeft:"10px"}}>Notifications</h4>
                        <Paper id = 'info_container' className={classes.root} elevation={1}>
                        
                        </Paper>
                    </div>
                </body>
            </section>
        );
    }
}
ClassMade.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(ClassMade);