//React + Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Actions
import { loginAccount } from "../../features/auth/authActions";
import { RedirectToForgot } from "../../features/API/History_API/historyFunctions";

//Selectors
import { selectAuthStatus, selectErrorMessage, selectNeedLoginHelp } from "../../features/auth/authSelectors";

//Components
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Image as CloudImage, CloudinaryContext, Transformation } from "cloudinary-react";
import { Modal, Button } from "semantic-ui-react";
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
    const { email, password } = this.state.formData;
    loginAccount(email, password);
  };

  render() {
    const { RedirectToForgot, loginStatus, errorMsg, needLoginHelp } = this.props;
    const { loginMode, formData } = this.state;
    const errorComponent = <ErrorMessage message={errorMsg} />;
    const needHelpComponent = <ErrorMessage message="Need help? Send us an email at aztecgamelab@gmail.com or click forgot password!"/>;
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
          {loginMode ? (
            <LoginForm
              switchModal={this.switchToRegisterMode}
              handleFieldInput={this.handleFieldInput}
              loginAccount={this.handleLogin}
              forgotRedirect={RedirectToForgot}
              loginStatus={loginStatus}
              errorComponent={errorComponent}
              needLoginHelp={needLoginHelp}
              helpComponent={needHelpComponent}
            />
          ) : (
            <SignUpForm
              switchModal={this.switchToLoginMode}
              formData={formData}
              handleFieldInput={this.handleFieldInput}
              errorComponent={errorComponent}
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
    errorMsg: selectErrorMessage(state),
    needLoginHelp: selectNeedLoginHelp(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      RedirectToForgot,
      loginAccount
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationModal);