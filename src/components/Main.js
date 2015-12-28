require('normalize.css');
require('styles/App.scss');

import React from 'react';
import map from 'lodash/collection/map';
import TimezoneList from './ttmz/TimezoneListComponent';
import StatusBar from './ttmz/StatusBarComponent';
import TtmzLogo from './ttmz/TtmzLogoComponent';
import parseUsers from '../utils/parseUsers';

const URL_SOURCE = 'https://jsonp.afeld.me/?callback=setSource&url=https%3A%2F%2Fapi.hipchat.com%2Fv2%2Fuser%3Fauth_token%3DRHRIgOCVlJ2jSEdPmMjayCEBMrPakeP0StOOJbzE%26expand%3Ditems.timezone';

const AppComponent = React.createClass({
  getInitialState() {
    return {
      timezones: [],
      currentTime: Date.now(),
      timer: setInterval(this.tick, 1000 * 60)
    }
  },

  tick() {
    this.setState({currentTime: Date.now()})
  },

  componentDidMount() {
    var script = document.createElement('script');
    script.src = URL_SOURCE;

    window['setSource'] = (function(jsonData) {
      const timezones = parseUsers(jsonData.items);

      this.setState({
        timezones: timezones
      });

      delete window['setSource'];
    }).bind(this);

    document.head.appendChild(script);
  },

  componentWillUnmount() {
    clearInterval(this.state.timer);
  },

  render() {
    const {timezones, currentTime} = this.state;

    return (
      <div className="index">
        <div className="timezoneListContainer">
          {map(timezones, ({tz, users}) => {
            return <TimezoneList key={tz}
            users={users}
            timezone={tz}
            currentTime={currentTime} />} )}
        </div>

        <StatusBar timezones={timezones} />
        <TtmzLogo />
      </div>
    );
  }
});

export default AppComponent;
