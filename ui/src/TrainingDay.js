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

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import { getTrainingDaysData, getSessionsByDay, deleteRequest } from './utils/Api'
import { GetCSRF } from './utils/Common'

// import { Link } from 'react-router-dom'
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

class SmileIcons extends Component {
  handleClick = id => () => {
    window.location.href = `http://localhost:3000/day/${ id }`
  }

  handleDelete = id => () => {
    console.log(id)
    deleteRequest(`http://localhost:8000/api/days/${ id }`, GetCSRF()).then((response) => {
      console.log(response.status)
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <ListItem button key={this.props.day.id } onClick={this.handleClick(this.props.day.id)}>
        {('sessions' in this.props.day) && this.props.day.sessions.length !== 0 ?
          <ListItemIcon>
            <Badge className={this.props.styles.margin}
                   badgeContent={(this.props.day.sessions.length === 1) ? '' : this.props.day.sessions.length}
                   color="default">
              {this.props.day.sessions[0].rest ? <Icon>beach_access</Icon> : <Icon>fitness_center</Icon>}
            </Badge>
          </ListItemIcon> : null
        }
        <ListItemText primary={moment(this.props.day.date).format('YYYY-MM-DD')} />
        <ListItemSecondaryAction>
          {smiles.map((smile, index) => (
            <Smile key={index} value={this.props.day[smile.value]} title={smile.title}></Smile>
          ))}
          <IconButton color="secondary"><DeleteIcon onClick={this.handleDelete(this.props.day.id)} /></IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

class TrainingDayList extends Component {
  constructor() {
    super();
    this.state = {
      days: []
    };
  }

  getTrainingDays() {
    getTrainingDaysData().then((days) => {
      let promises = [];
      days.forEach(function(item) {
        let promise = getSessionsByDay(item.id).then((sessions) => {
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
                  <SmileIcons styles={classes} day={day} key={day.id} />
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
