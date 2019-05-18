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

import OutLinedTextFields from './OutLinedTextFields';

class MakeClass extends Component {

    constructor(props) {
        super(props);
        this.closeModal = React.createRef;
        this.firebaseO = this.props.Firebase;
        this.firebase = this.firebaseO.fb; 
        this.state = {
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
        }

        let that = this;

        new Promise(function(resolve, reject){
            that.firebase.auth().onAuthStateChanged(function(user) {
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
                that.firebase.database().ref('/AUTH/'+that.state.userID).once('value').then(function(snapshot) {
                var userimgs = (snapshot.val() && snapshot.val().imgs) || user;
                that.setState({user_img: userimgs, synch: true});
            });
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
        if (!this.state.synch) return null;

        const { classes } = this.props;
        var fireb =this.firebaseO;

        let $profileImg = null;
        if (this.state.synch) {
            console.log(this.state.user_img);
            $profileImg = (<img src={this.state.user_img} id = 'user_img'/>);
        } else {
            $profileImg = (<img src={user} id = 'user_img'/>);
        }

        return (
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
                        <Popper id= "menuitems" open={this.state.open} anchorEl={this.anchorEl} placement="bottom-end" transition disablePortal>
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
                                    <MenuItem onClick={this.handleClose}>My Accountrewqrrqewrqwxw</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
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
                </div>
                <div id = 'makeclass'>
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
                        <OutLinedTextFields Firebase={fireb}></OutLinedTextFields>
                    </Modal>
                </div>
            </body>
        );
    }
}
MakeClass.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default MakeClass;
