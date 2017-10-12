import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import { RoomCard } from "../card/room-card.component";
import "./rooms-list.component.scss";
import { User } from "../../../models";
import type { ChatRoom } from "../../../models/chat-room";

export class RoomsList extends Component {

  static propTypes = {
    title: PropTypes.string,
    rooms: ImmutablePropTypes.list.isRequired,
    user: PropTypes.shape(User).isRequired
  };

  render() {
    return (
      <div className="rooms-list">
        <div className="rooms-list-header">
          <h3>{this.props.title}</h3>
        </div>
        <div className="row">
          {this.props.rooms.map((room: ChatRoom, index) => {
            return room ? (
              <div key={index} className="rooms-list-col col-md-3">
                <a href={`/rooms/${room._id}`}>
                  <RoomCard user={this.props.user} room={room}/>
                </a>
              </div>
            ) : null
          })}
        </div>
      </div>
    )
  }

}
