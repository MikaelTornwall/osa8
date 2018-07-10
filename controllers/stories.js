const storiesRouter = require('express').Router()

storiesRouter.get('/', async (req, res) => {
  const stories = await Story
  .find({})
  .populate()

  res.json(stories.map(Story.format))
})

storiesRoutes.get('/:id', async (req, res) => {
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
