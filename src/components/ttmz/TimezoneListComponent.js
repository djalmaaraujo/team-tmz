'use strict';
import React from 'react';
import Avatar from './AvatarComponent';

const ONE_MINUTE = 60;

require('styles/ttmz/TimezoneList.scss');

class TimezoneListComponent extends React.Component {
  calculateNow(timezone) {
    let now         = new Date()
    let nowTimezone = now.getTimezoneOffset()*ONE_MINUTE;

    let partial     = timezone.split('(');
    let subtract    = parseFloat(partial[0]);

    now.setSeconds((now.getSeconds() + nowTimezone) + subtract);

    return now;
  }

  render() {
    let createAvatar = (user) => {
      return <li key={user.id}><Avatar image={user.photo_url} name={user.name}></Avatar></li>;
    }

    let getTime = (timezone) => {
      let nowInTimezone = this.calculateNow(timezone);
      let fullTime      = new Date(nowInTimezone).toLocaleTimeString().split(':')
      let amPm          = fullTime[2].split(' ')[1];

      return <time>{fullTime[0]}:{fullTime[1]} <small>{amPm}</small><br /><span className="timezonelist-component__hours">{this.props.users[0].timezone}</span></time>;
    }

    return (
      <div className="timezonelist-component">
        <div className="timezonelist-component__header">
          <h3>{getTime(this.props.timezone)}</h3>
        </div>

        <ul className="timezonelist-component__list">
          {this.props.users.map(createAvatar)}
        </ul>

      </div>
    );
  }
}

TimezoneListComponent.displayName = 'TtmzTimezoneListComponent';

export default TimezoneListComponent;
