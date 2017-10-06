import React from 'react';
import Markmirror from 'react-markmirror';
import { Dropdown, Icon } from 'semantic-ui-react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import stylesheet from '../../styles/markdown.css';
import GenericCard from '../common/cards/GenericCard';
import { CreatePost, GetArticle, SavePost } from '../AGL';

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
            savedPost: false,
            postData: {
                text: '# hello\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
                title: "",
                date: new Date().toDateString(),
                comments: [],
                selectedTags: [],
                type: {},
                image: {
                    src: null,
                    allowZoomOut: true,
                    width: 600,
                    height: 350,
                    scale: 1
                }
            },
            tags: [{ text: '#extra', value: 'extra' }, { text: '#thicc', value: 'thicc' }],
        };
        this.storage = firebase.storage();
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.savePost = this.savePost.bind(this);
        this.sendToFB = this.sendToFB.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handleNewImage = this.handleNewImage.bind(this);
        this.handleScale = this.handleScale.bind(this);
        this.handleAllowZoomOut = this.handleAllowZoomOut.bind(this);
        this.buttonDisable = this.buttonDisable.bind(this);
    }

    componentWillMount() {
        if (this.props.location.query['']) {
            if (Array.isArray(this.props.location.query[''])) {
                //Edit published post
                var article;
                if (this.props.location.query[''][1] == "edit") {
                    GetArticle("all", this.props.location.query[''][0]).then(article => {

                        this.setState({
                            postData: article,
                            editPost: true
                        });
                        var currentState = this.state.postData;
                        currentState.selectedTags.map(tag => {
                            this.handleAddition(null, {}, tag);
                        });
                    }).catch(error => {
                        console.error(error.response.data);
                        return error;
                    });
                }
                //edit draft post
                else {
                    GetArticle("saved", this.props.location.query[''][0]).then(article => {
                        this.setState({
                            postData: article,
                            savedPost: true
                        });
                        var currentState = this.state.postData;
                        currentState.selectedTags.map(tag => {
                            this.handleAddition(null, {}, tag);
                        });
                    }).catch(error => {
                        console.error(error.response.data);
                        return error;
                    });
                }
            }
        }
        var currentState = this.state.postData;
        switch (this.props.routeParams.type) {
            case 'announcement':
                currentState.type = { text: "Announcement", id: 'red' };
                this.setState({
                    postData: currentState
                });
                break;
            case 'game':
                currentState.type = { text: "Game", id: 'green' };
                this.setState({
                    postData: currentState
                });
                break;
            case 'tutorial':
                currentState.type = { text: "Tutorial", id: 'blue' };
                this.setState({
                    postData: currentState
                });
                break;
            default: break;
        }
    }

    handleAddition = (e, { value }, init) => {
        var counter = 0;
        this.state.tags.forEach(item => {
            if (item.value == value)
                return counter++;
        });
        if (init) {
            this.setState({
                tags: [{ text: '#' + init, value: init }, ...this.state.tags]
            });
        } else {
            if (counter < 1) {
                this.setState({
                    tags: [{ text: '#' + value, value }, ...this.state.tags]
                });
            }
        }
    }

    handleTags = (e, { value }) => {
        let currentState = Object.assign({}, this.state.postData);
        currentState.selectedTags = value;
        this.setState({ postData: currentState });
    }


    handleNewImage = e => {
        const currentState = Object.assign({}, this.state.postData);
        currentState.image.src = e.target.files[0];
        this.setState({
            postData: currentState
        });
    }
    handleScale = e => {
        const scale = parseFloat(e.target.value)
        const currentState = Object.assign({}, this.state.postData);
        currentState.image.scale = scale;
        this.setState({ postData: currentState });
    }

    handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
        const currentState = Object.assign({}, this.state.postData);
        currentState.image.allowZoomOut = allowZoomOut;
        this.setState({ postData: currentState });
    }


    buttonDisable = () => {
        if (this.state.postData.title == "") {
            return true;
        } else return false;
    }

    async savePost() {
        var that = this;
        var now = new Date();
        now = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        var data = {
            title: this.state.postData.title,
            author: this.props.accounts[0].username,
            date: now,
            text: this.state.postData.text,
            selectedTags: this.state.postData.selectedTags,
            type: this.state.postData.type
        };
        let response = await SavePost(data, this.props.routeParams.type, this.state.savedPost, this.props.location.query['']);
        console.log(response);
    }

    /**
     * Send JSON to firebase storage and store url in database
     */
    async sendToFB() {
        var that = this;
        var now = new Date();
        now = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        var data = {
            title: this.state.postData.title,
            author: this.props.accounts[0].username,
            date: now,
            text: this.state.postData.text,
            selectedTags: this.state.postData.selectedTags,
            type: this.state.postData.type
        };
        if (this.props.location.query['']) {
            if (Array.isArray(this.props.location.query[''])) {
                if (this.props.location.query[''][1] == "edit") {
                    let response = await CreatePost(data, this.props.routeParams.type, this.props.location.query[''][0], true);
                    console.log(response);
                } else console.log("Incorrect URL parameters.");
            } else {
                let response = await CreatePost(data, this.props.routeParams.type, this.props.location.query['']);
            }
        } else {
            let response = await CreatePost(data, this.props.routeParams.type);
            console.log(response);
            debugger;
        }

        // var file = new Blob([JSON.stringify(data)], { type: 'application/json' });
        // this.pathRef = this.storage.ref('userData/' + this.props.accounts[0].uid + '/articles/' + data.title + '.json');
        // this.pathRef.put(file).then(function () {
        //     alert('Uploaded File');
        //     var that2 = that;
        //     that.pathRef.getDownloadURL().then(function (url) {
        //         firebase.database().ref('/allArticles').push(url);
        //         firebase.database().ref('/articles/' + that2.props.accounts[0].uid).push(url);
        //     }).catch(function (error) {
        //         console.log(error);
        //     });
        // });
    }

    onTitleChange(event) {
        let currentState = Object.assign({}, this.state.postData);
        currentState.title = event.target.value;
        this.setState({
            postData: currentState
        });
    }

    onInputChange(md) {
        let currentState = Object.assign({}, this.state.postData);
        currentState.text = md;
        this.setState({
            postData: currentState
        });
    }
    render() {
        var loggedIn = this.props.accounts[0] ? this.props.accounts[0] ? true : false : false;
        return (
            <div style={{ backgroundColor: 'black' }}>
                {loggedIn ? <div>
                    <div className="row col-lg-12">
                        <div className="col-lg-6 col-sm-12"><h1 style={markdownStyle.title}>Create a new {this.props.routeParams.type}</h1>
                            <input style={markdownStyle.inputTitle} className="form-control" type="text" placeholder="Title..." value={this.state.postData.title} onChange={this.onTitleChange} />
                            <div style={markdownStyle.md}>
                                <Editor onChange={this.onInputChange} value={this.state.postData.text} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12"><h1 style={markdownStyle.title}>Preview post</h1></div>
                        <div className="col-lg-6 col-sm-12" style={markdownStyle.post}>
                            <GenericCard value={this.state.postData} user={this.props.accounts[0].username} edit={true} />
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
                                defaultValue={this.state.postData.selectedTags}
                                onAddItem={this.handleAddition}
                                onChange={this.handleTags}
                            />
                        </div>
                        {this.state.postData.type.text == 'Game' ?
                            <div style={{ color: 'white', marginTop: 5 }} className="col-lg-6" >
                                <input name='newImage' type='file' onChange={this.handleNewImage} />
                                <br />
                                {'Scaling Mode: '}
                                <input
                                    style={{ color: 'black' }}
                                    name='allowZoomOut'
                                    type='checkbox'
                                    onChange={this.handleAllowZoomOut}
                                    checked={this.state.postData.image.allowZoomOut}
                                />
                                <br />
                                <br />
                                Zoom:
                                    <input
                                    name='scale'
                                    type='range'
                                    onChange={this.handleScale}
                                    min={this.state.postData.image.allowZoomOut ? '0.1' : '1'}
                                    max='2'
                                    step='0.01'
                                    defaultValue='1'
                                />
                            </div> : null}

                        <div style={markdownStyle.button} className="col-lg-6">
                            {this.savedPost ? <button className="btn btn-info" disabled={this.buttonDisable()} onClick={this.savePost}>Save Draft!</button> : null}
                            <button className="btn btn-success" disabled={this.buttonDisable()} onClick={this.sendToFB}>Publish Post!</button>
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
