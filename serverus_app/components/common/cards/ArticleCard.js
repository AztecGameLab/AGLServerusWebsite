import React from 'react';
import { Card, Label, Divider, Grid, Icon, Image } from 'semantic-ui-react';
import firebase from 'firebase';
import AvatarEditor from 'react-avatar-editor';
import ReactMarkdown from 'react-markdown';
import { CloudinaryContext, Image as CloudImage } from 'cloudinary-react';

const ArticleCard = (props) => {
    var author = props.postData.author;
    if (props.edit && !props.uploaded) {
        author = firebase.auth().currentUser.displayName;
    }
    let profilePic = require('../../../styles/demoProfileImage.jpg');
    return (
        <Card style={articleStyle.card}>
            <Card.Content style={articleStyle.cardContent}>
                <Grid style={{ padding: 0, marginRight: 0 }} stretched>
                    {props.edit && !props.uploaded ?
                        <Grid.Row style={articleStyle.img}>
                            <AvatarEditor
                                style={articleStyle.src}
                                image={props.postData.image.src || profilePic}
                                width={props.postData.image.width}
                                height={props.postData.image.height}
                                border={0}
                                color={[255, 255, 255, 0.6]}
                                scale={props.postData.image.scale}
                                rotate={0} />
                        </Grid.Row>
                        :
                        props.uploaded ?
                            <Grid.Row style={articleStyle.img}>
                                <AvatarEditor
                                    style={articleStyle.src}
                                    image={props.postData.image.src}
                                    width={props.postData.image.width}
                                    height={props.postData.image.height}
                                    border={0}
                                    color={[255, 255, 255, 0.6]}
                                    scale={props.postData.image.scale}
                                    rotate={0} />
                            </Grid.Row> :
                            <Grid.Row style={articleStyle.image}>
                                {props.postData.image ? <CloudinaryContext cloudName='aztecgamelab-com'>
                                    <CloudImage publicId={props.postData.image} />
                                </CloudinaryContext> :
                                    <Image fluid label={{ color: props.postData.type.id, content: props.postData.type.text, ribbon: true }} style={{width: 600}}  src={profilePic} />}
                            </Grid.Row>}
                    <div style={{ marginLeft: -15, width: '100%', paddingTop: 15, textAlign: '-webkit-center' }}>
                        <Grid.Row >
                            <div><Icon name="empty star"></Icon><br /><br />{props.postData.date}</div>
                        </Grid.Row>
                        <hr />
                        <Grid.Row style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{props.postData.title}</Grid.Row>
                        <Grid.Row style={{ fontSize: '1em', color: 'gray', marginTop: 10 }}>author: {author}</Grid.Row>
                        <Grid.Row style={{ marginTop: 10, marginLeft: 15, textAlign: 'left' }}>
                            {props.postData.selectedTags.map((value, idx) => {
                                return (<button key={idx} type="button" style={articleStyle.tags} className="btn btn-default btn-arrow-left">{'#' + value}</button>)
                            })}
                        </Grid.Row>
                        <hr />
                        <Grid.Row><ReactMarkdown source={props.postData.text} /></Grid.Row>
                    </div>
                </Grid>
            </Card.Content>
        </Card>
    )
}

const articleStyle = {
    imgSrc: {
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
    },
    tags: {
        background: '#263238',
        color: 'white',
        paddingRight: 25,
        paddingLeft: 16
    }
}

export default ArticleCard;