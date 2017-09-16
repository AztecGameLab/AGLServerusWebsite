import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { Card, Label, Divider, Grid, Image, Icon } from 'semantic-ui-react';
import AvatarEditor from 'react-avatar-editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from '../actions/accountActions';
import ReactMarkdown from 'react-markdown';

class ArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.isPageMounted = true;
        this.state = {
            loggedIn: false,
            postData: {},
            favorited: false,
            edit: false,
        };
    }

    componentWillMount() {
        var that = this;
        if (this.props.routeParams.articleId) {
            var articleRef = firebase.database().ref('allArticles/' + this.props.routeParams.articleId);
            articleRef.once('value', snapshot => {
                var that2 = this;
                axios.get(snapshot.val()).then(response => {
                    that2.setState({
                        postData: response.data
                    });
                });
            })
        }
    }

    render() {
        let profilePic = require('../cards/demoProfileImage.jpg');
        let favorited = this.state.edit ? false : this.state.favorited;
        let loaded = this.state.postData.title ? true : false;
        return (
            <div style={articleStyle.article}>
                {loaded ?
                    <div className="container-fluid">
                        <Grid style={{ marginTop: 0 }} className="row">
                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-lg-offset-2" >
                                <Card style={articleStyle.card}>
                                    <Card.Content style={articleStyle.cardContent}>
                                        <Grid style={{ padding: 0, marginRight: 0 }} stretched>
                                            <Grid.Row style={articleStyle.image}>
                                                {this.state.edit ? <AvatarEditor
                                                    style={articleStyle.src}
                                                    image={this.state.postData.image.src || profilePic}
                                                    width={450}
                                                    height={450}
                                                    border={0}
                                                    color={[255, 255, 255, 0.6]}
                                                    scale={1}
                                                    rotate={0} /> :
                                                    <Image
                                                        style={articleStyle.src}
                                                        fluid
                                                        label={{ color: 'red', content: this.state.postData.type.text, ribbon: true }}
                                                        src={profilePic} />
                                                }

                                            </Grid.Row>
                                            <div style={{ marginLeft: -15, width: '100%', paddingTop: 15 }}>
                                                <Grid.Row >
                                                    {favorited ? <Icon name="star" onClick={this.toggleUserFavorited}></Icon>
                                                        :
                                                        <div><Icon name="empty star" onClick={this.toggleUserFavorited}></Icon><br /><br />{this.state.postData.date}</div>}
                                                </Grid.Row>
                                                <hr />
                                                <Grid.Row style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{this.state.postData.title}</Grid.Row>
                                                <Grid.Row style={{ fontSize: '1em', color: 'gray', marginTop: 10 }}>author: {this.state.postData.author}</Grid.Row>
                                                <Grid.Row style={{ marginTop: 10 }}>
                                                    {this.state.postData.selectedTags.map((value, idx) => {
                                                        return (<button key={idx} type="button" style={articleStyle.tags} className="btn btn-default btn-arrow-left">{'#' + value}</button>)
                                                    })}
                                                </Grid.Row>
                                                <hr />
                                                <Grid.Row><ReactMarkdown source={this.state.postData.text} /></Grid.Row>
                                            </div>
                                        </Grid>
                                    </Card.Content>
                                </Card>
                            </div>
                        </Grid>
                    </div> : null}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
        //this means i would like to access by this.state.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
    };
}
export default connect(mapStateToProps, null)(ArticlePage)

var articleStyle = {
    article: {
        textAlign: 'center',
        color: 'black',
        marginTop: 25,
        marginBottom: 25
    },
    src: {
        background: '#333',
        borderRadius: 5,
        width: 400
    },
    Main: {
        color: "#000000"
    },
    cardContent: {
        paddingLeft: 28,
        marginRight: -37,
        paddingTop: 13
    },
    image: {
        display: 'inline',
        padding: 0,
        textAlign: '-webkit-center',
        borderRadius: 5,        
        background: '#333',
    },
    tempSrc: {
        width: 96,
        height: 96
    },
    card: {
        width: '100%',
    },
    tags: {
        background: '#263238',
        color: 'white',
        paddingRight: 25,
        paddingLeft: 16
    }
};
