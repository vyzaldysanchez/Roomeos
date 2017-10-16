import React, { Component } from "react";
import PropTypes from "prop-types";
import { User } from "../../models";
import { connect } from "react-redux";
import { Loading } from "../index";

class Guard extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    user: PropTypes.shape(User)
  };

  render() {
    if (!this.props.user) {
      return <Loading/>
    }

    return (
      this.props.children
    );
  }

}

const mapStateToProps = ({account}) => {
  return {
    user: account.user
  };
};

export default connect(mapStateToProps)(Guard);