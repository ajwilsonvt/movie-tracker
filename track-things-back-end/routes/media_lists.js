var express = require('express');
var router = express.Router();

var db = require('../models');

router.get('/:status', (req, res) => {
  db.media_list.find({where: {user_id: 1}})
    .then(list => list.id)
    .then(list_id => {
      return db.media_list_media.findAll({where: {
        media_list_id: list_id,
        media_status: req.params.status
      }});
    })
    .then(list_media => {
      var arr = list_media.map(el => {
        return {id: el.media_id};
      });

      return db.media.findAll({
        where: {$or: arr},
        order: [['rating', 'DESC']]
      });
    })
    .then(media => res.json(media))
    .catch(err => {
      console.log(err);

      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  db.media_list_media.find({where: {
    media_list_id: 1, // refactor for multiple users and lists
    media_id: req.params.id
  }})
    .then(row => {
      if (!row) throw new Error('not found');
      row.updateAttributes(req.body);
    })
    .then(() => res.json('success'))
    .catch(err => {
      console.log(err);

      res.status(500).json(err);
    });
})

module.exports = router;
