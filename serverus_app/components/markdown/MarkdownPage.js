import React from 'react';
import ReactMarkdown from 'react-markdown';
import Markmirror from 'react-markmirror';
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
                theme="dark,material"
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
            postData: [],
            value: '# hello',
            title: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.sendToFB = this.sendToFB.bind(this);
        this.markdownFile = this.markdownFile.bind(this);

    }

    componentDidMount() {
        var that = this;
        var postUrlRef = firebase.database().ref('postURL');

        postUrlRef.on('value', function (snapshot) {
            Object.values(snapshot.val()).map(function (value) {
                axios.get(value).then(function (response) {
                    var data = [response.data];
                    that.setState(prevState => ({
                        postData: prevState.postData.concat(data)
                    }));
                });
            });
        });
    }

    markdownFile(value, idx) {
        return (
            <div key={idx} >
                <MarkdownCard value = {value}/>
            </div>
        );
    }

    sendToFB() {
        var that = this;
        var now = new Date().toDateString();
        var data = {
            title: this.state.title,
            date: now,
            text: this.state.value
        };
        var file = new Blob([JSON.stringify(data)], { type: 'application/json' });
        this.pathRef = this.storage.ref('markdown/' + data.title + '.json');        
        this.pathRef.put(file).then(function() {
            alert('Uploaded File');
            that.pathRef.getDownloadURL().then(function (url) {
                firebase.database().ref().child('/postURL').push(url);
            }).catch(function (error) {
                console.log(error);
            });
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
                {this.state.postData.map(this.markdownFile)}
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