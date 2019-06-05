const handleRegister = (knex, bcrypt) => (req, res) => {
  const {email,name,password} = req.body;
  {/*Ascynchronous bcrypt
  bcrypt.hash(password, null, null, (err, hash) => {
    console.log(hash)
  })*/}
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission')
  }
  const hash = bcrypt.hashSync(password);
  knex.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email,
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
      .returning('*')
      .insert({
        email: loginEmail[0],
        name: name,
        joined: new Date()
      })
      .then(user => {
        res.json(user[0]);
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('Error registering'))

  {/* Old database function
  database.users.push({
    id:'125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1])
*/}
}

module.exports = {
  handleRegister
}