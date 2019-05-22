import React, {Component} from 'react';

class StudentSide extends Component{

    constructor(props){
        super(props);
        this.state = {
            firebase : props.Firebase.fb,
            classname : props.match.params.classname,
            date : props.match.params.date,
            sid : '',
            name : '',
            row : '',
            col : 1,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <div >
                <h1>Attendance Check</h1>
                <h3>classname : {this.state.classname}</h3>
                <h3>Date : {this.state.date}</h3>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Student ID:
                        <input type="text" name="sid" value={this.state.sid} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Name:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Seat Row:
                        <select name="row" value={this.state.row} onChange={this.handleChange}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                        </select>
                    </label>
                    <br/>
                    <label>
                        Seat Number:
                        <input type="number" name="col" value={this.state.col} onChange={this.handleChange} />
                        (range : 1~14)
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default StudentSide;