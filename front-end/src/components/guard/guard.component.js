import React, { Component } from "react";
import PropTypes from "prop-types";
import { User } from "../../models";
import "./guard.component.scss";
import { connect } from "react-redux";

class Guard extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    user: PropTypes.shape(User)
  };

  render() {
    if (!this.props.user) {
      return (
        <div className="guard">
          <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          <h2 className="sr-only">Loading...</h2>
        </div>
      )
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