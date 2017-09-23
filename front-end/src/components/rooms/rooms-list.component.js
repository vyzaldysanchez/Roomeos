import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { RoomCard } from "./room-card.component";

export class RoomsList extends Component {

    static propTypes = {
        rooms: ImmutablePropTypes.list.isRequired
    }

    render() {
        return (
            <div>
                {this.props.rooms.map((room, index) => <RoomCard key={index} room={room} />)}
            </div>
        )
    }

}
