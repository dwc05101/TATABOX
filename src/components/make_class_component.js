import React, { Component } from 'react';
import './make_class_component.css';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
 
export default class MakeClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            username: "Gwangjo Gong",
            open: false
        }
    }
 
    openModal() {
        this.setState({
            visible : true
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
    
      handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
          return;
        }
    
        this.setState({ open: false });
      };
 
    render() {
        return (
            <section>
                <div id = 'full'>
                    <div id = 'headbar'>
                        <h1 id = 'logo'>TATABOX</h1>
                        <div id = 'menu'>

                            <Button
                                buttonRef={node => {
                                this.anchorEl = node;
                                }}
                                aria-owns={this.state.open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleToggle}
                            >
                                Toggle Menu Grow
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
                    
                    <div id = 'makeclass'>
                        <p id = 'clicktext1'>
                            You don't have any class yet.
                        </p>
                        <p id = 'clicktext2'>
                            Click here to create new class.
                        </p>
                        <image id = 'plus'>
                            +
                        </image>
                        <div>
                        <h1>React-Modal Examples</h1>
                        <input type="button" value="Open" onClick={() => this.openModal()} />
                        <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                            <div>
                                <h1>Title</h1>
                                <p>Some Contents</p>
                                <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                            </div>
                        </Modal>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}