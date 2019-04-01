module.exports = function(app, db) {
  app.get('/', (req, res) => {
    //display whats from the database into the DOM
    db.collection('vidyagames').find().toArray((err, result) => {
      if (err) return console.log(err)
      //render both ejs file and whats in the database
      res.render('index.ejs', {vidyagames: result})
    })
  })
  app.post('/vidgames', (req, res) =>{
    db.collection('vidyagames').insertOne({title:req.body.title, voteUp: 0, voteDown: 0}, (err, result) =>{
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
    })
  })

  app.put('/voteUp', (req, res) => {
    db.collection('vidyagames')
    .findOneAndUpdate({title: req.body.title}, {
      $set: {
        voteUp:req.body.voteUp + 1
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })

  app.put('/voteDown', (req, res) => {
    db.collection('vidyagames')
    .findOneAndUpdate({title: req.body.title}, {
      $set: {
        voteDown:req.body.voteDown + 1
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })

  app.delete('/vidgames', (req, res) => {
    db.collection('vidyagames').findOneAndDelete({title:req.body.title}, (err, result) => {
      if(err) return res.send(500, err)
      res.send('message deleted!')
    })
  })

}
