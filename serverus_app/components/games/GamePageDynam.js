import React from 'react';
import {
    Grid,
    Label,
    Card,
    Rating,
    Button,
    Table
} from 'semantic-ui-react';

class GamePageDynam extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Grid columns={5} padded inverted>
                <Grid.Column width={2} />
                <Grid.Column width={9}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header textAlign="center">Game Title</Card.Header>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <Card.Description>
                                Game Description is here.. Lorem ispum fuck this shit.
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card fluid>
                        <Card.Content>
                            <Card.Description>
                                Ratings.
                                <Grid columns={2}>
                                    <Grid.Column width={12}>
                                        <Table size="small" basic="very">
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Mechanics
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} />
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Aesthetics
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} />
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Innovation
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} />
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Theme
                                            </Table.Cell>
                                                    <Table.Cell>
                                                        <Rating maxRating={5} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Button fluid color="green">Rate!</Button>
                                    </Grid.Column>
                                </Grid>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card fluid>
                        <Card.Content>
                            <Card.Description>
                                Comments Section
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                Info
                            </Card.Header>
                            <Table basic="very" size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            Date
                                        </Table.Cell>
                                        <Table.Cell>
                                            {Date.now()}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Author
                                        </Table.Cell>
                                        <Table.Cell>
                                            genericEric
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Downloaded
                                        </Table.Cell>
                                        <Table.Cell>
                                            0 times!
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Tags
                                        </Table.Cell>
                                        <Table.Cell>
                                            Tags Here.
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <div>
                                <Button color="green" fluid>Download</Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        </div>);
    }
}

export default GamePageDynam;