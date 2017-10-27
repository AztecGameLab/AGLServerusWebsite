//Imports
import React from 'react';
import {Grid, Label, Button, Input, Header, Icon, Card, Message, Popup} from 'semantic-ui-react';

//AGL API
import { resetRequestExists, resetPassword } from '../AGL';


class PasswordReset extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            requestExists: false,
            securityCode: '',
            buttonDisable: true,
            loading: false,
            error: '',
            success: '',
            newPassword:''
        };
        this.handleCodeInput = this.handleCodeInput.bind(this);
        this.handlePassInput = this.handlePassInput.bind(this);
        this.onSubmission = this.onSubmission.bind(this);
        this.formComplete = this.formComplete.bind(this);
    }
    handleCodeInput(e) {
        var that = this;
        this.setState({
            securityCode: e.target.value
          }, function () {
            that.formComplete();
          });
          return;
    }
    formComplete () {
        if(this.state.newPassword.length > 0 && this.state.securityCode.length > 0) {
            this.setState({
                buttonDisable: false
            });
            return;
        }
        else {
            this.setState({
                buttonDisable: true
            });
            return;
        }
    }

    handlePassInput(e) {
        var that = this;
        this.setState({
            newPassword: e.target.value
          }, function () {
            that.formComplete();
          });
          return;
      }
    
    async componentWillMount() {
        //Check for validity
        
        let exists = await resetRequestExists (this.props.match.params.hash);
        
        if (exists){
            this.setState({
                requestExists: true
            });
        }
        else {
            this.setState({
                requestExists: false
            });
        }
    }

    async onSubmission() {
        this.setState({
            loading: true
        });
        
          let status= await resetPassword(this.state.securityCode, this.props.match.params.hash, this.state.newPassword);
          
          if (status == 'Your password has been reset! :)'){
              this.setState({
                  loading: false,
                  success: status,
                  error: ''
              });
              setTimeout(()=> {
                window.location.replace("https://aztecgamelab.com/");
              }, 5000);
              return;
            }
            else {
                this.setState({
                    loading: false,
                    error: status,
                    success: ''
                })
            }
    }

    render(){
        var exists = this.state.requestExists;
        let dom = exists ? 
            <div style={{ justifyContent: 'center', padding: '20px'}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
                <Grid centered columns = {2}>
                    <Grid.Column width = {5}>
                        <Card centered raised fluid >
                            <Card.Content>
                            <Card.Header>
                            <iframe src="https://giphy.com/embed/JHqLQZHBJdTcQ" width="100%" height="auto" frameBorder="0" className="giphy-embed"></iframe>
                            <br/><br/>
                                    <div>Confirm Security Code</div>
                            </Card.Header>
                            <hr/>
                            <Card.Description>
                            <Popup trigger = {
                                <div>
                                <h1>Security Code</h1>
                                <Input fluid placeholder = 'Security Code' iconPosition = 'left'>
                                    <Icon name='barcode' />
                                    <input onChange={this.handleCodeInput}  />
                                </Input>
                                </div>
                            }
                            content = 'Case sensitive'/>
                            </Card.Description>
                                    <br/>
                            <Card.Description>
                            <Popup trigger = {
                                <div>
                                <h1>New Password</h1>
                                    <Input fluid placeholder = 'New Password' iconPosition = 'left' type='password'>
                                        <Icon name='key' />
                                        <input onChange={this.handlePassInput}  />
                                    </Input>
                                </div>
                            }
                            content = 'Case sensitive'/>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <div>
                                <Button 
                                    color='green' fluid 
                                    size = 'massive' loading = {this.state.loading} 
                                    disabled = {this.state.buttonDisable || this.state.securityCode.length < 1}
                                    onClick = {this.onSubmission}>
                                Submit Code
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
            </div> : 
            <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Message
                error header='AGL Password Reset Security'
                list={[
                    'Try refreshing the page',
                    'Give the page a second!',
                    'Either this password reset has expired',
                    'Or you are not authorized to access this page.']}/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </div>;
            return (
                dom
            );
    }
}

export default PasswordReset;