import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Assets
import roleOptions from "../../assets/roles/roleOptions.json";

//Components
import Loading from "../../utility/Loading";
import { Feed, Card, Header, Grid, Icon, Button, Popup } from "semantic-ui-react";
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";

//Actions
import { loadProfile } from "../../../features/siteData/siteDataActions";

//Selectors
import { makeSelectUser } from "../../../features/siteData/siteDataSelectors";

class ProfilePage extends Component {
  componentWillMount() {
    const { loadProfile, currentUser } = this.props;
    const { username } = this.props.match.params;
    if (!currentUser) {
      loadProfile(username);
    }
  }

  /**
   * Pretty up the date
   */
  datePrettify = originalDate => {
    const parts = originalDate.split("/");
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[parts[0] - 1];
    const day = parts[1];
    const year = parts[2].split(" ")[0];
    return month + " " + day + ", " + year;
  };

  roleMapper = roles => {
    let objectList = [];
    roles.map(userRole => {
      return objectList.push(roleOptions.roles.find(role => role.value === userRole));
    });
    return objectList.map((role, idx) => (
      <div key={idx}>
        <Feed.Content key={idx}>
          <Icon name={role.icon} size="large" />
          {role.text}
        </Feed.Content>
      </div>
    ));
  };

  /**
   * Maps the Badges
   */
  badgeMapper = badges => {
    return badges.map((badge, idx) => (
      <Popup key={idx} trigger={<CloudImage publicId={badge} />} header={"Early Adopter"} content={"Joined AGL in its first semester!"} />
    ));
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        {!currentUser ? (
          <Loading loadingMessage="Retrieving Profile..." />
        ) : (
          <Grid>
            <Grid.Column />
            <Grid.Column width={3}>
              <Card raised fluid>
                <CloudinaryContext cloudName="aztecgamelab-com">
                  <div style={{ textAlign: "center" }}>
                    <CloudImage publicId={currentUser.showcaseImage} />
                  </div>
                </CloudinaryContext>
                <Card.Content>
                  <Header>
                    {currentUser.firstName} {currentUser.lastName}
                  </Header>
                  @{currentUser.username}
                </Card.Content>
                <Card.Content>
                  <div>
                    <Icon name="university" /> {currentUser.school}
                  </div>
                  <div>
                    <Icon name="student" /> {currentUser.major}
                  </div>
                  <div>
                    <Icon name="user plus" />
                    {this.datePrettify(currentUser.dateJoined)}
                  </div>
                </Card.Content>
                <Card.Content>
                  <Feed>{this.roleMapper(currentUser.roles)}</Feed>
                </Card.Content>
                <Card.Content>
                  <CloudinaryContext cloudName="aztecgamelab-com">{this.badgeMapper(currentUser.badges)}</CloudinaryContext>
                </Card.Content>
                <Card.Content>
                  <Button color="facebook" circular icon="facebook" as="a" href={currentUser.facebookLink} />
                  <Button color="twitter" circular icon="twitter" as="a" href={currentUser.twitterLink} />
                  <Button color="linkedin" circular icon="linkedin" as="a" href={currentUser.linkedInLink} />
                  <Button color="instagram" circular icon="instagram" as="a" href={currentUser.instagramLink} />
                  <Popup color="slack" trigger={<Button circular icon="slack"/>} content={currentUser.slack}/>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={10}>
              <Card raised fluid>
                <Card.Content>
                  <Header>
                    <Icon color="teal" name="question circle outline" size="massive" />About Me
                  </Header>
                  <div>{currentUser.bio}</div>
                </Card.Content>
                <Card.Content>
                  <Header>
                    <Icon color="teal" name="game" />Games
                  </Header>
                  <div>Coming Soon</div>
                </Card.Content>
                <Card.Content>
                  <Header>
                    <Icon color="teal" name="paint brush" />Art
                  </Header>
                  <div>Coming Soon</div>
                </Card.Content>
                <Card.Content>
                  <Header>
                    <Icon color="teal" name="music" />Music
                  </Header>
                  <div>Coming Soon</div>
                </Card.Content>
                <Card.Content>
                  <Header><Icon color="teal" name="hand peace"/>Friends</Header>
                  <div>Coming Soon.</div>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column />
          </Grid>
        )}
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const selectUser = makeSelectUser();
  const mapStateToProps = (state, props) => {
    return {
      currentUser: selectUser(state, props)
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadProfile
    },
    dispatch
  );

export default connect(makeMapStateToProps, mapDispatchToProps)(ProfilePage);
