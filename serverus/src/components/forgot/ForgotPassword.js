//React || Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import { Card, Form, Grid } from "semantic-ui-react";

//Actions
import { requestPasswordReset } from "../../features/auth/authActions";

//Selectors
import { selectAuthStatus } from "../../features/auth/authSelectors";

//Stylings
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  state = {
    email: ""
  };
  handleEmailInput = e => {
    this.setState({ email: e.target.value });
  };
  render() {
    const { requestPasswordReset, resetStatus } = this.props;
    return (
      <Grid centered>
        <div className="forgotCard">
          <Card raised fluid>
            <Card.Content>
              <h2>Reset Password</h2>
              <p>Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
              <Form onSubmit={requestPasswordReset}>
                <br />
                <Form.Input fluid placeholder="Email Address" icon="mail" onChange={this.handleEmailInput} autoComplete="on" />
                <Form.Button fluid color="green" loading={resetStatus === "loading"} type="submit">
                  Send Reset Link
                </Form.Button>
              </Form>
            </Card.Content>
          </Card>
          {this.state.email}
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    resetStatus: selectAuthStatus(state).passwordReset
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestPasswordReset
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
