//React + Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Actions
import { loginAccount, createAccount } from "../../features/auth/authActions";
import { RedirectToForgot } from "../../features/API/History_API/historyFunctions";

//Selectors
import { selectAuthStatus, selectErrorMessage, selectNeedLoginHelp, selectRememberMe } from "../../features/auth/authSelectors";

//Components
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Image as CloudImage, CloudinaryContext, Transformation } from "cloudinary-react";
import { Modal, Button, Message, Dimmer, Loader } from "semantic-ui-react";
import ErrorMessage from "../utility/ErrorMessage";

//Styling
import "./RegistrationModal.css";

class RegistrationModal extends Component {
  state = {
    loginMode: true,
    formData: {
      username: "",
      email: "",
      password: "",
      rememberMe: false,
      termsConditions: false
    },
    fieldError: ""
  };

  switchToLoginMode = () => {
    this.setState({
      loginMode: true
    });
  };

  switchToRegisterMode = () => {
    this.setState({
      loginMode: false
    });
  };

  toggleCheckBox = (e, fieldName) => {
    const newToggleState = !this.state.formData[fieldName];
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, [fieldName]: newToggleState }
    });
  };

  handleFieldInput = (e, fieldName) => {
    try {
      let currentForm = this.state.formData;
      currentForm[fieldName] = e.target.value;
      this.setState({
        formData: currentForm
      });
    } catch (error) {
      this.setState({
        fieldError: error.message
      });
    }
  };

  handleLogin = () => {
    const { loginAccount } = this.props;
    const { email, password, rememberMe } = this.state.formData;
    loginAccount(email, password, rememberMe);
  };

  handleCreateAccount = () => {
    const { createAccount } = this.props;
    const { username, email, password } = this.state.formData;
    createAccount(username, email, password);
  };

  render() {
    const { RedirectToForgot, loginStatus, errorMsg, needLoginHelp, rememberMeEmail, createAccountStatus, loggingIn } = this.props;
    const { termsConditions } = this.state.formData;
    const { loginMode, formData } = this.state;
    const errorComponent = <ErrorMessage message={errorMsg} />;
    const needHelpComponent = <ErrorMessage message="Need help? Send us an email at aztecgamelab@gmail.com or click forgot password!" />;
    const successComponent = <Message success content="Success! Logging you in..." />;
    return (
      <Modal
        closeIcon
        trigger={
          <div>
            <Button basic color="blue" onClick={this.switchToLoginMode}>
              Log In
            </Button>
            <Button basic color="green" onClick={this.switchToRegisterMode}>
              Create Account
            </Button>
          </div>
        }
      >
        <Modal.Content>
          <CloudinaryContext cloudName="aztecgamelab-com">
            <CloudImage publicId="WebsiteAssets/Parallax/AGL_retro_parallax_layer2.png">
              <Transformation width="300" crop="scale" />
            </CloudImage>
          </CloudinaryContext>
          <br />
          <Dimmer active={loggingIn}>
            <Loader>Success! Welcome to Aztec Game Lab! Logging you in...</Loader>
          </Dimmer>

          {loginMode ? (
            <LoginForm
              switchModal={this.switchToRegisterMode}
              handleFieldInput={this.handleFieldInput}
              loginAccount={this.handleLogin}
              toggleCheckBox={this.toggleCheckBox}
              forgotRedirect={RedirectToForgot}
              loginStatus={loginStatus}
              errorComponent={errorComponent}
              needLoginHelp={needLoginHelp}
              helpComponent={needHelpComponent}
              rememberMeEmail={rememberMeEmail}
            />
          ) : (
            <SignUpForm
              switchModal={this.switchToLoginMode}
              handleFieldInput={this.handleFieldInput}
              createAccount={this.handleCreateAccount}
              toggleCheckBox={this.toggleCheckBox}
              errorMsg={errorMsg}
              errorComponent={errorComponent}
              successComponent={successComponent}
              createAccountStatus={createAccountStatus}
              termsConditionsBoxChecked={termsConditions}
              formData={formData}
            />
          )}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: selectAuthStatus(state).login,
    loggingIn: selectAuthStatus(state).loggingIn,
    createAccountStatus: selectAuthStatus(state).createAccount,
    errorMsg: selectErrorMessage(state),
    needLoginHelp: selectNeedLoginHelp(state),
    rememberMeEmail: selectRememberMe(state).email
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      RedirectToForgot,
      loginAccount,
      createAccount
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationModal);
