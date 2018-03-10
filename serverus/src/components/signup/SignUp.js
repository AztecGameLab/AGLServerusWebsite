import React, { Component } from "react";

// Form Handling Wrapper
import { withFormik } from "formik";
import Yup from "yup";

// Components
import SignUpForm from "./SignUpForm";

const CompleteForm = withFormik({
  mapPropsToValues: () => ({ email: "" }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "BasicForm"
})(<SignUpForm />);

class SignUp extends Component {
  render() {
    return <div>{CompleteForm}</div>;
  }
}

export default SignUp;
