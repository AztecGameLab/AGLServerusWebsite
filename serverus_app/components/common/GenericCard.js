import { Card, Label, Segment, Divider, Grid, Image, Icon } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router';
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
        }
        this.toggleUserFavorited = this.toggleUserFavorited.bind(this);
    }

    //Toggles if the user has favorited a card or not... Should call back to the json. 
    toggleUserFavorited() {
        const previousState = this.state.favorited;
        this.setState({
            favorited: !previousState
        });
    }

    render() {
        let profilePic = require('./demoProfileImage.jpg');
        let favorited = this.props.edit ? false : this.state.favorited;
        return (
            <div id="GenericCardContainer">
                {this.props.value.type.text == 'Announcement' || this.props.value.type.text == 'Tutorial' ?
                    <Card style={CardStyle.card}>
                        <Card.Content>
                            <Grid columns={2} stretched>
                                <Grid.Column>
                                    <Image
                                        fluid
                                        label={{ as: 'a', color: this.props.value.type.id, content: this.props.value.type.text, ribbon: true }}
                                        src={profilePic} />
                                </Grid.Column>
                                <Divider vertical></Divider>
                                <Grid.Column>
                                    <div style={CardStyle.Main}>
                                        {favorited ? <Icon style={{ float: 'right' }} name="star" onClick={this.toggleUserFavorited}></Icon>
                                            :
                                            <Icon style={{ float: 'right' }} name="empty star" onClick={this.toggleUserFavorited}></Icon>}
                                        <h2>{this.props.value.title}</h2>
                                        {this.props.edit ?<h5>Created by: {this.props.user}</h5>:
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

export default GenericCard;

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
        paddingLeft: 16
    }
};
