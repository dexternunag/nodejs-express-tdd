var express = require('express');
var router = express.Router();
var createError = require('http-errors');

const todos = [
  {
    id: 1,
    name: 'Do cleaning',
    completed: false
  },
  {
    id: 2,
    name: 'Do eatign',
    completed: true
  },
  {
    id: 3,
    name: 'Do coding',
    completed: false
  },
]

/* GET todos listing. */
router.get('/', function(req, res, next) {
  res.status(200).json(todos)
});

/* GET specific todo. */
router.get('/:id', function(req, res, next) {
  const todo = todos.find(todo => todo.id === Number(req.params.id))

  if (!todo) return next(createError(404, 'Not Found'))

  res.status(200).json(todo)
});

/* POST todo. */
router.post('/', function(req, res, next) {

  if (typeof req.body.name !== 'string') return next(createError(422, 'Name validation error'))

  const newTodo = {
    id: todos.length + 1,
    name: req.body.name,
    completed: false
  }

  todos.push(newTodo)

  res.status(201).json(newTodo)
});

module.exports = router;
