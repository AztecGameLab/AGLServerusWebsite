import React, { Component } from 'react';
import { Button, Form, Checkbox, Input, Icon, Grid } from 'semantic-ui-react';


const SignUpThree = (props) => {
  return (
    <div>
      <div style={modalStyle.spacing}>
        <Form.Field>
          <label>AGL Username</label>
          <Input placeHolder='Username' iconPosition='left'>
            <Icon name='new pied piper' />
            <input onChange={props.handleUsernameInput} />
          </Input>
        </Form.Field>
      </div>
      <div style={modalStyle.spacing}>
      </div>
      <div style={{ padding: '20px' }}>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
          <hr/>
          These terms and conditions can be found   <a href = 'https://docs.google.com/document/d/1R6tGpquyGkJQlrIz-iO-xCoMH5pjsymbRFWiCd6qYQ4/edit?usp=sharing'> here</a>
        </Form.Field>
        <Grid>
          <Grid.Column floated='left' width={3}>
            <Button content='Back' color='green' icon='left arrow' labelPosition='left' onClick={() => props.changePhase(-1)} />
          </Grid.Column>
        </Grid>
        <div style={modalStyle.spacing}>
          <Button onClick={() => props.randomUser()}>
            RANDOM USER
            </Button>
          <Button
            type='submit'
            onClick={props.onSubmission}>Create Account!</Button>
        </div>
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