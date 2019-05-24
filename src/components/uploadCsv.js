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
            filename: '',
            preview : [],
            imgfiles : [],
        }
    }

    handleImages = files => {
      let that = this;
      let reader = new FileReader();
      this.setState({imgfiles:files});
      // let file = files[0];
      // console.log(`files`,files);
      // console.log(`files length`,files.length);
      // if (file !== null) {
      //     reader.onloadend = () => {
      //         that.setState({
      //             selectedFile: file,
      //             imgPreviewUrl: reader.result
      //         });
      //     }
      //     reader.readAsDataURL(file)
      // }
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
              let e = <tr>
                        <th>{row[0]}</th>
                        <th>{row[1]}</th>
                        <th>{row[3]}</th>
                        <th>{row[2]}</th>
                      </tr>
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
            <div style={{textAlign:"center"}}>
                <p>양식을 다운받아서 학생 명단을 작성한 뒤 업로드해주세요</p>
                <Button variant="contained"><a href ='https://firebasestorage.googleapis.com/v0/b/tatabox-c2abe.appspot.com/o/students.csv?alt=media&token=3067cf63-d54c-4429-a08b-62ad62cad434' style={{textDecoration:'none', color:'black'}}>download format</a></Button>
                
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <Button variant="contained">Upload</Button>
                </ReactFileReader>
                <ReactFileReader handleFiles={this.handleImages} fileTypes={'image/*'} multipleFiles={true}>
                    <Button variant="contained" color="primary">Upload Images</Button>
                </ReactFileReader>
                <input accept="image/*" type="file" name="file" id="file" class="inputfile" onChange={this.handleImages} />
                {this.state.filename}
                <div style={{marginRight:'auto',marginLeft:'auto'}}>
                  <p>Students List</p>
                  <table style={{border:'1px solid #e5e5e5',fontSize:'10px',width:'500px'}}>
                    <thead style={{display:'block'}}>
                      <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody style={{height:'100px', overflowY:'scroll', display:'block'}}>
                      {this.state.preview}
                    </tbody>
                  </table>
                </div>
                
                <Button variant="contained" color="secondary" onClick={this.props.moveStep}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={()=>this.props.onSubmit(this.state.students,this.state.imgfiles)}>Submit</Button>
            </div>
        )
    }
}
