import React, { Component } from 'react';
import { Button, Form, Checkbox, Grid, Input, Icon } from 'semantic-ui-react';


const SignUpTwo = (props) => {
  return (
    <div>
      <div style={modalStyle.spacing}>
        <Form.Field>
          <label>First Name</label>
          <Input placeholder='First Name' iconPosition='left'>
            <Icon name='user outline' />
            <input onChange={props.handleFirstNameInput} />
          </Input>
        </Form.Field>
      </div>
      <div style={modalStyle.spacing}>
        <Form.Field>
          <label>Last Name</label>
          <Input placeholder='Last Name' iconPosition='left'>
            <Icon name='user outline' />
            <input onChange={props.handleLastNameInput} />
          </Input>
        </Form.Field>
      </div>
      <div style={modalStyle.spacing}>
        <Form.Field>
          <label>Major</label>
          <Input placeholder='Major' iconPosition='left'>
            <Icon name='wpexplorer' />
            <input onChange={props.handleMajorInput} />
          </Input>
        </Form.Field>
      </div>
      <div style={modalStyle.spacing}>
      </div>
      <div style={{ padding: '20px' }}>
        <Grid>
          <Grid.Column floated='left' width={5}>
            <Button content='Back' color='green' icon='left arrow' labelPosition='left' onClick={() => props.changePhase(-1)} />
          </Grid.Column>
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

export default SignUpTwo;