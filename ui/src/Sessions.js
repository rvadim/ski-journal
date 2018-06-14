import React, { Component } from 'react';
import ExerciseList from './Exercise'
import { Collapse } from '@material-ui/core'

class SessionList extends Component {
  constructor() {
    super();
    this.state = {
      sessions: []
    };
  }

  componentDidMount() {
    fetch('/api/sessions/?day='+this.props.id)
    .then(data => data.json())
    .then(sessions => this.setState({ sessions }));
  }

/*  render() {*/
    //return (
      //<Collapsible popout>

        //{ this.state.sessions.map((session) =>
          //<CollapsibleItem header={session.time_of_day} icon='filter_drama'>
            //<ExerciseList id={session.id} />
          //</CollapsibleItem>
        //)}
      //</Collapsible>
    //);
  /*}*/
}


// let Table = (props) =>
//   <div className="row">
//     <div className="col s12">
//       <ul className="tabs">
//         {props.data.map((session) => <Tab data={session} />)}
//       </ul>
//     </div>
//     { props.data.map((session) => <TabContent data={session} />)}
//   </div>
//
// let Tab = (props) =>
//   <li className="tab col s3">
//     <a href={"#session" + props.data.id}>{props.data.id}</a></li>
//
// let TabContent = (props) =>
//   <div id={"session" + props.data.id} className="col s12">
//     <ExerciseList id={props.data.id} />
//   </div>

export default SessionList;
