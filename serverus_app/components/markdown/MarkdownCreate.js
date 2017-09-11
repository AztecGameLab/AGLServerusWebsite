import React from 'react';
import ReactMarkdown from 'react-markdown';
import Markmirror from 'react-markmirror';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as accountActions from '../actions/accountActions';
import { bindActionCreators } from 'redux';
import stylesheet from './markdown.css';

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

class MarkdownCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            admin: false,
            value: '# hello\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
            title: '',
            tags: [],
            comments: [],
        };
        this.storage = firebase.storage();
        this.onInputChange = this.onInputChange.bind(this);
        this.sendToFB = this.sendToFB.bind(this);
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
            author: this.props.accounts[0].info.username,
            date: now,
            text: this.state.value,
            tags: [],
        };
        var file = new Blob([JSON.stringify(data)], { type: 'application/json' });
        this.pathRef = this.storage.ref('userData/' + this.props.accounts[0].uid + '/articles/' + data.title + '.json');
        this.pathRef.put(file).then(function () {
            alert('Uploaded File');
            var that2 = that;
            that.pathRef.getDownloadURL().then(function (url) {
                firebase.database().ref('/allArticles').push(url);
                firebase.database().ref('/articles/' + that2.props.accounts[0].uid).push(url);
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
        var loggedIn = this.props.accounts[0] ? this.props.accounts[0].info.authLevel == 2 ? true : false : false
        return (
            <div style={{ backgroundColor: 'black' }}>
                {loggedIn ? <div>
                    <div className="row col-lg-12">
                        <div className="col-lg-6">
                            <h3 style={markdownStyle.title}>New Game Post</h3>
                            <input className="form-control" type="text" placeholder="Enter a title..." onChange={event => this.setState({ title: event.target.value })} />
                        </div>
                        <div className="col-lg-6"><h3 style={markdownStyle.title}>Actual Text Results</h3></div>
                    </div>
                    <div className="row col-lg-12">
                        <div className="col-lg-6 col-sm-6" style={markdownStyle.md}>
                            <Editor onChange={this.onInputChange} value={this.state.value} />
                        </div>
                        <div className="col-lg-6 col-sm-6" style={markdownStyle.post}>
                            <ReactMarkdown source={this.state.value} />
                        </div>
                    </div>
                    <div className="row col-lg-12 col-lg-offset-0">
                        <button className="btn btn-success" onClick={this.sendToFB}>Submit</button>
                    </div>
                </div> : <div>You need admin privileges in order to create posts</div>}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
        //this means i would like to access by this.props.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
    };
}

export default connect(mapStateToProps, null)(MarkdownCreate)

var markdownStyle = {
    title: {
        width: '100%',
        marginTop: '20px'
    },
    md: {
        display: 'inline-block'
    },
    post: {
        paddingTop: 60,
        backgroundColor: 'white',
        color: 'black',
        height: 460
    }
};
