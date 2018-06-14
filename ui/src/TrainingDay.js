import React, { Component } from 'react';
import SessionList from './Sessions';
import { Link } from 'react-router-dom';
import { Table, Button } from '@material-ui/core';

class TrainingDay extends Component {
  constructor() {
    super();
    this.state = { day: {} };
  }

  componentDidMount() {
    fetch('/api/days/' + this.props.match.params.id)
    .then(data => data.json())
    .then(day => this.setState({ day }));
  }

  render() {
    return (
      <div className="container">
        Comments: {this.state.day.comments} <br />
        Weather: {this.state.day.weather}
        <div>
          <SessionList id={this.props.match.params.id}/>
        </div>
      </div>
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

  componentDidMount() {
    fetch('/api/days/')
    .then(data => data.json())
    .then(days => this.setState({ days }));
  }

  goToDay(id) {
    window.location = '/day/' + id;
  }

  render() {
    return(
      <div className="container">
      <Table>
        <thead>
          <tr>
            <td data-filed="date">Дата</td>
            <td data-field="comments">Коментарий</td>
            <td>Самочуствие/Сон/Аппетит/Настроение</td>
            <td data-field="weather">Погода</td>
            <td>Детали</td>
          </tr>
        </thead>
          {this.state.days.map((day) =>
            <tr>
              <td>{day.date}</td>
              <td>{day.comments}</td>
              <td>{day.health}/{day.sleep}/{day.appetite}/{day.mood}</td>
              <td>{day.weather}</td>
              <td><Link to={"/day/" + day.id}><Button floating waves='light' icon='pageview'></Button></Link></td>
            </tr>
          )}
        <tbody>
        </tbody>
      </Table>
      </div>
    )
  }
}

export {
  TrainingDay,
  TrainingDayList,
}
