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
  return (
    <Typography component = "div" style = {{ padding: 8*3}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component = "a" onClick={event => event.preventDefault()} {...props} />;
}

/* function separateline(sampleList){
  var newList = sampleList;
  for (var i=0; i<sampleList.length; i++) {
    var addValue = "<div>sampleList[i]</div>";
    newList.push(addValue);
  }
  return newList;
} */

class NavTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      reported: '',
      absent: '',
      loading: '',
    };
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
        reported: json.absent,
        absent: json.reported,
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
      <NoSsr>
        <div className = {classes.root}>
          <AppBar position = "static">
            <Tabs variant = "fullWidth" value = {value} onChange = {this.handleChange}>
              <LinkTab label = "Reported" />
              <LinkTab label = "Absent" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>{reportedStudents}</TabContainer>}
          {value === 1 && <TabContainer>{absentStudents}</TabContainer>}
        </div>
      </NoSsr>
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

  render() {
    return(
      <section>
        <body id = 'full2'>
            <div id = 'headbar2'>
              <h1 id = 'logo'>TATABOX</h1>
              
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
                </div>
              </div>

              <div id = "report-tab">
                <NavTabs/>
              </div>
            </div>
        </body>
      </section>
    )
  }
}

export default AttendanceCheck;
