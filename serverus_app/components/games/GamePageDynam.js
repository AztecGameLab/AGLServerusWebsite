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
    Image,
    Message,
    Popup
} from 'semantic-ui-react';
import Slider from 'react-slick';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import * as agl from './../AGL';
import Lightbox from 'react-images';
import SlickNextArrow from '../common/arrows/SlickNextArrow';
import SlickPrevArrow from '../common/arrows/SlickPrevArrow';
import CustomIcon from './../common/cards/CustomIcon';
import { getJammers, incrementDownloadCount, SubmitGameComment, SubmitGameRating } from '../AGL';
import { Image as CloudImage, CloudinaryContext } from 'cloudinary-react';

class GamePageDynam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingButtonLoading: false,
            commentButtonLoading: false,
            loggedIn: false,
            isJammer: false,
            commentsLoaded: false,
            submitRatingsDisable: true,
            jammerList: [],
            jammerInfo: {},
            title: "",
            team: "",
            authors: [],
            date: "",
            description: "Loading Description...",
            tags: [],
            comments: {},
            dlCount: 0,
            dlLinks: [],
            hasVoted: false,
            isEligibleToVote: false,
            category: [],
            commentStr: "",          //User comment str;,
            gameID: "",
            MechRatingScore: 0,
            AestRatingScore: 0,
            InnoRatingScore: 0,
            ThemRatingScore: 0,
            alreadyVoted: false,
            lightBoxIsOpen: false,
            lightBoxCurrentImage: 0
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
        let prevVoters = Object.keys(gameData.rating.voters);
        gameData.downloadLinks.SOURCECODE = {
            key: "SRC",
            text: "Source Code",
            value: gameData.sourceCode,
            icon: "code"
        }
        let imageUrls;
        if (gameData.screenshots) {
            imageUrls = gameData.screenshots.map(image => {
                return {
                    public_id: image.public_id,
                    src: image.url,
                    url: image.url
                }
            });
        }
        this.setState({
            screenshots: imageUrls,
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
            jammerObj: jammers,
            commentsLoaded: true,
            prevVoters: Object.keys(gameData.rating.voters),
            headerImage: gameData.showcase.public_id
        });

        if (this.props.accounts.length > 0) {
            //check if already entered
            let jammersObj = await getJammers();
            const jammerList = Object.keys(jammersObj);
            const username = this.props.accounts[0].username;
            debugger;
            if (jammerList.includes(username)) {
                this.setState({
                    jammerList: jammerList,
                    isJammer: true,
                    loggedIn: true,
                    jammerInfo: jammersObj[username]
                });
                if (prevVoters.includes(username)) {
                    this.setState({
                        alreadyVoted: true
                    });
                }
                else {
                    this.setState({
                        alreadyVoted: false
                    });
                }
            }
            else {
                this.setState({
                    jammerList: jammerList,
                    isJammer: false,
                    loggedIn: true,
                });
            }
        }
    }


    async componentWillReceiveProps(nextProps) {
        if (nextProps.accounts[0] && this.props.accounts.length == 0) {
            //check if already entered
            let id = this.props.match.params.gameId;
            let jammersObj = await getJammers();
            const jammerList = Object.keys(jammersObj);
            let result = await agl.LoadGames();
            let keyInd = Object.keys(result).indexOf(id);
            let gameData = Object.values(result)[keyInd];
            const username = nextProps.accounts[0].username;
            const prevVoters = Object.keys(gameData.rating.voters);
            debugger;
            if (jammerList.includes(username)) {
                this.setState({
                    jammerList: jammerList,
                    isJammer: true,
                    loggedIn: true,
                    jammerInfo: jammersObj[username]
                });
                if (prevVoters.includes(username)) {
                    this.setState({
                        alreadyVoted: true
                    });
                }
                else {
                    this.setState({
                        alreadyVoted: false
                    });
                }
            }
            else {
                this.setState({
                    jammerList: jammerList,
                    isJammer: false,
                    loggedIn: true,
                });
            }
        }
    }

    showGenresIcons = (genre, key) => {
        return (
            <CustomIcon key={key} value={genre.value} />
        );
    }

    createScreenshots = (value, key) => {
        return (
            <div style={{ textAlign: 'center' }} key={key}>
                <Image style={{ maxHeight: 250, borderRadius: 5, cursor: 'zoom-in' }}
                    onDoubleClick={this.showScreenshot}
                    src={value.url} />
            </div>
        );
    }

    showScreenshot = (e) => {
        var index = this.state.screenshots.findIndex((image) => {
            return e.target.src == image.src;
        });
        this.setState({
            lightBoxIsOpen: true,
            lightBoxCurrentImage: index
        });
    }
    closeLightbox = () => {
        this.setState({
            lightBoxIsOpen: false
        });
    }

    gotoPrevious = () => {
        this.setState({
            lightBoxCurrentImage: this.state.lightBoxCurrentImage - 1,
        });
    }
    gotoNext = () => {
        this.setState({
            lightBoxCurrentImage: this.state.lightBoxCurrentImage + 1,
        });
    }

    /**
     * Captures the comment string from the user form. 
     * @param {*} e 
     */
    handleCommentStr(e) {
        this.setState({ commentStr: e.target.value });
    }

    /**
     * Handles setting Mechanics Rating
     * @param {*} e 
     * @param {*} param1 
     */
    handleMechanicRating(e, { rating }) {
        this.setState({ MechRatingScore: rating });
    }

    /**
     * Handles setting Aesthetics Rating
     * @param {*} e 
     * @param {*} param1 
     */
    handleAestheticRating(e, { rating }) {
        this.setState({ AestRatingScore: rating });
    }

    /**
     * Handle setting Innovation Rating
     * @param {*} e 
     * @param {*} param1 
     */
    handleInnovationRating(e, { rating }) {
        this.setState({ InnoRatingScore: rating });
    }

    /**
     * Handle setting Theme Rating.
     * @param {*} e 
     * @param {*} param1 
     */
    handleThemeRating(e, { rating }) {
        this.setState({ ThemRatingScore: rating });
    }

    /**
     * Handles submission of comment to webserver
     */
    async handleSubmitComment() {
        this.setState({
            commentButtonLoading: true
        });
        console.log("Submitting for: " + this.props.accounts[0].username);
        let gameId = this.props.match.params.gameId;
        var now = new Date();
        now = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        let timeSubmmited = new Date().getTime();
        let commentObj = {
            [timeSubmmited]: {
                username: this.props.accounts[0].username,
                text: this.state.commentStr,
                profilePic: this.props.accounts[0].showcaseImage,
                timeSubmitted: now
            }
        };
        let response = await SubmitGameComment(gameId, commentObj);
        if (response = 'Successful comment') {
            window.location.reload();
            this.setState({
                commentButtonLoading: false
            });
        }
    }

    //Handle submission of ratings
    async handleSubmitRating() {
        this.setState({
            ratingButtonLoading: true
        });
        const ratingObj = {
            username: this.props.accounts[0].username,
            AestRatingScore: this.state.AestRatingScore,
            InnoRatingScore: this.state.InnoRatingScore,
            MechRatingScore: this.state.MechRatingScore,
            ThemRatingScore: this.state.ThemRatingScore
        };

        console.log("Handling Score Submission");
        let response = await SubmitGameRating(this.props.match.params.gameId, ratingObj);
        debugger;
        if (response = "Successful rating submission") {
            window.location.reload();
            this.setState({
                ratingButtonLoading: false
            });
        }
    }

    async handleRequestDownload(e, { value }) {
        window.open(value, '_blank');
        console.log("Incrementing Value as well");
        let response = await incrementDownloadCount(this.state.gameID);
        //refresh page?
        window.location.reload();
    }

    minify = (profileUrl) => {
        let headerImage = profileUrl;
        headerImage = headerImage.slice(0, headerImage.indexOf("Small")) + "Extra" + headerImage.slice(headerImage.indexOf("Small"));
        return headerImage;
    }

    mapComments = (comments) => {
        const sortedByTime = Object.keys(comments).sort((a, b) => a - b);
        const commentList = sortedByTime.map((time) => {
            return (
                <div key={time} >
                    <Comment>
                        <CloudImage className='avatar' publicId={this.minify(this.state.comments[time].profilePic)}></CloudImage>
                        <Comment.Content>
                            <Comment.Author as={Link} to={"/u/" + this.state.comments[time].username}>
                                {this.state.comments[time].username}
                            </Comment.Author>
                            <Comment.Metadata>
                                <div>{this.state.comments[time].timeSubmitted}</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                {this.state.comments[time].text}
                            </Comment.Text>
                        </Comment.Content>
                    </Comment>
                </div>);
        });
        return commentList;
    }

    render() {
        var that = this;
        var screenshots;
        if (this.state.screenshots) {
            var slidesToShow = this.state.screenshots.length < 3 ? 1 : 3;
            var settings = {
                accessibility: false,
                // autoplay: true,
                // autoplaySpeed: 2000,
                centerMode: true,
                centerPadding: 0,
                customPaging: function (i) {
                    return <a><img style={{ maxHeight: 24, height: '-webkit-fill-available' }} src={that.state.screenshots[i].src} /></a>
                },
                dots: true,
                dotsClass: 'slick-dots slick-thumb',
                focusOnSelect: true,
                infinite: true,
                pauseOnHover: true,
                speed: 400,
                slidesToShow: slidesToShow,
                nextArrow: <SlickNextArrow noArrow={false} />,
                prevArrow: <SlickPrevArrow noArrow={false} />
            }
            screenshots = this.state.screenshots.map(this.createScreenshots);
            if (screenshots) {
                var lightBox = <Lightbox images={this.state.screenshots} currentImage={this.state.lightBoxCurrentImage} isOpen={this.state.lightBoxIsOpen} onClose={this.closeLightbox}
                    onClickNext={this.gotoNext}
                    onClickPrev={this.gotoPrevious}
                    enableKeyboardInput />
            }
        }

        var genreIcons = this.state.category.length > 0 ? this.state.category.map(this.showGenresIcons) : null;
        var commentList = <div></div>;
        if (typeof this.state.comments !== 'undefined') {
            var commentList = (Object.keys(this.state.comments).length > 0) ? this.mapComments(this.state.comments) : <div></div>;
        }
        var ratingsWarningMessage = this.state.alreadyVoted ? <p>Hey! Thanks for voting and playing the game!  </p>
            :
            <p>In order to keep voting safe, you must be a jam participant and logged in to vote! </p>;

        return (<div>
            <CloudinaryContext cloudName='aztecgamelab-com'>
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
                                <Card.Header><h3 style={{ textAlign: 'center', fontSize: '5em' }}>{this.state.title}</h3></Card.Header>
                                <br />
                                <CloudImage publicId={this.state.headerImage} style={{ width: '100%', textAlign: 'center' }}></CloudImage>
                                <hr/>
                                <div style = {{background: 'black', color: 'white'}}>
                                    <br />
                                    <br />
                                    <br />
                                    <Slider {...settings}>
                                        {screenshots}
                                    </Slider>
                                    {lightBox}
                                    <br />
                                    <br />
                                </div>
                                <Header dividing />
                                <Card.Description>
                                    <p style={{ color: 'black', textAlign: 'center' }}>{this.state.description}</p>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        <Card fluid>
                            <Card.Content>


                                <Card.Description>
                                    <Header as="h3" dividing>Ratings</Header>
                                    {this.state.isJammer && !this.state.alreadyVoted ?
                                        <Grid columns={2}>
                                            <Grid.Column width={12}>
                                                <Table size="small" basic="very">
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell>
                                                                Mechanics
                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Rating maxRating={5} onRate={this.handleMechanicRating} />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell>
                                                                Aesthetics
                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Rating maxRating={5} onRate={this.handleAestheticRating} />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell>
                                                                Innovation
                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Rating maxRating={5} onRate={this.handleInnovationRating} />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell>
                                                                Theme
                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Rating maxRating={5} onRate={this.handleThemeRating} />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Button
                                                    fluid color="green" onClick={this.handleSubmitRating} loading={this.state.ratingButtonLoading}
                                                    disabled=
                                                    {
                                                        !(this.state.MechRatingScore > 0 && this.state.AestRatingScore > 0 && this.state.InnoRatingScore && this.state.ThemRatingScore > 0)
                                                    }>
                                                    Submit Rating
                                            </Button>
                                            </Grid.Column>
                                        </Grid>
                                        :
                                        <Message info>
                                            {ratingsWarningMessage}
                                        </Message>
                                    }
                                </Card.Description>


                            </Card.Content>
                        </Card>
                        <Card fluid>
                            <Card.Content>


                                <Card.Description>
                                    <Comment.Group>
                                        <Header as="h3" dividing> Comments </Header>
                                        {commentList}
                                        {this.state.isJammer ? <Form>
                                            <Form.TextArea onChange={this.handleCommentStr} />
                                            <Button loading={this.state.commentButtonLoading} disabled={!(this.state.commentStr.length > 0 && this.state.commentStr.length < 150)} content="Post Comment" color="green" icon="edit" onClick={this.handleSubmitComment} />
                                            <div>{150 - this.state.commentStr.length} characters left</div>
                                        </Form>
                                            :
                                            <Message info>
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
                                        } />
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
                <br /><br /><br /><br /><br /><br />
            </CloudinaryContext>
        </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
    }
}

export default connect(mapStateToProps, null)(GamePageDynam);