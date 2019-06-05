const clarifai = require('clarifai')

const app = new Clarifai.App({
 apiKey: '9e8348833deb4fe59e3e63b1aa956c93'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('API error'))
}

const handleImage = (req, res, knex) => {
  const { id } = req.body;
  knex('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
  })
  .catch(err => res.status(400).json('Unable to get entries'))

  {/* Old database function
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(400).json('Not found')
  }*/}
}

module.exports = {
  handleImage,
  handleApiCall
}