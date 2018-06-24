import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Welcome from './Welcome';
import MediaLists from './MediaLists';
import MediaList from './MediaList';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <header>
              <Link to="/movietracker" className="logo">
                <h1 className="thin">M</h1>
              </Link>
              <nav>
                <Link to="/movietracker/medialists">Media Lists</Link>
              </nav>
            </header>
            <Route exact path="/movietracker" component={Welcome} />
            <Route exact path="/movietracker/medialists" component={MediaLists} />
            <Route exact path="/movietracker/medialists/:mediaListId" component={MediaList} />
          </div>
        </Router>
        <a href="/profile">
          <button className="btn btn-info exit-btn">
            Back to Profile
          </button>
        </a>
      </div>
    );
  }
}

export default App;
