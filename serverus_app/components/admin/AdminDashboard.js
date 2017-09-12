import React from 'react';
import {
    Grid,
    Icon,
    Button,
    Container,
    Segment,
    Header,
    Menu
} from 'semantic-ui-react';

export default class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.testMenuItemClicked = this.testMenuItemClicked.bind(this);
    }

    testMenuItemClicked(){
        console.log("Clicked!");
    }

    render() {
        return (
            <div>
                <Grid columns={2} stretched>
                    <Grid.Column width={3} stretched style={{minHeight: "100%"}}>
                        <Segment raised>
                            <Header>Admin Actions</Header>
                            <Menu vertical fluid>
                                <Menu.Item name="Write Blog Post" icon="book" onClick={this.testMenuItemClicked}/>
                                <Menu.Item name="Manage Users" icon="users"/>
                                <Menu.Item name="Dispatch Email" icon="mail"/>
                            </Menu>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        Right Content
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}