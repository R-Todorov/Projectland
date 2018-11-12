import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';


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

const capAmounts = ['Less than £5,000', '5,000','10,000','20,000', '50,000', '100,000', '200,000', '500,000', 'More than £500,000'];

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.createCapitaList = this.createCapitaList.bind(this);
  }

  createCapitaList(thresholds) {
    let options = [];

    for (let i=0; i < thresholds.length; i++) {
      options[i] = <option>{ isNaN(thresholds[i].split(',')[0]) ? thresholds[i] :"£" + thresholds[i]}</option>;
    }  

    return options
  }

  render() {
    return (
      <div className={css(myStyles.formDiv)}>
        <Form>
          <FormGroup>
            <Label for="title">Project Title</Label>
            <Input className={css(myStyles.inputStyle)} type="text" name="title" placeholder="Enter project title" />
          </FormGroup>
          <FormGroup>
            <Label for="description">Project Description</Label>
            <Input className={css(myStyles.inputStyle,myStyles.textAreaHeight)} type="textarea" name="description" placeholder="Project description"/>
          </FormGroup> 
          <FormGroup check>
              <div style={{display: 'flex', alignItems:'center'}}>
                <Input className={css(myStyles.inputStyle,  myStyles.checkBox)} type="checkbox" name="create_date"/>
                <Label style={{marginLeft: '15px'}} for="create_date">Set commence date to today</Label>
              </div>  
          </FormGroup>
          <FormGroup style={{padding: '5px'}}>
            <Label for="capital">Initial Project Capital</Label>
            <Input className={css(myStyles.inputStyle)} type="select" name="capital">
              <option>Please specify</option>
              {this.createCapitaList(capAmounts)}
            </Input>
          </FormGroup>
          <Button type="submit" name="submit" onClick={this.handleSubmit} className={css(myStyles.submitButt)}>Create Project</Button>
        </Form>
      </div>
    );
  }
}