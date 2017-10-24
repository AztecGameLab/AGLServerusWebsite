import React, { Component } from 'react';
import { SendMessageTest } from '../AGL';
class MessageTest extends Component {

    sendMessage() {
        SendMessageTest("THIS IS A TEST");
    }
    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <button onClick={this.sendMessage}>Click me</button>
            </div>
        );
    }
}

export default MessageTest;