import React, { Component } from 'react';
import GridColumn, { Button, Checkbox, Divider, Form, Grid, Input, Modal, Segment } from 'semantic-ui-react';
import styles from './LoginModal.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Modal.Content>
                Facebook Login!
                Google Login!
                <Divider horizontal>or</Divider>
                <Form className="loginForm">
                    <Input className="formContents" placeholder="Email Address" icon="user" /><br /><br />
                    <Input className="formContents" type="password" placeholder="Password" icon="lock" /><br /><br />
                    <Grid columns={2}>
                        <Grid.Column textAlign="left">
                            <Checkbox label="Remember me" />
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            <i>Show password</i>
                        </Grid.Column>
                    </Grid><br />
                    <Button className="formContents">Log in</Button><br /><br />
                    <i>Forgot password?</i>
                </Form>
                <Divider horizontal>Become an Aztec Game Lab Developer!</Divider><br />
                <i>Sign up!</i>
            </Modal.Content>
        );
    }
}

export default Login;