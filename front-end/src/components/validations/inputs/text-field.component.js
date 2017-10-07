import React from "react";
import { OptionallyDisplayed } from "../helpers/optionally-displayed.component";
import PropTypes from "prop-types";

export class TextField extends React.Component {

  constructor(props) {
    super(props);
    this.shouldDisplayError = this.shouldDisplayError.bind(this);
  }

  shouldDisplayError(): Boolean {
    return this.props.showError && this.props.errorText !== "";
  }

  render() {
    return (
      <div className="form-field text-field">
        <input id={this.props.id} type={this.props.type || "text"} className={this.props.inputClassName}
               placeholder={this.props.placeholder}
               value={this.props.value} onChange={this.props.onChange}
               autoComplete={this.props.autoComplete}/>
        <OptionallyDisplayed display={this.shouldDisplayError()}>
          <div className="validation-error">
            <span className="error-text">{this.props.errorText}</span>
          </div>
        </OptionallyDisplayed>
      </div>
    );
  }
}

TextField.propTypes = {
  id: PropTypes.string,
  inputClassName: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  errorText: PropTypes.string,
  showError: PropTypes.bool,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func.isRequired
};