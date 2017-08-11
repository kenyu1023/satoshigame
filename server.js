import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT || 3001


const mongodbHost = 'ds161640.mlab.com';
const mongodbPort = '61640';
const authenticate = 'vankyadmin:vanky1234@';
const mongodbDatabase = 'heroku_wg2xkfhc';

var url = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;
console.log(url);

app.use(express.static(path.join(__dirname, 'client/public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(url,{ useMongoClient: true }, dbErr => {
  if (dbErr) throw new Error(dbErr)
  else console.log('db connected')

  app.post('/api/users', (request, response) => {
    const { name, password } = request.body

    new User({
      name,
      password,
      status : 1
    }).save(err => {
      if (err) response.status(500)
      else {
        User.find({}, (findErr, userArray) => {
          if (findErr) response.status(500).send()
          else response.status(200).send(userArray)
        })
      }
    })
  })

  app.get('/api/users', (request, response) => {
    User.find({}, (err, userArray) => {
      if (err) response.status(500).send()
      else response.status(200).send(userArray)
    })
  })

  app.put('/api/users', (request, response) => {
    const { id } = request.body
    console.log(id);
    // User.findByIdAndUpdate(id, { upassword: {"age": 1} }, err => {
    //   if (err) response.status(500).send()
    //   else {
    //     User.find({}, (findErr, userArray) => {
    //       if (findErr) response.status(500).send()
    //       else response.status(200).send(userArray)
    //     })
    //   }
    // })
  })

  app.delete('/api/users', (request, response) => {
    const { id } = request.body
    User.findByIdAndRemove(id, err => {
      if (err) response.status(500).send()
      else {
        User.find({}, (findErr, userArray) => {
          if (findErr) response.status(500).send()
          else response.status(200).send(userArray)
        })
      }
    })
  })

  app.listen(port, err => {
    if (err) throw new Error(err)
    else console.log(`listening on port ${port}`)
  })
})