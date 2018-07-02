import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import moment from 'moment'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { getTrainingDaysData } from './utils/Api'

import orderBy from 'lodash/orderBy'

const styles = theme => ({
  root: {
    margin: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

// class TrainingDay extends Component {
//   constructor() {
//     super();
//     this.state = { day: {} };
//   }
//
//   componentDidMount() {
//     fetch('/api/days/' + this.props.match.params.id)
//     .then(data => data.json())
//     .then(day => this.setState({ day }));
//   }
//
//   render() {
//     return (
//       <div className="container">
//         Comments: {this.state.day.comments} <br />
//         Weather: {this.state.day.weather}
//         <div>
//           <SessionList id={this.props.match.params.id}/>
//         </div>
//       </div>
//   )
// }
// }

class TrainingDayList extends Component {
  constructor() {
    super();
    this.state = {
      days: []
    };
  }

  getSessionsByDay(day_id) {
    return fetch('http://localhost:8000/api/sessions/?day=' + day_id)
    .then(response => response.json())
  }

  getTrainingDays() {
    getTrainingDaysData().then((days) => {
      let promises = [];
      days.forEach(function(item) {
        let promise = this.getSessionsByDay(item.id).then((sessions) => {
          item['sessions'] = sessions
        })
        promises.push(promise)
      }, this)
      Promise.all(promises).then(a => {
        days = orderBy(days, ['date'], ['desc'])
        this.setState({ days })
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getTrainingDays()
  }

  goToDay(id) {
    window.location = '/day/' + id;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={6} >
            <Paper className={classes.paper}>
              <List component="nav">
                {this.state.days.map(day => (
                  <ListItem button key={day.id}>
                    <ListItemText primary={moment(day.date).format('YYYY-MM-DD')} />
                      <ListItemSecondaryAction>
                        {day.sessions.map(session => (
                            <IconButton key={session.id}>
                              {session.rest ? <Icon>beach_access</Icon> : <Icon>fitness_center</Icon>}
                            </IconButton>
                          ))}
                      </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(TrainingDayList);
