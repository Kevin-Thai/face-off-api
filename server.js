const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

require('dotenv').config()

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    connectionString: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : '',
    ssl: process.env.NODE_ENV === 'production' ? true : '',
  },
})

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(db.users)
})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})
app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db)
})
app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
