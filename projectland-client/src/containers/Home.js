import React, { Component } from "react";
import {Jumbotron, Button} from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import "./Home.css";


const myStyles = StyleSheet.create({

  productInfo: {
    display: 'inline-block',
    width: '700px',
    height: '600px',
    marginTop: '20px',
    padding: '40px',
    backgroundColor: '#E4E8E8',
    borderRadius: '10px'
  },

  prodTitle: {
    fontSize: '50px',
    marginBottom: '30px'
  },

  learnButt: {
    fontSize: '20px',
    margin: '20px',
    padding: '10px 40px',
    color: 'white',
    backgroundColor: "#007bff",
    borderRadius: '5px',

    ':hover, :active :target': {
      backgroundColor: '#0066CC', 
    }
  }
});  

export default class Home extends Component {
  render() {
    return (
      <div id="home-container">
        <Jumbotron className={css(myStyles.productInfo)}>
          <h1 className={css(myStyles.prodTitle)}>Greetings from Projectland!</h1>
          <p style={{textAlign: 'justify'}}>Projectland is a proprietary software which is developed with the sole intent of providing employees with an
             effortless and easy-to-use project management platform. The sign up process is almost instant. Moreover, the process
             could be shortened by allowing users to authenticate themselves with popular third-party providers. Having all personal
             data and project details stored securely, but easily retrievable, cowerkers can start focusing on doing rather than managing.
          </p>
          <hr style={{size: '1px', backgroundColor:'black', border: '1px solid black'}}/>
          <p>Although we into early development of the tool, we have a lot of upcoming features planned</p>
          <p className="lead">
            <Button tag={Link} to="/about" className={css(myStyles.learnButt)}>Learn more</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}