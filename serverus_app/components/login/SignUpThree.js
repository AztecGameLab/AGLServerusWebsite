import React, {Component} from 'react';
import { Button, Form, Checkbox } from 'semantic-ui-react';


const SignUpThree = (props) => {
    return (
        <div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>AGL Username</label>
              <input
                placeholder='Username'
                onChange={props.handleForumHandleInput} />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            </div>
            <Button content='Back' color = 'green' icon='left arrow' labelPosition='left' onClick = {() => props.changePhase(-1)}/>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button onClick = {() => props.randomUser()}>
            RANDOM USER
            </Button>
            <Button
              type='submit'
              onClick={props.onSubmission}>Create Account!</Button>
            </div>
          </div>
    );
};

var modalStyle = {
  spacing: {
    margin: '15px',
    width: "100%",
    display: "block"
  }
};

export default SignUpThree;