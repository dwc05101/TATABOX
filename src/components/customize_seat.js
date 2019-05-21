import React, { Component } from 'react';
import './customize_seat.css';



import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import user from '../images/user_white.png';


/*
그리드
m*n의 격자 생성가능해야함
  -> m*n을 입력하면 띄워주기(쉬움)
  -> m*n을 마우스 움직이면서 조절할 수 있게하기
생성한 격자들은 각자 다른 객체 -> 드래그해서 선택할 수 있도록 함
선택한 것들 roation가능하게 해야함
삭제기능
undo(부수적)
*/

class Custom extends Component{
    constructor(props) {
        super(props);

        this.state = {
            /* user_img: user,
            username: '...',
            classname: '',
            userID: '', */

        }

        // let {match} = this.props;

        this.firebaseO = this.props.Firebase;
        this.firebase = this.firebaseO.fb; 

        // let that = this;
        
        /* new Promise(function(resolve, reject) {
            that.firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            // User is signed in.
                that.setState({username : user.displayName, userID: user.uid})
                resolve();
            } else {
                alert("Oops! you are signed out!");
                window.location.pathname = "TATABOX/";
            }
            });
        }).then(function(result) {
            that.firebase.database().ref('/AUTH/'+that.state.userID).once('value').then(function(snapshot) {
            var userimgs = (snapshot.val() && snapshot.val().imgs) || user;
            that.setState({user_img: userimgs, synch: true, classname: match.params.classname});
            });
        })   */      
    }


    render() {


        return (
            <body>
                <div id="main">
                    <div id="functions">

                    </div>
                    <div id="preview">

                    </div>
                </div>
            </body>
        )



        /* let $profileImg = null;
        if (this.state.synch) {
            console.log(this.state.user_img);
            $profileImg = (<img src={this.state.user_img} id = 'user_img'/>);
        } else {
            $profileImg = (<img src={user} id = 'user_img'/>);
        } */

        /* return (
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
                                <MenuItem onClick={this.handleClose}>My Account</MenuItem>
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
                    {$profileImg}
                </div>
            </div>
        </body>
        ) */
    }
}

export default Custom;