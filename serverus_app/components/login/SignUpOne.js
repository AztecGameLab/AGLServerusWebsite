import React, {Component} from 'react';
import { Button, Form, Checkbox } from 'semantic-ui-react';


const SignUpOne = (props) => {
    return (
        <div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>Email</label>
              <input
                placeholder='Email:'
                onChange={props.handleEmailInput} />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder='Password:'
                type='password'
                onChange={props.handlePasswordInput} />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>Red ID</label>
              <input
                placeholder='Red ID:'
                onChange={props.handleRedIDInput} />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            </div>
            <Button content='Next' color = 'green' icon='right arrow' labelPosition='right' onClick = {() => props.changePhase(1)}/>
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