import React from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';



const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

function Classblock(props) {

    const {classes} = props;
    var datas = props.datas;
    var length = datas.length;
    if(length == 1){
        return (
            <Paper id = 'class_container' className={classes.root} data-index={0} elevation={1} onClick = {props.handleClick}>
                <h4 class = 'Class_code' data-index={0}>{datas[0].code}</h4>
                <h4 class = 'Class_name' data-index={0}>{datas[0].name}</h4>
                <div class = 'roomNprof' data-index={0}>
                    <h4 class = 'Class_room' data-index={0}>{datas[0].bd}  {datas[0].room}</h4>
                    <h4 class = 'Class_prof' data-index={0}>{datas[0].prof}</h4>
                </div>
            </Paper>
        )
    }else if(length == 2){
        return (
            <div>
                <Paper id = 'class_container' className={classes.root} data-index={0} elevation={1} onClick = {props.handleClick}>
                    <h4 class = 'Class_code' data-index={0}>{datas[0].code}</h4>
                    <h4 class = 'Class_name' data-index={0}>{datas[0].name}</h4>
                    <div class = 'roomNprof' data-index={0}>
                        <h4 class = 'Class_room' data-index={0}>{datas[0].bd}  {datas[0].room}</h4>
                        <h4 class = 'Class_prof' data-index={0}>{datas[0].prof}</h4>
                    </div>
                </Paper>
                <Paper id = 'class_container' className={classes.root} data-index={1} elevation={1} onClick = {props.handleClick}>
                <h4 class = 'Class_code' data-index={1}>{datas[1].code}</h4>
                <h4 class = 'Class_name' data-index={1}>{datas[1].name}</h4>
                <div class = 'roomNprof' data-index={1}>
                    <h4 class = 'Class_room' data-index={1}>{datas[1].bd}  {datas[1].room}</h4>
                    <h4 class = 'Class_prof' data-index={1}>{datas[1].prof}</h4>
                </div>
                </Paper>
            </div>
        )
    }else{
        return (
            <div>
                <Paper id = 'class_container' className={classes.root} data-index={0} elevation={1} onClick = {props.handleClick}>
                    <h4 class = 'Class_code' data-index={0}>{datas[0].code}</h4>
                    <h4 class = 'Class_name' data-index={0}>{datas[0].name}</h4>
                    <div class = 'roomNprof' data-index={0}>
                        <h4 class = 'Class_room' data-index={0}>{datas[0].bd}  {datas[0].room}</h4>
                        <h4 class = 'Class_prof' data-index={0}>{datas[0].prof}</h4>
                    </div>
                </Paper>
                <Paper id = 'class_container' className={classes.root} data-index={1} elevation={1} onClick = {props.handleClick}>
                <h4 class = 'Class_code' data-index={1}>{datas[1].code}</h4>
                <h4 class = 'Class_name' data-index={1}>{datas[1].name}</h4>
                <div class = 'roomNprof' data-index={1}>
                    <h4 class = 'Class_room' data-index={1}>{datas[1].bd}  {datas[1].room}</h4>
                    <h4 class = 'Class_prof' data-index={1}>{datas[1].prof}</h4>
                </div>
                </Paper>
                <Paper id = 'class_container' className={classes.root} data-index={2} elevation={1} onClick = {props.handleClick}>
                <h4 class = 'Class_code' data-index={2}>{datas[2].code}</h4>
                <h4 class = 'Class_name' data-index={2}>{datas[2].name}</h4>
                <div class = 'roomNprof' data-index={2}>
                    <h4 class = 'Class_room' data-index={2}>{datas[2].bd}  {datas[2].room}</h4>
                    <h4 class = 'Class_prof' data-index={2}>{datas[2].prof}</h4>
                </div>
                </Paper>
            </div>
        )
    }
}


export default withStyles(styles)(Classblock);