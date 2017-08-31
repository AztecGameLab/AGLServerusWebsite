import React, { Component } from 'react';
import { Button, Form, Checkbox, Input, Icon, Grid, Segment } from 'semantic-ui-react';


const SignUpOne = (props) => {
  return (
    <div>
      <div style={modalStyle.spacing}>
        <Form.Field>
          <label>Email</label>
          <Input inverted placeholder='Email' iconPosition='left'>
            <Icon name='mail outline' />
            <input onChange={props.handleEmailInput} />
          </Input>
        </Form.Field>
      </div>
      <div style={modalStyle.spacing}>
        <Form.Field>
          <label>Password</label>
          <Input inverted placeholder='Password' iconPosition='left'>
            <Icon name='lock' />
            <input onChange={props.handlePasswordInput} type='password' />
          </Input>
        </Form.Field>
      </div>
      <div style={modalStyle.spacing}>
        <Form.Field>
          <label>Red ID</label>
          <Input inverted placeholder="Red ID" iconPosition='left'>
            <Icon name = 'student' />
            <input onChange={props.handleRedIDInput} />
          </Input>
        </Form.Field>
      </div>
      <div style={modalStyle.spacing}>
      </div>
      <div style={{ padding: '20px' }}>
        <Grid>
          <Grid.Column floated='right' width={3}>
            <Button content='Next' color='green' icon='right arrow' labelPosition='right' onClick={() => props.changePhase(1)} />
          </Grid.Column>
        </Grid>
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

export default SignUpOne;