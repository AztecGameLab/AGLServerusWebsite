import React from "react";

//Components
import { Button, Checkbox, Divider, Form, Grid, Icon, Popup } from "semantic-ui-react";

const LoginForm = props => {
  return (
    <div>
      <SocialButtonGroup />
      <br />
      <Divider horizontal>or</Divider>
      <Form className="loginForm" onSubmit={() => props.loginAccount()}>
        <Form.Input
          className="formContents"
          placeholder="Email Address"
          icon="user"
          onChange={e => props.handleFieldInput(e, "email")}
          autoComplete="on"
          list="emailSuggestions"
          required
          type="email"
        />
        <datalist id="emailSuggestions">
          <option value={props.rememberMeEmail} />
        </datalist>
        <Form.Input
          className="formContents"
          type="password"
          placeholder="Password"
          icon="lock"
          onChange={e => props.handleFieldInput(e, "password")}
          autoComplete="on"
          required
        />
        <Grid columns={2}>
          <Grid.Column textAlign="left">
            <Checkbox label="Remember me" autoComplete="off" onChange={e => props.toggleCheckBox(e, "rememberMe")} />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <ForgotPassword forgotRedirect={props.forgotRedirect} />
          </Grid.Column>
        </Grid>
        <br />
        <Form.Button fluid primary className="formContents" color="blue" loading={props.loginStatus === "loading"} type="submit">
          Log In
        </Form.Button>
        {props.loginStatus === "failed" && props.errorComponent}
        {props.needLoginHelp && props.helpComponent}
      </Form>
      <Divider horizontal>Don't have an account?</Divider>
      <Button basic onClick={props.switchModal}>
        Sign up! <Icon name="chevron right" />
      </Button>
    </div>
  );
};

export default LoginForm;

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
      content="Login with Facebook, Google and Github coming soon!"
    />
  );
};

const ForgotPassword = props => {
  return (
    <i>
      <a href="" onClick={props.forgotRedirect}>
        Forgot password?
      </a>
    </i>
  );
};
