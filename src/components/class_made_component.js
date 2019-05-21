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
import user from '../images/user_white.png';

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
  
class ClassMade extends Component {

    constructor(props) {
      super(props);
      this.state = {
          visible : false,
          code: '',
          name: '',
          prof: ',',
          bd: '',
          room: '',
          username: "...",
          userID: '',
          user_img: user,
          open: false,
          datas : [],
          synch: false,
          selected: 0,
          classname: '',
          loading:true,
      }
      this.handleClick = this.handleClick.bind(this);
      this.gotoManage = this.gotoManage.bind(this);
      this.delete = this.delete.bind(this);
      this.firebaseO = this.props.Firebase;
      this.firebase = this.firebaseO.fb; 
      this.componentDidMount = this.componentDidMount.bind(this);
      this.closeModal = this.closeModal.bind(this);
      
    };
//
    componentDidMount() {
      // this simulates an async action, after which the component will render the content
      let that = this;
      var datas = [];
      new Promise(function(resolve, reject){
        that.firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            that.setState({username : user.displayName, userID : user.uid});
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
                console.log(that.state.userID);
                console.log(datas);
                console.log(that.state.user_img);
              })
          } else {
                alert("Oops! you are signed out!");
                window.location.pathname = "TATABOX/";
          }
        });
      }).then(function(result){
          that.firebase.database().ref('/AUTH/'+that.state.userID).once('value').then(function(snapshot) {
          var userimgs = (snapshot.val() && snapshot.val().imgs) || user;
          that.setState({datas: datas, user_img: userimgs, synch: true})
        })
      }).then(() => this.setState({ loading: false }));
    }
    
    openModal() {
        this.setState({
            visible : true
        });
    }
    //click delete button
    delete(){
      //TODO
      alert("Are you sure to delete class?");
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

      console.log(this.state.loading);
      if(this.state.loading) {
        console.log("loading..");
        return null;
      }
      console.log(`hover`,this.state.hover);
      const { classes } = this.props;
      let datas = this.state.datas;

      let $profileImg = null;
      if (this.state.synch) {
          $profileImg = (<img src={this.state.user_img} id = 'user_img'/>);
      } else {
          $profileImg = (<img src={user} id = 'user_img'/>);
      }
      console.log($profileImg);
      
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
                        {$profileImg}
                      </div>
                  </div>
                  
                  <div id = 'makeclass2'style={{backgroundColor:"#e5e5e5",height:"88vh"}}>
                      <h4 className = 'titleT'>Today's class</h4>
                        <Classblock datas = {datas} handleClick = {this.handleClick} gotoManage = {this.gotoManage} delete={this.delete}>
                        </Classblock>
                      <Fab id = 'plus2' aria-label="Add" onClick={() => this.openModal()} size = 'large' >
                        <AddIcon id = 'large' />
                      </Fab>
                      
                      <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp" >
                        <OutLinedTextFields Firebase={this.firebaseO} closeModal={this.closeModal}></OutLinedTextFields>
                      </Modal>
                      
                  </div>
              </body>
          </section>
      );
    }
}
ClassMade.propTypes = {
    classes: PropTypes.object.isRequired,
};

/* export function ClassMadeProps(props) {
  return props.selected
} */
export default withStyles(styles)(ClassMade);
