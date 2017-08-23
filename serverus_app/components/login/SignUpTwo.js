import React, {Component} from 'react';
import { Button, Form, Checkbox } from 'semantic-ui-react';


const SignUpTwo = (props) => {
    return (
        <div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder='Email:'
                onChange={props.handleFirstNameInput} />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder='Password:'
                onChange={props.handleLastNameInput} />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>Major</label>
              <input
                placeholder='Major'
                onChange={props.handleMajorInput} />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            </div>
            <Button content='Back' color = 'green' icon='left arrow' labelPosition='left' onClick = {() => props.changePhase(-1)}/>
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

export default SignUpTwo;