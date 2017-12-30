import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Welcome from './Welcome'
import Media from './Media'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {loggedIn: true}
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <header>
              <Link to={"/"} className="logo">
                <h1 className="thin">T</h1>
              </Link>
              <nav>
                <Link to="/media">Media</Link>
              </nav>
            </header>
            <Route exact path="/" component={Welcome} />
            <Route path="/media" component={Media} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
