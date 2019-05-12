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
            username: "Gwangjo Gong",
            user_img: '../images/user_img.png',
            open: false
        }
    };
  
    
 
    openModal() {
        this.setState({
            visible : true
        });
    }

    gotoCheck(e){
      window.location.pathname = "/check";
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
        const { classes } = this.props;
        let step1;
        step1 = 
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-code"
          label="Course Code"
          className={classes.textField}
          value={this.state.code}
          onChange={this.handleChange('code')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Course Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-prof"
          label="Professor"
          className={classes.textField}
          value={this.state.prof}
          onChange={this.handleChange('prof')}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-select-building"
          select
          label="Building"
          className={classes.textField}
          value={this.state.bd}
          onChange={this.handleChange('bd')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select Building"
          margin="normal"
          variant="outlined"
        >
          <MenuItem key="ahhh" value="jutkatta">
            yeahhhhhh
          </MenuItem>
        </TextField>

        <TextField
          id="outlined-number"
          label="Class Room"
          value={this.state.room}
          onChange={this.handleChange('room')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
      </form>

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
                        <Paper id = 'class_container' onClick = {this.gotoCheck} className={classes.root} elevation={1}>
                            <h4 class = 'Class_code'>CS374</h4>
                            <h4 class = 'Class_name'>Introduction to HCI</h4>
                            <div class = 'roomNprof'>
                                <h4 class = 'Class_room'>E11 311</h4>
                                <h4 class = 'Class_prof'>Prof.Juho Kim</h4>
                            </div>
                        </Paper>
                        <Fab id = 'plus2' aria-label="Add" onClick={() => this.openModal()} size = 'large' >
                          <AddIcon id = 'large' />
                        </Fab>
                        <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp">
                            <OutLinedTextFields/>
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