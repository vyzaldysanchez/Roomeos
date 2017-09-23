import React from "react";
import PropTypes from "prop-types";
import { ChatRoom } from "../../models";

export const RoomCard = (props) => (
    <div>
        <h1>{props.room.name}</h1> 
    </div>
);

RoomCard.propTypes = {
    room: PropTypes.shape(ChatRoom).isRequired
}