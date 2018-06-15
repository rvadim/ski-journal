import React, { Component } from 'react';
import { TrainingDayList } from './TrainingDay';
import { withStyles } from '@material-ui/core/styles';

import './App.css';

class App extends Component {
  render() {
    return (
        <TrainingDayList />
    );
  }
}

export default withStyles()(App);
