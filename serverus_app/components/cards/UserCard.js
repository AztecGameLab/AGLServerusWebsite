import { Card, Label, Divider, Grid, Icon } from 'semantic-ui-react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import React from 'react';
import { Link } from 'react-router';


export default class UserCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div id="UserCardContainer">
                <Card style={CardStyle.card}>
                    <Card.Content>
                        <Grid columns={2} stretched>
                            <Grid.Column width={5}>
                            <CloudinaryContext cloudName='aztecgamelab-com'>
                                <Image publicId={this.props.user.info.showcaseImage}/>
                                </CloudinaryContext>
                            </Grid.Column>
                            <Divider vertical></Divider>
                            <Grid.Column>
                                <div style={CardStyle.Main}>
                                    <h2>{this.props.user.info.username}</h2>
                                    <h5>Created by: {this.props.user.info.redId}</h5>
                                </div>
                            </Grid.Column>
                            <div style={{ marginLeft: 15 }}>
                                {this.props.user.info.roles.map((role, idx) => {
                                    return (<button key={idx} type="button" style={CardStyle.tags} className="btn btn-default btn-arrow-left">{'#' + role}</button>)
                                })
                                }
                            </div>
                        </Grid>
                    </Card.Content>
                </Card>
            </div>
        )
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
}
