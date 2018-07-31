import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import DatePicker from 'material-ui-pickers/DatePicker';
import TextField from '@material-ui/core/TextField';

import Icon from '@material-ui/core/Icon';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import Snackbar from '@material-ui/core/Snackbar';

import { GetCSRF } from '../utils/Common'
import { doRequest } from '../utils/Api'

import ExerciseForm from '../exercise/Add'

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
  myform: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  mybutton: {
    marginTop: 15,
  },
  myicon: {
    paddingRight: 30
  }
});


class TrainingDayForm extends Component {
  state = {
    selectedDate: new Date(),
    comment: '',
    weather: '',
    health: null,
    sleep: null,
    appetite: null,
    mood: null,
    smiles: [
      {icon: 'mood_bad', value: 1},
      {icon: 'sentiment_very_dissatisfied', value: 2},
      {icon: 'sentiment_dissatisfied', value: 3},
      {icon: 'sentiment_satisfied_alt', value: 4},
      {icon: 'mood', value: 5},
    ],
    open: false,
    rest: null,
    day: {},
    session: null,
    data: [],
  }

  createSession(day) {
    let body = {
      day: day,
      rest: this.state.rest === 1 ? true : false,
    }
    doRequest('http://localhost:8000/api/sessions', GetCSRF(), body).then((response) => {
      if (response.ok) {
        response.json().then(session => {
          this.setState({ session: session.id })
        });
        window.location.href = 'http://localhost:3000/'
      }
    }).catch((error) =>
      console.log(error)
    )
  }

  createTrainingDay(body) {
    doRequest('http://localhost:8000/api/days', GetCSRF(), body).then((response) => {
      if (response.ok) {
        response.json().then(day => {
          this.createSession(day.id)
        });
      }
    }).catch((error) =>
      console.log(error)
    )
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  handleSmile = (value, key) => {
    this.setState({
      [key]: value,
    });
  }

  handleChange = (key) => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleClick = (e) => {
    if (!this.state.rest || this.state.weather === '' || !this.state.health ||
        !this.state.sleep || !this.state.appetite || !this.state.mood) {
      this.setState({open: true})
      return
    }
    let body = {
      date: this.state.selectedDate,
      comment: this.state.comment,
      weather: this.state.weather,
      health: this.state.health,
      sleep: this.state.sleep,
      appetite: this.state.appetite,
      mood: this.state.mood,
      owner: 1
    }
    this.createTrainingDay(body)
  }

  renderSmile(smile, type) {
    return (
      <FormControlLabel key={smile.value} required
        control={
          <Radio
            checked={this.state[type] === smile.value}
            onChange={this.handleSmile.bind(this, smile.value, type)}
            value={smile.value.toString()}
            icon={<Icon>{ smile.icon }</Icon>}
            checkedIcon={<Icon>{ smile.icon }</Icon>}
            color='primary'
          />
        }
      />
    )
  }

  handleData = (value) => {
    this.setState({ data: value });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}> {/*justify="center" */}
          <Grid item xs={3} >
            <Paper className={classes.paper}>
              <FormControl className={classes.myform} required style={{ display: 'inline'}}>
                <FormControlLabel label="Отдых"
                  control={
                    <Radio
                      checked={this.state.rest === "1"}
                      onChange={this.handleChange('rest')}
                      value="1"
                    />
                  }
                />
              <FormControlLabel label="Тренировка"
                  control={
                    <Radio
                      checked={this.state.rest === "0"}
                      onChange={this.handleChange('rest')}
                      value="0"
                    />
                  }
                />
              </FormControl>

                <FormControl className={classes.myform} required>
                  <FormLabel>Дата</FormLabel>
                  <DatePicker
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    animateYearScrolling={false}
                  />
                </FormControl>

                <FormControl className={classes.myform} fullWidth>
                  <FormLabel>Комментарий</FormLabel>
                  <TextField
                    value={this.state.comment}
                    multiline={true}
                    rows={2}
                    onChange={this.handleChange('comment')}
                  />
                </FormControl>

                <FormControl className={classes.myform} fullWidth required>
                  <FormLabel>Погода</FormLabel>
                  <TextField
                    value={this.state.weather}
                    multiline={true}
                    rows={2}
                    onChange={this.handleChange('weather')}
                  />
                </FormControl>

                <FormControl className={classes.myform} fullWidth required>
                  <FormLabel>Самочувствие</FormLabel>
                    <div>
                      { this.state.smiles.map((smile, index) => {
                        return this.renderSmile(smile, 'health')
                      }) }
                    </div>
                </FormControl>

                <FormControl className={classes.myform} fullWidth required>
                  <FormLabel>Сон</FormLabel>
                    <div>
                      { this.state.smiles.map((smile, index) => {
                        return this.renderSmile(smile, 'sleep')
                      }) }
                    </div>
                </FormControl>

                <FormControl className={classes.myform} fullWidth required>
                  <FormLabel>Аппетит</FormLabel>
                    <div>
                      { this.state.smiles.map((smile) => {
                        return this.renderSmile(smile, 'appetite')
                      }) }
                    </div>
                </FormControl>

                <FormControl className={classes.myform} fullWidth required>
                  <FormLabel>Настроение</FormLabel>
                    <div>
                      { this.state.smiles.map((smile) => {
                        return this.renderSmile(smile, 'mood')
                      }) }
                    </div>
                </FormControl>
            </Paper>
          </Grid>
          <ExerciseForm session={this.state.session} onChange={this.handleData}/>


        </Grid>
        <Button variant="contained" color="primary" className={classes.mybutton} onClick={this.handleClick}>Save</Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={<span>Заполните все обязательные поля</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
          ]}

        />
      </div>
    );
  }
}

export default withStyles(styles)(TrainingDayForm);
