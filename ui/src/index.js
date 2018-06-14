/*import React from 'react';*/
//import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
/*registerServiceWorker();*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { TrainingDay } from './TrainingDay';
import { TrainingDayForm } from './add/forms'
import NavBar from './Navigation';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

ReactDOM.render((
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={App} />
      <Route path="/day/:id" component={TrainingDay} />
      <Route path="/add" component={TrainingDayForm} />
    </div>
  </Router>
), document.getElementById('root'));

//registerServiceWorker();
