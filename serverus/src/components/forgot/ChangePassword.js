//React || Redux || Router
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Link} from "react-router-dom";

//Components
import { Card, Form, Grid, Message, Button } from "semantic-ui-react";
import Loading from "../utility/Loading";

//Actions
import { changePassword } from "../../features/auth/authActions";

//API
import { ResetRequestExists } from "../../features/API/AGL_API/passwordResetFunctions";

//Selectors
import { selectAuthStatus, selectErrorMessage } from "../../features/auth/authSelectors";

class ChangePassword extends Component {
  state = {
    securityCode: " ",
    newPassword: " ",
    confirmPassword: " ",
    checkResetIDLoading: true,
    validResetID: false
  };

  handleFormInput = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value
    });
  };

  handleSubmitPassword = () => {
    const { changePassword } = this.props;
    const { securityCode, newPassword, confirmPassword } = this.state;
    const { resetID } = this.props.match.params;
    changePassword(resetID, securityCode, newPassword, confirmPassword);
  };

  componentWillMount() {
    const { resetID } = this.props.match.params;
    ResetRequestExists(resetID).then(valid => {
      this.setState({
        validResetID: valid,
        checkResetIDLoading: false
      });
    });
  }

  render() {
    const { changeStatus, errorMsg } = this.props;
    const { checkResetIDLoading, validResetID } = this.state;
    return (
      <Grid centered>
      
      {!validResetID && !checkResetIDLoading && 
        <Message error>
          <Message.Header>Change Password Request</Message.Header>
          <p>The reset link has either expired or the request does not exist.</p>
          <Button as={Link} to="/forgot">Reset your Password</Button>
        </Message>
      } 
        {checkResetIDLoading ? (
          <Loading loadingMessage="Verifying Request..." />
        ) : (
          validResetID && 
          <div className="forgotCard">
            <Card raised fluid>
              <Card.Content>
                <h2>Reset Your Password</h2>
                <p>Enter the security code sent to your email and confirm your new password.</p>
                <Form onSubmit={this.handleSubmitPassword}>
                  <br />
                  <Form.Input
                    fluid
                    placeholder="Security Code"
                    icon="barcode"
                    autoComplete="off"
                    onChange={e => {
                      this.handleFormInput(e, "securityCode");
                    }}
                  />
                  <Form.Input
                    fluid
                    placeholder="New Password"
                    type="password"
                    icon="lock"
                    autoComplete="off"
                    onChange={e => {
                      this.handleFormInput(e, "newPassword");
                    }}
                  />
                  <Form.Input
                    fluid
                    placeholder="Confirm Password"
                    type="password"
                    icon="lock"
                    autoComplete="off"
                    onChange={e => {
                      this.handleFormInput(e, "confirmPassword");
                    }}
                  />
                  <Button  fluid color="green" loading={changeStatus === "loading"} type="submit">
                    Save and Continue!
                  </Button>
                </Form>
                
                  {changeStatus==="failed" && <Message error> {errorMsg} </Message> }
                  {changeStatus==="succeeded" && <Message success> 
                    Your email has successfully changed. 
                    <Button as={Link} to="/">Continue</Button>
                  </Message>}

              </Card.Content>
            </Card>
          </div>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    changeStatus: selectAuthStatus(state).changePassword,
    errorMsg: selectErrorMessage(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePassword
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
