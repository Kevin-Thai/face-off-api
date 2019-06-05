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

{/*Old database before SQL
const database = {
  users: [
    {
      id:'123',
      name: 'John',
      password: 'cookies',
      email: 'john@email.com',
      entries: 0,
      joined: new Date()
    },
    {
      id:'124',
      name: 'Sally',
      password: 'bananas',
      email: 'sally@email.com',
      entries: 0,
      joined: new Date()
    }
  ],
  // login: [
  //   {
  //     id: '987',
  //     hash: '',
  //     email:'john@gmail.com'
  //   }
  // ]
}

Code to test whether our connection to the database was working
knex.select('*').from('users').then(data => {
  console.log(data);
});
*/}

app.get('/', (req, res) => { res.send(users) })
app.post('/signin', signin.handleSignin(knex, bcrypt))
app.post('/register', register.handleRegister(knex, bcrypt))
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, knex)})
app.put('/image', (req, res) => {image.handleImage(req, res, knex)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('works')
})

{/*
/                 --> res = this is working
/signin           --> POST (posting data, JSON; user information)  = success/fail
/register         --> POST (add data to the database or variable with new user info) = user
/profile/:userID  --> GET (get user information) = user
/image            --> PUT (updates user profile) = user or change to user
*/}