import React, { Component } from "react";
import "./new-room.component.scss";
import type { ChatRoom } from "../../../models/chat-room";
import { addRoom } from "../../../redux";
import ToggleButton from "react-toggle-button"
import { WithContext as ReactTags } from "react-tag-input";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { User } from "../../../models/user";
import { Link } from "react-router-dom";

const tagsMessage = "Add keywords that help other people find your room";

const initialRoomState: ChatRoom = {
  name: "",
  description: "",
  visibility: "public",
  tags: []
};

const initialState = {
  newRoom: initialRoomState,
  isPrivate: false,
  suggestions: ["friends", "classmates", "college", "university"],
  tags: [{id: 1, text: "friends"}],
  finishCreating: false
};

class NewRoom extends Component {

  static propTypes = {
    user: PropTypes.shape(User).isRequired
  };

  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {

    return (
      <div className="container">
        {this.state.finishCreating ? this.renderResumePanel() : this.renderForm()}
      </div>
    )
  }

  renderResumePanel() {
    const newRoom: ChatRoom = this.state.newRoom;

    return (
      <div className="resume-panel col-md-6 col-md-offset-3">
        <h3>Congrats!, you just created a new room called <strong>{newRoom.name}</strong></h3>
        <div className="col-md-12 m-top clearfix">
          <div className="col-md-6 col-sm-6 col-xs-6">
            <Link to={`/rooms/${newRoom._id}`} className="btn btn-success btn-block">Join chat</Link>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-6">
            <Link to="/rooms" className="btn btn-primary btn-block">Go to my rooms</Link>
          </div>
        </div>
      </div>
    )
  }

  renderForm() {
    const {suggestions, tags} = this.state;

    return (
      <div className="form-container col-md-6 col-md-offset-3">
        <h3>Your new room will help people get together, <strong>set it up!</strong></h3>
        <form className="new-room-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input required id="name" value={this.state.newRoom.name} onChange={this.handleChange}
                   placeholder="Name by which your room can be found"
                   className="form-control"
                   type="text"/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={this.state.newRoom.description} onChange={this.handleChange}
                      placeholder="Explain what is the room about..."
                      className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags (3 max)</label>
            <ReactTags
              id="tags"
              classNames={{
                tagInputField: tags.length === 3 ? "tag-input-field-disable" : "form-control"
              }}
              tags={tags}
              placeholder={tagsMessage}
              suggestions={suggestions}
              handleDelete={this.handleDelete.bind(this)}
              handleAddition={this.handleAddition.bind(this)}/>
          </div>
          <div className="col-md-12 m-top clearfix">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <ToggleButton
                  id="visibility"
                  inactiveLabel={<i className="fa fa-unlock"/>}
                  activeLabel={<i className="fa fa-lock"/>}
                  value={this.state.isPrivate || false}
                  onToggle={(value) => {
                    this.setState({
                      isPrivate: !value
                    })
                  }}/>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">That's it, create</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  handleChange(event: Event) {
    const newRoom = Object.assign({}, this.state.newRoom);
    newRoom[event.target.id] = event.target.value;
    this.setState({newRoom});
  }

  handleDelete(i: Number) {
    this.setState({
      tags: this.state.tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag: String) {
    const {tags} = this.state;
    this.setState({tags: [...tags, {id: tags.length + 1, text: tag}]});
  }

  handleSubmit(event: Event) {
    const newRoom: ChatRoom = {
      ...this.state.newRoom,
      visibility: this.getVisibility(),
      tags: this.getTags(),
      createdBy: this.props.user._id
    };

    this.props.dispatch(addRoom(newRoom)).then(({createdRoom}) => {
      this.setState({newRoom: createdRoom, finishCreating: true});
    });

    event.preventDefault();
  }

  getVisibility(): String {
    return this.state.isPrivate ? "private" : "public";
  }

  getTags(): String[] {
    return this.state.tags.map(tagObject => tagObject.text);
  }

}

const mapStateToProps = ({account}) => {
  return {
    user: account.user
  };
};

export default connect(mapStateToProps)(NewRoom);