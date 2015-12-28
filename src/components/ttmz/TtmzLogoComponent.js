'use strict';

import React from 'react';

require('styles/ttmz/TtmzLogo.scss');
let logoImage = require('../../images/teamTimezone.png');

class TtmzLogoComponent extends React.Component {
  render() {
    return (
      <div className="ttmzlogo-component">
        <a href="#ttmz-disclaimer"><img src={logoImage} alt="Team Tmz Logo" /></a>
      </div>
    );
  }
}

TtmzLogoComponent.displayName = 'TtmzTtmzLogoComponent';

export default TtmzLogoComponent;
