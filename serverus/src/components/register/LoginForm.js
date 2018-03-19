import React from "react";

//Components
import { Button, Checkbox, Divider, Form, Grid, Icon } from "semantic-ui-react";

const LoginForm = props => {
  return (
    <div>
      <Button color="facebook">
        <Icon name="facebook" />Login with Facebook
      </Button>
      <Button color="google plus">
        <Icon name="google" />Login with Google
      </Button>
      <Button color="grey">
        <Icon name="github" /> Github
      </Button>
      <br />
      <Divider horizontal>or</Divider>
      <Form className="loginForm" onSubmit={() => props.loginAccount(props.formData)}>
        <Form.Input
          className="formContents"
          placeholder="Username or Email Address"
          icon="user"
          onChange={e => props.handleFieldInput(e, "username")}
        />
        <Form.Input
          className="formContents"
          type="password"
          placeholder="Password"
          icon="lock"
          onChange={e => props.handleFieldInput(e, "password")}
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
        <Form.Button fluid primary className="formContents" color="blue">
          Sign In
        </Form.Button>
      </Form>
      <Divider horizontal>Don't have an account?</Divider>
      <Button basic onClick={props.switchModal}>
        Sign up!
      </Button>
    </div>
  );
};

export default LoginForm;
