import React, { Component } from 'react';
import { Icon, Modal, Label, Loader, Grid } from 'semantic-ui-react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import axios from 'axios';

class IconPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            profileIcons: []
        };
        //this.mountCount = 0;
        this.mapIcons = this.mapIcons.bind(this);
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     debugger;
    //     console.log('weve done this this' + this.mountCount + 'times');
    //     this.mountCount++;
    //     if (this.mountCount > 3) {
    //         return false;
    //     } 
    //     return true;
    // }
    componentDidMount() {
        var that = this;
        axios.get('http://res.cloudinary.com/aztecgamelab-com/image/list/profileSmall.json')
            .then(res => {
                debugger;
                console.log(res.data.resources);
                that.setState({
                    profileIcons: res.data.resources,
                    loading: false
                });
            });
    }

    mapIcons(data, idx) {
        debugger;
        if (data && this.state.profileIcons.indexOf(data.public_id) == -1) {
            console.log('creating component' + data.public_id);
            return (
                <Grid.Column key={data.public_id}>
                    <CloudinaryContext cloudName='aztecgamelab-com' >
                        <Image publicId={data.public_id} >
                            <Transformation width='64' height='64' crop="scale" />
                        </Image>
                    </CloudinaryContext>
                </Grid.Column>
            );
        }
    }

    render() {
        return (
                this.state.profileIcons.length > 0 ?
                    <Modal basic size='small'
                        style = {IconStyle.size}
                        trigger={
                            <div>
                                <CloudinaryContext cloudName='aztecgamelab-com'>
                                    <Label color='green' ribbon>Choose a profile picture!</Label>
                                    <Image publicId={this.props.startingIcon}>
                                        <Transformation width={this.props.startingWidth} height={this.props.startingHeight} crop="scale" />
                                    </Image>
                                </CloudinaryContext>
                            </div>
                        }>
                        <Modal.Content>
                            <div>
                                <Modal.Header>The Aztec Game Lab Zoo:</Modal.Header>
                                <Grid columns={5} padded>
                                    {
                                        this.state.profileIcons.map((data, idx) => this.mapIcons(data))
                                    }
                                </Grid>
                            </div>
                        </Modal.Content>
                    </Modal>
                    :
                    <Loader key={2} inverted>Loading</Loader>
        );
    }
}

const IconStyle = {
    size: {
        overflow: 'auto',
        transform: 'translateY(15%)',
        position: 'absolute',
        height: '100%'
    }
}

export default IconPicker;