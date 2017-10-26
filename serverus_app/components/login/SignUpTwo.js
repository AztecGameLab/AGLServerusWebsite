import React, { Component } from 'react';
import { Button, Form, Checkbox, Grid, Input, Icon, Dropdown } from 'semantic-ui-react';
import majorOptions from '../common/options/majorOptions.json';

class SignUpTwo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstNameFilled: false,
      lastNameFilled: false,
      majorFilled: false,
      buttonDisable: true
    };
    this.firstNameCheck = this.firstNameCheck.bind(this);
    this.lastNameCheck = this.lastNameCheck.bind(this);
    this.majorCheck = this.majorCheck.bind(this);
    this.formComplete = this.formComplete.bind(this);
  }

  firstNameCheck(e) {
    if(e.target.value.length > 0 && e.target.value.length < 50) {
      this.setState({
        firstNameFilled: true
      }, function() {
        this.formComplete();
      });
    }
  }
  lastNameCheck(e) {
    if(e.target.value.length > 0 && e.target.value.length < 50) {
      this.setState({
        lastNameFilled: true
      }, function() {
        this.formComplete();
      });
    }
  }
  majorCheck(e, { value }) {
    this.props.handleMajorInput(value);
      this.setState({
        majorFilled: true
      }, function () {
        this.formComplete();
      });
  }
  formComplete() {
    var inputsFilled = (this.state.firstNameFilled && this.state.lastNameFilled && this.state.majorFilled);
    if(inputsFilled){
      this.setState({
        buttonDisable: false
      });
    }
  }
  render() {
    return (
      <div>
      <br/>      
      <Grid>
        <Grid.Column width = {1}>
          <Icon name = 'rocket' size = 'big' />
        </Grid.Column>
        <Grid.Column width = {11}>
        <h2>New player? Whats your name?  </h2>
        </Grid.Column>
      </Grid>
      <hr/>
        <div style={modalStyle.spacing}>
          <Form.Field className="login">
            <label>First Name</label>
            <Input placeholder='First Name' >
              <input onChange={this.props.handleFirstNameInput} onBlur = {this.firstNameCheck}/>
            </Input>
          </Form.Field>
        </div>
        <div style={modalStyle.spacing}>
          <Form.Field className="login">
            <label>Last Name</label>
            <Input placeholder='Last Name' >
              <input onChange={this.props.handleLastNameInput} onBlur = {this.lastNameCheck} />
            </Input>
          </Form.Field>
        </div>
        <div style={modalStyle.spacing}>
          <Form.Field className="login">
            <label>Major</label>
            <Dropdown placeholder='Major' search selection options={majorOptions.majors} onChange={this.majorCheck}/>
          </Form.Field>
        </div>
        <div style={modalStyle.spacing}>
        </div>
        <div style={{ padding: '20px' }}>
          <Grid>
            <Grid.Column floated='right' width={1}>
              <Button circular icon color='green' size='big' onClick={() => this.props.changePhase(1)}
                disabled={this.state.buttonDisable}>
                <Icon name='angle double right' />
              </Button>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

var modalStyle = {
  spacing: {
    margin: '15px',
    width: "100%",
    display: "block"
  }
};

export default SignUpTwo;