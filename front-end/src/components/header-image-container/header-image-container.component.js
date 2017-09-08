import React from 'react';
import PropTypes from 'prop-types';
import './header-image-container.component.scss';

export function HeaderImageContainer(props) {
  return (
    <div className="header-image-container" style={{backgroundImage: `url(${props.backgroundImage})`}}>
      {props.children}
    </div>
  )
}

HeaderImageContainer.propTypes = {
  children: PropTypes.element,
  backgroundImage: PropTypes.string.isRequired
};
