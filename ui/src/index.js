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
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import TrainingDayList from './TrainingDay';
import TrainingDay from './Day';
import TrainingDayForm from './add/forms'
import NavBar from './Navigation';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


const rootElement = document.querySelector('#root');
if (rootElement) {
  render((
    <MuiPickersUtilsProvider utils={MomentUtils} >
      <CssBaseline />
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={TrainingDayList} />
          <Route exact path="/add" component={TrainingDayForm} />
          <Route exact path="/day/:id" component={TrainingDay} />
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  ), rootElement);
}
//registerServiceWorker();
