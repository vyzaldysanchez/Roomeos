export interface User {
  id: String;
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