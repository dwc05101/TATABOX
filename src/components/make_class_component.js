import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import Step from './step1_component';
import Main from './main_component';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

 
export default class MakeClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }
 
    openModal() {
        this.setState({
            visible : true
        });
    }
 
    closeModal() {
        this.setState({
            visible : false
        });
    }
 
    render() {
        return (
            <section>
                <h1>React-Modal Examples</h1>
                <input type="button" value="Open" onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp">
                        <Step></Step>
                </Modal>
            </section>
        );
    }
}