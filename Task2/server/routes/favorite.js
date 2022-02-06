const router = require('express').Router()
const verified = require('./verifiToken')
const User = require('../model/User')

router.get('/', verified, async (req, res) => {
  // We have access to req.user (which is the id of a user) thanks to "verified"
  const user = await User.findOne({ _id: req.user._id })
  res.json({ favorites: user.favorites })
})

router.put('/add', verified, async (req, res) => {
  const movieID = req.header('movieID')
  const checkIfMovieIsInFavorite = await User.findOne({ favorites: movieID })
  if (!checkIfMovieIsInFavorite) {
    const newFavorite = await User.updateOne({ _id: req.user._id }, { $push: { favorites: movieID } })
    res.status(200).send('Successfully added!')
  } else {
    res.status(400).send('Movie is already in the Favorite list')
  }
})

router.delete('/remove', verified, async (req, res) => {
  const movieID = req.header('movieID')
  const checkIfMovieIsInFavorite = await User.findOne({ favorites: movieID })
  if (checkIfMovieIsInFavorite) {
    const deleteMovie = await User.updateOne({ _id: req.user._id }, { $pull: { favorites: movieID } })
    res.status(200).send('Successfully removed!')
  } else {
    res.status(400).send('Movie in this id is not in the favorites list')
  }
})

module.exports = router
