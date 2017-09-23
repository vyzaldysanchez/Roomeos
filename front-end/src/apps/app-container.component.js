import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadAccountInfo } from "../redux";

class AppContainer extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  componentDidMount() {
    this.props.dispatch(loadAccountInfo());
  }

  render() {
    return (
      this.props.children
    );
  }

}

export default connect()(AppContainer);