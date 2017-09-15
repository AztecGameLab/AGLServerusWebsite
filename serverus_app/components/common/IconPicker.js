import React, { Component } from 'react';
import { Icon, Modal, Label, Loader, Grid, Button } from 'semantic-ui-react';
import { Image, CloudinaryContext} from 'cloudinary-react';
import axios from 'axios';

class IconPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            profileIcons: [],
            editEnabled: true
        };
        
        this.mapIcons = this.mapIcons.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.iconPicked = this.iconPicked.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }
    handleClose(){
        this.setState({ open: false });
    }
    handleOpen(){
        if(this.state.editEnabled){
            this.setState({ open: true });
        }
    }
    iconPicked(e) {
        this.props.handleProfileInput(e);
        this.handleClose();
    }
    componentDidMount() {
        var that = this;
        axios.get('http://res.cloudinary.com/aztecgamelab-com/image/list/smallIcons.json')
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
                <Grid.Column key={data.public_id} onClick = {(e) => this.iconPicked(e)}>
                        <Image publicId={data.public_id} key = {data.public_id} name = {data.public_id} >
                        </Image>
                </Grid.Column>
            );
        }
    }

    render() {
        return (
                this.state.profileIcons.length > 0 ?
                    <Modal size='small'
                        style = {IconStyle.size}
                        open = {this.state.open}
                        onClose={this.handleClose}
                        trigger={
                            <div style = {picker.starting}>
                                <CloudinaryContext cloudName='aztecgamelab-com'>
                                    <Image publicId={this.props.startingIcon}>
                                    </Image>
                                    <div style = {picker.pickButton}>
                                    {this.props.editEnabled && <Button primary onClick = {this.handleOpen}>Pick a profile avatar!</Button>}
                                    </div>
                                </CloudinaryContext>
                            </div>
                        }>
                        <Modal.Content>
                            <div>
                                <Modal.Header>The Aztec Game Lab Zoo:</Modal.Header>
                                <CloudinaryContext cloudName='aztecgamelab-com'>
                                <Grid columns={5} padded>
                                    {
                                        this.state.profileIcons.map((data, idx) => this.mapIcons(data))
                                    }
                                </Grid>
                                </CloudinaryContext>
                            </div>
                        </Modal.Content>
                    </Modal>
                    :
                    <Loader key={2} inverted>Loading</Loader>
        );
    }
}

var picker= {
    starting: {
        textAlign: 'center',
        padding: '15px 0',
        top: '0'
    },
    pickButton: {
        marginTop: '8px'
    }

};

const IconStyle = {
    size: {
        overflow: 'auto',
        transform: 'translateY(15%)',
        position: 'absolute',
        height: '100%'
    }
};

export default IconPicker;