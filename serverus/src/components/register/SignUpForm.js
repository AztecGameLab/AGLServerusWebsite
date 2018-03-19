import React from "react";

//Components
import { Button, Checkbox, Divider, Form, Grid, Input, Icon } from "semantic-ui-react";

const SignUpForm = props => {
  return (
    <div>
      <Button color="facebook">
        <Icon name="facebook" />Sign up with Facebook
      </Button>
      <Button color="google plus">
        <Icon name="google" />Sign up with Google
      </Button>
      <br />
      <Divider horizontal>or</Divider>
      <Form className="loginForm" onSubmit={() => props.signUpAccount(props.formData)}>
        <Input className="formContents" placeholder="Username" icon="user" onChange={props.handleUsername} />
        <br />
        <br />
        <Input className="formContents" placeholder="Email Address" icon="mail" onChange={props.handleEmail} />
        <br />
        <br />
        <Input className="formContents" type="password" placeholder="Password" icon="lock" onChange={props.handlePassword} />
        <br />
        <br />
        <Grid columns={2}>
          <Grid.Column textAlign="left">
            <Checkbox label="I accept the Terms & Conditions" />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <i>
              <a href="https://docs.google.com/document/d/1R6tGpquyGkJQlrIz-iO-xCoMH5pjsymbRFWiCd6qYQ4/edit?usp=sharing">Terms & Conditions</a>
            </i>
          </Grid.Column>
        </Grid>
        <br />
        <Form.Button fluid className="formContents" color="green">
          Sign Up
        </Form.Button>
      </Form>
      <Divider horizontal>Already have an Aztec Game Lab account?</Divider>
      <Button basic onClick={props.switchModal}>
        Sign in!
      </Button>
    </div>
  );
};

export default SignUpForm;
