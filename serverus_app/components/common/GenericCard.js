import { Card, Label, Segment, Divider, Grid, Image, Icon } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
//This Is the template for a generic card.
//This is intended as a read only slot. 
/*
The Expected incoming schema should look like this

*/
class GenericCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            favorited: false
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
        let favorited = this.state.favorited;
        return (
            <div id="GenericCardContainer">
                <Card style={CardStyle.card}>
                    <Card.Content>
                        {this.props.value.type.text == 'Announcement' || this.props.value.type.text == 'Tutorial' ?
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
                                        <Icon style={{ float: 'right' }} name="empty star" onClick={this.toggleUserFavorited}></Icon> }
                                        <h2>{this.props.value.title}</h2>
                                        <h5>Created by: {this.props.user.info.username}</h5>
                                        <h5>{this.props.value.date}</h5>
                                        <ReactMarkdown source={this.props.value.text} />
                                    </div>
                                </Grid.Column>
                                <div style={{ marginLeft: 15 }}>
                                    {this.props.value.selectedTags.map((value,idx) => {
                                        return (<button key={idx} type="button" style={CardStyle.tags} className="btn btn-default btn-arrow-left">{'#'+value}</button>)
                                        })
                                    }
                                </div>
                            </Grid> :
                            this.props.value.type.text == 'Game' ?
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
                                            <Icon style={{ float: 'right' }} name="empty star"></Icon>
                                            <h2>{this.props.value.title}</h2>
                                            <h5>{this.props.value.date}</h5>
                                            <ReactMarkdown source={this.props.value.text} />
                                        </div>
                                    </Grid.Column>
                                </Grid> : null}
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

//CSS Styling
var CardStyle = {
    Main: {
        color: "#000000"
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

export default GenericCard;