//Antiquated New Account Schema

export default {
  //Login Info
  email: "",
  password: "",
  securityCode: "",

  //Basic Info
  firstName: "",
  lastName: "",
  redId: "",
  major: "",
  dateJoined: "",
  school: "San Diego State University",

  //AGL Info
  username: "",
  roles: [],
  bio: "hi, im new!",
  flare: "",
  goodBoyPoints: 0,

  //Collections
  badges: ["Badges/sprout.png"],
  games: [],
  showcase: [],
  bookmarked: [],
  groups: [],
  activities: [],
  verificationHash: "",
  friends: {},
  authLevel: 0,
  showcaseImage: "ProfileIconsSmall/033-flask.png",
  facebookLink: "https://www.facebook.com/",
  twitterLink: "https://twitter.com/",
  instagramUser: "https://instagram.com/",
  linkedInLink: "https://www.linkedin.com/in/",
  slackUser: "",
  inbox: {
    friendRequests: {},
    teamRequests: {},
    myRequests: {}
  },
  rencrypted: true
};
