import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://localhost/api';

class MediaLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      lists: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.initialize();
  }

  initialize() {
    const url = `${BASE_URL}/medias/lists`;

    fetch(url, {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then((data) => {
        const lists = data.mediaLists.map(mediaList => (
          <div key={mediaList.id} className="block">
            <div className="inline-block">
              <Link to={`/movietracker/medialists/${mediaList.id}`}>
                <button className="btn btn-primary pointer">
                  {mediaList.name}
                </button>
              </Link>
              <button
                type="button"
                className="close lists-close-position"
                aria-label="Close"
                onClick={e => this.handleDeleteClick(e, mediaList.id)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        ));
        this.setState({ lists });
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = `${BASE_URL}/medias/lists`;

    const myRequest = new Request(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.value,
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

        this.setState({ value: '' });
        this.initialize();
      })
      .catch(error => console.error('Internal Server', error));
  }

  handleDeleteClick(event, mediaListId) {
    const url = `${BASE_URL}/medias/lists/${mediaListId}`;

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
      <div className="home-card">
        <form onSubmit={this.handleSubmit} className="form-group">
          <input
            type="text"
            placeholder="Create a new Media List..."
            value={this.state.value}
            onChange={this.handleChange}
            className="form-control"
          />
        </form>
        <div className="medialists-card">
          <h2>Media Lists</h2>
          {this.state.lists}
        </div>
      </div>
    );
  }
}

export default MediaLists;
