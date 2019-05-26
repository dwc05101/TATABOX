import React, { Component, useRef } from 'react';
import './customize_seat.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';

import ReactDOM from 'react-dom';
import MSL_example from "../images/MSL_example.gif"

var _ = require('lodash');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    customGuide: {
        backgroundColor: purple[500],
        color: '#FFF'
    },
});

function trimData(array) {
    let rowNumber = array.length;
    let colNumber = array[0].length;
    let top, bottom, left, right;
    let fullrowList = [];
    let fullcolList = [];

    for (var i=0;i<rowNumber;i++) {
        for (var j=0;j<colNumber;j++) {
            if (array[i][j] == 1) {
                fullrowList.push(i)
                fullcolList.push(j)
            }
        }
    }
    bottom = Math.max.apply(null, fullrowList);
    top = Math.min.apply(null, fullrowList);
    right = Math.max.apply(null, fullcolList);
    left = Math.min.apply(null, fullcolList);
    
    let height = bottom - top;
    let width = right - left;

    let fullArray = [];
    for (var i=0;i<height+1;i++) {
        let subArray = [];
        for (var j=0;j<width+1;j++) {
            subArray.push(array[top+i][left+j])
        }
        fullArray.push(subArray)
    }

    return fullArray
}

class Custom extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            datalayout: new Array(20).fill(new Array(30).fill(0)),
            height: 0,
            width: 0,

            mouseDown: false,
            startPoint: null,
            endPoint: null,
            selectionBox: null,
            selectedChildren: '',

            userID: '',
            userClas: '',
            first: true,
            loading: "initial",
            // update: false,
            dialogOn: true,
        }

        this.firebase = this.props.Firebase.fb;

        let that = this;

        
        new Promise(function(resolve, reject){
            that.firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    that.setState({userID : user.uid});
                    resolve();
                } else {
                    alert("Oops! you are signed out!");
                    window.location.pathname = "TATABOX/";
                }
            });
        }).then(function() {
            that.firebase.database().ref('/AUTH/'+that.state.userID+'/seatWOtrim/').once('value').then(function(snapshot) {
                if (snapshot.val() != null) {
                    let seatWOtrim = snapshot.val().seatWOtrim
                
                    for (var i=0;i<20;i++) {
                        for (var j=0;j<30;j++) {
                            if (seatWOtrim[i][j] == 1) {
                                that.selectedChildren[30*i+j] = 1;
                            }
                        }
                    }
                }                
            }).then(function() {
                that.startPoint = {};
                that.endPoint = {};
                that.selectionBox = {};
                if (that.selectedChildren != {}) {
                    that.setState({ loading: "true"})
                    setTimeout(
                        function() {
                            that.setState({dialogOn: false});
                        }
                        .bind(that),
                        7000
                    );
                }
            })
        })
    }

    onMouseDown = e => {
        if(!this.props.enabled || e.button === 2 || e.nativeEvent.which === 2) {
            return;
        }
        let nextState = {};
        let startPoint = {
            x: e.pageX,
            y: e.pageY
        };

        nextState.mouseDown = true;
        nextState.startPoint = startPoint;
        this.setState(nextState);
        window.document.addEventListener('mousemove', this.onMouseMove);
        window.document.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseUp = e => {
        var endPoint;
        if (this.state.mouseDown) {
            endPoint = {
                x: e.pageX,
                y: e.pageY
            };
        }
        this.setState({
            endPoint: endPoint,
            selectionBox: this.calculateSelectionBox(this.state.startPoint, endPoint),
        })
        window.document.removeEventListener('mousemove', this.onMouseMove);
        window.document.removeEventListener('mouseup', this.onMouseUp);
        this.setState({
            mouseDown: false,
            startPoint: null,
            endPoint: null,
            selectionBox: null,
        })
    }

    onMouseMove = e => {
        e.preventDefault();
        e.stopPropagation();
        this.forceUpdate();
    }

    calculateSelectionBox(startPoint, endPoint) {
        if(!this.state.mouseDown || _.isNull(endPoint) || _.isNull(startPoint)) {
            return null;
        }

        
        var left = Math.min(startPoint.x, endPoint.x);
        var top = Math.min(startPoint.y, endPoint.y);
        var width = Math.abs(startPoint.x - endPoint.x);
        var height = Math.abs(startPoint.y - endPoint.y);
        console.log(left, top, width, height)

        return ({
            left: left,
            top: top,
            width: width,
            height: height,
            position: "absolute",
            backgroundColor: "blue",
            border: "1px dotted black"
        })
    }

    boxIntersects(boxA, boxB) {
        if (boxA.left <= boxB.left + boxB.width &&
            boxA.left + boxA.width >= boxB.left &&
            boxA.top <= boxB.top + boxB.height &&
            boxA.top + boxA.height >= boxB.top) {
            return true;
        }
        return false;
    }

    updateCollidingChildren(selectionBox) {
        let tmpNode = null;
        let tmpBox = null;
        let that = this;

        _.each(this.refs, function(ref, key) {
            if (key !== "selectionBox") {
                tmpNode = ReactDOM.findDOMNode(ref);
                tmpBox = {
                    top: tmpNode.offsetTop,
                    left: tmpNode.offsetLeft,
                    width: tmpNode.clientWidth,
                    height: tmpNode.clientHeight
                };
                if (that.boxIntersects(selectionBox, tmpBox)) {
                    if (that.selectedChildren[key] == 1){
                        delete that.selectedChildren[key]
                    } else {
                        that.selectedChildren[key] = 1;
                    }
                }
            }
        })
    }

    componentDidUpdate() {
        if(this.state.mouseDown && !_.isNull(this.state.selectionBox)) {
            this.updateCollidingChildren(this.state.selectionBox);
        }
    }

    renderSelectionBox() {
        if(!this.state.mouseDown || _.isNull(this.state.endPoint) || _.isNull(this.state.startPoint)) {
            return null;
        }
        return(
            <div className='selection-border' style={this.selectionBox}></div>
        );
    }
    
    clearHandler = e => {
        if(window.confirm("This will RESET WHOLE SEAT LAYOUT. Are you sure?")) {
            this.selectedChildren = {};
            this.setState({
                datalayout: new Array(20).fill(new Array(30).fill(0))
            })
        }
    }

    savetoDB = e => {

        let data = this.selectedChildren;
        let fullData = [];
        let that = this;

        if(window.confirm("Save SEAT LAYOUT and go back to CLASS MAKING STEP?")) {
            for (var i=0;i<20;i++) {
                let subData = [];
                for (var j=0;j<30;j++) {
                    let pushVal = ((30*i+j) in data) ? 1 : 0
                    subData.push(pushVal)
                }
                fullData.push(subData);
            }

            let seat = trimData(fullData);
            this.setState({
                first: false,
            })

            new Promise(function(resolve, reject){
                that.firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        // User is signed in.
                        that.setState({userID : user.uid});
                        resolve();
                    } else {
                        alert("Oops! you are signed out!");
                        window.location.pathname = "TATABOX/";
                    }
                });
            })
            .then(function() {
                if (that.state.first) {
                    // first time
                    that.firebase.database().ref('/AUTH/'+that.state.userID+'/seat').set({
                        seat: seat
                    })
                    that.firebase.database().ref('/AUTH/'+that.state.userID+'/seatWOtrim').set({
                        seatWOtrim: fullData
                    })
                } else {
                    // additional customize
                    that.firebase.database().ref('/AUTH/'+that.state.userID+'/seat').set({
                        seat: seat
                    })
                    that.firebase.database().ref('/AUTH/'+that.state.userID+'/seatWOtrim').set({
                        seatWOtrim: fullData
                    })
                }
            }).then(function() {
                window.location.pathname = "TATABOX/class";
            })
        }
    }

    renderChildren() {
        let fullDiv = [];
        let selectedDict;
        selectedDict = this.selectedChildren;

        if (this.state.loading === "initial") {
            fullDiv.push(
                <div style={{display: "inline-block", fontSize: "40px"}}>Loading SEAT LAYOUT from Database...</div>
            )
            return fullDiv;
        }

        for (var i=0;i<20;i++) {
            let rowDiv = [];
            for (var j=0;j<30;j++) {
                if ((30*i+j) in selectedDict) {
                    var bgColor = "#4dd0e1"
                } else {
                    var bgColor = "white"
                }
                
                rowDiv.push(
                    <div
                    style={{
                        height: this.state.height/20,
                        width: this.state.width/30,
                        border: "1px solid lightgray",
                        cursor: "pointer",
                        backgroundColor: bgColor,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "8px"
                    }}
                    ref={30*i + j}
                    data-col={j}
                    data-row={i}
                    className="seat"
                    >
                        {alphabet[i]} {j}
                    </div>
                )
            }
            fullDiv.push(
                <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: this.state.height/20,
                }}
                onMouseDown={this.onMouseDown}
                >
                    {rowDiv}
                </div>
            )
        }
        return fullDiv
    }

    componentWillMount() {
        this.selectedChildren = {};
    }


    componentDidMount() {
        const height = document.getElementById('preview').clientHeight;
        const width = document.getElementById('preview').clientWidth;
        this.setState({
            height: height,
            width: width
        })
    }

    openDialong = e => {
        this.setState({
            dialogOn: true
        })
    }

    closeDialog = e => {
        this.setState({
            dialogOn: false,
        })
    }

    render() {

        const {classes} = this.props;

        return (
            <body>
                <div id="headbar">
                    <div style={{width: "80%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <h1 id = 'title'>Customize Seat Layout</h1>
                    </div>
                </div>    
                <div id="main">
                    <div
                    id="functions"
                    >
                        <div style={{width: "84vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <div style={{width:"30vw", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                <Button variant="contained" className={classes.customGuide} color="primary" onClick={this.openDialong}>Help</Button>
                                <Dialog TransitionComponent={Transition} open={this.state.dialogOn} onClose={this.closeDialog}>
                                    <DialogTitle>{"NOTICE for customizing SEAT LAYOUT"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>1. DRAG to select the seat, UNSELECT the selected seats by DRAGGING or CLICKING each of them</DialogContentText>
                                    <div style={{height: "250px", width: "400px"}}>
                                        <img src={MSL_example} style={{width: "100%", height: "inherit"}} alt=""/>
                                    </div>
                                    <DialogContentText>2. After finished customizing, press SAVE button to save. You can get TRIMMED version of your SEAT LAYOUT</DialogContentText>
                                    <DialogContentText>3. You can see this window again if you click the HELP button at the lefttop side of this page</DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.closeDialog} color="primary">
                                            OK
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            <div style={{width:"24vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <h2 style={{border:"1px solid black", margin: "5px" ,padding: "5px", color: "black", fontSize: "30px"}}>Screen</h2>
                            </div>
                            <div style={{width:"30vw", display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginRight: "10px"}}>
                                    <Button variant="contained" color="secondary" onClick={this.clearHandler}>Clear</Button>
                                </div>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <Button variant="contained" color="primary" onClick={this.savetoDB}>save</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                    id="preview"
                    ref="selectionBox"
                    style={{
                        textAlign: "center"
                    }}
                    >
                        {this.renderSelectionBox()}
                        {this.renderChildren()}
                    </div>
                </div>
            </body>
        )
    }
}

Custom.propTypes = {
    classes: PropTypes.object.isRequired,
    
    enabled: PropTypes.bool,
    onSelectionChange: PropTypes.func
};
Custom.defaultProps = {
    enabled: true,
    onSelectionChange: _.noop,
};

export default withStyles(styles)(Custom);