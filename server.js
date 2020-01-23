const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require("knex")({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'face-recognition'
  }
});
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send(users) })
app.post('/signin', signin.handleSignin(knex, bcrypt))
app.post('/register', register.handleRegister(knex, bcrypt))
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, knex)})
app.put('/image', (req, res) => {image.handleImage(req, res, knex)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('Server running on port 3000')
})
