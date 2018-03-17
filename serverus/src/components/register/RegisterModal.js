import React, { Component } from "react";
import GridColumn, { Button, Checkbox, Divider, Form, Grid, Input, Modal, Segment } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loginAccount, signUpAccount } from "../../features/login/loginAction";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import styles from "./RegisterModal.css";

class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginForm: true,
      formData: {
        username: "",
        email: "",
        password: ""
      }
    };
  }

  switchModal = () => {
    const { loginForm } = this.state;
    this.setState({
      loginForm: !loginForm
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
    const { loginAccount, signUpAccount } = this.props;
    const { loginForm } = this.state;
    return (
      <Modal.Content>
        {loginForm ? (
          <LoginModal
            switchModal={this.switchModal}
            formData={this.state.formData}
            handleUsername={this.handleUsername}
            handlePassword={this.handlePassword}
            loginAccount={loginAccount}
          />
        ) : (
          <SignUpModal
            switchModal={this.switchModal}
            formData={this.state.formData}
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

// function mapStateToProps(state, ownProps) {
//     return {
//       user: state.user
//     };
//   }

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginAccount: bindActionCreators(loginAccount, dispatch),
    signUpAccount: bindActionCreators(signUpAccount, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
