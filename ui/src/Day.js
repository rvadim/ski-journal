import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import moment from 'moment'
import 'moment-duration-format';

import {
  getDayById,
  getSessionsByDay,
  getExercisesBySession,
  getExerciseTypesData } from './utils/Api'

import find from 'lodash/find'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Timer from '@material-ui/icons/Timer';
import Straighten from '@material-ui/icons/Straighten';
import Favorite from '@material-ui/icons/Favorite';
import Whatshot from '@material-ui/icons/Whatshot';

const styles = theme => ({
  root: {
    margin: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
  },
  chip: {
    marginBottom: 10,
    marginRight: 15
  },
});

class TrainingDay extends Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      types: [],
      day: [],
     };
  }

  getDay() {
    getDayById(this.props.match.params.id).then((day) => {
      day = day[0]
      this.setState({ day })
    })
  }

  getExerciseTypes() {
    getExerciseTypesData().then((types) => {
      this.setState({ types })
    })
  }

  getSessions() {
    getSessionsByDay(this.props.match.params.id).then((sessions) => {
      let promises = [];
      sessions.forEach(function(session) {
        let promise = getExercisesBySession(session.id).then((exercises) => {
          session['exercises'] = exercises
        })
        promises.push(promise)
      }, this)
      Promise.all(promises).then(a => {
        this.setState({ sessions })
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  calculateDayDetails() {
    let total_duration = moment.duration();
    let total_distance = 0;
    this.state.sessions.forEach(function(session) {
      session.exercises.forEach(function(exercise) {
        total_duration.add(moment.duration(exercise.duration, 's')).seconds();

        total_distance += exercise.distance;
      })
    })

    return { distance: total_distance, duration: total_duration.format("HH:mm:ss") }
  }

  componentDidMount() {
    this.getDay()
    this.getSessions()
    this.getExerciseTypes()
  }

  render() {
    const { classes } = this.props;


    return (
      <div className={classes.root}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={6} >
            <Paper className={classes.paper}>
            <Typography variant="display1">
              {moment(this.state.day.date).format('YYYY-MM-DD')}
            </Typography>
            <Typography component="p">
              <DayDetails details={this.calculateDayDetails()} />
            </Typography>
            </Paper>
            {this.state.sessions.map(session => (
              <Paper className={classes.paper} key={session.id}>
                <SessionDetails exercises={session.exercises} types={this.state.types}/>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </div>
    )
  }
}

class DayDetails extends Component {
  render() {
    return (
      <div>
        <Chip
          avatar={<Avatar><Timer /></Avatar>}
          label={this.props.details.duration}
          style={{ marginBottom: 10, marginRight: 15}}
        />
        <Chip
          avatar={<Avatar><Straighten /></Avatar>}
          label={this.props.details.distance + " км"}
          style={{ marginBottom: 10, marginRight: 15}}
        />
        <Chip
          avatar={<Avatar><Favorite /></Avatar>}
          label="? уд/мин"
          style={{ marginBottom: 10, marginRight: 15}}
        />
        <Chip
          avatar={<Avatar><Whatshot /></Avatar>}
          label="? кКал"
          style={{ marginBottom: 10, marginRight: 15}}
        />
      </div>
    )
  }
}

class SessionDetails extends Component {
  getExerciseByType(type_id) {
    let type = find(this.props.types, ['id', type_id])
    return type.name
  }

  render() {
    const data = this.props.exercises
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Содержание тренировки</TableCell>
            <TableCell numeric>Дистанция (км)</TableCell>
            {/*
              <TableCell numeric>Middle (км)</TableCell>
              <TableCell numeric>High (км)</TableCell>
              <TableCell numeric>Объем</TableCell>
            */}
            <TableCell numeric>Время</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {this.getExerciseByType(n.type)}
                </TableCell>
                <TableCell numeric>{n.distance}</TableCell>
                {/*
                  <TableCell numeric>{n.distance_middle}</TableCell>
                  <TableCell numeric>{n.distance_high}</TableCell>
                  <TableCell numeric>{n.distance_low + n.distance_middle + n.distance_high}</TableCell>
                */}
                <TableCell numeric>{n.duration}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(styles)(TrainingDay, DayDetails, SessionDetails);
