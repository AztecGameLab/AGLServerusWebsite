import React from "react";
import { Image, CloudinaryContext } from "cloudinary-react";
const SponsorPage = (props) => {
    return (
        <div>
        <CloudinaryContext cloudName="aztecgamelab-com">
        <Image publicId="AGL_Sponsorship_Deck.png" />
          </CloudinaryContext>
        </div>
    );
};
export default SponsorPage;