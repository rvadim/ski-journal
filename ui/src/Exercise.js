import React, { Component } from 'react';

class ExerciseList extends Component {
  constructor() {
    super();
    this.state = {
      exercises: []
    };
  }

  componentDidMount() {
    fetch('/api/exercises/?session=' + this.props.id)
    .then(data => data.json())
    .then(exercises => this.setState({ exercises }));
  }

  render() {
    return (
      <Table data={this.state.exercises} />
    )
  }
}

let Table = (props) =>
  <table className='bordered striped'>
    <thead>
        <tr>
            <td>Название</td>
            <td>Тип</td>
            <td>Продолжительность</td>
        </tr>
    </thead>
    <tbody>
      { props.data.map((exercise) =>
        <TableRow key={exercise.id} data={exercise} />)}
    </tbody>
  </table>;

let TableRow = (props) =>
  <tr>
    <td>{props.data.name}</td>
    <td>{props.data.type}</td>
    <td>{props.data.duration}</td>
  </tr>;

export default ExerciseList;
