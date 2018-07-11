const authorsRouter = require('express').Router()
const Author = require('../models/author')

authorsRouter.get('/', async (req, res) => {
  const authors = await Author.find({})

  res.json(authors.map(Author.format))
})

module.exports = authorsRouter
