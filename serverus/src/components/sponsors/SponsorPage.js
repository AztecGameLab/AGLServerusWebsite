import React from "react";
import { Button } from 'semantic-ui-react'
import { Image, CloudinaryContext } from "cloudinary-react";
//Styling
import "./SponsorPage.css";
const SponsorPage = (props) => {
    return (
        <div className = "sponsorpage">
        <CloudinaryContext cloudName="aztecgamelab-com">
        <Image className = "size" publicId="AGL_Sponsorship_Deck.png" />
          </CloudinaryContext>
          <Button as="a" href="mailto:aztecgamelab@gmail.com">Press Start</Button>
        </div>
    );
};
export default SponsorPage;