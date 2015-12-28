'use strict';

import React from 'react';
import reduce from 'lodash/collection/reduce';

require('styles/ttmz/StatusBar.scss');

class StatusBarComponent extends React.Component {
  render() {
    const {timezones} = this.props;

    const totalPeople = reduce(timezones, (total, tz) => { return total += tz.users.length }, 0);

    return (
      <div className="statusbar-component">
        {totalPeople} people, {timezones.length} timezones, #remote #ftw
      </div>
    );
  }
}

StatusBarComponent.displayName = 'TtmzStatusBarComponent';

export default StatusBarComponent;
