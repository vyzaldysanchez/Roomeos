export interface User {
  _id: String;
  email: String;
  facebook: String;

  profile: {
    name: String;
    gender: String;
    location: String;
    website: String;
    picture: String;
  }

}