import React from "react";

//Components
import { Button, Checkbox, Divider, Form, Grid, Icon, Popup } from "semantic-ui-react";

const SignUpForm = props => {
  return (
    <div>
      <SocialButtonGroup />
      <br />
      <Divider horizontal>or</Divider>
      <Form className="loginForm" onSubmit={() => props.createAccount()}>
        <Form.Input
          className="formContents"
          placeholder="Username"
          icon="user"
          onChange={e => props.handleFieldInput(e, "username")}
          autoComplete="off"
          required
        />
        <Form.Input
          className="formContents"
          placeholder="Email Address"
          icon="mail"
          onChange={e => props.handleFieldInput(e, "email")}
          autoComplete="off"
          required
          type="email"
        />
        <Form.Input
          className="formContents"
          type="password"
          placeholder="Password"
          icon="lock"
          onChange={e => props.handleFieldInput(e, "password")}
          autoComplete="off"
          required
        />
        <Grid columns={2}>
          <Grid.Column textAlign="left">
            <Checkbox
              label="I accept the Terms & Conditions"
              autoComplete="off"
              onChange={e => props.toggleCheckBox(e, "termsConditions")}
              required
            />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <LinkToTermsConditions />
          </Grid.Column>
        </Grid>
        <br />
        <Form.Button
          disabled={!props.termsConditionsBoxChecked}
          fluid
          className="formContents"
          color="green"
          type="submit"
          loading={props.createAccountStatus === "loading"}
        >
          Create Account!
        </Form.Button>
        {props.createAccountStatus === "failed" && props.errorComponent}
      </Form>

      <Divider horizontal>Already have an Aztec Game Lab account?</Divider>
      <Button basic onClick={props.switchModal}>
        <Icon name="chevron left" />Log In!
      </Button>
    </div>
  );
};

export default SignUpForm;

const LinkToTermsConditions = () => {
  return (
    <i>
      <a
        href="https://docs.google.com/document/d/1R6tGpquyGkJQlrIz-iO-xCoMH5pjsymbRFWiCd6qYQ4/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms & Conditions
      </a>
    </i>
  );
};

const SocialButtonGroup = () => {
  return (
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
  );
};
