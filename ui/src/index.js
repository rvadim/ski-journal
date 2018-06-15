/*import React from 'react';*/
//import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
/*registerServiceWorker();*/

import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom';
// import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { TrainingDay } from './TrainingDay';
import { TrainingDayForm } from './add/forms'
import NavBar from './Navigation';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


const rootElement = document.querySelector('#root');
if (rootElement) {
  render((
    <Router>
      <div>
        <NavBar />
        <Route path="/day/:id" component={TrainingDay} />
        <Route path="/add" component={TrainingDayForm} />
      </div>
    </Router>
  ), rootElement);
}
//registerServiceWorker();
