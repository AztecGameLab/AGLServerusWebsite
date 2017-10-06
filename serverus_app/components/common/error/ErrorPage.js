import React from 'react';
import {Image, Container} from 'semantic-ui-react';

export default class Error extends React.Component {
    render() {
        return (<div style={{margin: 'auto', paddingTop: "200px", paddingBottom: "200px"}}>
            <Container fluid textAlign="center">
                Hey, You're not supposed to be here!
                <Image centered src="https://s-media-cache-ak0.pinimg.com/236x/4e/fc/da/4efcda6185e98de15c8def9e6bf39a55--indian-meme-rage-faces.jpg"/>
            </Container>
        </div>);
    }
}