import React, { Component } from 'react';
import './customize_seat.css';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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

export class Square extends React.Component{
    render(){
      const color_ = this.props.color;
      return (
        <td
          style={{
            overflow:'hidden',
            width:'auto',
            height:'25px',
            color:'red',
            boarderColor: 'black',
            border:".5px solid black"
          }}
        onClick={this.props.handleClick} >
          <div
            style={{color:color_,
                    border:"1px solid",
                    backgroundColor: color_,
                    borderRadius: "50%",
                    borderColor: color_,
                    height:25}} >
          </div>
        </td>
      )
    }
  }
  

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
});
  

class Custom extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            matrix:  [1,0,0,1,0,0],
            dragging: false,
            openMB: false,
            row: '',
            col: '',
            layout: [],
        }

        this.firebaseO = this.props.Firebase;
        this.firebase = this.firebaseO.fb; 

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);

    }

    /* for dragging elements */
    onDragStart(e) {
        const startX = e.clientX;
        const startY = e.clientY;

        const state = {
            dragging: true,
            startX,
            startY,
        };

        this.setState(state);
    };

    onDragMove(e) {
        if (!this.state.dragging) {
            return ;
        }

        const x = e.clientX;
        const y = e.clientY;

        const dx = x - this.state.startX;
        const dy = y - this.state.startY;

        this.pan(dx, dy);
        this.setState({
            startX: x,
            startY: y,
        });
    }

    onDragEnd(e) {
        this.setState({dragging: false});
    }

    pan(dx, dy) {
        const m = this.state.matrix;
        m[4] += dx;
        m[5] += dy;
        this.setState({matrix: m})
    }

    /* for making base layout(n*m) */

    handlerowChangeMB = row => e => {
        this.setState({ [row]: (e.target.value) })
    }
    handlecolChangeMB = col => e => {
        this.setState({ [col]: (e.target.value) })
    }

    handleClickOpenMB = () => {
        this.setState({ openMB: true })
    }
    handleCloseMB = () => {
        // add making basic layout with row, col values
        let rowLayout = [];
        let fullLayout = [];
        let that = this;
        new Promise(function(reject, resolve) {
            if ((that.state.row > 20)||(that.state.col > 20)) {
                alert("The maximum row/col seat number is 20!")
                return false;
            } else {
                let row = that.state.row;
                let col = that.state.col;
                for (var j=0;j<row;j++) {
                    rowLayout.push(
                        <div style={{border: "1px solid black"}}></div>
                    )
                }
                /* for (var i=0;i<col;i++) {
                    
                } */
            }
            resolve()
        })
        .then(
            that.setState({
                openMB: false,
                row: '',
                col: '',
                layout: rowLayout,
            })
        )

    }

    numberOnly = e => {
        let key = e.keyCode;
        let isNumber = (key >=48 && key <= 57) || key == 8 || key == 9;
        if (!isNumber) {
            e.preventDefault();
            return false;
        }
    }

    // different from handleCloseMB, no making basic layout
    handleClose = () => {
        this.setState({
            openMB: false,
            row: '',
            col: '',
        })
    }

    render() {

        const { classes } = this.props;
        const { height, width } = this.props;

        return (
            <body>
                <div id="headbar">
                    <h1 id = 'title' style={{marginTop:"5px"}}>Customize Seat Layout</h1>
                </div>
                <div id="main">
                    <div id="functions">
                        <Button variant="contained" color="primary" onClick={this.handleClickOpenMB}>
                            Make base layout
                        </Button>
                        <ClickAwayListener onClickAway={this.handleClose}>
                        <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={this.state.openMB}
                        onClose={this.handleCloseMB}
                        >
                            <DialogTitle>Fill the row, column values of basic layout</DialogTitle>
                            <DialogContent>
                                <form className={classes.container}>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                    margin="dense"
                                    label="row value"
                                    type="rowNumber"
                                    value={this.state.row}
                                    onClickAway={this.handleCloseMB}
                                    onKeyDown={this.numberOnly}
                                    onChange={this.handlerowChangeMB('row')}
                                    input={<Input id="row-simple" />}
                                    fullWidth
                                    />
                                </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                        margin="dense"
                                        label="col value"
                                        type="colNumber"
                                        value={this.state.col}
                                        onClickAway={this.handleCloseMB}
                                        onKeyDown={this.numberOnly}
                                        onChange={this.handlecolChangeMB('col')}
                                        input={<Input id="col-simple" />}
                                        fullWidth
                                        />
                                    </FormControl>
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                Cancel
                                </Button>
                                <Button onClick={this.handleCloseMB} color="primary">
                                Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                        </ClickAwayListener>
                        <Button variant="contained" color="primary" onClick={this.gotoCustom}>
                            Delete
                        </Button>
                    </div>
                    <div id="preview">
                        {<div
                        onMouseDown = {this.onDragStart}
                        onMouseMove = {this.onDragMove}
                        onMouseUp = {this.onDragEnd}
                        style = {{transform: `translate(${this.state.matrix[4]}px, ${this.state.matrix[5]}px)` , backgroundColor: "black", height: "10%", width: "10%", margin: "0"}}
                        >
                        </div>}
                        {this.state.layout}
                    </div>
                </div>
            </body>
        )
    }
}

Custom.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Custom);