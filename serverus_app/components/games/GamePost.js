import React from 'react';
import stylesheet from '../../styles/markdown.css';
import { Button, Checkbox, Dropdown, Form, Grid, Icon, Input, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CloudinaryUpload, CloudinaryDelete, IsLoggedIn, SubmitGame, GetGamePost, SaveGame } from '../AGL';
import PreviewGame from './PreviewGame';
import genreOptions from '../common/options/genreOptions.json';
import styles from '../../styles/game/game.css';

const platforms = [{ key: "WIN", text: "Windows", value: "Windows", icon: { className: "custom-icon-windows" } }, { key: "MAC", text: "Mac", value: "Mac", icon: { className: "custom-icon-mac" } },
{ key: "AND", text: "Android", value: "Android", icon: { className: "custom-icon-android" } }, { key: "IOS", text: "iOS", value: "iOS", icon: { className: "custom-icon-ios" } }];
class GamePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gamePostData: {
                title: "",
                teamName: "",
                date: new Date().toDateString(),
                sourceCode: "",
                selectedTags: [],
                selectedGenres: [],
                selectedPlatforms: [],
                type: {},
                showcase: {
                    public_id: null,
                    url: null,
                    allowZoomOut: true,
                    width: 600,
                    height: 350,
                    scale: 1
                },
                screenshots: {
                    public_id: [],
                    url: []
                },
            },
            tags: [{ text: '#extra', value: 'extra' }, { text: '#thicc', value: 'thicc' }],
            genres: genreOptions.genre,
            uploaded: false,
            savedPost: false,
            cloudUpload: false,
            changeShowcase: false,
            changeScreenshot: false,
            open: false
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onTeamChange = this.onTeamChange.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handleGenre = this.handleGenre.bind(this);
        this.handleScale = this.handleScale.bind(this);
        this.handleAllowZoomOut = this.handleAllowZoomOut.bind(this);
        this.buttonDisable = this.buttonDisable.bind(this);
        this.savePost = this.savePost.bind(this);
        this.sendToFB = this.sendToFB.bind(this);
        this.sendToCloudinary = this.sendToCloudinary.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleShowcase = this.handleShowcase.bind(this);
        this.handleScreenshots = this.handleScreenshots.bind(this);
    }

    async componentWillMount() {
        await this.initGame();
        var currentState = this.state.gamePostData;
        currentState.type = { text: "Game", id: 'green' };
        this.setState({
            gamePostData: currentState
        });
    }

    initGame() {
        if (this.props.location.search.length > 0) {
            var search = [];
            let query = this.props.location.search.replace("?=", "/").replace("&=", "/").split("/");
            search.push(query[1]);
            search.push(query[2]);
            var game;
            if (search[1] == "edit") {
                return GetGamePost("all", search[0]).then(game => {
                    let currentState = this.state.gamePostData;
                    let cloudUpload = false;
                    if (!game.showcase) game.showcase = {};
                    game.showcase.allowZoomOut = currentState.showcase.allowZoomOut;
                    game.showcase.width = currentState.showcase.width;
                    game.showcase.height = currentState.showcase.height;
                    if (game.showcase.public_id && game.showcase.url) {
                        cloudUpload = true;
                    }
                    this.setState({
                        gamePostData: game,
                        editPost: true,
                        cloudUpload: cloudUpload,
                        query: search
                    });
                    if (game.selectedTags) {
                        game.selectedTags.map(tag => {
                            this.handleAddition(null, {}, tag);
                        });
                    }
                }).catch(error => {
                    console.error(error.response.data);
                    return error;
                });
            }
            // edit draft post
            else if (search[1] == "draft") {
                return GetGamePost("saved", search[0]).then(game => {
                    let currentState = this.state.gamePostData;
                    let cloudUpload = false;
                    game.showcase.allowZoomOut = currentState.showcase.allowZoomOut;
                    game.showcase.width = currentState.showcase.width;
                    game.showcase.height = currentState.showcase.height;
                    if (game.showcase.public_id && game.showcase.url) {
                        cloudUpload = true;
                    }
                    this.setState({
                        gamePostData: game,
                        savedPost: true,
                        cloudUpload: cloudUpload,
                        query: search
                    });
                    if (game.selectedTags) {
                        game.selectedTags.map(tag => {
                            this.handleAddition(null, {}, tag);
                        });
                    }
                }).catch(error => {
                    console.error(error.response.data);
                    return error;
                });
            }
        }
    }


    handleTags = (e, { value }) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.selectedTags = value;
        this.setState({ gamePostData: currentState });
    }

    handleGenre = (e, { value }) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.selectedGenres = value;
        this.setState({ gamePostData: currentState });
    }

    handleShowcase = e => {
        const currentState = Object.assign({}, this.state.gamePostData);
        let { changeShowcase } = this.state;
        if (currentState.showcase.public_id) {
            changeShowcase = true;
        }
        currentState.showcase.url = e.target.files[0];
        this.setState({
            gamePostData: currentState,
            changeScreenshot: changeShowcase
        });
    }

    handleScreenshots = e => {
        const currentState = Object.assign({}, this.state.gamePostData);
        let { changeScreenshot } = this.state;
        if (currentState.screenshots.public_id) {
            changeScreenshot= true;
        }
        currentState.screenshots.url = e.target.files;
        this.setState({
            gamePostData: currentState,
            changeScreenshot: changeScreenshot
        });
    }

    closeModal() {
        this.setState({
            open: false
        });
    }

    openModal() {
        this.setState({
            open: true
        });
    }

    handleScale = e => {
        const scale = parseFloat(e.target.value)
        const currentState = Object.assign({}, this.state.gamePostData);
        currentState.showcase.scale = scale;
        this.setState({ gamePostData: currentState });
    }

    handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
        const currentState = Object.assign({}, this.state.gamePostData);
        currentState.showcase.allowZoomOut = allowZoomOut;
        this.setState({ gamePostData: currentState });
    }

    buttonDisable = () => {
        if (this.state.gamePostData.title == "") {
            return true;
        } else return false;
    }

    onTitleChange(e) {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.title = e.target.value;
        this.setState({
            gamePostData: currentState
        });
    }

    onTeamChange(e) {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.teamName = e.target.value;
        this.setState({
            gamePostData: currentState
        });
    }

    onSourceCodeChange (e) {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.sourceCode = e.target.value;
        this.setState({
            gamePostData: currentState
        });
    }

    async savePost() {
        var that = this;
        var now = new Date();
        now = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        let cloudinaryImage = await this.sendToCloudinary();
        var data = {
            title: this.state.gamePostData.title,
            author: this.props.accounts[0].username,
            date: now,
            text: this.state.gamePostData.text,
            selectedTags: this.state.gamePostData.selectedTags,
            type: this.state.gamePostData.type,
        };
        if (cloudinaryImage.public_id && cloudinaryImage.url) {
            data.showcase = {
                public_id: cloudinaryImage.public_id,
                url: cloudinaryImage.url,
                scale: this.state.gamePostData.showcase.scale
            };
        }
        let id;
        if (this.state.query) {
            id = this.state.query[0];
        }

        let response = await SavePost(data, this.props.match.params.type, this.state.savedPost, id);
        console.log(response);
        // window.location.reload('/create/announcement');
    }

    async sendToFB() {
        var that = this;
        var now = new Date();
        now = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        //public_id of image
        let cloudinaryImage = await this.sendToCloudinary("publish");
        var data = {
            title: this.state.gamePostData.title,
            author: this.props.accounts[0].username,
            date: now,
            text: this.state.gamePostData.text,
            selectedTags: this.state.gamePostData.selectedTags,
            type: this.state.gamePostData.type
        };
        if (cloudinaryImage.public_id && cloudinaryImage.url) {
            data.showcase = {
                public_id: cloudinaryImage.public_id,
                url: cloudinaryImage.url,
                scale: this.state.gamePostData.showcase.scale
            };
        }
        if (this.state.query) {
            if (this.state.editPost) {
                let response = await SubmitPost(data, this.props.match.params.type, this.state.query[0], true);
                console.log(response);
            } else if (this.state.savedPost) {
                let response = await SubmitPost(data, this.props.match.params.type, this.state.query[0]);
                console.log(response);
            } else console.error("Incorrect URL parameters.");
        } else {
            let response = await SubmitPost(data, this.props.match.params.type);
            console.log(response);
        }
        // window.location.reload();
    }

//Fix changeShowcase screenshot logic for upload/delete multiple
    sendToCloudinary(type) {
        if (this.state.gamePostData.showcase.url) {
            if (typeof this.state.gamePostData.showcase.url == "object") {
                return CloudinaryUpload(this.state.gamePostData.showcase.url).then(response => {
                    if (this.state.changeImage) {
                        CloudinaryDelete(this.state.gamePostData.showcase.public_id).then(resp => {
                            console.log(resp);
                        }).catch(err => {
                            console.error(err);
                        });
                    }
                    return response;
                }).catch(error => {
                    console.error(error);
                });
            } else {
                return this.state.gamePostData.showcase;
            }
        } else {
            return this.state.gamePostData.showcase;
        }
    }

    render() {
        var loggedIn = IsLoggedIn(this.props.accounts);
        var isAdmin = this.props.access;
        if (loggedIn && isAdmin) {
            return (
                <div className="container-fluid">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="row col-lg-4 col-lg-offset-4">
                        <Form>
                            <h2>Create a Game!</h2>
                            <Form.Field className="game">
                                <label>Title</label>
                                <Input onChange={this.onTitleChange} placeholder="Add a game title!"/>
                            </Form.Field>
                            <Form.Field className="game">
                                <Checkbox label="One man squad" />
                                {!this.state.lmao ? <div><label style={gameForm.label}>Team Name</label> <Input onChange={this.onTeamChange} placeholder="Add a team!" /></div> : null}
                            </Form.Field>
                            <Form.Field className="game">
                                <label>Tags</label>
                                <Dropdown
                                    options={this.state.tags}
                                    placeholder='Add a tag!'
                                    search
                                    selection
                                    fluid
                                    multiple
                                    allowAdditions
                                    defaultValue={this.state.gamePostData.selectedTags}
                                    onAddItem={this.state.handleAddition}
                                    onChange={this.state.handleTags} />
                            </Form.Field>
                            <Form.Field className="game">
                                <label>Genre</label>
                                <Dropdown placeholder='Add a genre!' fluid multiple selection
                                    defaultValue={this.state.gamePostData.selectedGenres}
                                    onChange={this.state.handleGenre}
                                    options={genreOptions.genre} />
                            </Form.Field>
                            <Form.Field className="game">
                                <label>Platforms</label>
                                <Dropdown placeholder='Add compatible platforms!' fluid multiple selection
                                    defaultValue={this.state.gamePostData.selectedPlatforms}
                                    onChange={this.state.handlePlatforms}
                                    options={platforms} />
                            </Form.Field>
                            <Form.Field className="game">
                                <label>Showcase Image</label>
                                <Input type='file' accept=".jpg, .jpeg, .png" onChange={this.handleShowcase} />
                            </Form.Field>
                            <Form.Field className="game">
                                <label>Screenshots</label>
                                <Input type='file' multiple accept=".jpg, .jpeg, .png" onChange={this.handleScreenshots} />
                            </Form.Field>
                            <Form.Field className="game">
                                <label>Source Code</label>
                                <Input onChange={this.onSourceCodeChange} placeholder="Add source code!"/>
                            </Form.Field>
                            <Form.Field className="game">
                                <Checkbox label="I agree to AGL game submission terms and conditions" />
                            </Form.Field>
                            <Form.Field>
                                <Button onClick={this.openModal} >Preview Game!</Button>
                                <Button>Submit Game!</Button>
                            </Form.Field>
                        </Form>
                    </div>
                    <Modal size="fullscreen" basic closeIcon open={this.state.open} onClose={this.closeModal} >
                        <PreviewGame postData={this.state.gamePostData} />
                    </Modal>
                </div>
            );
        } else return null;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts,
        access: state.access
    };
}

export default connect(mapStateToProps, null)(GamePost);

const gameForm = {
    label: {
        fontSize: '1.5em'
    }
}