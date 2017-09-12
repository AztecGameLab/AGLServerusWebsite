import React from 'react';
import {
    Grid,
    Icon,
    Button,
    Container,
    Segment,
    Header,
    Menu,
    Tab
} from 'semantic-ui-react';
import AdminHome from './AdminHome';
import AdminEmail from './AdminEmail';
import AdminWriter from './AdminWriter';

export default class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.testMenuItemClicked = this.testMenuItemClicked.bind(this);
    }
    
    render() {
        const panes = [
            { menuItem: {icon: 'home', content: 'Home' }, render: () => <Tab.Pane><AdminHome/></Tab.Pane> },
            { menuItem: {content: 'Writer', icon: 'book'}, render: () => <Tab.Pane><AdminWriter/></Tab.Pane> },
            { menuItem: {content: 'Email', icon: 'mail'}, render: () => <Tab.Pane><AdminEmail/></Tab.Pane> },
        ]
        return (
            <div>
                <Segment raised>
                    <Tab menu={{ fluid: true, vertical: true }} panes={panes} />
                </Segment>
            </div>
        );
    }
}