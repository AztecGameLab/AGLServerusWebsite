import React from "react";
import { Form, Input } from "semantic-ui-react";

const SignUpForm = props => {
  const {} = props;

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Field>
          <Input icon="users" iconPosition="left" placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <Input icon="users" iconPosition="left" placeholder="Last Name" />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};

export default SignUpForm;
