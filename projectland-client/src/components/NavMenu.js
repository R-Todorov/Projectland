import React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Routes from '../Routes.js';
import { StyleSheet, css } from 'aphrodite';
import 'bootstrap/dist/css/bootstrap.css';
import RightNav from './RighNav.js'
import './NavMenu.css';

//CSS styles for customising existing reactstrap components
const myStyles = StyleSheet.create({

  linkStyle: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: '150px',
    textDecoration: 'none',
    color: '#007BFF',
    fontSize: '15px',

    ':link, :visited': {
      backgroundColor: '#343A40', 
    },

    ':hover, :focus': {
      backgroundColor: '#FFF', 
    },

    ':active':{
      color: '#1E90FF'
    }
  },

  navBarStyle: {
    height: '80px',
    verticalAlign: 'baseline',
    borderRadius: '0'
  }
});  

//A custom react component representing a navigation menu 
export default class NavMenu extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      logged: false
    }
  }


  componentWillMount() {
    this.setState({
      newProp: 20,
      blueProp: 30
    })
  }

  render() {
    return (
      <div>
        <Navbar className={css(myStyles.navBarStyle)} color="dark" expand="xl">
          <NavbarBrand href="/">
            <Link to="/">
              <img id="logo" src="./projectland_logo.png" alt="Projectland logo" width="70" height="70"/>
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Nav justified pills horizontal="true"> 
            <NavItem>
              <Link to="/" className={css(myStyles.linkStyle)}>Home</Link>
            </NavItem>
            <NavItem>
               <Link to="/search_projects" className={css(myStyles.linkStyle)}>Browse Projects</Link>
            </NavItem>
            <NavItem>
              <Link to="/search_users" className={css(myStyles.linkStyle)}>Search Users</Link>
            </NavItem>
            <NavItem>
              <Link to="/about" className={css(myStyles.linkStyle)}>About</Link>
            </NavItem>
          </Nav>
          <RightNav handleSignIn={this.props.handleSignIn} />         
        </Navbar>
        <Routes />
      </div>
    );
  } 
}


