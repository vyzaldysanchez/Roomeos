import React from "react";
import PropTypes from "prop-types";
import "./floating-button.component.scss";

export const FloatingButton = (props) => (
  <div className={["floating-button", `fb-position-${props.position}`].join(" ")} onClick={props.onClick}>
    <span className="floating-button-icon">
      <i className={props.icon}/>
    </span>
  </div>
);

FloatingButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(["br", "bl"])
};

FloatingButton.defaultProps = {
  position: "br"
};