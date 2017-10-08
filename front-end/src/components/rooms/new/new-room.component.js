import React, { Component } from "react";
import ToggleButton from "react-toggle-button"
import { connect } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";
import PropTypes from "prop-types";
import { Map } from "immutable";
import type { ChatRoom } from "../../../models/chat-room";
import { addRoom } from "../../../redux";
import { User } from "../../../models/user";
import { Link } from "react-router-dom";
import { maxLength, minLength, required, ruleRunner, run, TextArea, TextField } from "../../validations";
import "./new-room.component.scss";

const tagsMessage = "Add keywords that help other people find your room";

const initialRoomState: ChatRoom = {
  name: "",
  description: "",
  visibility: "public",
  tags: []
};

const initialState = {
  newRoom: Map(initialRoomState),
  isPrivate: false,
  suggestions: ["friends", "classmates", "college", "university"],
  tags: [{id: 1, text: "friends"}],
  finishCreating: false,
  showErrors: false,
  validationErrors: {},
};

const fieldValidations = [
  ruleRunner("name", "Room name", required, minLength(3)),
  ruleRunner("description", "Room description", maxLength(140)),
];

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

  componentWillMount() {
    this.setState({validationErrors: run(this.state.newRoom, fieldValidations)});
    document.body.classList.add("ac-background");
  }

  componentWillUnmount() {
    document.body.classList.remove("ac-background");
  }

  errorFor(field) {
    return this.state.validationErrors[field] || "";
  }

  render() {
    return (
      <div className="container">
        {this.state.finishCreating ? this.renderResumePanel() : this.renderForm()}
      </div>
    )
  }

  renderResumePanel() {
    const newRoom = this.state.newRoom;

    return (
      <div className="resume-panel col-md-6 col-md-offset-3">
        <h3 className="resume-panel-title">Congrats!, you just created a new room called <strong>"{newRoom.get("name")}"</strong></h3>
        <div className="col-md-12 m-top clearfix">
          <div className="col-md-6 col-sm-6 col-xs-6">
            <Link to={`/rooms/${newRoom.get("_id")}`} className="btn btn-success btn-block">Join chat</Link>
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
    const newRoom: Map = this.state.newRoom;

    return (
      <div className="form-container col-md-6 col-md-offset-3">
        <h3>Your new room will help people get together, <strong>set it up!</strong></h3>
        <form className="new-room-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <TextField id="name" value={newRoom.get("name")} onChange={this.handleChange}
                       placeholder="Name by which your room can be found"
                       inputClassName="form-control"
                       errorText={this.errorFor("name")}
                       autoComplete="off"
                       type="text" showError={this.state.showErrors}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <TextArea id="description" value={newRoom.get("description")} onChange={this.handleChange}
                      placeholder="Explain what is the room about..."
                      inputClassName="form-control"
                      errorText={this.errorFor("description")}
                      showError={this.state.showErrors}
            />
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
    const newRoom = this.state.newRoom.set(event.target.id, event.target.value);
    const validationErrors = run(newRoom, fieldValidations);
    this.setState({newRoom, validationErrors});
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
    event.preventDefault();

    const newRoom: ChatRoom = this.state.newRoom.merge({
      visibility: this.getVisibility(),
      tags: this.getTags(),
      createdBy: this.props.user._id
    }).toObject();

    if (Object.keys(this.state.validationErrors).length === 0) {
      this.props.dispatch(addRoom(newRoom)).then(({createdRoom}) => {
        this.setState({newRoom: Map(createdRoom), finishCreating: true});
      });
    }
    else {
      this.setState({showErrors: true});
    }

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