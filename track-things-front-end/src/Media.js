import React, { Component } from 'react';

const API_KEY = '65c3211ef9289b84310d59dbe3f5888f'

class Media extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      unseenMedias: [],
      seenMedias: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMediaBoxClick = this.handleMediaBoxClick.bind(this)

    this.initialize()
  }

  initialize() {
    var url = 'http://localhost:3002/media_lists/'

    fetch(url + 'unseen')
      .then(response => response.json())
      .then(data => {
        var unseenMedias = data.map(media => {
          return (
            <div className="form-control media-box"
                 key={media.id}
                 id={media.id}
                 onClick={e => this.handleMediaBoxClick(e, 'unseen')}>
              <img src={media.tmdb_poster} alt="poster" />
              <p className="title">{media.title}</p>
              <p>{media.rating}</p>
            </div>
          )
        })

        fetch(url + 'seen')
          .then(response => response.json())
          .then(data => {
            var seenMedias = data.map(media => {
              return (
                <div className="form-control media-box"
                     key={media.id}
                     id={media.id}
                     onClick={e => this.handleMediaBoxClick(e, 'seen')}>
                  <img src={media.tmdb_poster} alt="poster" />
                  <span className="title"><p>{media.title}</p></span>
                  <p>{media.rating}</p>
                </div>
              )
            })

            this.setState({
              unseenMedias: unseenMedias,
              seenMedias: seenMedias
            })
          })
      })
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    var url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${this.state.value}&page=1&include_adult=false`
    var myRequest

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('API Success: all results', data.results)
        console.log('API Success: first result', data.results[0])

        var media = data.results[0]
        myRequest = new Request('http://localhost:3002/media', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            media: {
              id: media.id,
              type: media.media_type,
              title: media.media_type === 'tv' ? media.name : media.title,
              vote_average: media.vote_average,
              backdrop_path: media.backdrop_path,
              poster_path: media.poster_path,
              release_date: media.media_type === 'tv' ? media.first_air_date : media.release_date,
              overview: media.overview
            }
          })
        })
      })
      .then(() => {
        fetch(myRequest)
          .then(response => {
            var s = response.status
            if (s === 200 || s === 422) return response.json()
            else throw new Error(response.statusText)
          })
          .then(data => {
            console.log('success', data)

            this.initialize()
            this.setState({value: ''})
          })
          .catch(error => console.error('Internal Server', error))
      })
      .catch(error => console.error('API', error))
  }

  handleMediaBoxClick(event, status) {
    console.log(event.currentTarget.id, status)

    var myRequest = new Request('http://localhost:3002/media_lists/' + event.currentTarget.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        media_status: status === 'seen' ? 'unseen' : 'seen'
      })
    })

    fetch(myRequest)
      .then(response => {
        var s = response.status
        if (s === 200) return response.json()
        else throw new Error(response.statusText)
      })
      .then(data => {
        this.initialize()
      })
      .catch(error => console.error('Internal Server', error))
  }

  render() {
    return (
      <div className="home-card">
        <form onSubmit={this.handleSubmit} className="form-group">
          <input type="text"
                 placeholder="Add a movie or TV show..."
                 value={this.state.value}
                 onChange={this.handleChange}
                 className="form-control" />
        </form>
        <div className="display">
          <div className="unseen">
            <h2>To Watch</h2>
            {this.state.unseenMedias}
          </div>
          <div className="seen">
            <h2>Watched</h2>
            {this.state.seenMedias}
          </div>
        </div>
      </div>
    )
  }
}

export default Media
