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
            profileIcons: [],
            keysTaken:[],
            loaded: false
        };
        this.mapIcons = this.mapIcons.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        debugger;
        console.log("Next Props: ", nextProps);
        console.log("Next State: ", nextState);
        if (!nextState.profileIcons.length > 0 && !this.state.loaded) {
            return false;
        }
        else return true;
    }
    componentDidMount() {
        var that = this;
        debugger;
        axios.get('http://res.cloudinary.com/aztecgamelab-com/image/list/profileSmall.json')
            .then(res => {
                debugger;
                console.log(res.data.resources);
                that.setState({
                    profileIcons: res.data.resources,
                    loading: false
                });
            });
        debugger;
    }
    componentDidUpdate() {
        if (this.state.profileIcons.length > 0) {
            this.setState({
                loaded: true
        });
    }
}
    mapIcons(data){
        debugger;
        if (data){
            console.log('creating component');
            return(
                <Grid.Column key={data.publicId}>
                    <CloudinaryContext cloudName='aztecgamelab-com' >
                        <Image publicId={data.publicId} >
                            <Transformation width='64' height='64' crop="scale" />
                        </Image>
                    </CloudinaryContext>
                </Grid.Column>
            );
        }
    }

    render() {
        return (
            <Modal basic size='small'
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
                    <Modal.Header>The Aztec Game Lab Zoo:</Modal.Header>
                    <div>
                        <Grid columns={4} padded>
                            {
                                this.state.profileIcons.map((data) => this.mapIcons(data))
                            }
                         </Grid>   
                         {this.state.loading && <Loader key={2} inverted>Loading</Loader>}
                        
                    </div>
                </Modal.Content>
            </Modal>
        );
    }
}

export default IconPicker;