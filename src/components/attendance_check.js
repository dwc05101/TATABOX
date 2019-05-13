import React, { Component } from 'react';
import './attendance_check.css';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
/*----------------------for tabs-----------------------*/
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { pink, green } from "@material-ui/core/colors";
import Modal from 'react-awesome-modal';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Textfit } from 'react-textfit';
/*----------------------for tabs-----------------------*/
import Timer from './timer/index';

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
  /*----------------------for tabs-----------------------*/
  root: {
    flexGrow:1,
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  indicator: {
    height: "100%",
    // borderRadius: "30px 30px 0px 0px"
  },
  /*----------------------for tabs-----------------------*/
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
/*----------------------for tabs-----------------------*/
function TabContainer(props) {
  //"#e8f5e9"
  return (
    <Typography onClick = {props.openModal} component = "div" style = {{ padding: 8*3, backgroundColor: "#E1E2E1", height: "90%"}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component = "a" style = {{zIndex: "1300"}} onClick={event => event.preventDefault()} {...props} />;
}

const reportedStyle = {
  height: "8%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px 10px 10px 10px",
  backgroundColor: "white",
  zIndex: "1400",
  fontWeight: "bold",
  fontSize: "24px",
  color: "#f50057",
}

const absentStyle = {
  height: "8%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px 10px 10px 10px",
  backgroundColor: "white",
  zIndex: "1400",
  fontWeight: "bold",
  fontSize: "24px",
  color: "black"
}

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: "90px",
    left: "44%"
  },
  content : {
    top                   : '80%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
  }
}

function putinDiv(data, reported) {
  var indents = [];
  if (reported) {
    // dictionary data form
    for (var i=0;i<Object.keys(data).length;i++) {
      indents.push(
        <div style = {reportedStyle}>
          <Textfit mode="single" forceSingleModeWidth={false}>
            <text >{Object.keys(data)[i]}</text>
            <text style = {{color: "Gray", fontWeight: "lighter", fontSize: "16px"}}>&nbsp; reported by &nbsp; </text>
            <text style = {{color: "blue", fontSize: "20px"}}>{Object.values(data)[i]}</text>
          </Textfit>
        </div>
      )
      indents.push(<div style = {{height: "3%"}}></div>)
    }
    return indents;
  } else {
    // list data form
    for (var i=0;i<data.length;i++) {
      indents.push(<div style = {absentStyle}>{data[i]}</div>)
      indents.push(<div style = {{height: "3%"}}></div>)
    }
    return indents;
  }
}

/* function myModal(props) {
  return (
    <body style = {{opacity: "0", float: "left", padding: "0", margin: "0", maxHeight: "100%", minHeight: "100vh", maxWidth: "100%", minWidth: "910px", textAlign: "center"}}>
      <div style = {{opacity: "0", float: "left", height: "90px", width: "100%", position: "relative"}}></div>
      <div style = {{opacity: "0", width: "100%", height: "90vh", display: "flex"}}>
        <div style = {{backgroundColor: "black", opacity: "0.7", width: "56%"}}></div>
      </div>
    </body>
  )
} */

/* const theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      borderRadius: "30px 30px 0px 0px"
    }
  }
}) */


  /* <Modal
  style={{
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  }}>
  </Modal> */

class NavTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      reported: '',
      absent: '',
      loading: '',
      reportedmodalOn: false,
      absentmodalOn: false,
    };

    this.openreportedModal = this.openreportedModal.bind(this);
    this.closereportedModal = this.closereportedModal.bind(this);
    this.openabsentModal = this.openabsentModal.bind(this)
    this.closeabsentModal = this.closeabsentModal.bind(this)
  }

  openreportedModal(){
    this.setState({
      reportedmodalOn : true
    })
  };

  closereportedModal(){
    this.setState({
      reportedmodalOn : false
    })
  };

  openabsentModal(){
    this.setState({
      absentmodalOn: true
    })
  }

  closeabsentModal() {
    this.setState({
      absentmodalOn: false
    })
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  componentWillMount() {
    fetch("tabtest.json", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application.json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      this.setState({
        reported: json.reported,
        absent: json.absent,
        loading: true,
      })
    })
  }

  render() {
    const {classes} = this.props;
    const {value} = this.state;
    const loading = this.state.loading;
    const reportedStudents = this.state.reported;
    const absentStudents = this.state.absent;
    return (
      // <MuiThemeProvider theme={theme}>
        <NoSsr>
          <div className = {classes.root}>
            <AppBar position = "static">
              <Tabs variant = "fullWidth" classes = {{indicator: classes.indicator}} style = {{height: "10%"}} value = {value} onChange = {this.handleChange}>
                <LinkTab label = "Reported" />
                <LinkTab label = "Absent" />
              </Tabs>
            </AppBar>
            {value === 0 && 
            <Typography onClick = {this.openreportedModal} component = "div" style = {{ padding: 8*3, backgroundColor: "#E1E2E1", height: "90%"}}>
              {this.props.children}{putinDiv(reportedStudents, true)}
            </Typography>}
            {value === 1 && 
            <Typography onClick = {this.openabsentModal} component = "div" style = {{ padding: 8*3, backgroundColor: "#E1E2E1", height: "90%"}}>
              {this.props.children}{putinDiv(absentStudents, false)}
            </Typography>}
            {/* {value === 0 && <TabContainer onClick = {this.openModal}>{putinDiv(reportedStudents, true)}</TabContainer>}
            {value === 1 && <TabContainer onClick = {this.openModal}>{putinDiv(reportedStudents, false)}</TabContainer>} */}
          </div>
          <Modal className = "status-modal" visible={this.state.reportedmodalOn} width="400" height="300" style = {modalStyle} effect="fadeInUp" onClickAway={()=> this.closereportedModal()}>
            <div style = {{width: "380", height: "280", backgroundColor: "white"}}></div>
          </Modal>
        </NoSsr>
      // </MuiThemeProvider>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

NavTabs = withStyles(styles)(NavTabs);
/*----------------------for tabs-----------------------*/

class AttendanceCheck extends Component{
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
        open: false,
        absent: '',
        reported: ''
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

  gotoManagement() {
    window.location.pathname = "/management"
  }

  render() {
    return(
        <body id = 'full2'>
            <div id = 'headbar2'>
              <h1 id = 'logo'>TATABOX</h1>
              
              <h2 style={{color: "white",float:"left", marginLeft: "15px",marginTop:"29px"}}>CS374 : Introduction to HCI</h2>

              <div id = 'button-container'>
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
                <Popper open={this.state.open} style = {{zIndex: "1500"}} anchorEl={this.anchorEl} placement="bottom-end" transition disablePortal>
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
                            <MenuItem onClick={this.gotoManagement}>Management</MenuItem>
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
              </div>

              <h3 id = 'user_id2'>{this.state.username}</h3>

              <div id = 'img-container'>
                <img id = 'user_img2' src = {require('../images/user_img.png')}></img>
              </div>
              
            </div>
            <div id = "content">
              <div id = "timer-layout">
                <div id = "timer">
                  <Timer />
                </div>
                <div id = "layout">
                  <img id = 'layout_img' src = {require('../images/seat.png')}></img>
                </div>
              </div>
              <div id = "report-tab">
                <NavTabs styles = {{height: "100%"}}></NavTabs>
              </div>
            </div>
        </body>
    )
  }
}

export default AttendanceCheck;
