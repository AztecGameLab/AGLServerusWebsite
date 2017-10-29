import React from 'react';
import stylesheet from '../../styles/markdown.css';
import { Button, Checkbox, Dropdown, Form, Grid, Icon, Input, Label, Message, Modal, Popup, Progress, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CloudinaryUpload, CloudinaryDelete, GetGamePost, IsLoggedIn, fetchTeamlessMembers, SubmitGame, SaveGame, getJammers } from '../AGL';
import GamePage from './GamePage';
import genreOptions from '../common/options/genreOptions.json';
import styles from '../../styles/game/game.css';

const platforms = [{
    key: "WIN",
    text: "Windows",
    value: "Windows",
    icon: { className: "custom-icon-windows" }
}, { key: "MAC", text: "Mac", value: "Mac", icon: { className: "custom-icon-mac" } },
{ key: "AND", text: "Android", value: "Android", icon: { className: "custom-icon-android" } }, {
    key: "IOS",
    text: "iOS",
    value: "iOS",
    icon: { className: "custom-icon-ios" }
},
{ key: "LIN", text: "Linux", value: "Linux", icon: { className: "custom-icon-linux" } }];

class GamePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gamePostData: {
                approved: "pending",
                title: "",
                authors: [],
                teamName: "",
                date: new Date().toDateString(),
                description: "",
                downloadLinks: {},
                dlCount: 0,
                sourceCode: "",
                selectedTags: [],
                selectedGenres: {},
                selectedPlatforms: [],
                type: {},
                showcase: {
                    public_id: null,
                    url: null,
                    allowZoomOut: true,
                    width: window.innerWidth,
                    height: 600,
                    scale: 0.6
                },
                screenshots: {
                    public_id: [],
                    url: []
                },
                rating: [
                    { type: 'Mechanics', total: 0, num: 0 },
                    { type: 'Aesthetics', total: 0, num: 0 },
                    { type: 'Innovation', total: 0, num: 0 },
                    { type: 'Theme', total: 0, num: 0 }
                ],
                comments: []
            },
            contributors: [],
            tags: [{ text: '#halloween', value: 'halloween' }, { text: '#gamejam', value: 'gamejam' }],
            genres: genreOptions.genre,
            uploaded: false,
            savedPost: false,
            cloudUpload: false,
            changeShowcase: false,
            changeScreenshot: false,
            showcaseProgressBar: false,
            showcaseSuccess: false,
            showcaseError: false,
            screenshotProgressBar: false,
            screenshotSuccess: false,
            screenshotError: false,
            terms: false,
            submitted: false,
            jammers: [],
            isJammer: false
        };
    }

    async componentWillMount() {
        await this.initGame();
        let contributors = await fetchTeamlessMembers();
        let jammers = await getJammers();
        var currentState = this.state.gamePostData;
        currentState.type = { text: "Game", id: 'green' };
        this.setState({
            gamePostData: currentState,
            contributors: contributors,
            jammers: Object.keys(jammers)
        });
        if (this.props.accounts.length > 0) {
            if (Object.keys(jammers).includes(this.props.accounts[0].username)) {
                this.setState({
                    isJammer: true
                });
            }

        }
    }

    componentDidMount() {
        var that = this;
        //Updates Showcase width when screen width resized
        window.addEventListener("resize", () => {
            var currentState = that.state.gamePostData;
            currentState.showcase.width = window.innerWidth;
            that.setState({
                gamePostData: currentState
            });
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.accounts[0] && this.props.accounts.length == 0) {
            // if (nextProps.accounts.length > 0) {

            var currentState = this.state.gamePostData;
            if (this.state.jammers.includes(nextProps.accounts[0].username)) {
                this.setState({
                    isJammer: true
                });
            }
            var data = {
                value: [nextProps.accounts[0].username]
            }
            this.handleAuthors(null, data);
            this.setState({
                gamePostData: currentState,
                defaultAuthor: [nextProps.accounts[0].username]
            });
        }
    }

    componentWillUnmount() {
        if (!this.state.submitted) {
            if (this.state.gamePostData.showcase.public_id) {
                CloudinaryDelete(this.state.gamePostData.showcase.public_id).then((response) => {
                    console.log(response);
                });
            }
            if (this.state.gamePostData.screenshots.length > 0) {
                this.state.gamePostData.screenshots.forEach(sc => {
                    CloudinaryDelete(sc.public_id);
                });
            }
        }
    }

    initGame = () => {
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
        let currentState = this.state.gamePostData;
        currentState.authors = value;
        this.setState({
            gamePostData: currentState,
            contributorLength: value.length
        });
    }

    handlePlatforms = (e, { value }) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.selectedPlatforms = value;
        this.setState({ gamePostData: currentState });
    }

    createDownloadLinks = (value, key) => {
        return (
            <div key={key} style={{ marginBottom: 15 }}>
                <h1 style={{ fontSize: '1.5em' }}> Download link for {value} platform</h1>
                <Input onChange={(e) => {
                    this.handleDownloadLinks(e, value, key)
                }} placeholder={"Add a download link!"} />
            </div>
        );
    }

    handleDownloadLinks = (e, value, i) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        if (!currentState.downloadLinks[value.toUpperCase()]) {
            let objPlatform = JSON.parse(JSON.stringify(platforms.filter(platform => {
                return platform.value.toUpperCase() == value.toUpperCase();
            })));
            objPlatform[0].value = e.target.value;
            currentState.downloadLinks[value.toUpperCase()] = objPlatform[0];
        } else {
            currentState.downloadLinks[value.toUpperCase()].value = e.target.value;
        }
        this.setState({ gamePostData: currentState });
    }


    handleGenre = (e, { value }) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        let objGenre = [];
        genreOptions.genre.map(genre => {
            value.map(gen => {
                if (gen == genre.value) {
                    objGenre.push(genre);
                }
            });
        });
        currentState.selectedGenres = objGenre;
        this.setState({ gamePostData: currentState });
    }

    handleShowcase = async (e) => {
        var that = this;
        e.persist();
        const currentState = Object.assign({}, this.state.gamePostData);
        let { changeShowcase } = this.state;
        if (currentState.showcase.public_id) {
            changeShowcase = true;
        }
        //User re-select image -> delete old image from cloudinary
        if (this.state.gamePostData.showcase.url && this.state.gamePostData.showcase.public_id) {
            CloudinaryDelete(this.state.gamePostData.showcase.public_id);
        }
        //Less then 5 Mb
        if (e.target.files[0].size < 5000000) {
            this.setState({
                showcaseProgressBar: true
            }, async () => {
                let showcaseImage = await CloudinaryUpload(e.target.files[0]);
                that.setState({
                    showcaseSuccess: true,
                    showcaseError: false,
                    showcaseProgressBar: false
                });
                if (showcaseImage) {
                    currentState.showcase.public_id = showcaseImage.public_id;
                    currentState.showcase.url = showcaseImage.url;
                    that.setState({
                        gamePostData: currentState
                    });
                } else {
                    that.setState({
                        showcaseSuccess: false,
                        showcaseError: true,
                        showcaseProgressBar: false
                    });
                }
            });
        } else {
            this.setState({
                showcaseSuccess: false,
                showcaseError: true,
                showcaseProgressBar: false,
            });
        }
    }

    handleScreenshots = e => {
        e.persist();
        var that = this;
        const currentState = Object.assign({}, this.state.gamePostData);
        let { changeScreenshot } = this.state;
        if (currentState.screenshots.public_id) {
            changeScreenshot = true;
        }
        //User re-select image -> delete old image from cloudinary
        if (this.state.gamePostData.screenshots[0]) {
            if (this.state.gamePostData.screenshots[0].url && this.state.gamePostData.screenshots[0].public_id) {
                this.state.gamePostData.screenshots.forEach(sc => {
                    CloudinaryDelete(sc.public_id);
                });
            }
        }
        Object.values(e.target.files).forEach(file => {
            if (file.size > 5000000) {
                this.setState({
                    screenshotError: true
                });
            }
        });
        if (!this.state.screenshotError) {
            currentState.screenshots = [];
            this.setState({
                screenshotProgressBar: true
            }, async () => {
                var promises = [];
                Object.values(e.target.files).forEach(file => {
                    promises.push(CloudinaryUpload(file));
                });
                let results = await Promise.all(promises);
                that.setState({
                    screenshotSuccess: true,
                    screenshotError: false,
                    screenshotProgressBar: false
                });
                if (results) {
                    results.forEach(sc => {
                        var screenshot = {
                            public_id: sc.public_id,
                            url: sc.url
                        };
                        currentState.screenshots.push(screenshot);
                    });
                    that.setState({
                        gamePostData: currentState
                    });
                } else {
                    that.setState({
                        screenshotSuccess: false,
                        screenshotError: true,
                        screenshotProgressBar: false
                    });
                }
            });
        }
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

    onTitleChange = (e) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.title = e.target.value;
        this.setState({
            gamePostData: currentState
        });
    }

    onTeamChange = (e) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.teamName = e.target.value;
        this.setState({
            gamePostData: currentState
        });
    }

    onDescriptionChange = (e) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.description = e.target.value;
        this.setState({
            gamePostData: currentState
        });
    }

    onSourceCodeChange = (e) => {
        let currentState = Object.assign({}, this.state.gamePostData);
        currentState.sourceCode = e.target.value;
        this.setState({
            gamePostData: currentState
        });
    }

    handleCheck = e => {
        let { terms } = this.state;
        this.setState({
            terms: !terms
        });
    }

    submitGame = async () => {
        var currentState = this.state.gamePostData;
        var now = new Date();
        now = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        currentState.date = now;
        var that = this;
        let response = await SubmitGame(currentState);
        console.log(response);
        this.setState({
            submitted: true
        });
        // window.location.reload();
    }


    render() {
        var loggedIn = IsLoggedIn(this.props.accounts);
        var isJammer = this.state.isJammer;
        var isAdmin = this.props.access;
        var disablePreview = !(this.state.showcaseSuccess && this.state.screenshotSuccess);

        var disableGame = (
            this.state.gamePostData.title == "" ||
            this.state.gamePostData.authors == [] ||
            this.state.contributorLength > 5 ||
            this.state.gamePostData.teamName == "" ||
            this.state.gamePostData.description == "" ||
            this.state.gamePostData.selectedGenres == {} ||
            this.state.gamePostData.downloadLinks == {} ||
            this.state.gamePostData.sourceCode == "" ||
            this.state.gamePostData.showcase.public_id == "" ||
            this.state.gamePostData.screenshots == []) ||
            !this.state.terms;

        if (loggedIn && isJammer) {
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
                    <h1 style={{ fontSize: '10em', textAlign: 'center', marginBottom: 15 }}>SUBMIT YOUR GAME!</h1>
                    <div className="row col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2">
                        <Form>
                            <Form.Field className="game">
                                <h1>Game Title!</h1>
                                <Input onChange={this.onTitleChange} placeholder="Add a game title!" />
                            </Form.Field>
                            <Form.Field className="game">
                                <h1 style={gameForm.label}>Team Name!</h1> <Input onChange={this.onTeamChange}
                                    placeholder="Add a team!" />
                            </Form.Field>
                            <Form.Field className="game">
                                <h1>Game Creators! (including you)</h1>
                                {this.state.gamePostData.authors.length > 5 &&
                                    <Label basic color='red' pointing='below'>Teams cannot consist more than 5
                                    members!</Label>}
                                <Dropdown
                                    options={this.state.contributors}
                                    placeholder='Add a your team members '
                                    scrolling
                                    search
                                    selection
                                    fluid
                                    multiple
                                    error={this.state.gamePostData.authors.length > 5}
                                    defaultValue={this.state.defaultAuthor}
                                    onChange={this.handleAuthors} />
                            </Form.Field>
                            <Form.Field className="game">
                                <h1>Game Description!</h1>
                                <TextArea onChange={this.onDescriptionChange} placeholder="Tell us about your game!" />
                            </Form.Field>
                            <Form.Field className="game">
                                <h1>Search Tags to associate with your game!</h1>
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
                                <h1>Game Genres!</h1>
                                <Dropdown placeholder='Add a genre!' fluid multiple selection
                                    onChange={this.handleGenre}
                                    options={genreOptions.genre} />
                            </Form.Field>
                            <Form.Field className="game">
                                <h1>Supported Platforms!</h1>
                                <Dropdown placeholder='Add compatible platforms!' fluid multiple selection
                                    defaultValue={this.state.gamePostData.selectedPlatforms}
                                    onChange={this.handlePlatforms}
                                    options={platforms} />
                            </Form.Field>
                            <Form.Field>
                                {this.state.gamePostData.selectedPlatforms.map(this.createDownloadLinks)}
                            </Form.Field>


                            <Form.Field className="game">
                                <h1>A LARGE Banner Image to Showcase your game!</h1>
                                <Input type='file' accept=".jpg, .jpeg, .png" onChange={this.handleShowcase} />
                                <br />
                                {this.state.showcaseProgressBar ?
                                    <Progress className='progressBar' percent={90} active color='green' style={{ height: 20, backgroundColor: 'transparent', color: 'black' }}>
                                        <Icon name='spinner' loading color='teal' /> Uploading Files
                                    </Progress>
                                    : null
                                }
                            </Form.Field>
                            {this.state.showcaseSuccess && !this.state.showcaseProgressBar ?
                                <Message icon success style={{ display: 'inline-flex' }}>
                                    <Icon name='check' />
                                    <Message.Content>
                                        <Message.Header>Success</Message.Header>
                                        Successfully uploaded!
                                    </Message.Content>
                                </Message>
                                : null}
                            {this.state.showcaseError && !this.state.showcaseProgressBar ?
                                <Message icon error style={{ display: 'inline-flex' }}>
                                    <Icon name='stack overflow' />
                                    <Message.Content>
                                        <Message.Header>Failed</Message.Header>
                                        Your file was too big! Make sure it is under 10 MB and is under our accepted formats!
                                    </Message.Content>
                                </Message> : null}

                            <Form.Field className="game">
                                <h1>IN Game Screenshots!</h1>
                                <Input type='file' multiple accept=".jpg, .jpeg, .png"
                                    onChange={this.handleScreenshots} />
                                <br />
                                {this.state.screenshotProgressBar ?
                                    <Progress className='progressBar' percent={90} active color='green' style={{ height: 20, backgroundColor: 'transparent', color: 'black' }}>
                                        <Icon name='spinner' loading color='teal' /> Uploading Files
                                    </Progress>
                                    : null
                                }
                            </Form.Field>
                            {this.state.screenshotSuccess && !this.state.screenshotProgressBar ?
                                <Message icon success style={{ display: 'inline-flex' }}>
                                    <Icon name='check' />
                                    <Message.Content>
                                        <Message.Header>Success</Message.Header>
                                        Successfully uploaded!
                                    </Message.Content>
                                </Message>
                                : null}
                            {this.state.screenshotError && !this.state.screenshotProgressBar ?
                                <Message icon error style={{ display: 'inline-flex' }}>
                                    <Icon name='stack overflow' />
                                    <Message.Content>
                                        <Message.Header>Failed</Message.Header>
                                        Your files was too big! Make sure each file is under 10 MB and is under our accepted formats!
                                    </Message.Content>
                                </Message> : null}

                            <Form.Field className="game">
                                <h1>Link of Source Code with Github or Google Drive)</h1>
                                <Input onChange={this.onSourceCodeChange} placeholder="Add source code!" />
                            </Form.Field>
                            <Form.Field className="game">
                                <Checkbox onClick={this.handleCheck} label="I agree to AGL game submission terms and conditions" />
                            </Form.Field>
                            <Form.Field>
                                <Modal trigger={<Button disabled={disablePreview}
                                >Preview Game!</Button>}
                                    className="gameModal" size="fullscreen" basic closeIcon>
                                    <Popup on="click" inverted size="huge"
                                        trigger={
                                            <Button color="teal"
                                                style={{ marginTop: 55, display: 'block', float: 'right' }}>
                                                Edit Showcase Image
                                               </Button>}
                                        content={
                                            <div style={gameForm.editShowcase}>
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
                                            </div>}
                                    />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <GamePage gamePostData={this.state.gamePostData} {...this.props} edit={true} />
                                </Modal>
                                <Button disabled={disableGame} onClick={this.submitGame}>Submit Game!</Button>
                            </Form.Field>
                        </Form>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            );
        } else return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Message negative>
                    <Message.Header>Authentication</Message.Header>
                    <p>Hi! You must be logged in and entered in the competition to submit a game!</p>
                </Message>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
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
        fontSize: '1.25em'
    }
}