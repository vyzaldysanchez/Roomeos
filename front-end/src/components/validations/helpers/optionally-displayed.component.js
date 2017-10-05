import React from "react";
import PropTypes from "prop-types";

export function OptionallyDisplayed(props) {
  return props.display ? <div>{props.children}</div> : null;
}

OptionallyDisplayed.propTypes = {
  display: PropTypes.bool.isRequired,
  children: PropTypes.element
};