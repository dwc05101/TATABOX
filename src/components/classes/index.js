import React from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';



const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    margin: {
        margin: theme.spacing.unit,
    },
});

function makeVisible(i){
    var eleDiv = document.getElementById(i);
    eleDiv.style.visibility='visible';
}
function makeInvisible(i){
    var eleDiv = document.getElementById(i);
    eleDiv.style.visibility='hidden';
}
function MakeBlock(props, i){
    const {classes} = props;
    var datas = props.datas;
    return (
        <div onMouseEnter={() => makeVisible(i)} onMouseLeave={() => makeInvisible(i)}>
            <Paper id = 'class_container' className={classes.root} data-index={i} elevation={1}>
                <div>
                <div class = 'class' >
                    <h4 class = 'Class_code' data-index={i}>{datas[i].code}</h4>
                    <h4 class = 'Class_name' data-index={i}>{datas[i].name}</h4>
                </div>
                <div class = 'roomNprof' data-index={i}>
                    <h4 class = 'Class_room' data-index={i}>{datas[i].bd}  {datas[i].room}</h4>
                    <h4 class = 'Class_prof' data-index={i}>{datas[i].prof}</h4>
                </div>
                <div class = 'buttonSection' id={i} style={{visibility:'hidden'}} >
                    <Button id='gotoCheck' variant="contained" size="medium" color="secondary" className={classes.margin} onClick={() => props.handleClick(i)} data-index={i} elevation={1}>Check</Button>
                    <Button id='gotoMana' variant="contained" size="medium" color="primary" className={classes.margin} onClick={() => props.gotoManage(i)} data-index={i} elevation={1}>Manage</Button>
                    <IconButton className={classes.margin} onClick={props.delete} aria-label="Delete"><img src = {require('../../images/garbage.png')} style={{width:'20px',heigth:'auto',cursor:'pointer'}} /></IconButton>
                </div>
                </div>
            </Paper>
        </div>
    )
}

function Classblock(props) {
    var datas = props.datas;
    var length = datas.length;
    var indents = [];
    console.log(`length`,length);
    for (var i = 0; i < length; i++) {
        var newBlock = MakeBlock(props,i);
        indents.push(newBlock);
    }
    return (
        <div style={{overflow: 'auto', height: 'inherit', display: 'block', flex:1, }}>
            {indents}
            <div style={{heigth:200}}>
                <h1 style={{color:'#e5e5e5'}}>TATABox</h1>
                <h1 style={{color:'#e5e5e5'}}>TATABox</h1>
            </div>
        </div>
        
    );
}


export default withStyles(styles)(Classblock);