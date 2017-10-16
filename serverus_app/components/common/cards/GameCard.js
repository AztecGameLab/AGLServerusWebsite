import React from 'react';
import { Button, Card, Divider, Grid, Icon, Image, Label } from 'semantic-ui-react';
import AvatarEditor from 'react-avatar-editor';
import { CloudinaryContext, Image as CloudImage } from 'cloudinary-react';

const profilePic = require('../../../styles/demoProfileImage.jpg');
const GameCard = (props) => {
    return (
        <Card style={gameStyle.card}>
            <Card.Content style={gameStyle.cardContent}>
                <Grid style={{ padding: 0, marginRight: 0 }} stretched>
                    {props.edit && !props.uploaded ?
                        <Grid.Row style={gameStyle.img}>
                            <AvatarEditor
                                style={gameStyle.src}
                                image={props.gamePostData.showcase.url || profilePic}
                                width={props.gamePostData.showcase.width}
                                height={props.gamePostData.showcase.height}
                                border={0}
                                color={[255, 255, 255, 0.6]}
                                scale={props.gamePostData.showcase.scale}
                                rotate={0} />
                            <span style={gameStyle.header}>
                                <div className="col-lg-9" style={gameStyle.subHeader} >
                                    {props.gamePostData.title || "Title"}
                                </div>
                                <div className="col-lg-2" style={{ fontSize: '0.5em', marginLeft: 90 }} >
                                    <Icon size="big" name="empty star" style={{ float: 'right' }}></Icon>
                                </div>
                                <div className="col-lg-12" style={{ fontSize: '0.5em', marginLeft: 50 }}>
                                    by: {props.gamePostData.teamName || "Team name"}
                                </div>
                            </span>
                        </Grid.Row>
                        :
                        props.uploaded ?
                            <Grid.Row style={gameStyle.img}>
                                <AvatarEditor
                                    style={gameStyle.src}
                                    image={props.gamePostData.showcase.src}
                                    width={props.gamePostData.showcase.width}
                                    height={props.gamePostData.showcase.height}
                                    border={0}
                                    color={[255, 255, 255, 0.6]}
                                    scale={props.gamePostData.image.scale}
                                    rotate={0} />
                            </Grid.Row> :
                            <Grid.Row style={gameStyle.image}>
                                {props.gamePostData.showcase ? <CloudinaryContext cloudName='aztecgamelab-com'>
                                    <CloudImage publicId={props.gamePostData.showcase.public_id} />
                                </CloudinaryContext> :
                                    <Image fluid label={{ color: props.gamePostData.type.id, content: props.gamePostData.type.text, ribbon: true }} style={{ width: 600 }} src={profilePic} />}
                            </Grid.Row>}
                    <div style={{ marginLeft: 50, width: '100%', paddingTop: 15, fontSize: '1.5em' }}>
                        <Grid.Row >
                            Release Date: {props.gamePostData.date}
                            <br /> <br />
                            <a href='https://drive.google.com/' target="_blank">
                                <Button size="big" color="teal">Download!</Button>
                            </a>
                        </Grid.Row>
                        <hr />
                        <Grid.Row>Description: {props.gamePostData.description || "Describe your game!"}</Grid.Row>
                        <hr />
                        <Grid.Row style={{ marginTop: 10, marginLeft: 15, textAlign: 'left' }}>
                            {props.gamePostData.selectedTags ? props.gamePostData.selectedTags.map((value, idx) => {
                                return (<button key={idx} type="button" style={gameStyle.tags} className="btn btn-default btn-arrow-left">{'#' + value}</button>)
                            }) : null}
                        </Grid.Row>
                    </div>
                </Grid>
            </Card.Content>
        </Card>
    )
}

const gameStyle = {
    imgSrc: {
        background: '#333',
        borderRadius: 5,
        width: 400
    },
    header: {
        position: 'absolute',
        fontSize: '3em',
        fontWeight: 'bold',
        color: 'white',
        width: '100%',
        top: 325,
    },
    subHeader: {
        marginLeft: 50
    },
    cardContent: {
        paddingLeft: 28,
        marginRight: -37,
        paddingTop: 13
    },
    src: {
        background: '#333',
        width: '100%',
        cursor: 'move',
        borderRadius: 5
    },
    img: {
        padding: 0,
        width: '100%'
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
        color: 'black'
    },
    tags: {
        background: '#263238',
        color: 'white',
        paddingRight: 25,
        paddingLeft: 16
    }
}

export default GameCard;