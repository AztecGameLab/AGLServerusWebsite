import React, { Component } from "react";
import GridColumn, { Button, Checkbox, Divider, Form, Grid, Input, Modal, Segment } from "semantic-ui-react";
import styles from "./RegisterModal.css";
import SignUpModal from "./SignUpModal";
import { bindActionCreators } from "redux";
import {} from "../../features/login/loginAction";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        {process.env.REACT_APP_FIREBASE_URL}
        Facebook Login! Google Login!
        <Divider horizontal>or</Divider>
        <Form className="loginForm" onSubmit={() => this.props.loginAccount(this.props.formData)}>
          <Form.Input className="formContents" placeholder="Username or email address" icon="user" onChange={this.props.handleUsername} />
          <br />
          <br />
          <Form.Input className="formContents" type="password" placeholder="Password" icon="lock" onChange={this.props.handlePassword} />
          <br />
          <br />
          <Grid columns={2}>
            <Grid.Column textAlign="left">
              <Checkbox label="Remember me" />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <i>Show password</i>
            </Grid.Column>
          </Grid>
          <br />
          <Form.Button className="formContents">Log in</Form.Button>
          <br />
          <br />
          <i>Forgot password?</i>
        </Form>
        <Divider horizontal>Become an Aztec Game Lab Developer!</Divider>
        <br />
        <Button onClick={this.props.switchModal}>Sign up!</Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(null, mapDispatchToProps)(Login);
