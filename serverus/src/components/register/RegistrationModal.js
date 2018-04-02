//React + Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Actions
import { loginAccount } from "../../features/auth/authActions";
import { RedirectToForgot } from "../../features/API/History_API/historyFunctions";

//Selectors
import { selectAuthStatus } from "../../features/auth/authSelectors";

//Components
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Image as CloudImage, CloudinaryContext, Transformation } from "cloudinary-react";
import { Modal, Button } from "semantic-ui-react";

//Styling
import "./RegistrationModal.css";

class RegistrationModal extends Component {
  state = {
    loginMode: true,
    formData: {
      username: "",
      email: "",
      password: ""
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

  render() {
    const { loginAccount, RedirectToForgot, loginStatus } = this.props;
    const { loginMode, formData } = this.state;
    return (
      <Modal
        closeIcon
        trigger={
          <div>
            <Button basic color="blue" onClick={this.switchToLoginMode}>
              Sign In
            </Button>
            <Button basic color="green" onClick={this.switchToRegisterMode}>
              Sign Up
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
              formData={formData}
              handleFieldInput={this.handleFieldInput}
              loginAccount={loginAccount}
              forgotRedirect={RedirectToForgot}
              loginStatus={loginStatus}
            />
          ) : (
            <SignUpForm switchModal={this.switchToLoginMode} formData={formData} handleFieldInput={this.handleFieldInput} />
          )}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: selectAuthStatus(state).login
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