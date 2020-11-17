const express = require('express');

const router = express.Router();

const {
  get,
  getById,
  insert,
  update,
  remove,
} = require('./postDb')

router.get('/', (req, res) => {
   get().then(a => res.send(a));
});

router.get('/:id', (req, res) => {
  getById(req.body.id).then(a => res.send(a));
});

router.delete('/:id', (req, res) => {
  remove(req.body.id).then(a => res.send(a))
});

router.put('/:id', validatePostId, (req, res) => {
    update(req.body.id, req.body).then(a => res.send(a))
});


function validatePostId(req, res, next) {
  if(!req.body) res.status(400).send({ message: "missing post data" })
  if(!req.body.text) res.status(400).send({ message: "missing required text field" })
  next();
}

module.exports = router;
