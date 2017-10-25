import React from 'react';
import { Button, Card, Divider, Dropdown, Grid, Icon, Image, Label } from 'semantic-ui-react';
import Slider from 'react-slick';
import Lightbox from 'react-images';
import AvatarEditor from 'react-avatar-editor';
import { CloudinaryContext, Image as CloudImage } from 'cloudinary-react';
import { LoadGames } from '../../AGL';
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
        var gamePostData = {};
        try {
            if (this.props.match.params.gameId) {
                let result = await LoadGames(this.props.match.params.gameId);
                gamePostData = Object.values(result)[0];
            }
        } catch (error) {
            console.error(error);
        }
        if (gamePostData.screenshots) {
            gamePostData.screenshots = gamePostData.screenshots.map(image => {
                return {
                    public_id: image.public_id,
                    src: image.url,
                    url: image.url
                }
            });
            this.setState({
                gamePostData: gamePostData
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
        var index = this.state.gamePostData.screenshots.findIndex((image) => {
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
        var settings;
        if (that.state.gamePostData) {
            var slidesToShow = this.state.gamePostData.screenshots ? this.state.gamePostData.screenshots.length < 3 ? 1 : 3 : null;
            settings = {
                accessibility: false,
                // autoplay: true,
                // autoplaySpeed: 2000,
                centerMode: true,
                centerPadding: 0,
                customPaging: function (i) {
                    return <a><img style={{ maxHeight: 24, height: '-webkit-fill-available' }} src={that.state.gamePostData.screenshots[i].src} /></a>
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
            var genreIcons = this.state.gamePostData.selectedGenres.length > 0 ? this.state.gamePostData.selectedGenres.map(this.showGenresIcons) : null;

            var screenshots = this.state.gamePostData.screenshots ? this.state.gamePostData.screenshots.map(this.createScreenshots) : null;
            if (screenshots) {
                var lightBox = <Lightbox images={this.state.gamePostData.screenshots} currentImage={this.state.lightBoxCurrentImage} isOpen={this.state.lightBoxIsOpen} onClose={this.closeLightbox}
                    onClickNext={this.gotoNext}
                    onClickPrev={this.gotoPrevious}
                    enableKeyboardInput />
            }
            return (
                <div>
                    {this.props.match.params.gameId ? <div><br /><br /><br /><br /><br /><br /></div> : null}
                    <Card style={gameStyle.card}>
                        <Card.Content style={gameStyle.cardContent}>
                            <Grid style={{ padding: 0, marginRight: 0 }} stretched>
                                <Grid.Row style={gameStyle.image}>
                                    {this.state.gamePostData.showcase ?
                                        <Grid.Row>
                                            <CloudinaryContext cloudName='aztecgamelab-com'>
                                                <CloudImage publicId={this.state.gamePostData.showcase.public_id} />
                                            </CloudinaryContext>
                                            <span style={gameStyle.headerCloud}>
                                                <div className="col-lg-9 col-md-9" style={gameStyle.subHeader} >
                                                    {this.state.gamePostData.title || "Title"}
                                                </div>
                                                <div className="col-lg-3 col-md-3" style={{ fontSize: '0.5em', right: 15 }} >
                                                    <Icon size="big" name="empty star" style={{ float: 'right' }}></Icon>
                                                </div>
                                                <div className="col-lg-12 col-md-12" style={{ fontSize: '0.5em', paddingLeft: 50 }}>
                                                    <span>
                                                        by: {this.state.gamePostData.teamName || "Team name"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                </span>
                                                    <span>
                                                        {genreIcons}
                                                    </span>
                                                </div>
                                            </span>
                                        </Grid.Row>
                                        :
                                        <Image fluid label={{ color: this.state.gamePostData.type.id, content: this.state.gamePostData.type.text, ribbon: true }} style={{ width: 600 }} src={profilePic} />}
                                </Grid.Row>
                                <div style={{ width: '100%', fontSize: '1.5em', paddingLeft: 0, paddingRight: 0 }}>
                                    <Grid.Row style={gameStyle.screenshotsRow}>
                                        <Slider {...settings}>
                                            {screenshots ? screenshots : <div><div>Image 1</div><div>Image 2</div><div>Image 3</div></div>}
                                        </Slider>
                                        {lightBox}
                                    </Grid.Row>
                                    <hr />
                                    <Grid.Row style={{ marginLeft: 25, marginTop: 10 }} >
                                        <h2>Release Date:</h2>{this.state.gamePostData.date}
                                        <br /> <br />
                                        <Dropdown options={Object.values(this.state.gamePostData.downloadLinks)}
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
                                        Description:</h2>{this.state.gamePostData.description || "Describe your game!"}</Grid.Row>
                                    <hr />
                                    <Grid.Row style={{ marginTop: 10, marginLeft: 15, marginBottom: 15, textAlign: 'left' }}>
                                        {this.state.gamePostData.selectedTags ? this.state.gamePostData.selectedTags.map((value, idx) => {
                                            return (<button key={idx} type="button" style={gameStyle.tags} className="btn btn-default btn-arrow-left">{'#' + value}</button>)
                                        }) : null}
                                    </Grid.Row>
                                </div>
                            </Grid>
                        </Card.Content>
                    </Card>
                </div >
            );
        } else return null;
    }
}

const gameStyle = {
    headerCloud: {
        position: 'relative',
        fontSize: '3em',
        fontWeight: 'bold',
        color: 'white',
        width: '100%',
        textAlign: 'left',
        display: 'block',
        bottom: 230
    },
    subHeader: {
        paddingLeft: 50
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
        background: '#333',
        height: 600
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
        maxHeight: 250,
        backgroundColor: 'black',
        marginBottom: 50
    }
}

export default GameCard;