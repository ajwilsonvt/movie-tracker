import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Welcome from './Welcome'
import Home from './Home'
import SignUp from './SignUp'
import LogIn from './LogIn'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {loggedIn: true}
  }

  render() {
    var nav = ''
    if (this.state.loggedIn) {
      nav = <nav>
              <Link to="/profile">Profile</Link>
              <a href="http://localhost:3000/logout">Log Out</a>
            </nav>
    } else {
      nav = <nav>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </nav>
    }

    return (
      <div>
        <Router>
          <div>
            <header>
              <Link to={this.state.loggedIn ? "/home" : "/"} className="logo">
                <h1 className="thin">T</h1>
              </Link>
              {nav}
            </header>
            <Route exact path="/" component={Welcome} />
            <Route path="/home" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
