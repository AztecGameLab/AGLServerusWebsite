import React, { Component } from 'react';
import {
    Button,
    Container,
    Header,
    Icon,
    Menu,
    Segment
} from 'semantic-ui-react';

const HeaderMenu = (props) => {
    return (
        <Segment inverted padded style = {{margin: 0}}>
            <Menu inverted pointing secondary>
                <Container>
                    <Menu.Item as='a' active>Aztec Game Lab</Menu.Item>
                </Container>
                    <Menu.Menu position='right'>
                        <Menu.Item className='item'>
                            <Button inverted color='green'
                                    onClick={props.showModel}>Login</Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button inverted color='blue'
                                    onClick={props.showModel}>Sign Up</Button>
                        </Menu.Item>
                    </Menu.Menu>
            </Menu>
        </Segment>
    );
};

export default HeaderMenu;