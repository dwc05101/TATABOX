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
            open: false
        }
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
        const { classes } = this.props;

        return (
            <section>
                <div id = 'full'>
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
                        <h3 id = 'userid'>{this.state.username}</h3>
                    </div>
                    <body>
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
                </div>
            </section>
        );
    }
}
MakeClass.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default MakeClass;