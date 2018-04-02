import React from "react";

//Components
import { Button, Checkbox, Divider, Form, Grid, Icon, Popup } from "semantic-ui-react";

const LoginForm = props => {
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
        content="Login with Facebook, Google and Github coming soon!"
      />

      <br />
      <Divider horizontal>or</Divider>
      <Form className="loginForm" onSubmit={() => props.loginAccount()}>
        <Form.Input
          className="formContents"
          placeholder="Email Address"
          icon="user"
          onChange={e => props.handleFieldInput(e, "email")}
          autoComplete="on"
        />
        <Form.Input
          className="formContents"
          type="password"
          placeholder="Password"
          icon="lock"
          onChange={e => props.handleFieldInput(e, "password")}
          autoComplete="on"
        />
        <Grid columns={2}>
          <Grid.Column textAlign="left">
            <Checkbox label="Remember me" />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <i>
              <a href="" onClick={props.forgotRedirect}>
                Forgot password?
              </a>
            </i>
          </Grid.Column>
        </Grid>
        <br />
        <Form.Button fluid primary className="formContents" color="blue" loading={props.loginStatus === "loading"} type="submit">
          Log In
        </Form.Button>
        {props.loginStatus === "failed" && props.errorComponent}
      </Form>
      <Divider horizontal>Don't have an account?</Divider>
      <Button basic onClick={props.switchModal}>
        Sign up! <Icon name="chevron right" />
      </Button>
    </div>
  );
};

export default LoginForm;
