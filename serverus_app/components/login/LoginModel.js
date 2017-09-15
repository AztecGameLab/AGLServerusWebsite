import React, { Component } from 'react';
import { Popup, Header, Modal, Tab, Image, Segment } from 'semantic-ui-react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import transitionStyle from './modal.css';
let logo = require('./blacklogo.png');

class LoginModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, data) {
    this.props.changeTab(data.activeIndex);
  }

  render() {
    const panes = [
      {
        menuItem: {key: 'Login', icon: 'sign in', content: 'Login'}, render: () => <Tab.Pane attached={false} value={0}>
          <LoginForm />
        </Tab.Pane>
      },
      {
        menuItem: {key: 'SignUp', icon: 'signup', content:'Sign Up'}, render: () => <Tab.Pane attached={false} value={1}>
          <SignUpForm signedUp={this.props.signedUp} />
        </Tab.Pane>
      }
    ];
    return (
      <Modal basic style={modalStyle.size} dimmer={true}open={this.props.isOpen} onClose={this.props.close} size='large'>
      <Segment.Group horizontal style = {modalStyle.box}>
          <Segment style = {modalStyle.iconSection}>
          <Image src= {logo}  shape='rounded' style = {modalStyle.logo}/>
        </Segment>
          <Segment style = {modalStyle.iconSection2}>
            <Tab activeIndex={this.props.activeIndex} menu={{ color:'red', inverted: true, secondary: true, pointing: true }} panes={panes} onTabChange={(event, data) => this.handleTabChange(event, data)} />
          </Segment>
        </Segment.Group>
      </Modal>
    )
  }
}
//style = {modalStyle.logo}
//style={modalStyle.size} dimmer={'blurring'}
export default LoginModel;

var modalStyle = {
  size: {
    overflow: 'auto',
    transform: 'translateY(15%)',
    height: '100%',
    position: 'absolute'
  },
  box : {
    backgroundColor:'rgba(0,0,0,0.85)',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: '1px',
    boxShadow: '3px 3px 5px black',
    color: '#fff',
    borderRadius: '20px',
    padding: '2%'
  },
  logo: {
    display: 'block',
    maxWidth:'400px',
    maxHeight:'200px',
    width: '100%',
    height: 'auto',
    position: 'relative',
    top: '175px',
    transform: 'translateY(-50%)'

  },
  iconSection: {
    width: '40%'
  },
  iconSection2: {
    width: '60%',
    height: '40%'
  }
};