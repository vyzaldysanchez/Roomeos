import { Component, createElement } from "react";
import PropTypes from "prop-types";

export class SocketProvider extends Component {

  static propTypes = {
    socket: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  render() {
    return this.props.children;
  }

  static childContextTypes = {
    socket: PropTypes.object
  };

  getChildContext() {
    return {
      socket: this.props.socket,
    };
  }

}

export function socketConnect(Target) {
  function SocketConnect(props, context) {
    return createElement(Target, Object.assign({}, props, {
      socket: context.socket,
    }));
  }

  SocketConnect.contextTypes = {
    socket: PropTypes.object,
  };

  return SocketConnect;
}