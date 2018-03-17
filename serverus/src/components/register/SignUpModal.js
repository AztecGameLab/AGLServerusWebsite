import React, { Component } from "react";
import GridColumn, { Button, Checkbox, Divider, Form, Grid, Input, Modal, Segment } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class SignUpModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        Sign up with Facebook! Sign up with Google!
        <Divider horizontal>or</Divider>
        <Form className="loginForm" onSubmit={() => this.props.signUpAccount(this.props.formData)}>
          <Input className="formContents" placeholder="Username" icon="user" onChange={this.props.handleUsername} />
          <br />
          <br />
          <Input className="formContents" placeholder="Email Address" icon="mail" onChange={this.props.handleEmail} />
          <br />
          <br />
          <Input className="formContents" type="password" placeholder="Password" icon="lock" onChange={this.props.handlePassword} />
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
          <Button className="formContents">Create account!</Button>
          <br />
          <br />
          <i>Forgot password?</i>
        </Form>
        <Divider horizontal>Already an Aztec Game Lab Developer?</Divider>
        <br />
        <Button onClick={this.props.switchModal}>Sign in!</Button>
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//     return {
//       user: state.user
//     };
//   }

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(null, mapDispatchToProps)(SignUpModal);
