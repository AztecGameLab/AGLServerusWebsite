import { Card, Label, Divider, Grid, Image, Icon } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from '../../redux/actions/accountActions';
import ReactMarkdown from 'react-markdown';
import AvatarEditor from 'react-avatar-editor';

//This Is the template for a generic card.
//This is intended as a read only slot. 
/*
The Expected incoming schema should look like this

*/
class GenericCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favorited: false,
            loggedIn: false,
        }
        this.toggleUserFavorited = this.toggleUserFavorited.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.accounts[0] && !nextState.loggedIn) {
            if (nextProps.accounts[0].bookmarked) {
                this.setState({
                    loggedIn: true,
                    favorited: nextProps.accounts[0].bookmarked.includes(this.props.keyUrl)
                });
            } else {
                this.setState({
                    loggedIn: true,
                });
            }
            return true;
        }
    }
    //Toggles if the user has favorited a card or not... Should call back to the json. 
    toggleUserFavorited() {
        var that = this;
        const previousState = this.state.favorited;
        var info = Object.assign({}, this.props.accounts[0]);
        this.props.actions.signOutAccount();
        if (!previousState) {
            if (!info.bookmarked.includes(this.props.keyUrl))
                info.bookmarked.push(this.props.keyUrl);
        } else {
            info.bookmarked.splice(info.bookmarked.indexOf(this.props.keyUrl));
        }
        var data = {
            uid: this.props.accounts[0].uid,
            info: info
        };
        var file = new Blob([JSON.stringify(data)], { type: 'application/json' });
        var pathRef = firebase.storage().ref('accounts/' + data.info.username + '.json');
        pathRef.put(file).then(function () {
            pathRef.getDownloadURL().then(function (url) {
                var username = firebase.auth().currentUser.displayName;
                firebase.database().ref('accounts/' + username).set({
                    data: url
                });
            });
        });
        this.setState({
            favorited: !previousState
        });
    }

    render() {
        let profilePic = require('../../../styles/demoProfileImage.jpg');
        let favorited = this.props.edit ? false : this.state.favorited;
        let loggedIn = this.props.accounts[0] ? true : null;
        return (
            <div id="GenericCardContainer">
                {this.props.value.type.text == 'Announcement' || this.props.value.type.text == 'Tutorial' ?
                    <Card style={CardStyle.card} >
                        <Card.Content>
                            <Grid columns={2} stretched>
                                <Grid.Column as={Link} to={"/a/" + this.props.keyUrl} >
                                    <Image
                                        fluid
                                        label={{ color: this.props.value.type.id, content: this.props.value.type.text, ribbon: true }}
                                        src={profilePic} />
                                </Grid.Column>
                                <Divider vertical></Divider>
                                <Grid.Column>
                                    <div style={CardStyle.Main}>
                                        {loggedIn ? favorited ? <Icon style={{ float: 'right' }} name="star" onClick={this.toggleUserFavorited}></Icon>
                                            :
                                            <Icon style={{ float: 'right' }} name="empty star" onClick={this.toggleUserFavorited}></Icon> : null}

                                        <h2>{this.props.value.title}</h2>
                                        {this.props.edit ? <h5>Created by: {this.props.user}</h5> :
                                            <h5>Created by: {this.props.value.author}</h5>}
                                        <h5>{this.props.value.date}</h5>
                                        <ReactMarkdown source={this.props.value.text} />
                                    </div>
                                </Grid.Column>
                                <div style={{ marginLeft: 15 }}>
                                    {this.props.value.selectedTags.map((value, idx) => {
                                        return (<button key={idx} type="button" style={CardStyle.tags} className="btn btn-default btn-arrow-left">{'#' + value}</button>)
                                    })
                                    }
                                </div>
                            </Grid>
                        </Card.Content>
                    </Card>
                    :
                    //*****************y********************* GAME CARD *****************************************
                    this.props.value.type.text == 'Game' ?
                        <div>
                            <Card style={CardStyle.card}>
                                <Card.Content style={CardStyle.cardContent}>
                                    <Grid style={{ padding: 0, marginRight: 0 }} columns={2} stretched>
                                        <Grid.Column style={CardStyle.image}>
                                            {this.props.edit ? <AvatarEditor
                                                style={CardStyle.src}
                                                image={this.props.value.image.src || profilePic}
                                                width={this.props.value.image.width}
                                                height={this.props.value.image.height}
                                                border={0}
                                                color={[255, 255, 255, 0.6]}
                                                scale={this.props.value.image.scale}
                                                rotate={0} /> : null
                                                /* <Image
                                                    fluid
                                                    label={{ as: 'a', color: this.props.value.type.id, content: this.props.value.type.text, ribbon: true }}
                                                    src={profilePic} />} */
                                            }
                                        </Grid.Column>
                                        <div style={{ marginTop: 10, padding: 0 }} className="col-lg-12">
                                            <div className="col-lg-2">
                                                <Image style={CardStyle.tempSrc} src={profilePic} />
                                            </div>
                                            <div style={{ padding: 0 }} className="col-lg-9">
                                                <div style={{ textAlign: 'center' }} className="col-lg-10">
                                                    {favorited ? <Icon name="star" onClick={this.toggleUserFavorited}></Icon>
                                                        :
                                                        <Icon name="empty star" onClick={this.toggleUserFavorited}></Icon>}
                                                </div>
                                                <div style={{ padding: 0 }} className="col-lg-12">
                                                    {this.props.edit ? <div style={{ fontSize: '0.75em', color: 'gray' }}>{this.props.user}</div> :
                                                        <div style={{ fontSize: '0.75em', color: 'gray' }}>{this.props.value.author}</div>}
                                                    <div style={{ fontWeight: 'bold' }}>{this.props.value.title}</div>
                                                    <ReactMarkdown source={this.props.value.text} />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: 15, marginTop: 5 }}>
                                            {this.props.value.selectedTags.map((value, idx) => {
                                                return (<button key={idx} type="button" style={CardStyle.tags} className="btn btn-default btn-arrow-left">{'#' + value}</button>)
                                            })
                                            }
                                        </div>
                                    </Grid>
                                </Card.Content>
                            </Card>
                        </div> : null}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(accountActions, dispatch)
        //this will go through the courseActions file and wrap with dispatch
    };
}
function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
        //this means i would like to access by this.props.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GenericCard);

//CSS Styling
var CardStyle = {
    Main: {
        color: "#000000"
    },
    cardContent: {
        paddingLeft: 13,
        paddingRight: 0,
        marginRight: -1,
        paddingTop: 13
    },
    image: {
        padding: 0,
        width: '100%'
    },
    src: {
        background: '#333',
        width: '100%',
        cursor: 'move',
        borderRadius: 5
    },
    tempSrc: {
        width: 96,
        height: 96
    },
    card: {
        width: '100%'
    },
    tags: {
        background: '#263238',
        color: 'white',
        paddingRight: 25,
        paddingLeft: 16,
        outline: 'none'
    }
};
