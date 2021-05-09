const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }

app.get('/', (req,res) => {res.send("It is working")});
app.post('/signin', (req,res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req,res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req,res) => profile.handleProfile(req,res,db));
app.put('/image', (req,res) => image.submitImage(req, res, db));
app.post('/imageurl', (req,res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 3000, ()=> {
    console.log('listening......');
})