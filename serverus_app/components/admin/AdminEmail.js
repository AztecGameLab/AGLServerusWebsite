import React from 'react';
import {
    TextArea,
    Input,
    Button,
    Container,
    Radio,
    Form
} from 'semantic-ui-react';
import {GetAllEmails } from '../AGL';
const https = require('https');

export default class AdminEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlTemplate: "",
            subject: "",
            mode: 'TEXT',
            recipients: []
        }

        this.captureRecipients = this.captureRecipients.bind(this);
        this.captureHTMLTemplate = this.captureHTMLTemplate.bind(this);
        this.captureSubject = this.captureSubject.bind(this);
        this.captureCheckedState = this.captureCheckedState.bind(this);
        this.postEmail = this.postEmail.bind(this);
    }

    captureRecipients(event) {
        let recipients = event.target.value;
        console.log(recipients);
        if (recipients === ':All') {
            let recipArray = GetAllEmails();
            this.setState({ recipients: recipArray });
        }
    }

    captureSubject(event) {
        this.setState({ subject: event.target.value });
    }

    captureHTMLTemplate(event) {
        console.log(event.target.files[0]);
        let file = event.target.files[0];
        let reader = new FileReader();
        let that = this;
        reader.onload = () => {
            that.setState({ htmlTemplate: reader.result });
        }
        this.setState({ mode: "HTML" });
        reader.readAsDataURL(file);
        //Uploaded file must now be set to state. 
    }

    captureCheckedState(event, data){
        console.log(event);
        console.log(data);
        if(!data.checked){
            this.setState({mode: 'HTML'});
        }else{
            this.setState({mode: 'TEXT'});
        }
    }

    postEmail() {
        let postBody = JSON.stringify({
            recipients: this.state.recipients,
            mode: this.state.mode,
            html: this.state.htmlTemplate,
            textMessage: this.state.textMessage
        });
        //TODO Config information here
        let request = http.request({
            hostname: '',
            method: 'POST',
            path: '/dispatchCustomEmail',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postBody)
            }
        });

        request.on('response', (response) => {
            console.log("Status Code: " + response.statusCode);
        })
    }

    render() {
        return (<div>
            <Container fluid>
                <h1>Email</h1>
                <Button color="green" floated="right" onClick={this.postEmail}>Send</Button>
                <Container>
                    <div><Input fluid label="To" /></div>
                    <div><Input fluid label="Subject" placeholder="Subject" onChange={this.captureSubject} /></div>
                </Container>
                <div>
                    <Radio label="UsingHTML" toggle onClick={this.captureCheckedState}/>
                    <input type="file" onChange={this.captureHTMLTemplate}></input>
                </div>
                <div>
                    <Form>
                        <TextArea style={{minHeight: "400px"}} />
                    </Form>
                </div>
            </Container>
        </div>);
    }
}