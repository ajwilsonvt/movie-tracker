import React, { Component } from 'react';

const BASE_URL = 'https://localhost/api';
const TMDB_API_KEY = '65c3211ef9289b84310d59dbe3f5888f';

class MediaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      noteValue: '',
      modalDisplay: null,
      showNote: false,
      noteMediaId: null,
      unseenMedias: [],
      seenMedias: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
    this.handleNoteClose = this.handleNoteClose.bind(this);
    this.handleNevermindClick = this.handleNevermindClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMediaBoxClick = this.handleMediaBoxClick.bind(this);
    this.handleMediaBoxRightClick = this.handleMediaBoxRightClick.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.dataObject = {};
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    const { mediaListId } = this.props.match.params;
    const url = `${BASE_URL}/medias/lists/${mediaListId}/status`;

    fetch(`${url}/unseen`, {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then((data) => {
        const unseenMedias = data.medias.map(media => (
          <div
            className="form-control media-box-wrapper"
            key={media.id}
            id={media.id}
            onClick={e => this.handleMediaBoxClick(e, media.id, 'unseen')}
            onContextMenu={e => this.handleMediaBoxRightClick(e, media.id, 'unseen')}
          >
            <div className="media-box">
              <img src={media.tmdb_poster} alt="poster" />
              <p>{media.title}</p>
              <p>{media.rating}</p>
            </div>
            <button
              type="button"
              className="close list-close-position"
              aria-label="Close"
              onClick={e => this.handleDeleteClick(e, media.id)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ));

        fetch(`${url}/seen`, {
          credentials: 'same-origin',
        })
          .then(response => response.json())
          .then((data) => {
            const seenMedias = data.medias.map(media => (
              <div
                className="form-control media-box-wrapper"
                key={media.id}
                id={media.id}
                onClick={e => this.handleMediaBoxClick(e, media.id, 'seen')}
                onContextMenu={e => this.handleMediaBoxRightClick(e, media.id, 'seen')}
              >
                <div className="media-box">
                  <img src={media.tmdb_poster} alt="poster" />
                  <p>{media.title}</p>
                  <p>{media.rating}</p>
                </div>
                <button
                  type="button"
                  className="close list-close-position"
                  aria-label="Close"
                  onClick={e => this.handleDeleteClick(e, media.id)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ));
            this.setState((prevState, props) => ({
              value: '',
              noteValue: '',
              modalDisplay: null,
              showNote: false,
              noteMediaId: null,
              unseenMedias,
              seenMedias,
            }));
          });
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleNoteChange(event) {
    this.setState({ noteValue: event.target.value });
  }

  handleNevermindClick(event) {
    this.setState({ modalDisplay: null }, () => { this.dataObject = {}; });
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${this.state.value}&page=1&include_adult=false`;

    fetch(url, {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then((data) => {
        // console.log('API Success: all results', data.results)
        // console.log('API Success: first result', data.results[0])

        const modalDisplay = data.results.slice(0, 3).map((media) => {
          this.dataObject[media.id] = media;

          return (
            <div
              className="form-control media-box-wrapper"
              key={media.id}
              id={media.id}
              onClick={e => this.handleResultClick(e, media.id)}
            >
              <div className="media-box">
                <img src={media.poster_path ? `https://image.tmdb.org/t/p/w780${media.poster_path}` : ''} alt="poster" />
                <p>{media.media_type === 'tv' ? media.name : media.title}</p>
                <p>{media.vote_average}</p>
              </div>
            </div>
          );
        });

        modalDisplay.push(<button key={0} className="btn btn-primary pointer" onClick={this.handleNevermindClick}>Nevermind</button>);

        this.setState((prevState, props) => ({
          value: '',
          modalDisplay,
        }));
      })
      .catch(error => console.error('API', error));
  }

  handleNoteSubmit(event, mediaId) {
    const { mediaListId } = this.props.match.params;
    const myRequest = new Request(`${BASE_URL}/medias/lists/${mediaListId}/medias/${mediaId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        media_note: this.state.noteValue,
      }),
      credentials: 'same-origin',
    });

    fetch(myRequest)
      .then((response) => {
        const s = response.status;
        if (s === 200) return response.json();
        throw new Error(response.statusText);
      })
      .then(() => {
        this.initialize();
      })
      .catch(error => console.error('Internal Server', error));
  }

  handleNoteClose(event) {
    this.setState({
      noteValue: null,
      showNote: false,
      noteMediaId: null,
    });
  }

  handleMediaBoxClick(event, mediaId, status) {
    const { mediaListId } = this.props.match.params;
    const url = `${BASE_URL}/medias/lists/${mediaListId}/medias/${mediaId}`;
    fetch(url, {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          noteValue: data.row.media_note,
          showNote: true,
          noteMediaId: mediaId,
        });
      })
      .catch(error => console.error('Internal Server', error));
  }

  handleMediaBoxRightClick(event, mediaId, status) {
    event.preventDefault();
    const { mediaListId } = this.props.match.params;
    const myRequest = new Request(`${BASE_URL}/medias/lists/${mediaListId}/medias/${mediaId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        media_status: status === 'seen' ? 'unseen' : 'seen',
      }),
      credentials: 'same-origin',
    });

    fetch(myRequest)
      .then((response) => {
        const s = response.status;
        if (s === 200) return response.json();
        throw new Error(response.statusText);
      })
      .then(() => {
        this.initialize();
      })
      .catch(error => console.error('Internal Server', error));
  }

  handleResultClick(event, tmdbId) {
    const media = this.dataObject[tmdbId];

    const myRequest = new Request(`${BASE_URL}/medias`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
          overview: media.overview,
        },
        media_list_id: this.props.match.params.mediaListId,
      }),
      credentials: 'same-origin',
    });

    fetch(myRequest)
      .then((response) => {
        const s = response.status;
        if (s === 200 || s === 422) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        // show the user successful response
        // whether 'db updated' or 'already exists'
        console.log('success', data);
        this.dataObject = {};
        this.initialize();
      })
      .catch(error => console.error('Internal Server', error));
  }

  handleDeleteClick(event, mediaId) {
    event.stopPropagation();
    const { mediaListId } = this.props.match.params;
    const url = `${BASE_URL}/medias/lists/${mediaListId}/medias/${mediaId}`;

    const myRequest = new Request(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    });

    fetch(myRequest)
      .then((response) => {
        const s = response.status;
        if (s === 200 || s === 422) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        // show the user successful response
        // whether 'db updated' or 'already exists'
        console.log('success', data);
        this.initialize();
      })
      .catch(error => console.error('Internal Server', error));
  }

  render() {
    return (
      <div>
        {this.state.modalDisplay ?
          <div className="medialist-modal-window">
            <div className="medialist-modal">
              {this.state.modalDisplay}
            </div>
          </div>
          :
          null
        }
        {this.state.showNote ?
          <div className="medialist-modal-window">
            <div className="medialist-modal">
              <input
                type="text"
                placeholder="Add a note..."
                value={this.state.noteValue}
                onChange={this.handleNoteChange}
                className="form-control"
              />
              <button key={0} className="btn btn-primary note-button pointer" onClick={e => this.handleNoteSubmit(e, this.state.noteMediaId)}>Update</button>
              <button key={0} className="btn btn-danger note-button pointer" onClick={e => this.handleNoteClose(e)}>Close</button>
            </div>
          </div>
          :
          null
        }
        <div className="home-card">
          <form onSubmit={this.handleSubmit} className="form-group">
            <input
              type="text"
              placeholder="Add a movie or TV show..."
              value={this.state.value}
              onChange={this.handleChange}
              className="form-control"
            />
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
      </div>
    );
  }
}

export default MediaList;
