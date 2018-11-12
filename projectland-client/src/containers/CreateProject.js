import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import { API } from "aws-amplify";
import { CloudWatchEvents } from 'aws-sdk';


const myStyles = StyleSheet.create({

  formDiv: {
    width: '25%',
    margin: '20px auto',
    padding: '20px',
    textAlign: 'left',
    backgroundColor: '#E4E8E8',
    borderRadius: '10px',
    fontSize: '17px',
  },

  inputStyle: {
    fontSize: '17px',
    height: '30px',
    color: '#000',  
  },

  textAreaHeight: {
    height: '125px'
  },

  submitButt: {
    margin: '0 5px',
    padding: '5px 0',
    width: '335px',
    height: '50px',
    fontSize: '20px',
    color: 'white',
    backgroundColor: "#007bff",
    borderRadius: '5px',

    ':hover, :active :target': {
      backgroundColor: '#0066CC', 
    }
  },

  checkBox: {
    setSize: '10px',
    marginLeft: '-5px',
    marginTop: '-1px',
    transform: 'scale(1.5) !important'
  }
});

const capAmounts = ['Less than £5,000', '5,000','10,000','20,000', '50,000', '100,000', '200,000', '500,000', 'More than £500,000', 'Prefer not to say'];

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      proj_name: '',
      proj_manager: '',
      descr: '',
      status: '',
      capital: '',
    }

    this.createCapitalSelections = this.createCapitalSelections.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createCapitalSelections(thresholds) {
    let options = [];

    for (let i=0; i < thresholds.length; i++) {
      options[i] = <option key={i}>{ isNaN(thresholds[i].split(',')[0]) ? thresholds[i] :"£" + thresholds[i]}</option>;
    }  

    return options
  }

  //Update a given input of type text
  handleTextChange(event) {
    let name = event.target.name, 
        val = event.target.value;

    this.setState({[name]: val});
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createProject();
  }

  createProject() {
    API.put('prod-projectland-crud','/project-details', {
        "headers": {
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": 'PUT',
          "Access-Control-Allow-Headers": 'Content-Type'
        },
        "body": {
          "proj_name": "project",
          "proj_manager": "me",
          "descr": "default",
          "proj_status": "comm",
          "init_capital": "-2",
          "participants": 1,
          "create_date": "23.12.2012"
        }
    })
    .then(response => alert("Response " + response))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className={css(myStyles.formDiv)}>
        <Form>
          <FormGroup>
            <Label for="title">Project Title</Label>
            <Input className={css(myStyles.inputStyle)} type="text" name="proj_name" value={this.state.proj_name} onChange={this.handleTextChange} placeholder="Enter project title" />
          </FormGroup>
          <FormGroup>
            <Label for="description">Project Description</Label>
            <Input className={css(myStyles.inputStyle,myStyles.textAreaHeight)} type="textarea" name="descr" value={this.state.descr} onChange={this.handleTextChange} placeholder="Project description"/>
          </FormGroup> 
          <Label for="proj_status">Set Project Status</Label>
          <FormGroup check>
            <div style={{display: 'flex', alignItems:'center'}}>
                <Input className={css(myStyles.inputStyle,  myStyles.checkBox)} type="radio" name="proj_status" defaultChecked />
                <Label style={{marginLeft: '15px'}} for="create_date">Pending </Label>
            </div>  
          </FormGroup>
          <FormGroup check>
            <div style={{display: 'flex', alignItems:'center'}}>
                <Input className={css(myStyles.inputStyle,  myStyles.checkBox)} type="radio" name="proj_status"/>
                <Label style={{marginLeft: '15px'}} for="create_date">Active</Label>
            </div>  
          </FormGroup>
          <FormGroup check>
            <div style={{display: 'flex', alignItems:'center'}}>
                <Input className={css(myStyles.inputStyle,  myStyles.checkBox)} type="radio" name="proj_status"/>
                <Label style={{marginLeft: '15px'}} for="create_date">Completed</Label>
            </div>  
          </FormGroup>
          <FormGroup style={{padding: '5px'}}>
            <Label for="capital">Current Project Capital</Label>
            <Input className={css(myStyles.inputStyle)} type="select" name="capital">
              <option>Please specify</option>
              {this.createCapitalSelections(capAmounts)}
            </Input>
          </FormGroup>
          <Button type="submit" name="submit" onClick={this.handleSubmit} className={css(myStyles.submitButt)}>Create Project</Button>
        </Form>
      </div>
    );
  }
}