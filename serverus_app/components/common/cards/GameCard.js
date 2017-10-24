import React from 'react';
import { Button, Card, Divider, Dropdown, Grid, Icon, Image, Label } from 'semantic-ui-react';
import Slider from 'react-slick';
import Lightbox from 'react-images';
import AvatarEditor from 'react-avatar-editor';
import { CloudinaryContext, Image as CloudImage } from 'cloudinary-react';
import SlickNextArrow from '../arrows/SlickNextArrow';
import SlickPrevArrow from '../arrows/SlickPrevArrow';
import CustomIcon from './CustomIcon';

const profilePic = require('../../../styles/demoProfileImage.jpg');
class GameCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lightBoxIsOpen: false,
            lightBoxCurrentImage: 0,
        }
    }

    async componentWillMount() {
        if (this.props.gamePostData.downloadLinks) {
            this.setState({
                downloadLinks: this.props.gamePostData.downloadLinks
            });
        }
        if (this.props.gamePostData.screenshots) {
            let imageUrls = this.props.gamePostData.screenshots.map(image => {
                return {
                    public_id: image.public_id,
                    src: image.url,
                    url: image.url
                }
            });
            this.setState({
                screenshots: imageUrls
            });
        }
    }

    redirectDownloadLink = (e, { value }) => {
        window.open(value, '_blank');
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

    showGenresIcons = (genre, key) => {
        return (
            <CustomIcon key={key} value={genre.value} />
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

    render() {
        var that = this;
        var slidesToShow = this.state.screenshots ? this.state.screenshots.length < 3 ? 1 : 3 : null;
        var settings;
        if (that.state.screenshots) {
            settings = {
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
                nextArrow: <SlickNextArrow noArrow={true} />,
                prevArrow: <SlickPrevArrow noArrow={true} />
            }
        }
        var genreIcons = this.props.gamePostData.selectedGenres.length > 0 ? this.props.gamePostData.selectedGenres.map(this.showGenresIcons) : null;

        var screenshots = this.state.screenshots ? this.state.screenshots.map(this.createScreenshots) : null;
        if (screenshots) {
            var lightBox = <Lightbox images={this.state.screenshots} currentImage={this.state.lightBoxCurrentImage} isOpen={this.state.lightBoxIsOpen} onClose={this.closeLightbox}
                onClickNext={this.gotoNext}
                onClickPrev={this.gotoPrevious}
                enableKeyboardInput />
        }
        return (
            <Card style={gameStyle.card}>
                <Card.Content style={gameStyle.cardContent}>
                    <Grid style={{ padding: 0, marginRight: 0 }} stretched>
                        {this.props.edit && !this.props.uploaded ?
                            <Grid.Row style={gameStyle.img}>
                                <AvatarEditor
                                    style={gameStyle.src}
                                    image={this.props.gamePostData.showcase.url || profilePic}
                                    width={this.props.gamePostData.showcase.width}
                                    height={this.props.gamePostData.showcase.height}
                                    border={0}
                                    color={[255, 255, 255, 0.6]}
                                    scale={this.props.gamePostData.showcase.scale}
                                    rotate={0} />
                                <span style={gameStyle.header}>
                                    <div className="col-lg-9 col-md-9" style={gameStyle.subHeader} >
                                        {this.props.gamePostData.title || "Title"}
                                    </div>
                                    <div className="col-lg-3 col-md-3" style={{ fontSize: '0.5em', right: 15 }} >
                                        <Icon size="big" name="empty star" style={{ float: 'right' }}></Icon>
                                    </div>
                                    <div className="col-lg-12 col-md-12" style={{ fontSize: '0.5em', paddingLeft: 50 }}>
                                        <span>
                                            by: {this.props.gamePostData.teamName || "Team name"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </span>
                                        <span>
                                            {genreIcons}
                                        </span>
                                    </div>
                                </span>
                            </Grid.Row>
                            :
                            this.props.uploaded ?
                                <Grid.Row style={gameStyle.img}>
                                    <AvatarEditor
                                        style={gameStyle.src}
                                        image={this.props.gamePostData.showcase.src}
                                        width={this.props.gamePostData.showcase.width}
                                        height={this.props.gamePostData.showcase.height}
                                        border={0}
                                        color={[255, 255, 255, 0.6]}
                                        scale={this.props.gamePostData.image.scale}
                                        rotate={0} />
                                </Grid.Row> :
                                <Grid.Row style={gameStyle.image}>
                                    {this.props.gamePostData.showcase ? <CloudinaryContext cloudName='aztecgamelab-com'>
                                        <CloudImage publicId={this.props.gamePostData.showcase.public_id} />
                                    </CloudinaryContext> :
                                        <Image fluid label={{ color: this.props.gamePostData.type.id, content: this.props.gamePostData.type.text, ribbon: true }} style={{ width: 600 }} src={profilePic} />}
                                </Grid.Row>}
                        <div style={{ width: '100%', fontSize: '1.5em' }}>
                            <Grid.Row style={gameStyle.screenshotsRow}>
                                <Slider {...settings}>
                                        {screenshots ? screenshots : <div><div>Image 1</div><div>Image 2</div><div>Image 3</div></div>}
                                </Slider>
                                {lightBox}
                            </Grid.Row>
                            <hr />
                            <Grid.Row style={{ marginLeft: 25, marginTop: 10 }} >
                                <h2>Release Date:</h2>{this.props.gamePostData.date}
                                <br /> <br />
                                <Dropdown options={Object.values(this.state.downloadLinks)}
                                    onChange={this.redirectDownloadLink}
                                    trigger={
                                        <span>
                                            <Button size="big" color="teal">Download!</Button>
                                        </span>
                                    }
                                />
                            </Grid.Row>
                            <hr />
                            <Grid.Row style={{ marginLeft: 25, wordWrap: 'break-word', maxWidth: "95%" }} ><h2>
                                Description:</h2>{this.props.gamePostData.description || "Describe your game!"}</Grid.Row>
                            <hr />
                            <Grid.Row style={{ marginTop: 10, marginLeft: 15, marginBottom: 15, textAlign: 'left' }}>
                                {this.props.gamePostData.selectedTags ? this.props.gamePostData.selectedTags.map((value, idx) => {
                                    return (<button key={idx} type="button" style={gameStyle.tags} className="btn btn-default btn-arrow-left">{'#' + value}</button>)
                                }) : null}
                            </Grid.Row>
                        </div>
                    </Grid>
                </Card.Content>
            </Card>
        )
    }
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
        top: 315,
    },
    subHeader: {
        paddingLeft: 50
    },
    cardContent: {
        paddingLeft: 28,
        marginRight: -37,
        paddingTop: 13
    },
    src: {
        background: '#333',
        marginLeft: 15,
        cursor: 'move',
    },
    img: {
        padding: 0,
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
    },
    screenshotsRow: {
        position: 'relative',
        width: '99.6%',
        maxHeight: 250,
        backgroundColor: 'black',
        marginBottom: 50
    }
}

export default GameCard;