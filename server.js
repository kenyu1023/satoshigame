import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import mongoose from 'mongoose'
import User from './server/user'
import Blog from './server/blog'
import Work from './server/work'
import Category from './server/category'
import DevIcon from './server/devicon'

const app = express()
const port = process.env.PORT || 3001


const mongodbHost = 'ds161640.mlab.com';
const mongodbPort = '61640';
const authenticate = 'vankyadmin:vanky1234@';
const mongodbDatabase = 'heroku_wg2xkfhc';

var url = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;
console.log(url);

var loginArray = [];

app.use(express.static(path.join(__dirname, 'client/public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

mongoose.connect(url,{ useMongoClient: true }, dbErr => {
  if (dbErr) throw new Error(dbErr)
  else console.log('db connected')

  // app.get('*', function (request, response){
  //   console.log(response.req.originalUrl);
  //   if(response.req.originalUrl!='/admin'){
  //     response.sendFile(path.resolve(__dirname, 'client/public', 'index.html'))
  //   }else{
  //     response.json({status:'No Access'});
  //   }
  // })

  app.get('/about', function (request, response){
      response.sendFile(path.resolve(__dirname, 'client/public', 'index.html'))
  })

  app.get('/login', function (request, response){
      response.sendFile(path.resolve(__dirname, 'client/public', 'index.html'))
  })

  app.get('/admin', function (request, response){
      response.json({status:'No Access'});
  })

  app.post('/api/users', (request, response) => {
    const { name, upassword } = request.body
    User.find({user:name,password:upassword}, (err, userArray) => {
      if (err) response.json({status:'nodfund'});
      else {
        if(userArray.length == 0){
          response.json({status:'nodata'});
        }else{
          loginArray.push(userArray[0]._id);
          response.json({status:'/admin'});
        }
      }
    })
  })

  app.get('/api/users', (request, response) => {
    User.find({}, (err, userArray) => {
      if (err) response.status(500).send()
      else {
        console.log(loginArray);
        response.json(userArray);
      }
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

  // BLOG ///////////////////////////////

  app.post('/api/blog', (request, response) => {
    const { btitle, bcontent, bimage, bdate } = request.body
    new Blog({
      btitle,
      bcontent,
      bimage,
      bdate
    }).save(err => {
      if (err) response.status(500)
      else {
        response.json({status:'success'});
      }
    })
  })

  app.put('/api/blog', (request, response) => {
    const {id, btitle, bcontent, bimage } = request.body
    Blog.findByIdAndUpdate(id, { btitle, bcontent,bimage }, err => {
      if (err) response.status(500).send()
      else {
        response.json({status:'success'});
      }
    })
  })

  app.get('/api/blog', (request, response) => {
    Blog.find({}, (err, blogArray) => {
      if (err) response.status(500).send()
      else {
        response.json(blogArray);
      }
    }).sort( { _id: -1 } );
  })

  app.delete('/api/blog', (request, response) => {
    const { id } = request.body
    // console.log(id);
    Blog.findByIdAndRemove(id, err => {
      if (err) response.status(500).send()
      else {
        response.json({status:'success'});
      }
    })
  })

  ///////////////////////////////////////

  // Work ///////////////////////////////

  app.post('/api/work', (request, response) => {
    const { wtitle, wurl, wfile, wembed, wcategory, wicons, wcontent, wdate } = request.body
    new Work({
      wtitle, wurl, wfile, wembed, wicons ,wcategory , wcontent, wdate
    }).save(err => {
      if (err) response.status(500)
      else {
        response.json({status:'success'});
      }
    })
  })

  app.put('/api/work', (request, response) => {
    const { id, wtitle, wurl, wfile, wembed, wcategory, wicons, wcontent, wdate } = request.body
    Work.findByIdAndUpdate(id, { 
      "wtitle": wtitle,
      "wurl": wurl,
      "wfile": wfile,
      "wembed": wembed,
      "wcategory": wcategory,
      "wicons": wicons,
      "wcontent": wcontent
    }, err => {
      if (err) response.status(500).send()
      else {
        response.json({status:'success'});
      }
    })
  })

  app.get('/api/work', (request, response) => {
    Work.find().populate('wcategory').populate('wicons').sort( { _id: -1 } ).exec(
      (err, workArray) => {
        if (err) response.status(500).send()
        else {
          response.json(workArray);
        }
      }
    );
  })

  app.delete('/api/work', (request, response) => {
    const { id } = request.body
    // console.log(id);
    Work.findByIdAndRemove(id, err => {
      if (err) response.status(500).send()
      else {
        response.json({status:'success'});
      }
    })
  })

  ///////////////////////////////////////

  // Category ///////////////////////////////

  app.post('/api/category', (request, response) => {
    const { cname } = request.body
    new Category({
      cname
    }).save(err => {
      if (err) response.status(500)
      else {
        response.json({status:'success'});
      }
    })
  })

  app.put('/api/category', (request, response) => {
    const { id, cname } = request.body
    Category.findByIdAndUpdate(id, { "cname": cname }, err => {
      if (err) response.status(500).send()
      else {
        response.json({status:'success'});
      }
    })
  })

  app.get('/api/category', (request, response) => {
    Category.
    aggregate([
    {
      "$lookup": {
          "from": "works",
          "localField": "_id",
          "foreignField": "wcategory",
          "as": "result"
      }
    }]).sort( { _id: 1 } ).exec(
      (err, categoryArray) => {
        if (err) response.status(500).send()
        else {
          response.json(categoryArray);
        }
      }
    );
  })
    // Category.find({}, (err, categoryArray) => {
    //   if (err) response.status(500).send()
    //   else {
    //     response.json(categoryArray);
    //   }
    // }).aggregate([
    // {
    //   $lookup:
    //     {
    //       from: "works",
    //       localField: "wcategory",
    //       foreignField: "_id",
    //       as: "count"
    //     }
    // }]).sort( { _id: 1 } );
  // })

  app.delete('/api/category', (request, response) => {
    const { id } = request.body
    Category.findByIdAndRemove(id, err => {
      if (err) response.status(500).send()
      else {
        response.json({status:'success'});
      }
    })
  })

  ///////////////////////////////////////

  // Icon ///////////////////////////////

  app.post('/api/icon', (request, response) => {
    const { dname, dimage, durl } = request.body
    new DevIcon({
      dname, dimage, durl
    }).save(err => {
      if (err) response.status(500)
      else {
        response.json({status:'success'});
      }
    })
  })

  app.put('/api/icon', (request, response) => {
    const { id, dname, dimage, durl } = request.body
    DevIcon.findByIdAndUpdate(id, { "cname": cname }, err => {
      if (err) response.status(500).send()
      else {
        response.json({status:'success'});
      }
    })
  })

  app.get('/api/icon', (request, response) => {
    DevIcon.
    aggregate([
    {
      "$lookup": {
          "from": "works",
          "localField": "_id",
          "foreignField": "wicons",
          "as": "result"
      }
    }]).sort( { _id: 1 } ).exec(
      (err, iconArray) => {
        if (err) response.status(500).send()
        else {
          response.json(iconArray);
        }
      }
    );
  })

  app.delete('/api/icon', (request, response) => {
    const { id } = request.body
    DevIcon.findByIdAndRemove(id, err => {
      if (err) response.status(500).send()
      else {
        response.json({status:'success'});
      }
    })
  })

  ///////////////////////////////////////

  app.listen(port, err => {
    if (err) throw new Error(err)
    else console.log(`listening on port ${port}`)
  })
})