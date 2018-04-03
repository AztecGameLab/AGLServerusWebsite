//React || Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import { Card, Form, Grid, Message } from "semantic-ui-react";

//Actions
import { requestPasswordReset } from "../../features/auth/authActions";

//Selectors
import { selectAuthStatus, selectErrorMessage } from "../../features/auth/authSelectors";

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
    const { requestPasswordReset, resetStatus, errorMsg } = this.props;
    const { email } = this.state;
    return (
      <Grid centered>
        <div className="forgotCard">
          <Card raised fluid>
            <Card.Content>
              <h2>Reset Password</h2>
              <p>Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
              <Form error={resetStatus === "failed"} success={resetStatus === "succeeded"} onSubmit={() => requestPasswordReset(email)}>
                <br />
                <Form.Input fluid placeholder="Email Address" icon="mail" onChange={this.handleEmailInput} autoComplete="on" />
                <Form.Button fluid color="green" loading={resetStatus === "loading"} type="submit">
                  Send Reset Link
                </Form.Button>
                <Message error content={errorMsg} />
                <Message success content="You've got mail!" />
              </Form>
            </Card.Content>
          </Card>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    resetStatus: selectAuthStatus(state).passwordReset,
    errorMsg: selectErrorMessage(state)
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
