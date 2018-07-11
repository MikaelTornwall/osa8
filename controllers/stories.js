const storiesRouter = require('express').Router()
const Story = require('../models/story')

storiesRouter.get('/', async (req, res) => {
  const stories = await Story
  .find({})

  res.json(stories.map(Story.format))
})

storiesRouter.get('/:id', async (req, res) => {
  try {
    const story = await Story
    .findById(req.params.id)

    if (story) {
      res.json(Story.format(story))
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    res.status(400).send({ error: 'malformatted id' })
  }
})

storiesRouter.post('/', async (req, res) => {
  const body = req.body
  try {

    if (body.content === undefined || body.title === undefined) {
      return res.status(400).json({ error: 'missing content' })
    }

    const story = new Story({
      date: new Date(),
      title: body.title,
      content: body.content,
      likes: body.likes === undefined ? 0 : body.likes,
      genres: body.genres
    })

    const savedStory = await story.save()

    res.json(Story.format(story))

  } catch (exception) {
    console.log(exception)
  }
})

module.exports = storiesRouter
