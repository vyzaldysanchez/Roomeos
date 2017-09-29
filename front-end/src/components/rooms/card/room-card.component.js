import React, { Component } from "react";
import PropTypes from "prop-types";
import { ChatRoom, User } from "../../../models";
import "./room-card.component.scss";
import Popover from "react-simple-popover";

const popOverStyle = {
  "zIndex": 1000
};

const AUTHOR_TIP = "Person who created the chat room";
const VISIBILITY_TIP = "This chat room is private";

export class RoomCard extends Component {

  static propTypes = {
    room: PropTypes.shape(ChatRoom).isRequired,
    user: PropTypes.shape(User)
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      popOverTarget: null,
      popOverDescription: null
    };
  }

  render() {
    const room: ChatRoom = this.props.room;
    const user: User = this.props.user;

    return (
      <div className="room-card">
        <div className="room-card-header">
           <span className="room-card-visibility pull-right"
                 data-explain={VISIBILITY_TIP} {...this.setPopOverFor("visibility")}>
              {room.visibility === "private" ? <i className="fa fa-lock" aria-hidden="true"/> : null}
            </span>
          <h3 className="room-card-title">{room.name}</h3>
          {room.description ?
            <span className="room-card-description"
                  data-explain={room.description} {...this.setPopOverFor("description")}
            >{room.description}</span> : null}
        </div>
        <div className="room-card-body">
        </div>
        <div className="room-card-footer">
          <ul className="room-card-list">
            <li>
              {this.renderRoomTags(room)}
            </li>
            <li>
              {room.createdBy._id === user._id ?
                <span className="badge room-card-author"
                      data-explain={AUTHOR_TIP} {...this.setPopOverFor("self-author")}>me</span>
                :
                <span
                  className="badge room-card-author"
                  data-explain={AUTHOR_TIP} {...this.setPopOverFor("author")}>{room.createdBy.name}</span>
              }
            </li>
          </ul>
        </div>
        <Popover
          containerStyle={popOverStyle}
          placement="bottom"
          container={this}
          onHide={() => {
          }}
          target={this.refs[this.state.popOverTarget]}
          show={this.state.open}>
          <p>{this.state.popOverDescription}</p>
        </Popover>
      </div>
    );
  }

  renderRoomTags(room: ChatRoom) {
    return (
      <ul className="room-tags">
        {room.tags.map((tag: String, index) => (
          <li key={index}>
            <span className="badge tag-badge">{tag}</span>
          </li>
        ))}
      </ul>
    );
  }

  setPopOverFor(refName) {
    return {
      ref: refName,
      onMouseEnter: (e: Event) => this.displayPopOver(refName, e.target.dataset["explain"], true),
      onMouseLeave: (e: Event) => this.displayPopOver(refName, null, false)
    };
  }

  displayPopOver(refName, description, isVisible) {
    this.setState({popOverTarget: refName, popOverDescription: description, open: isVisible});
  }

}