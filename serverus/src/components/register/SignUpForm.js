import React from "react";

//Components
import { Button, Checkbox, Divider, Form, Grid, Input, Icon, Popup } from "semantic-ui-react";

const SignUpForm = props => {
  return (
    <div>
      <Popup
        inverted
        flowing
        position="bottom center"
        trigger={
          <Button.Group widths="3" style={{ width: "60%" }}>
            <Button color="facebook" disabled>
              <Icon name="facebook" />Facebook
            </Button>
            <Button color="google plus" disabled>
              <Icon name="google" />Google
            </Button>
            <Button color="grey" disabled>
              <Icon name="github" />Github
            </Button>
          </Button.Group>
        }
        content="Registration with Facebook, Google and Github coming soon!"
      />
      <br />
      <Divider horizontal>or</Divider>
      <Form className="loginForm" onSubmit={() => props.signUpAccount(props.formData)}>
        <Input className="formContents" placeholder="Username" icon="user" onChange={e => props.handleFieldInput(e, "username")} />
        <br />
        <br />
        <Input className="formContents" placeholder="Email Address" icon="mail" onChange={e => props.handleFieldInput(e, "email")} />
        <br />
        <br />
        <Input className="formContents" type="password" placeholder="Password" icon="lock" onChange={e => props.handleFieldInput(e, "password")} />
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
          Create Account!
        </Form.Button>
      </Form>
      <Divider horizontal>Already have an Aztec Game Lab account?</Divider>
      <Button basic onClick={props.switchModal}>
        <Icon name="chevron left" />Log In!
      </Button>
    </div>
  );
};

export default SignUpForm;
