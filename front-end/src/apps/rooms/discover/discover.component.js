import React, {Component} from 'react';
import './discover.component.scss';

export class DiscoverRooms extends Component {
  render() {
    return (
      <div className='jumbotron new-chat-room-header'>
        <a className="btn btn-primary pull-right">Create Room</a>
      </div>
    );
  }
}