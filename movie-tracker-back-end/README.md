# movie-tracker

### unit-4-project-back-end

## todo

- user authentication using bcrypt and jwts
- auth flow to home page
- finish back-end routes

## notes

- express app
- mocha, chai, supertest unit testing
- istanbul code coverage

```js
// creation with findOrCreate() results in TypeError: Cannot read property '0' of undefined
// fixed by refactoring to find() and create()

db.media.findOrCreate({
  where: { tmdb_id: media.id },
  defaults: {
    tmdb_id: media.id,
    media_type: media.type,
    title: media.title,
    rating: media.vote_average,
    tmdb_backdrop: 'https://image.tmdb.org/t/p/w780' + media.backdrop_path,
    tmdb_poster: 'https://image.tmdb.org/t/p/w780' + media.poster_path,
    release_date: media.release_date,
    overview: media.overview
  }
})
  .spread((media, created) => {
    if (created) res.json('updated db');
    else res.status(422).json('already exists');
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
```
