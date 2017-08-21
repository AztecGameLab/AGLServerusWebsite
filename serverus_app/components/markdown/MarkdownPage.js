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
        this.loadMarkdownPosts = this.loadMarkdownPosts.bind(this);
    }

    componentDidMount() {
        var that = this;
        var postUrlRef = firebase.database().ref('postURL');

        postUrlRef.on('value', function (snapshot) {
            that.setState({
                postData: []
            });
            Object.keys(snapshot.val()).map(function (key, index) {
                that.setState(prevState => ({
                    postData: prevState.postData.concat({
                        hashKey: key
                    })
                }));
            });
            Object.values(snapshot.val()).map(function (value, idx) {
                axios.get(value).then(function (response) {
                    var tempState = that.state.postData.slice();
                    tempState[idx] = {
                        hashKey: tempState[idx]["hashKey"],
                        data: response.data
                    };
                    that.setState({
                        postData: tempState
                    });
                });
            });

        });
    }

    /**
     * Loads an individual blog posts
     * @param value
     * @returns {XML}
     */
    loadMarkdownPosts(value) {
        if(value.data) {
            return (
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4" key={value.hashKey} >
                    <MarkdownCard value = {value.data}/>
                </div>
            );
        }
    }

    /**
     * Send JSON to firebase storage and store url in database
     */
    sendToFB() {
        var that = this;
        var now = new Date();
        now = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
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
                <h1>Previous Blog Posts</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={markdownStyle.slick}>
                            {this.state.postData.map(this.loadMarkdownPosts)}
                        </div>
                    </div>
                </div>
                <div className="row col-lg-12">
                    <div className="col-lg-6">
                        <h3 style={markdownStyle.title} >New Game Post</h3>
                        <input type="text" placeholder="Enter a title..." onChange={event => this.setState({ title: event.target.value })} />
                    </div>
                    <div className="col-lg-6"><h3 style={markdownStyle.title}>Actual Text Results</h3></div>
                </div>
                <div className="row col-lg-12">
                    <div className="col-lg-6 col-sm-6" style={markdownStyle.md}><Editor onChange={this.onInputChange} value={this.state.value} /></div>
                    <div className="col-lg-6 col-sm-6" style={markdownStyle.post} ><ReactMarkdown source={this.state.value} />
                    </div>
                </div>
                <div className="row col-lg-12 col-lg-offset-0">
                    <button className="btn btn-success" onClick={this.sendToFB}>Submit</button>
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
        marginTop: '20px'
    },
    md: {
        display: 'inline-block'
    },
    slick: {
        backgroundColor: 'gray'
    },
    post: {
        backgroundColor: 'white',
        color: 'black',
        height: '122px',
    }
};