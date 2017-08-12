import React from 'react';
import ReactMarkdown from 'react-markdown';
import Markmirror from 'react-markmirror';
import Codemirror from 'codemirror';
import firebase from 'firebase';
import axios from 'axios';
import MarkdownCard from './MarkdownCard';

const Editor = (props) => {
    const handleType = text => {
        props.onChange(text);
    };

    //available themes: https://codemirror.net/demo/theme.html
    //<textarea rows="15" cols="40" onChange={onInputChange}

    return (
        <form>
            <Markmirror
                theme="dracula,dark" 
                value={props.value}
                onChange={handleType}
                />
        </form>
    );
};

export default class MarkdownPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.storage = firebase.storage();
        this.state = {
            data: [],
            value: '# hello',
            title: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.sendToFB = this.sendToFB.bind(this);
        this.markdownFile = this.markdownFile.bind(this);

    }

    componentDidMount() {
        var that = this;
        this.folderRef = this.storage.ref('markdown/');        
        this.folderRef.getDownloadURL().then(function (url) {
            axios.get(url).then(function (response) {
                var data = [response.data];
                that.setState({
                    data: data
                });
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    markdownFile(value, idx) {
        console.log(value);
        return (
            <div key={idx} >
                <MarkdownCard value = {value}/>
            </div>
        );
    }

    sendToFB() {

        var now = new Date().toDateString();
        var metadata = {
            contentType: 'application/json'
        };

        var data = {
            title: this.state.title,
            date: now,
            text: this.state.value
        };
        var file = new Blob([JSON.stringify(data)], { type: 'application/json' });
        this.pathRef = this.storage.ref('markdown/' + data.title + '.json');        
        this.pathRef.put(file, metadata).then(function (response) {
            alert('Uploaded File');
        });
    }

    onInputChange(md) {
        this.setState({
            value: md
        });
    }

    render() {
        return (
            <div>
                {this.state.data.map(this.markdownFile)}
                <div className="row col-lg-12">
                    <div className="col-lg-4">
                        <h3 style={markdownStyle.title} >New Game Post</h3>
                        <input type="text" placeholder="Enter a title..." onChange={event => this.setState({ title: event.target.value })} />
                    </div>
                </div>
                <div className="row col-lg-12">
                    <div className="col-lg-6" style={markdownStyle.md}><Editor onChange={this.onInputChange} value={this.state.value} /></div>
                    <div className="col-lg-6" style={markdownStyle.md}><ReactMarkdown source={this.state.value} />
                        <button onClick={this.sendToFB}>Send</button>
                    </div>
                </div>
            </div>

        );
    }
}

var markdownStyle = {
    editor: {
    },
    title: {
        width: '100%',
        marginTop: '25px'
    },
    md: {
        display: 'inline-block'
    }
}