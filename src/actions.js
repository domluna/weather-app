/* @flow */
// actons.js

import 'whatwg-fetch';

export function fetchData(url) {
  return function thunk(dispatch) {
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log('parsed json', json);

        let list = json.list;
        let dates = [];
        let temps = [];
        for (var i = 0; i < list.length; i++) {
          dates.push(list[i].dt_txt);
          temps.push(list[i].main.temp);
        }

        dispatch(setSelectedTemp(null));
        dispatch(setSelectedDate(''));
        dispatch(setData(json));
        dispatch(setTemps(temps));
        dispatch(setDates(dates));

      })
      .catch((err) => {
        console.log('parsing failed', err);
      });
  }
};

export function changeLocation(location) {
  return {
    type: 'CHANGE_LOCATION',
    location: location
  };
}

export function setSelectedDate(date) {
  return {
    type: 'SET_SELECTED_DATE',
    date: date
  };
}

export function setSelectedTemp(temp) {
  return {
    type: 'SET_SELECTED_TEMP',
    temp: temp
  };
}

export function setData(data) {
  return {
    type: 'SET_DATA',
    data: data
  }
}

export function setDates(dates) {
  return {
    type: 'SET_DATES',
    dates: dates
  }
}

export function setTemps(temps) {
  return {
    type: 'SET_TEMPS',
    temps: temps
  }
}
