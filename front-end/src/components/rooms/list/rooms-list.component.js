import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import { RoomCard } from "../card/room-card.component";
import "./rooms-list.component.scss";
import { User } from "../../../models";

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
          {this.props.rooms.map((room, index) => {
            return room ? (
              <div key={index} className="rooms-list-col col-md-3">
                <RoomCard user={this.props.user} room={room}/>
              </div>
            ) : null
          })}
        </div>
      </div>
    )
  }

}
