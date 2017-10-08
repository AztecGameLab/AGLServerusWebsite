//Imports
import React from 'react';
import {Grid, Label, Button, Input, Header, Icon, Card, Message, Popup} from 'semantic-ui-react';
//AGL API
import { resetRequestExists, EmailTakenCheck, sendPasswordReset } from '../AGL';
var validator = require("email-validator");


class RequestReset extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            buttonDisable: true,
            error: '',
            loading: false,
            success: ''
        };
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.onSubmission = this.onSubmission.bind(this);
    }

    handleEmailInput(e) {
        this.setState({
            email: e.target.value
          });
        if(validator.validate(this.state.email)) {
            this.setState({
                buttonDisable: false
            });
        }
        else {
            this.setState({
                buttonDisable: true
            });
        }
      }

      async onSubmission() {
          this.setState({
              loading: true
          });
          let response = await EmailTakenCheck(this.state.email);
          
          if(response.emailTaken){
              
            let status= await sendPasswordReset(this.state.email);
                this.setState({
                    loading: false,
                    success: status
                });
                return;
          }
          else {
              this.setState({
                  loading: false,
                  error: "User not found."
              });
              return;
          }
      }

    render() {
        return(
            <div style={{ justifyContent: 'center', padding: '20px'}}>
            <br/>
            <br/>
            <br/>
                <Grid centered columns = {2}>
                    <Grid.Column width = {5}>
                        <Card centered raised fluid >
                            <Card.Content>
                            <Card.Header>
                            <iframe src="https://giphy.com/embed/13rOFFOZa82Os0" width="100%" height="auto" frameBorder="0" className="giphy-embed" ></iframe>
                                    <br/><br/>
                                    <div>Forgot your password?</div>
                            </Card.Header>
                            <hr/>
                            <Card.Description>
                            <Popup trigger = {
                                <Input fluid placeholder = 'Email address' iconPosition = 'left'>
                                <Icon name='mail outline' />
                                <input onChange={this.handleEmailInput}  />
                            </Input>
                            }
                            content = 'Case sensitive'/>
                            </Card.Description>
                                    <br/>
                            <Card.Meta>
                                No worries, we'll send you an email to change your password!
                            <br/>
                            </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                            <div>
                                <Button 
                                    color='green' fluid 
                                    size = 'massive' loading = {this.state.loading} 
                                    disabled = {this.state.buttonDisable || this.state.email.length < 1}
                                    onClick = {this.onSubmission}>
                                Request a password reset
                                <Icon name = "right arrow"/>
                                </Button>
                            </div>
                            {this.state.error.length > 0 && <Message negative>
                                <Message.Header>Sorry, request failed</Message.Header>
                                    <p>{this.state.error}</p>
                            </Message>}
                            {this.state.success.length > 0 && <Message positive>
                                <Message.Header>Success!</Message.Header>
                                <p>{this.state.success}</p>
                              </Message>}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}



export default RequestReset;