import React from 'react';
import {
    Grid,
    Label,
    Card,
    Rating,
    Button,
    Table,
    Comment,
    Header,
    Form,
    Dropdown,
    Icon,
    Message
} from 'semantic-ui-react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import * as agl from './../AGL';
import CustomIcon from './../common/cards/CustomIcon';
import {getJammers, incrementDownloadCount} from '../AGL';
import { Image as CloudImage, CloudinaryContext } from 'cloudinary-react';

class GamePageDynam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            isJammer: false,
            jammerList: [],
            jammerInfo: {},
            title: "",
            team: "",
            authors: [],
            date: "",
            description: "Game Description is here.. Lorem ispum fuck this shit.",
            tags: [],
            comments: {},
            dlCount: 0,
            dlLinks: [],
            hasVoted: false,
            isEligibleToVote: false,
            category: [],
            commentStr: "",          //User comment str;,
            gameID: "",
            mechRatingScore: 0,
            AestRatingScore: 0,
            InnoRatingScore: 0,
            ThemRatingSCore: 0
        };
        //Ordered this way because it looks pretty. 
        this.handleCommentStr = this.handleCommentStr.bind(this);
        this.handleThemeRating = this.handleThemeRating.bind(this);
        this.handleSubmitRating = this.handleSubmitRating.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleMechanicRating = this.handleMechanicRating.bind(this);
        this.handleAestheticRating = this.handleAestheticRating.bind(this);
        this.handleRequestDownload = this.handleRequestDownload.bind(this);
        this.handleInnovationRating = this.handleInnovationRating.bind(this);
    }

    async componentWillMount() {
        //Populate State from game.
        let id = this.props.match.params.gameId;
        let jammers = await getJammers();
        let result = await agl.LoadGames();
        let keyInd = Object.keys(result).indexOf(id);
        let gameData = Object.values(result)[keyInd];
        let comments = gameData.comments;
        gameData.downloadLinks.SOURCECODE = {
            key: "SRC",
            text: "Source Code",
            value: gameData.sourceCode,
            icon: "code"
        }
        this.setState({
            gameID: id,
            comments: comments,
            category: "HORROR",
            authors: gameData.authors,
            title: gameData.title,
            date: gameData.date,
            description: gameData.description,
            tags: gameData.selectedTags,
            dlCount: gameData.dlCount,
            dlLinks: gameData.downloadLinks,
            team: gameData.teamName,
            category: gameData.selectedGenres,
            jammerList: Object.keys(jammers),
            jammerObj: jammers
        });
    }


    async componentWillReceiveProps(nextProps) {
        debugger;
        if (nextProps.accounts[0] && this.props.accounts.length == 0) {
            //check if already entered
            const jammerObj = this.state.jammerObj;
            const username = nextProps.accounts[0].username;
            debugger;
            if(this.state.jammerList.includes(username)){
                this.setState({
                    isJammer: true,
                    loggedIn: true,
                    jammerInfo: jammerObj[username]
                });
            }
            else {
                this.setState({
                    isJammer: false,
                    loggedIn: true
                });
            }
        }
    }
    
    showGenresIcons = (genre, key) => {
        return (
            <CustomIcon key={key} value={genre.value} />
        );
    }

    /**
     * Captures the comment string from the user form. 
     * @param {*} e 
     */
    handleCommentStr(e){
        this.setState({commentStr: e.target.value});
    }

    /**
     * Handles setting Mechanics Rating
     * @param {*} e 
     * @param {*} param1 
     */
    handleMechanicRating(e , {rating}){
        this.setState({mechRatingScore: rating});
    }

    /**
     * Handles setting Aesthetics Rating
     * @param {*} e 
     * @param {*} param1 
     */
    handleAestheticRating(e, {rating}){
        this.setState({AestRatingScore: rating});
    }

    /**
     * Handle setting Innovation Rating
     * @param {*} e 
     * @param {*} param1 
     */
    handleInnovationRating(e, {rating}){
        this.setState({InnoRatingScore: rating});
    }

    /**
     * Handle setting Theme Rating.
     * @param {*} e 
     * @param {*} param1 
     */
    handleThemeRating(e, {rating}){
        this.setState({ThemRatingSCore: rating});
    }

    /**
     * Handles submission of comment to webserver
     */
    handleSubmitComment() {
        console.log("Submitting for: " + this.props.accounts[0].username);
        let gameid = this.props.match.params.gameId;
        let commentObject = {
            userProf: this.props.accounts[0].username,
            date: Date().toDateString(),
            comment: this.state.commentStr
        };
        agl.SubmitGameComment(gameid, commentObject);
    }

    //Handle submission of ratings
    handleSubmitRating() {
        console.log("Handling Score Submission");
        agl.SubmitGameRating();
    }

    async handleRequestDownload(e, {value}) {
        console.log("Incrementing Value as well");
        let response = await incrementDownloadCount(this.state.gameID);
        //refresh page?
        window.location.reload();
        window.open(value);
    }

    minify = (profileUrl) => {
        let headerImage = profileUrl;
        headerImage = headerImage.slice(0, headerImage.indexOf("Small")) + "Extra" + headerImage.slice(headerImage.indexOf("Small"));
        return headerImage;
    }

    render() {
        var genreIcons = this.state.category.length > 0 ? this.state.category.map(this.showGenresIcons) : null;
        return (<div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Grid columns={5} padded inverted>
                <Grid.Column width={2} />
                <Grid.Column width={9}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header><h3 style = {{textAlign: 'center', fontSize: '5em'}}>{this.state.title}</h3></Card.Header>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <div style={{ color: "black" }}>Insert Cloudinary Carousel Here</div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <Header dividing/>
                            <Card.Description>
                                <h3 style = {{fontSize: '3em'}}>{this.state.description}</h3>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card fluid>
                        <Card.Content>


                            <Card.Description>
                                <Header as="h3" dividing>Ratings</Header>
                                {this.state.isJammer ? 
                                <Grid columns={2}>
                                    <Grid.Column width={12}>
                                        <Table size="small" basic="very">
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Mechanics
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} onRate={this.handleMechanicRating}/>
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Aesthetics
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} onRate={this.handleAestheticRating}/>
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Innovation
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} onRate={this.handleInnovationRating}/>
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Theme
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} onRate={this.handleThemeRating}/>
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Button fluid color="green" onClick={this.handleSubmitRating}>Rate!</Button>
                                    </Grid.Column>
                                </Grid>
                                :
                                <Message info>
                                    <Message.Header>Ratings Section</Message.Header>
                                    <p>In order to keep voting safe, you must be a jam participant and logged in to vote! </p>
                                </Message>}
                            </Card.Description>


                        </Card.Content>
                    </Card>
                    <Card fluid>
                        <Card.Content>


                            <Card.Description>
                                <Comment.Group>
                                    <Header as="h3" dividing> Comments </Header>
                                    <CloudinaryContext cloudName='aztecgamelab-com'>
                                    {
                                        Object.keys(this.state.comments).map((username) => {
                                            return (
                                                <div key = {new Date().getTime()}>
                                                
                                                    <Comment>
                                                        <Comment.Avatar>
                                                            <CloudImage className = 'avatar' publicId = {this.minify(this.state.comments[username].profilePic)}></CloudImage>                                                      
                                                        </Comment.Avatar>
                                                        <Comment.Content>
                                                            <Comment.Author as={Link} to={"/u/" + username}>
                                                                {username}
                                                            </Comment.Author>
                                                            <Comment.Metadata>
                                                                <div>{this.state.comments[username].date}</div>
                                                            </Comment.Metadata>
                                                            <Comment.Text>
                                                                {this.state.comments[username].text}
                                                            </Comment.Text>
                                                        </Comment.Content>
                                                    </Comment>
                                                </div>
                                            )
                                        })
                                    }
                                    </CloudinaryContext>
                                    {this.state.isJammer ? <Form>
                                        <Form.TextArea onChange={this.handleCommentStr}/>
                                        <Button content="Post Comment" color="green" icon="edit" onClick={this.handleSubmitComment} />
                                    </Form>
                                    :
                                    <Message info>
                                        <Message.Header>Comments Section</Message.Header>
                                        <p>In order to keep the comment section safe you must be a jam participant to comment! </p>
                                    </Message>
                                }
                                </Comment.Group>
                            </Card.Description>
                        


                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Card fluid>
                        <Card.Content>
                            <Table basic="very" size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <h3>Team</h3>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.team}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <h3>Author</h3>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                this.state.authors.map((authors, idx) => {
                                                    return (
                                                        <div key={idx}>
                                                            <Label basic as={Link} to={"/u/" + authors}><Icon name="user" />{authors}</Label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <h3>Date</h3>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.date}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <h3>Category</h3>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {genreIcons}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <h3>Downloaded</h3>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.dlCount} <h3>times!</h3>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <h3>Tags</h3>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                this.state.tags.map((tag, idx) => {
                                                    return (<Label key={idx} tag>{tag}</Label>);
                                                })
                                            }
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <div>
                                <Dropdown>
                                    <Dropdown.Item>
                                        Windows
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                            <div>
                                <Dropdown options={Object.values(this.state.dlLinks)}
                                    onChange={this.handleRequestDownload}
                                    trigger={
                                        <span>
                                            <Button size="big" fluid color="green">
                                                <h3>Download</h3>
                                            </Button>
                                        </span>
                                    }/>
                            </div>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
            <br/><br/><br/><br/><br/><br/>
        </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
    }
}

export default connect(mapStateToProps, null)(GamePageDynam);