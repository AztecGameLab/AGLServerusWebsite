import React, {Component} from 'react';

//DATA IS IN props.profile.info!
const ProfilePage = (props) => {
    return(
        <div>
            {props.profileObject.info.username}
        </div>
    );
};

export default ProfilePage;