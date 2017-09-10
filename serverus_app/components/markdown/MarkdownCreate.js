import React from 'react';
import Markmirror from 'react-markmirror';
import { Dropdown, Icon } from 'semantic-ui-react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as accountActions from '../actions/accountActions';
import { bindActionCreators } from 'redux';
import stylesheet from './markdown.css';
import GenericCard from '../common/GenericCard';


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
            text: '# hello\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
            title: 'Blog Title...',
            date: new Date().toDateString(),
            tags: [{ text: '#extra', value: 'extra' }, { text: '#thicc', value: 'thicc' }],
            comments: [],
            selectedTags: [],
            type: {}
        };
        this.storage = firebase.storage();
        this.onInputChange = this.onInputChange.bind(this);
        this.sendToFB = this.sendToFB.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.buttonDisable = this.buttonDisable.bind(this);
    }

    componentWillMount() {
        switch (this.props.routeParams.type) {
            case 'announcement':
                this.setState({
                    type: { text: "Announcement", id: 'red'}
                });
            break;
            case 'game':
                this.setState({
                    type: { text: "Game", id: 'green'}
                });
            break;
            case 'tutorial':
                this.setState({
                    type: { text: "Tutorial", id: 'blue'}
                });
            break;
            default: break;
        }
    }


    handleAddition = (e, { value }) => {
        var counter = 0;
        this.state.tags.forEach(item => {
            if (item.value == value)
                return counter++;
        });
        if (counter < 1) {
            this.setState({
                tags: [{ text: '#' + value, value }, ...this.state.tags],
            })
        }
    }

    handleTags = (e, { value }) => this.setState({ selectedTags: value });

    buttonDisable = () => {
        if (this.state.title == "Blog Title..." || this.state.title == "") {
            return true;
        } else return false;
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
            tags: this.state.selectedTags,
            type: this.state.type
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
            text: md
        });
    }
    render() {
        var { currentValue } = this.state;
        var loggedIn = this.props.accounts[0] ? this.props.accounts[0].info.authLevel == 2 ? true : false : false
        return (
            <div style={{ backgroundColor: 'black' }}>
                {loggedIn ? <div>
                    <div className="row col-lg-12">
                        <div className="col-lg-6 col-sm-12"><h1 style={markdownStyle.title}>Create a new {this.props.routeParams.type}</h1>
                            <input style={markdownStyle.inputTitle} className="form-control" type="text" placeholder="Blog title..." onChange={event => this.setState({ title: event.target.value })} />
                            <div style={markdownStyle.md}>
                                <Editor onChange={this.onInputChange} value={this.state.text} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12"><h1 style={markdownStyle.title}>Preview post</h1></div>
                        <div className="col-lg-6 col-sm-12" style={markdownStyle.post}>
                            <GenericCard value={this.state} user={this.props.accounts[0]}/>
                        </div>
                    </div>
                    <div className="row col-lg-12">
                        <div style={markdownStyle.tags} className="col-lg-6">
                            <Dropdown
                                options={this.state.tags}
                                placeholder='Add a tag...'
                                additionLabel={<Icon name="hashtag" />}
                                search
                                selection
                                fluid
                                multiple
                                allowAdditions
                                value={this.state.selectedTags}
                                onAddItem={this.handleAddition}
                                onChange={this.handleTags}
                            />
                        </div>
                        <div style={markdownStyle.button} className="col-lg-6">
                            <button className="btn btn-success" disabled={this.buttonDisable()} onClick={this.sendToFB}>Create Post!</button>
                        </div>
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
    inputTitle: {
        padding: '20px 15px',
        fontSize: '1em'
    },
    md: {
        display: 'inline-block',
        width: '100%'
    },
    post: {
        marginTop: 15,
        color: 'black',
    },
    tags: {
        marginLeft: 0,
        marginTop: 15
    },
    button: {
        marginLeft: 0,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'flex-end'
    }
};
