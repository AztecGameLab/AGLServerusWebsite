import React from 'react';


export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount() {
        debugger;
        console.log(this.props.routeParams.username);
    }

    render() {
        return (
            <div>
                Hello
            </div>
        );
    }
}