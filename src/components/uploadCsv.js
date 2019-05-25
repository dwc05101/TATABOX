import React from 'react';
import Button from '@material-ui/core/Button';
import XLSX from 'xlsx';
import ReactFileReader from 'react-file-reader'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {orange} from '@material-ui/core/colors'
import { arrayExpression } from '@babel/types';
import Paper from '@material-ui/core/Paper';
import './uploadCsv.css'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
  });
const theme = createMuiTheme({
    palette: {
      primary:{
        main: '#388e3c',
      }
    },
  });

class UploadCsv extends React.Component {
    constructor(props){
        super(props);
        this.handleFiles = this.handleFiles.bind(this);
        this.state={
            students : [],
            filename: '',
            preview : [],
            imgfiles : [],
            tests: [],
            uploaded: '',
        }
    }

    handleImages = files => {
      this.setState({imgfiles:files, uploaded:'Images Uploaded'});
    }

    handleFiles = files => {
        console.log('enter handlefile')
        var reader = new FileReader();
        let array = [];
        let preview = [];
        let that = this;
        reader.onload = function(e) {
          // Use reader.result
          console.log(`reader`,reader);
          let rows = reader.result.split('\n');
          let index=0;
          rows.forEach(element => {
              if(index==0) index++;
              else{
              var jsonData = {};
              let row = element.split(',');
              jsonData['sid']=row[0];
              jsonData['name']=row[1];
              jsonData['email']=row[2];
              jsonData['dept']=row[3];
              let e =<Paper id = 'row_student'>
                        <div class='wrap'>
                            <div class = "cell_sid">{row[0]}</div>
                            <div class = "cell_name">{row[1]}</div>
                            <div class = "cell_dept">{row[3]}</div>
                            <div class = "cell_email">{row[2]}</div>
                        </div>
                      </Paper>
              if(row[4].length>0) jsonData['imgpath']=row[0]+'.'+row[4];
              else jsonData['imgpath']='';
              console.log(`jsonData`,jsonData);
              array.push(jsonData);
              preview.push(e);
              }
          });
          that.setState({students:array, preview:preview})
          console.log(`array`,array);
        }
        reader.readAsText(files[0]);
        this.setState({filename:files[0].name})
        console.log(`files name`,files[0].name);
        
  }
    render(){
        const { classes } = this.props;
        return(
            <div style={{textAlign:"center",fontSize:"16px"}}>
                <div id='instruction_csv'>
                    Download the example, Fill out the list of students, and Upload it.
                </div> 
                <div id='about_csv'>
                    <div id='down_ex'>
                        <Button variant="contained" className={classes.margin}><a href ='https://firebasestorage.googleapis.com/v0/b/tatabox-c2abe.appspot.com/o/students.zip?alt=media&token=3067cf63-d54c-4429-a08b-62ad62cad434' style={{textDecoration:'none', color:'black'}}>download example</a></Button>
                    </div>
                    <div id='csv_name'>
                        <acronym style={{color:'#5e5e5e'}}>{this.state.filename}</acronym>
                    </div>
                    <div id = 'up_csv'>
                        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                        <MuiThemeProvider theme={theme}>    
                            <Button variant="contained" color='primary' className={classes.margin}>Upload List</Button>
                        </MuiThemeProvider> 
                        </ReactFileReader>
                    </div>
                </div>
                <div id='wrap_table'>
                    <div id='table_head'>
                        <Paper id = 'row_student' style={{backgroundColor:"#bfbfbf"}}>
                            <div class='wrap'>
                                <div class = "cell_sid">Student ID</div>
                                <div class = "cell_name">Name</div>
                                <div class = "cell_dept">Department</div>
                                <div class = "cell_email">Email</div>
                            </div>
                        </Paper>
                    </div> 
                    <div id='csv_table'>
                    {this.state.preview}
                    </div>
                </div>
                <div id='instruction_img'>
                    Upload images of students, Each image's name must be student ID.
                    <acronym style={{color:'#5e5e5e'}}> ex) 20190123.jpg</acronym>
                </div>
                <div id='about_img'>
                    <div id='mt_img'></div>
                    <div id='up_img'>
                        <ReactFileReader handleFiles={this.handleImages} fileTypes={'image/*'} multipleFiles={true}>
                            <MuiThemeProvider theme={theme}>  
                                <Button variant="contained" color="primary" className={classes.margin}>Upload Images</Button>
                            </MuiThemeProvider>  
                        </ReactFileReader>
                    </div>
                    <div id='status_img'>
                        <p>{this.state.uploaded}</p>
                    </div>
                </div>
                <div id='final_button'>
                    <Button variant="contained" color="secondary" className={classes.margin} onClick={this.props.moveStep}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" className={classes.margin} onClick={()=>this.props.onSubmit(this.state.students,this.state.imgfiles)}>Submit</Button>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(UploadCsv);