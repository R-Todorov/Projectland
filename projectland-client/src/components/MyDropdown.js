import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { API } from "aws-amplify";

const style = StyleSheet.create({

  dropDownStyle: {
    left: '490px',
    color: '#000',
  },

  fontSizeStyle: {
    fontSize: '15px',
  },

  colorThemeStyle: {
    color: '#000',
    backgroundColor: '#FFF',
    
    ':focus, :active': {
      color: '#000',
    }
  }
});

export default class MyDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      names: this.props.user.name + " " + this.props.user.surname
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  //Renders a customised reactstrap dropdown menu
  render() {
    return (	
      <Dropdown className={css(style.dropDownStyle)} isOpen={this.state.dropdownOpen} toggle={this.toggle} size="lg">
        <DropdownToggle caret className={css(style.fontSizeStyle, style.colorThemeStyle)}>
          Welcome, <strong className={css(style.fontSizeStyle, style.colorThemeStyle)}>{this.state.names+ " "}</strong>
        </DropdownToggle>
        <DropdownMenu right className={css(style.fontSizeStyle, style.colorThemeStyle)}>
          <DropdownItem header className={css(style.fontSizeStyle)}>Profile</DropdownItem>
          <DropdownItem divider /> 
          <DropdownItem tag={Link} to={"/profile/" + this.props.user.username} className={css(style.fontSizeStyle, style.colorThemeStyle)}>My Profile</DropdownItem>
          <DropdownItem tag={Link} to="/my_projects" className={css(style.fontSizeStyle, style.colorThemeStyle)}>My Projects</DropdownItem>
          <DropdownItem divider />           
          <DropdownItem className={css(style.fontSizeStyle, style.colorThemeStyle)}>Settings</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.props.logout}>Log out</DropdownItem>
        </DropdownMenu>
      </Dropdown>  
    );
  } 
}   

