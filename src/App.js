/* @flow */
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
  changeLocation,
  setSelectedDate,
  setSelectedTemp,
  fetchData
} from './actions';
import Plot from './Plot.js';

const API_KEY = '9b41c42524fa557e9d91a4b0896f0ead';

class App extends Component {
  fetchData = (evt) => {
    evt.preventDefault();
    let location = encodeURIComponent(this.props.redux.get('location'));
    let urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuffix = `&APPID=${API_KEY}&units=metric`;
    let url = urlPrefix + location + urlSuffix;
    this.props.dispatch(fetchData(url));
  };

  changeLocation = (evt) => {
    this.props.dispatch(changeLocation(evt.target.value));
  };

  onPlotClick = (data) => {
    if (data.points) {
      let num = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(this.props.redux.getIn(['dates', num.toString()])));
      this.props.dispatch(setSelectedTemp(this.props.redux.getIn(['temps', num.toString()])));
    }
  };

  render() {
    let currentTemp = 'not loaded yet';
    if (this.props.redux.getIn(['data', 'list'])) {
      currentTemp = this.props.redux.getIn(['data', 'list', '0', 'main', 'temp']);
    }

    return (
      <div className="App">
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>
            I want to know the weather for
            <input
              placeholder={"City, Country"}
              value={this.props.redux.get('location')}
              onChange={this.changeLocation}
              type="text" />
          </label>
        </form>
        {/*
          Render the current temperature and the forecast if we have data
          otherwise return null
        */}
        {(this.props.redux.getIn(['data', 'list'])) ? (
          <div className="wrapper">
            <p className="temp-wrapper">
              <span className="temp">
                { this.props.redux.getIn(['selected', 'temp']) ? this.props.redux.getIn(['selected', 'temp']) : currentTemp }
              </span>
              <span className="temp-symbol">°C</span>
              <span className="temp-date">
                { this.props.redux.getIn(['selected', 'temp']) ? this.props.redux.getIn(['selected', 'date']) : '' }
              </span>
            </p>
            <h2>Forecast</h2>
            <Plot
              xData={this.props.redux.get('dates')}
              yData={this.props.redux.get('temps')}
              onPlotClick={this.onPlotClick}
              type="scatter"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    redux: state
  };
}

export default connect(mapStateToProps)(App);
