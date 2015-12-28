const DEFAULT_TIMEZONE = 'America/Los_Angeles';

import TimezonesDb from '../timezones';
import map from 'lodash/collection/map';
import groupBy from 'lodash/collection/groupBy';
import sortBy from 'lodash/collection/sortBy';

const getTmz = (timezone) => {
  return TimezonesDb[timezone].offsetTime
};

const groupUsersByTimezone = (users) => {
  return groupBy(users, 'timezoneOffset');
};

const sortTimezones = (timezones) => {
  const items = map(timezones, (users, tz) => {
    return {tz, users: sortBy(users, 'name')};
  });

  return sortBy(items, ({tz}) => parseInt(tz));
};

export default (users) => {
  return sortTimezones(groupUsersByTimezone(map(users, (user) => {
    user.timezoneOffset = (TimezonesDb[user.timezone].hasOwnProperty('offset'))
      ? getTmz(user.timezone) : getTmz(DEFAULT_TIMEZONE);

    return user;
  })));
};
