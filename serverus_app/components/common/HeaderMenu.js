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
                            <Button.Group>
                                <Button inverted color ='green'
                                        onClick={()=>props.showModel(0)}>Login</Button>
                                <Button.Or />
                                <Button inverted color='blue'
                                        onClick={() => props.showModel(1)}>Sign Up</Button>
                            </Button.Group>
                        </Menu.Item>
                    </Menu.Menu>
            </Menu>
        </Segment>
    );
};

export default HeaderMenu;