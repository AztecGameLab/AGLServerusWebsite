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
        this.mapIcons = this.mapIcons.bind(this);
    }

    componentDidMount() {
        var that = this;
        axios.get('http://res.cloudinary.com/aztecgamelab-com/image/list/profileSmall.json')
            .then(res => {
                that.setState({
                    profileIcons: res.data.resources,
                    loading: false
                });
            });
    }
    mapIcons(data, idx) {
        if (data && this.state.profileIcons.indexOf(data.public_id) == -1) {
            return (
                <Grid.Column key={data.public_id}>
                    <Image key={data.public_id} publicId={data.public_id} />
                </Grid.Column>
            );
        }
    }

    render() {
        return (this.state.profileIcons.length > 0 ?
            <CloudinaryContext cloudName='aztecgamelab-com'>
                <Modal basic size='small'
                    style={IconStyle.size}
                    trigger={
                        <div>
                            <Label color='green' ribbon>Choose a profile picture!</Label>
                            <Image publicId={this.props.startingIcon} />
                        </div>
                    }>
                    <Modal.Content style={{background: 'black'}}>
                        <div>
                            <Modal.Header>The Aztec Game Lab Zoo:</Modal.Header>
                            <Grid columns={5} padded>
                                {this.state.profileIcons.map((data, idx) => this.mapIcons(data))}
                            </Grid>
                        </div>
                    </Modal.Content>
                </Modal>
            </CloudinaryContext>
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