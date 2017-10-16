import React from 'react';
import stylesheet from '../../styles/markdown.css';
import { Button, Checkbox, Dropdown, Form, Grid, Icon, Input, Label, Modal, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CloudinaryUpload, CloudinaryDelete, GetGamePost, IsLoggedIn, LoadUsernames, SubmitGame, SaveGame } from '../AGL';
import GamePage from './GamePage';
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
                authors: [],
                teamName: "",
                date: new Date().toDateString(),
                description: "",
                downloadLinks: [],
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
                    height: 400,
                    scale: 0.5
                },
                screenshots: {
                    public_id: [],
                    url: []
                },
                rating: 0
            },
            contributors: [],
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
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.handleTagAddition = this.handleTagAddition.bind(this);
        this.handleDownloadLinks = this.handleDownloadLinks.bind(this);
        this.createDownloadLinks = this.createDownloadLinks.bind(this);
        this.handleAuthors = this.handleAuthors.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handlePlatforms = this.handlePlatforms.bind(this);
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
        let contributors = await LoadUsernames();
        var currentState = this.state.gamePostData;
        currentState.type = { text: "Game", id: 'green' };
        this.setState({
            gamePostData: currentState,
            contributors: contributors
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
                            this.handleTagAddition(null, {}, tag);
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

    handleTagAddition = (e, { value }, init) => {
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
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.selectedTags = value;
        this.setState({ gamePostData: currentState });
    }

    handleAuthors = (e, { value }) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.authors = value;
        this.setState({ gamePostData: currentState });
    }

    handlePlatforms = (e, { value }) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.selectedPlatforms = value;
        this.setState({ gamePostData: currentState });
    }

    createDownloadLinks(value, key) {
        return (
            <div key={key} style={{ marginBottom: 15 }} >
                <label style={{ fontSize: '1.5em' }}> Download link for {value} platform</label>
                <Input onChange={() => { this.handleDownloadLinks(value, key) }} placeholder={"Add a download link!"} />
            </div>
        );
    }

    handleDownloadLinks = (value, i) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.downloadLinks[i] = value;
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
            changeScreenshot = true;
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

    onDescriptionChange(e) {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.description = e.target.value;
        this.setState({
            gamePostData: currentState
        });
    }

    onSourceCodeChange(e) {
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
            authors: this.state.gamePostData.authors,
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
            authors: this.state.gamePostData.authors,
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
                            <h1 style={{ fontSize: '3em', textAlign: 'center', marginBottom: 15 }}>Create a Game!</h1>
                            <Form.Field className="game">
                                <label>Title</label>
                                <Input onChange={this.onTitleChange} placeholder="Add a game title!" />
                            </Form.Field>
                            <Form.Field className="game">
                                <label style={gameForm.label}>Team Name</label> <Input onChange={this.onTeamChange} placeholder="Add a team!" />
                            </Form.Field>
                            <Form.Field className="game">
                                <label>Contributors</label>
                                {this.state.gamePostData.authors.length > 5 && <Label basic color='red' pointing='below'>Teams cannot consist more than 5 members!</Label>}
                                <Dropdown
                                    options={this.state.contributors}
                                    placeholder='Add a your team members '
                                    scrolling
                                    search
                                    selection
                                    fluid
                                    multiple
                                    error={this.state.gamePostData.authors.length > 5}
                                    defaultValue={this.state.gamePostData.authors}
                                    onChange={this.handleAuthors} />
                            </Form.Field>
                            <Form.Field className="game">
                                <label>Game Description</label>
                                <TextArea onChange={this.onDescriptionChange} placeholder="Tell us about your game!" />
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
                                    onAddItem={this.handleTagAddition}
                                    onChange={this.handleTags} />
                            </Form.Field>
                            <Form.Field className="game">
                                <label>Genre</label>
                                <Dropdown placeholder='Add a genre!' fluid multiple selection
                                    defaultValue={this.state.gamePostData.selectedGenres}
                                    onChange={this.handleGenre}
                                    options={genreOptions.genre} />
                            </Form.Field>
                            <Form.Field className="game">
                                <label>Platforms</label>
                                <Dropdown placeholder='Add compatible platforms!' fluid multiple selection
                                    defaultValue={this.state.gamePostData.selectedPlatforms}
                                    onChange={this.handlePlatforms}
                                    options={platforms} />
                            </Form.Field>
                            <Form.Field>
                                {this.state.gamePostData.selectedPlatforms.map(this.createDownloadLinks)}
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
                                <Input onChange={this.onSourceCodeChange} placeholder="Add source code!" />
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
                    <Modal className="gameModal" size="fullscreen" basic closeIcon open={this.state.open} onClose={this.closeModal}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <GamePage gamePostData={this.state.gamePostData} {...this.props} edit={true} />
                        <div className="col-lg-4" style={gameForm.editShowcase}>
                            {'Scaling Mode: '}
                            <input
                                style={{ color: 'black' }}
                                name='allowZoomOut'
                                type='checkbox'
                                onChange={this.handleAllowZoomOut}
                                checked={this.state.gamePostData.showcase.allowZoomOut} />
                            <br /><br />
                            Zoom:
                            <input
                                name='scale'
                                type='range'
                                onChange={this.handleScale}
                                min={this.state.gamePostData.showcase.allowZoomOut ? '0.1' : '1'}
                                max='2'
                                step='0.01'
                                defaultValue={this.state.gamePostData.showcase.scale} />
                        </div>
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
    },
    editShowcase: {
        marginTop: 50,
        color: 'white',
        fontSize: '1.5em'
    }
}