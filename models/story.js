const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
  date: Date,
  content: String,
  likes: Number,
  genres: Array,
/*  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author'
  } */
})

storySchema.statics.format = (story) => {
  return {
    id: story._id,
    date: story.date,
    content: story.content,
    likes: story.likes,
    genres: story.genres
    //author: story.author
  }
}

const Story = mongoose.model('Story', storySchema)

module.exports = Story
