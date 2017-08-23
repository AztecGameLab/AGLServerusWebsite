import React from 'react';
import ReactMarkdown from 'react-markdown';
import Markmirror from 'react-markmirror';
import firebase from 'firebase';
import stylesheet from  './markdown.css';


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



export default class MarkdownCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '# hello\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
            title: ''
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
            <div style={{backgroundColor: 'black'}}>
                <div className="row col-lg-12">
                    <div className="col-lg-6">
                        <h3 style={markdownStyle.title}>New Game Post</h3>
                        <input className="form-control" type="text" placeholder="Enter a title..." onChange={event => this.setState({title: event.target.value})}/>
                    </div>
                    <div className="col-lg-6"><h3 style={markdownStyle.title}>Actual Text Results</h3></div>
                </div>
                <div className="row col-lg-12">
                    <div className="col-lg-6 col-sm-6" style={markdownStyle.md}>
                        <Editor onChange={this.onInputChange} value={this.state.value}/>
                    </div>
                    <div className="col-lg-6 col-sm-6" style={markdownStyle.post}>
                        <ReactMarkdown source={this.state.value}/>
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
