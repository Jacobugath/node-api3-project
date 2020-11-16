const express = require('express');

const router = express.Router();


const {
  get,
  getById,
  insert,
  update,
  remove,
} = require('./userDb');

router.post('/', validateUser, (req, res) => {
  insert(req.body).then(a => res.send(a));
});
  
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  insert(req.body).then(a => res.send(a));
});

router.get('/', (req, res) => {
  get().then(a => res.send(a));
});

router.get('/:id', validateUserId, (req, res) => {
  const {id} = req.params;
  getById(id).then(a => res.send(a));
});


router.delete('/:id', validateUserId, (req, res) => {
  const {id} = req.params;
  remove(id).then(a => res.send('deleted'));
});

router.put('/:id', validateUserId, (req, res) => {
  const {id} = req.params;
  update(id, req.body).then(a => res.send('updated'))
});

//custom middleware

function validateUserId(req, res, next) {  
    getById(req.params.id).then(a => {
      if(a === undefined) res.status(404).send('no such user')
      req.user = a;
    }).catch(a => console.log('no', a))
  next();
}

function validateUser(req, res, next) {
  if(!req.body) res.status(400).send({message: "missing user data"})
  if(!req.body.name) res.status(400).send({ message: "missing required name field" })
  next();
}

function validatePost(req, res, next) {
  if(!req.body) res.status(400).send({message: "missing post data"})
  if(!req.body.text) res.status(400).send({ message: "missing required text field" })
  next();
}

module.exports = router;
