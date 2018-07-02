import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { getSessionsByDay, getExercisesBySession, getExerciseTypesData } from './utils/Api'

import find from 'lodash/find'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
});

class TrainingDay extends Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      types: [],
     };
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

  componentDidMount() {
    this.getSessions()
    this.getExerciseTypes()
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={6} >
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

class SessionDetails extends Component {
  getExerciseByType(type_id) {
    let type = find(this.props.types, ['id', type_id])
    return type.name
  }

  render() {
    const { classes } = this.props;

    const data = this.props.exercises
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Содержание тренировки</TableCell>
            <TableCell numeric>Low (км)</TableCell>
            <TableCell numeric>Middle (км)</TableCell>
            <TableCell numeric>High (км)</TableCell>
            <TableCell numeric>Объем</TableCell>
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
                <TableCell numeric>{n.distance_low}</TableCell>
                <TableCell numeric>{n.distance_middle}</TableCell>
                <TableCell numeric>{n.distance_high}</TableCell>
                <TableCell numeric>{n.distance_low + n.distance_middle + n.distance_high}</TableCell>
                <TableCell numeric>{n.duration}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(styles)(TrainingDay, SessionDetails);
