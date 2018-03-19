//React + Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Actions
import { loginAccount, signUpAccount } from "../../features/login/loginActions";
import { RedirectToForgot } from "../../features/API/History_API/historyFunctions";

//Components
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Image as CloudImage, CloudinaryContext, Transformation } from "cloudinary-react";
import { Modal } from "semantic-ui-react";

//Styling
import "./RegistrationModal.css";

class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginMode: true,
      formData: {
        username: "",
        email: "",
        password: ""
      }
    };
  }

  switchModal = () => {
    const { loginMode } = this.state;
    this.setState({
      loginMode: !loginMode
    });
  };

  handleUsername = data => {
    const { formData } = this.state;
    formData.username = data.target.value;
    this.setState({
      formData
    });
  };

  handleEmail = data => {
    const { formData } = this.state;
    formData.email = data.target.value;
    this.setState({
      formData
    });
  };

  handlePassword = data => {
    const { formData } = this.state;
    formData.password = data.target.value;
    this.setState({
      formData
    });
  };

  render() {
    const { loginAccount, signUpAccount, RedirectToForgot } = this.props;
    const { loginMode, formData } = this.state;
    return (
      <Modal.Content>
        <CloudinaryContext cloudName="aztecgamelab-com">
          <CloudImage publicId="WebsiteAssets/Parallax/AGL_retro_parallax_layer2.png">
            <Transformation width="300" crop="scale" />
          </CloudImage>
        </CloudinaryContext>
        <br />
        {loginMode ? (
          <LoginForm
            switchModal={this.switchModal}
            formData={formData}
            handleUsername={this.handleUsername}
            handlePassword={this.handlePassword}
            loginAccount={loginAccount}
            forgotRedirect={RedirectToForgot}
          />
        ) : (
          <SignUpForm
            switchModal={this.switchModal}
            formData={formData}
            handleUsername={this.handleUsername}
            handleEmail={this.handleEmail}
            handlePassword={this.handlePassword}
            signUpAccount={signUpAccount}
          />
        )}
      </Modal.Content>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
