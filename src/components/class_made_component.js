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
      marginTop: 16,
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
            username: "Gwangjo Gong",
            user_img: '../images/user_img.png',
            open: false
        }
    }
 
    openModal() {
        this.setState({
            visible : true
        });
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
                <body id = 'full2'>
                    <div id = 'headbar2'>
                        <h1 id = 'logo2'>TATABOX</h1>
                        <div id = 'menu2'>
                            <Button
                                id = 'menu_button2'
                                buttonRef={node => {
                                this.anchorEl = node;
                                }}
                                aria-owns={this.state.open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleToggle}
                            >
                            <img
                              id = "menu-img2"
                              src = {require('../images/menu.png')}
                              >
                            </img>
                            </Button>
                            <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
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
                        <h3 id = 'userid2'>{this.state.username}</h3>
                        <div id = 'img_cropper2'>
                          <img id = 'user_img2' src = {require('../images/user_img.png')} >
                          </img>
                        </div>
                    </div>
                    
                    <div id = 'makeclass2'>
                        <h4 class= 'titleT'>Today's class</h4>
                        <div class = 'class_container'>
                            <h4 class = 'Class_code'>CS374</h4>
                            <h4 class = 'Class_name'>Introduction to HCI</h4>
                            <div class = 'roomNprof'>
                                <h4 class = 'Class_room'>E11 311</h4>
                                <h4 class = 'Class_prof'>Prof.Juho Kim</h4>
                            </div>

                        </div>
                        <img id = 'plus2' src = {require('../images/add.png')} onClick={() => this.openModal()}></img>
                        <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp">
                            <OutLinedTextFields/>
                        </Modal>
                    </div>
                    <div id = 'notify'>
                        <h4 class = 'titleT'>Notifications</h4>
                        <div class = 'info_container'>
                        
                        </div>
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