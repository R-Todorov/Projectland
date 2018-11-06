import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import Link from '../Routes.js';

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
      <Dropdown className={css(style.dropDownStyle)} isOpen={this.state.dropdownOpen} toggle={this.toggle} size="lg" color="" >
        <DropdownToggle caret className={css(style.fontSizeStyle, style.colorThemeStyle)}>
          Welcome, <strong className={css(style.fontSizeStyle, style.colorThemeStyle)}>{`${this.props.name} ${this.props.surname} `}</strong>
        </DropdownToggle>
        <DropdownMenu right className={css(style.fontSizeStyle, style.colorThemeStyle)}>
          <DropdownItem header className={css(style.fontSizeStyle)}>Profile</DropdownItem>
          <DropdownItem divider /> 
          <DropdownItem className={css(style.fontSizeStyle, style.colorThemeStyle)}>My Profile</DropdownItem>
          <DropdownItem className={css(style.fontSizeStyle, style.colorThemeStyle)}>My Projects</DropdownItem>
          <DropdownItem divider />           
          <DropdownItem className={css(style.fontSizeStyle, style.colorThemeStyle)}>Settings</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.props.handler}>Log out</DropdownItem>
        </DropdownMenu>
      </Dropdown>  
    );
  } 
}   

