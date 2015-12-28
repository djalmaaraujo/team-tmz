const DEFAULT_TIMEZONE = 'America/Los_Angeles';

import TimezonesDb from '../timezones';
import map from 'lodash/collection/map';
import groupBy from 'lodash/collection/groupBy';

const getTmz = (timezone) => {
  return TimezonesDb[timezone].offsetTime
};

const groupByTimezone = (users) => {
  return groupBy(users, 'timezoneOffset');
};

export default (users) => {
  return groupByTimezone(map(users, (user) => {
    user.timezoneOffset = (TimezonesDb[user.timezone].hasOwnProperty('offset'))
      ? getTmz(user.timezone) : getTmz(DEFAULT_TIMEZONE);

    return user;
  }));
};
