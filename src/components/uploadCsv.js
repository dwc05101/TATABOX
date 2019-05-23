import React from 'react';
import Button from '@material-ui/core/Button';
import XLSX from 'xlsx';
import ReactFileReader from 'react-file-reader'
import { arrayExpression } from '@babel/types';

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
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
  });

export default class UploadCsv extends React.Component {
    constructor(props){
        super(props);
        this.handleFiles = this.handleFiles.bind(this);
        this.state={
            students : [],
        }
    }

    handleFiles = files => {
        var reader = new FileReader();
        let array = [];
        reader.onload = function(e) {
        // Use reader.result
        //alert(reader.result);
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
            if(row[4].length>0) jsonData['imgpath']=row[0]+'.'+row[4];
            else jsonData['imgpath']='';
            console.log(`jsonData`,jsonData);
            array.push(jsonData);
            }
        });
        //alert(lst);
        console.log(`array`,array);
        }
      reader.readAsText(files[0]);
      this.setState({students:array})
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div>
                <p>양식을 다운받아서 학생 명단을 작성한 뒤 업로드해주세요</p>
                <Button><a href ='https://firebasestorage.googleapis.com/v0/b/tatabox-c2abe.appspot.com/o/students.csv?alt=media&token=3067cf63-d54c-4429-a08b-62ad62cad434' style={{textDecoration:'none', color:'black'}}>download format</a></Button>
                
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <Button>Upload</Button>
                </ReactFileReader>
                <Button variant="contained" color="secondary" onClick={this.props.moveStep}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={()=>this.props.onSubmit(this.state.students)}>onSubmit</Button>
            </div>
        )
    }
}
