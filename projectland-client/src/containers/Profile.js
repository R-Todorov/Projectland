import React, { Component } from "react";
import { Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { API } from "aws-amplify";

const myStyles = StyleSheet.create({

  formDiv: {
    width: '20%',
    margin: '20px auto',
    textAlign: 'left',
    padding: '20px',
    backgroundColor: '#E4E8E8',
    borderRadius: '10px',
    fontSize: '17px',
  },

  submitButt: {
    marginTop: '15px',
    padding: '5px 0px',
    width: '265px',
    height: '5 0px',
    fontSize: '20px',
    color: 'white',
    backgroundColor: "#007bff",
    borderRadius: '5px',

    ':hover, :active :target': {
      backgroundColor: '#0066CC', 
    }
  },

  readOnly: {
    fontSize: '15px',
    height: '30px',
    color: '#8585AD',
    backgroundColor: '#D0D0E1'
  },

  inputStyle: {
    fontSize: '17px',
    height: '30px',
    color: '#000'   
  },

  radioStyle: {
    fontSize: '15px',
    border: '2px solid #000',
    fontWeight: 'normal !important',
    height: '30px',
    color: '#000',
  },

});

export default class Profile extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: this.props.match.params.username,
      dataLoaded: false,
      genVal: 'specify',
      availVal: 'specify'
    }

    this.fetchUserData = this.fetchUserData.bind(this);
    this.displayAttrIfExists = this.displayAttribute.bind(this);
    this.updateUserDetails = this.updateUserDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validatePhone = this.updatePhone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      let loaded = await this.fetchUserData();
      this.setState({dataLoaded : loaded});
      console.log(this.state.userAttrs);
    }
    catch(err){
      console.log(err);
    } 
  }

  //Calls a lambda through API Gateway which fetches all
  //user details
  async fetchUserData() {
    try {
      let data = await API.get('prod-projectland-crud', '/user-details');
      this.setState({ 
        userAttrs: data.Item
      })
      return true;
    }
    catch (err) {
      console.log(err)
      return false;
    }
  }

  displayAttribute(attr) {
    let userAttrs = this.state.userAttrs;
    return userAttrs ? userAttrs[attr] : "";
  }

  handleChange(event) {
    let attrs = this.state.userAttrs;
    let attr = event.target.name;
    let val = event.target.value;
  
    attrs[attr] = val
    this.setState({userAttrs: attrs});
    console.log(this.state.userAttrs)
  }

  updatePhone(event) {
    let attrs = this.state.userAttrs;
    attrs[event.target.name] = event.target.val
    this.setState({userAttrs: attrs});
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log("Updating");
    try {
      await this.updateUserDetails();
      this.setState({dataLoaded: true});
    } 
    catch (e) {
      alert(e);
    }  
  }
  
  async updateUserDetails() {
    try {
      let data = API.put('prod-projectland-crud', '/user-details', {
        "statusCode": 200,
        "headrs": {
          "Access-Control-Allow-Origin": "*"
        },
        "body": this.state.userAttrs
      })
      console.log(data);
    }
    catch(err) {
      console.log(err);
    }
  }

  render() {
    
    return (
        <div className={css(myStyles.formDiv)}>
          <Form>
            <FormGroup>
              <img style={{margin: '0px auto 10px auto', padding: '5px', border: '1px black solid'}} src="https://s3.eu-west-2.amazonaws.com/www.projectland/avatar.png" alt="avatar placeholder" width="104" height="100"/>
              <Input type="file" name="file" />
            </FormGroup>
            <FormGroup disabled>
              <Label for="username">Username</Label>
              <Input className={css(myStyles.readOnly)} type="text" name="username" value={this.displayAttribute("username")}/>
            </FormGroup>
            <FormGroup disabled>
              <Label for="name">Name</Label>
              <Input className={css(myStyles.readOnly)} type="text" name="name" value={this.displayAttribute("name")}/>
            </FormGroup>
            <FormGroup disabled>
              <Label for="surname">Surname</Label>
              <Input className={css(myStyles.readOnly)} type="text" name="surname" value={this.displayAttribute("surname")}/>
            </FormGroup>
            <FormGroup >
            <Label for="gender">Gender</Label>
              <Input className={css(myStyles.inputStyle)} defaultValue="specify" onChange={this.handleChange} type="select" name="gender">
                <option value="specify" >Please specify</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="undisclosed">Prefer not to say</option>
              </Input>
            </FormGroup>
            <FormGroup disabled>
              <Label for="role">Current role</Label>
              <Input className={css(myStyles.readOnly)} type="text" name="role" value={this.displayAttribute("role")}/>
            </FormGroup>
            <FormGroup >
            <Label for="status">Collaboration Availability</Label>
              <Input className={css(myStyles.inputStyle)} defaultValue="specify" onChange={this.handleChange} type="select" name="availability">
                <option value="specify">Please specify</option>
                <option value="looking">Actively looking for collab</option>
                <option value="open">Open to suggestions</option>
                <option value="not">Currently not interested</option>
              </Input>
            </FormGroup>
            <FormGroup disabled>
              <Label for="email">Email</Label>
              <Input className={css(myStyles.readOnly)} type="email" name="email" value={this.displayAttribute("email")}/>
            </FormGroup>
            <FormGroup >
              <Label for="phone">Phone number</Label>
              <Input className={css(myStyles.inputStyle)} type="text" name="phone_num" placeholder="Phone number"/>
            </FormGroup>
            <FormGroup disabled>
              <Label for="joinDate">Join date</Label>
              <Input className={css(myStyles.readOnly)} type="text" name="joinDate" value={this.displayAttribute("join_date")}/>
            </FormGroup>
            <Button type="submit" name="submit" onClick={this.handleSubmit} className={css(myStyles.submitButt)}>Update details</Button>
          </Form>
        </div>
    );
  }
}