import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import moment from 'moment'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import { getTrainingDaysData } from './utils/Api'

import { Link } from 'react-router-dom'
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
  link: {
    textDecoration: 'none'
  }
});

const smiles = [
  {title: 'Самочувствие', value: 'health'},
  {title: 'Сон', value: 'sleep'},
  {title: 'Аппетит', value: 'appetite'},
  {title: 'Настроение', value: 'mood'},
]

class Smile extends Component {
  render() {
    let smile_icon = null
    switch (this.props.value) {
      case 1:
        smile_icon = 'mood_bad'
        break;
      case 2:
        smile_icon = 'sentiment_very_dissatisfied'
        break;
      case 3:
        smile_icon = 'sentiment_dissatisfied'
        break;
      case 4:
        smile_icon = 'sentiment_satisfied_alt'
        break;
      case 5:
        smile_icon = 'mood'
        break;
      default:
        break;
      }

    return (<Tooltip title={this.props.title}><IconButton><Icon>{smile_icon}</Icon></IconButton></Tooltip>)
  }
}

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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={6} >
            <Paper className={classes.paper}>
              <List component="nav">
                {this.state.days.map(day => (
                  <Link to={"/day/" + day.id} className={classes.link} key={day.id}>
                    <ListItem button>
                      {('sessions' in day) && day.sessions.length !== 0 ?
                        <ListItemIcon>
                          <Badge className={classes.margin}
                                 badgeContent={(day.sessions.length === 1) ? '' : day.sessions.length}
                                 color="default">
                            {day.sessions[0].rest ? <Icon>beach_access</Icon> : <Icon>fitness_center</Icon>}
                          </Badge>
                        </ListItemIcon> : null
                      }
                      <ListItemText primary={moment(day.date).format('YYYY-MM-DD')} />
                      <ListItemSecondaryAction>
                        {smiles.map((smile, index) => (
                          <Smile key={index} value={day[smile.value]} title={smile.title}></Smile>
                        ))}

                      </ListItemSecondaryAction>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(TrainingDayList, Smile);
