// external impors
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
// component imports
import Main from './components/pages/Main';
// internal css imports
import './global.scss';

function App() {
  return (
    <div className="app">
      <CssBaseline>
        <Router>
          <Route path="/" component={Main} />
        </Router>
      </CssBaseline>
    </div>
  );
}

export default App;
