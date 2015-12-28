require('normalize.css');
require('styles/App.scss');

import React from 'react';
import TimezoneList from './ttmz/TimezoneListComponent';
import parseUsers from '../utils/parseUsers';

const URL_SOURCE = 'https://jsonp.afeld.me/?callback=setSource&url=https%3A%2F%2Fapi.hipchat.com%2Fv2%2Fuser%3Fauth_token%3DRHRIgOCVlJ2jSEdPmMjayCEBMrPakeP0StOOJbzE%26expand%3Ditems.timezone';

const AppComponent = React.createClass({
  getInitialState() {
      return {
        timezones: []
      }
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

  render() {
    return (
      <div className="index">
        <div className="timezoneListContainer">
          {Object.keys(this.state.timezones).map( (key) => { return <TimezoneList key={key} users={this.state.timezones[key]} timezone={key}></TimezoneList>} )}
        </div>
      </div>
    );
  }
});

export default AppComponent;
