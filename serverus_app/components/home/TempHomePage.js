import React from 'react';
import {
    Segment,
    Image,
    Grid,
    Card,
    Button,
    Icon
} from 'semantic-ui-react';
import NewsFeed from './NewsFeed';
import Parallax from 'parallax-js';
import Slider from 'react-slick';
import {CloudinaryContext, Image as CloudImage} from 'cloudinary-react';

export default class TempHome extends React.Component {
    
    componentDidMount() {
        this.parallax = new Parallax(this.scene)
      }
      componentWillUnmount() {
        this.parallax.disable()
      }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 350,
            slidesToShow: 1,
          };
        return (
            <div >
                <div ref={el => this.scene = el}>
                    <Image className="layer" data-depth="0.00" data-hover-only = {true} fluid src="http://res.cloudinary.com/aztecgamelab-com/image/upload/v1507685954/bg_qgt59c.jpg" />                
                    <h3 className="layer" data-depth="0.80">xD</h3>
                </div>
            
                <Grid columns = {2} fluid>
                    <Grid.Column width = {9} >
                        <iframe src="https://calendar.google.com/calendar/embed?showNav=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;%23ffffff&amp;src=aztecgamelab%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FLos_Angeles" style={{border:"solid 6px #4D36E9", width:"100%", minHeight:"600px", frameborder:"0", scrolling:"no"}}></iframe>
                    </Grid.Column>
                    <Grid.Column width = {6} textAlign = 'center'>
                        <br/>
                        <h1>Check out our upcoming events!</h1>
                        <hr/>
                        <p>
                            We meet every week on Fridays at 2:00 pm in AH1120!
                        </p>
                        <CloudinaryContext cloudName='aztecgamelab-com'>
                        <Slider {...settings} >
                            <CloudImage publicId="WebsiteAssets/Step1.jpg" />
                            <CloudImage publicId="WebsiteAssets/Step2.jpg" />
                            <CloudImage publicId="WebsiteAssets/Step3.jpg" />
                            <CloudImage publicId="WebsiteAssets/Step4.jpg" />
                            <CloudImage publicId="WebsiteAssets/Step5.jpg" />
                            <CloudImage publicId="WebsiteAssets/Step6.png" />
                        </Slider>
                        </CloudinaryContext>
                    </Grid.Column>
                </Grid>     
            </div>
        );
    }
}

// <Grid columns={3} fluid>
// <Grid.Column textAlign = 'center' color= "black">
//   <Icon name = 'checked calendar' size = 'big'/> Schedule
// </Grid.Column>
// <Grid.Column textAlign = 'center'  color= "black">
//   <Icon name = 'info circle' size = 'big'/> About Us
// </Grid.Column>
// <Grid.Column textAlign = 'center' color= "black">
//   <Icon name = 'talk outline' size = 'big'/> Contact Us
// </Grid.Column>
// </Grid>
//<div className="row col-lg-12"><NewsFeed style={homeStyle.sideStyle} /></div>

let homeStyle = {
    margin: {
        paddingLeft: 30
    },
    sideStyle: {
        display: "inline-block"
    }
};