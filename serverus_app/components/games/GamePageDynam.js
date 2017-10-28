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
    Icon
} from 'semantic-ui-react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import * as agl from './../AGL';

class GamePageDynam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            authors: [],
            date: "",
            description: "Game Description is here.. Lorem ispum fuck this shit.",
            tags: [],
            comments: [],
            dlCount: 0,
            hasVoted: false,
            category: "",
            commentStr: ""          //User comment str;
        };
        this.handleSubmitRating = this.handleSubmitRating.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleRequestDownload = this.handleRequestDownload.bind(this);
    }

    async componentWillMount() {
        console.log("Attempting to load " + this.props.match.params.gameId);
        //Populate State from game.
        let comment = this.state.comments;
        comment.push({
            author: "genericEric",
            text: "Nice Post Bro"
        });
        let authors = ["genericEric", "edgyEddie","danq"];
        this.setState({ comments: comment,
        category: "Adventure",
        authors: authors,
        title: "Example Game" });
    }

    handleSubmitComment(){
        console.log("Submitting for: "+ this.props.accounts[0].username);
        let gameid = this.props.match.params.gameId;
        agl.SubmitGameComment(gameid, null);
    }

    //Handle submission of ratings
    handleSubmitRating() {
        console.log("Submitting Rating")
        agl.SubmitGameRating();
    }

    handleRequestDownload(platform){
        console.log("Requesting Download. ")
    }

    render() {
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
                            <Card.Header>{this.state.title}</Card.Header>
                            <br />{/*TODO Load Cloudinary*/}
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <div style={{color: "black"}}>Insert Cloudinary Carousel Here</div>
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
                            <Card.Description>
                                {this.state.description}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card fluid>
                        <Card.Content>
                            <Card.Description>
                                <Header as="h3" dividing>Ratings</Header>
                                <Grid columns={2}>
                                    <Grid.Column width={12}>
                                        <Table size="small" basic="very">
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Mechanics
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} />
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Aesthetics
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} />
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Innovation
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} />
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Theme
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Button fluid color="green" onClick={this.handleSubmitRating}>Rate!</Button>
                                    </Grid.Column>
                                </Grid>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card fluid>
                        <Card.Content>
                            <Card.Description>
                                <Comment.Group>
                                    <Header as="h3" dividing> Comments </Header>
                                    {
                                        this.state.comments.map((comment) => {
                                            return (
                                                <div>
                                                    <Comment>
                                                        Icon Goes Here. 
                                                        <Comment.Content>
                                                            <Comment.Author>{comment.author}</Comment.Author>
                                                            <Comment.Text>{comment.text}</Comment.Text>
                                                        </Comment.Content>
                                                    </Comment>
                                                </div>
                                            )
                                        })
                                    }
                                    <Form>
                                        <Form.TextArea />
                                        <Button content="Post Comment" color="green" icon="edit" onClick={this.handleSubmitComment}/>
                                    </Form>
                                </Comment.Group>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                Info
                            </Card.Header>
                            <Table basic="very" size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            Date
                                        </Table.Cell>
                                        <Table.Cell>
                                            {Date.now()}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Author
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                this.state.authors.map((authors) => {
                                                    return(
                                                        <div>
                                                            <Label basic as={Link} to={"/u/"+authors}><Icon name="user"/>{authors}</Label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Category
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.category}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Downloaded
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.dlCount} times!
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Tags
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Label tag>Extra</Label>
                                            <Label tag>Thicc</Label>
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
                                <Button color="green" fluid onClick={this.handleRequestDownload}>Download</Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        </div>);
    }
}

function mapStateToProps(state, ownProps){
    return{
        accounts: state.accounts
    }
}

export default connect(mapStateToProps, null)(GamePageDynam);