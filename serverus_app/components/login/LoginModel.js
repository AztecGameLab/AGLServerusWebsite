import React, { Component } from 'react';
import { Popup, Header, Modal, Tab} from 'semantic-ui-react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
class LoginModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, data){
    this.props.changeTab(data.activeIndex);
  }
  
  render() {
  const panes = [
    { menuItem: 'Login', render: () => <Tab.Pane attached={false} value = {0}>
      <LoginForm/>
    </Tab.Pane> },
    { menuItem: 'Sign Up', render: () => <Tab.Pane attached={false} value = {1}>
      <SignUpForm/>
    </Tab.Pane> }
  ];
  console.log("active index change:" + this.props.activeIndex)
    return (
        <Modal style={modalStyle.size} dimmer={'blurring'} open={this.props.isOpen} onClose={this.props.close} size={'tiny'}>
           <Tab activeIndex = {this.props.activeIndex} menu={{ secondary: true, pointing: true }} panes={panes} onTabChange={(event,data)=>this.handleTabChange(event,data)}/>
        </Modal>
    )
  }
}

export default LoginModel;

var modalStyle = {
  size: {
    height: '75%',
    overflow: 'auto'
  }
};