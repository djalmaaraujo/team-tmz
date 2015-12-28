'use strict';

import React from 'react';

require('styles/ttmz/Avatar.scss');

class AvatarComponent extends React.Component {
  render() {
    return (
      <div className="avatar-component">
        <div className="avatar-component__image" style={{backgroundImage: 'url(' + this.props.image + ')'}}></div>
        <div className="avatar-component__description">{this.props.name}</div>
      </div>
    );
  }
}

AvatarComponent.displayName = 'TtmzAvatarComponent';

// Uncomment properties you need
AvatarComponent.propTypes = {
  image: React.PropTypes.string,
  name: React.PropTypes.string
};

// AvatarComponent.defaultProps = {
// };

export default AvatarComponent;
