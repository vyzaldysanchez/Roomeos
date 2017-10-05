import React, { Component } from "react";
import "./my-rooms.component.scss";
import { FloatingButton, HeaderImageContainer, NoMatch, RoomsList } from "../../../components";
import NewRoom from "../../../components/rooms/new/new-room.component";
import peopleChatting from "../../../images/people-chatting.jpg";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import { User } from "../../../models";
import { loadMyRooms } from "../../../redux";

class MyRooms extends Component {

  constructor(props) {
    super(props);
    this.renderMainContent = this.renderMainContent.bind(this);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/rooms" component={this.renderMainContent}/>
          <Route path="/rooms/new-room" component={NewRoom}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    )
  }

  renderMainContent() {
    return (
      <div className="my-rooms-container">
        <HeaderImageContainer backgroundImage={peopleChatting}>
          <div className='new-chat-room-header'>
            <h3>Start a new chat room and enjoy a good conversation</h3>
            <p>keeping in touch with friends, classmates, neighbors or even <strong>strangers</strong> have never been
              easier</p>
          </div>
        </HeaderImageContainer>
        <MyRoomsList/>
        <Link to="/rooms/new-room">
          <FloatingButton icon="fa fa-plus"/>
        </Link>
      </div>
    )
  }

}

class MyRoomsListComponent extends Component {

  static propTypes = {
    myRooms: ImmutablePropTypes.list.isRequired,
    user: PropTypes.shape(User)
  };

  componentDidMount() {
    this.props.dispatch(loadMyRooms(this.props.user._id));
  }

  render() {
    return <RoomsList user={this.props.user} title="Rooms you have joined or created" className="rooms-list"
                      rooms={this.props.myRooms}/>
  }

}

const mapStateToProps = ({rooms, account}) => {
  return {
    myRooms: rooms.myRooms,
    user: account.user
  };
};

const MyRoomsList = connect(mapStateToProps)(MyRoomsListComponent);

export default MyRooms;