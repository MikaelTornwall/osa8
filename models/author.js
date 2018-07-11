const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  date: Date,
  username: String,
  bio: String,
  preferences: Array
})

authorSchema.statics.format = (author) => {
  return {
  id: author._id,
  date: author.date,
  username: author.username,
  bio: author.bio,
  preferences: author.preferences
  }
}

const Author = mongoose.model('Author', authorSchema)

module.exports = Author
