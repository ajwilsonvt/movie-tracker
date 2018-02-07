var express = require('express');
var router = express.Router();

var db = require('../models');

/* CREATE media */
router.post('/', (req, res) => {
  var media = req.body.media;
  
  db.media.find({where: {tmdb_id: media.id}})
    .then(data => {
      if (!data) {
        console.log('not found, creating db entry now');

        db.media.create({
          tmdb_id: media.id,
          media_type: media.type,
          title: media.title,
          rating: media.vote_average,
          tmdb_backdrop: media.backdrop_path ? 'https://image.tmdb.org/t/p/w780' + media.backdrop_path : null,
          tmdb_poster: media.poster_path ? 'https://image.tmdb.org/t/p/w780' + media.poster_path : null,
          release_date: media.release_date,
          overview: media.overview
        })
          .then(m => {
            db.media_list_media.create({
              media_list_id: 1, // refactor for multiple users and lists
              media_id: m.id,
              media_status: 'unseen',
              media_notes: null
            });
          })
          .catch(err => {
            console.log(err);

            res.status(500).json(err);
          });
      } else {
        res.status(422).json('already exists');
      }
    })
    .catch(err => {
      console.log(err);

      res.status(500).json(err);
    });
});

/* INDEX media */
router.get('/', (req, res) => {
  db.media.findAll({order: [['rating', 'DESC']]})
    .then(media => res.json(media))
    .catch(err => {
      console.log(err);

      res.status(500).json(err);
    });
});

/* INDEX media by media_type */
router.get('/type/:type', (req, res) => {
  db.media.findAll({
    where: {media_type: req.params.type},
    order: [['rating', 'DESC']]
  })
    .then(media => {
      if (!media) throw new Error('not found');
      res.json(media);
    })
    .catch(err => {
      console.log(err);

      res.status(500).json(err);
    });
});

/* NEW media on front-end */

/* SHOW media */
router.get('/:id', (req, res) => {
  db.media.findById(req.params.id)
    .then(media => {
      if (!media) throw new Error('not found');
      res.json(media);
    })
    .catch(err => {
      console.log(err);

      res.status(500).json(err);
    });
})

/* EDIT media on front-end */

/* UPDATE media */
router.put('/:id', (req, res) => {
  db.media.findById(req.params.id)
    .then(media => {
      if (!media) throw new Error('not found');
      media.updateAttributes(req.body);
    })
    .then(() => res.json('success'))
    .catch(err => {
      console.log(err);

      res.status(500).json(err);
    });
});

/* DELETE media */
router.delete('/:id', (req, res) => {
  db.media.destroy({where: {id: req.params.id}})
    .then(res.json('success'))
    .catch(err => {
      console.log(err);

      res.status(500).json(err);
    });
});

module.exports = router;
