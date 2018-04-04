import React from 'react';
import { Popup } from 'semantic-ui-react';
import Action from '!svg-react-loader?name=Action!../../../styles/game/mailed-fist.svg';
import Adventure from '-!svg-react-loader?name=Adventure!../../../styles/game/pikeman.svg';
import Horror from '!svg-react-loader?name=Horror!../../../styles/game/imp-laugh.svg';
import Mystery from '!svg-react-loader?name=Mystery!../../../styles/game/magnifying-glass.svg';
import Racing from '!svg-react-loader?name=Race!../../../styles/game/steering-wheel.svg';
import RPG from '!svg-react-loader?name=RPG!../../../styles/game/battle-gear.svg';
import Shooter from '!svg-react-loader?name=Shooter!../../../styles/game/desert-eagle.svg';
import Sports from '!svg-react-loader?name=Sports!../../../styles/game/volleyball-ball.svg';
import TwoDim from '!svg-react-loader?name=TwoDim!../../../styles/game/007-retro-game-controller.svg';
import ThreeDim from '!svg-react-loader?name=ThreeDim!../../../styles/game/001-squares.svg';
import VR from '!svg-react-loader?name=VR!../../../styles/game/002-virtual-reality.svg';

const CustomIcon = (props) => {
    const components = {
        Action: Action,
        Adventure: Adventure,
        Horror: Horror,
        ['Mystery/Suspense']: Mystery,
        Racing: Racing,
        RPG: RPG,
        Shooter: Shooter,
        Sports: Sports,
        ['2D']: TwoDim,
        ['3D']: ThreeDim,
        ['Virtual Reality']: VR
    }
    const CustomComponent = components[props.value];
    return (
        <Popup inverted size="mini" trigger={<span>&nbsp;<CustomComponent height="28" width="28" className="game genres" />&nbsp;</span>} content={props.value} />
    );
};

export default CustomIcon;