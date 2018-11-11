import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { API } from "aws-amplify";
import NavMenu from '../components/NavMenu.js';
import MyDropdown from '../components/MyDropdown.js';


const myStyles = StyleSheet.create({

  formDiv: {
    width: '20%',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#E4E8E8',
    borderRadius: '10px',
    fontSize: '17px',
  },

  submitButt: {
    marginTop: '15px',
    padding: '5px 0px',
    width: '265px',
    height: '40px',
    fontSize: '20px',
    color: 'white',
    backgroundColor: "#007bff",
    borderRadius: '5px',

    ':hover, :active :target': {
      backgroundColor: '#0066CC', 
    }
  },

  inputStyle: {
    fontSize: '12px',
    height: '20px'  
  }
});

const inputStyle = {
  fontSize: '15px',
  height: '30px' 
}

export default class Profile extends Component {

  constructor(props) {
    super(props);
  }
    
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <div className={css(myStyles.formDiv)}>
          <Form>
            <FormGroup>
              <h1>{this.props.params.username}</h1>
              <img style={{margin: '0px auto 10px auto', padding: '5px', border: '1px black solid'}} src="https://s3.eu-west-2.amazonaws.com/www.projectland/avatar.png" alt="avatar placeholder" width="104" height="100"/>
              <Input type="file" name="file" id="exampleFile"/>
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="text" name="username" id="usernames" style={inputStyle}/>
            </FormGroup>
            <FormGroup disabled>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" style={inputStyle}/>
            </FormGroup>
            <FormGroup>
              <Label for="surname">Surname</Label>
              <Input type="text" name="surname" id="surname" style={inputStyle}/>
            </FormGroup>
            <FormGroup disabled>
              <Label for="role">Current role</Label>
              <Input type="text" name="role" id="role" style={inputStyle}/>
            </FormGroup>
            <FormGroup >
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" style={inputStyle}/>
            </FormGroup>
            <FormGroup >
              <Label for="phone">Phone number</Label>
              <Input type="text" name="phone" id="phone" placeholder="Enter phone number" style={inputStyle}/>
            </FormGroup>
            <FormGroup >
            <Label for="gender">Gender</Label>
              <Input type="select" name="email" id="email" style={inputStyle}>
                <option>Please specify</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </Input>
            </FormGroup>
            <FormGroup disabled >
              <Label for="joinDate">Join date</Label>
              <Input type="joinDate" name="joinDate" id="joinDate" style={inputStyle}/>
            </FormGroup>
            <Button className={css(myStyles.submitButt)} type="submit" name="submit" bsSize="large">Update details</Button>
          </Form>
        </div>
      </div>
    );
  }
}