import React, { Component } from "react";
import "./my-rooms.component.scss";
import {
  HeaderImageContainer, NewRoom,
  NoMatch, RoomsList, Guard
} from "../../../components";
import peopleChatting from "../../../images/people-chatting.jpg";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import { ChatRoom, User } from "../../../models";
import { loadMyRooms } from "../../../redux";

class MyRooms extends Component {

  static propTypes = {
    myRooms: ImmutablePropTypes.listOf(ImmutablePropTypes.shape(ChatRoom)).isRequired,
    user: PropTypes.shape(User)
  };

  componentDidMount() {
    this.props.dispatch(loadMyRooms(this.props.user._id));
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/rooms" component={this.renderMainContent.bind(this)}/>
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
            <Link to="/rooms/new-room" className="btn btn-primary pull-right">Create Room</Link>
          </div>
        </HeaderImageContainer>
        <RoomsList rooms={this.props.myRooms}/>
      </div>
    )
  }

}

const mapStateToProps = ({rooms, account}) => {
  return {
    myRooms: rooms.myRooms,
    user: account.user
  };
};

export default connect(mapStateToProps)(MyRooms);