import React, { Component } from 'react';
import './make_class_component.css';
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
    root: {
      width: 500,
    },
    typography: {
      padding: theme.spacing.unit * 2,
    },
  });
  
class MakeClass extends Component {

    constructor(props) {
        super(props);
        this.closeModal = React.createRef;
        this.state = {
            visible : false,
            code: '',
            name: '',
            prof: '',
            bd: '',
            room: '',
            username: "Gwangjo Gong",
            user_img: '../images/user_img.png',
        }
    }

    state = {
        anchorEl: null,
        open: false,
        placement: null,
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

    handleToggle = () => {
      this.setState(state => ({ open: !state.open }));
    };

    handleClick = placement => event => {
        const { currentTarget } = event;
        this.setState(state => ({
          anchorEl: currentTarget,
          open: state.placement !== placement || !state.open,
          placement,
        }));
      };
  
    handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
      this.setState({ open: false });
    };

 
    render() {
        const { classes } = this.props;
        const { anchorEl, open, placement } = this.state;

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
                                onClick={this.handleClick('left')}
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
                        <h3 id = 'userid'>{this.state.username}</h3>
                        <div id = 'img_cropper'>
                          <img id = 'user_img' src = {require('../images/user_img.png')} >
                          </img>
                        </div>
                    </div>
                    <div id = 'makeclass'>
                        <p id = 'clicktext1'>
                            You don't have any class yet.
                        </p>
                        <p id = 'clicktext2'>
                            Click here to create new class.
                        </p>
                        <img id = 'plus' src = {require('../images/add.png')} onClick={() => this.openModal()}></img>
                        <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp">
                            <OutLinedTextFields closeModal={this.closeModal}/>
                        </Modal>
                    </div>
                </body>
            </section>
        );
    }
}
MakeClass.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default MakeClass;
