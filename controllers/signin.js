const handleSignin = (knex, bcrypt) => (req, res) => {
  const {email,password} = req.body;
  if (!email || !password) {
    return res.status(400).json('Incorrect form submission')
  }
  knex.select('email', 'hash').from('login')
  .where({email})
  .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash)
    if(isValid) {
      return knex.select('*').from('users')
      .where('email', '=', email)
      .then(user => {
        res.json(user[0])
      })
      .catch(err => res.status(400).json('Unable to get user'))
    } else {
      res.status(400).json('Wrong credentials')
    }
  })
  .catch(err => res.status(400).json('Wrong credentials'))
  {/* Old database function
  bcrypt.compare(req.body.password, hash, (err, res) => {
    console.log(res)
  })
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
    res.json(database.users[0])
  } else {
    res.status(400).json('error logging in')
  }*/}
}

module.exports = {
  handleSignin: handleSignin
}