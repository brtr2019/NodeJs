var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var app = express();
var db;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//----------Artists----------------------
/*var artists = [
  {
    id: 1,
    name: 'Metallica'
  },
  {
    id: 2,
    name: 'Iron Maiden'
  },
  {
    id: 3,
    name: 'Deep Purple'
  }
];*/
//------------Routing------------------------
app.get('/', function(req, res) {
	res.send('Hello world!!');
});
//----Получить всех артистов-------------------
app.get('/artists', function (req, res) {
    db.collection('artists').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
});
//-------------Получить артиста по ID----------
app.get('/artists/:id', function (req, res) {
  db.collection('artists').findOne({_id:ObjectId(req.params.id)},function(err,doc){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
});

//-------добавить одного артиста по запросу------------
app.post('/artists', function (req, res) {
    var artist = {
        name: req.body.name
    };

    db.collection('artists').insertOne(artist, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    })
})

//----------Апдейт артиста по id--------------------------
app.put('/artists/:id',function(req,res){
	/*var artist = artists.find(function(artist){
		return artist.id === Number(req.params.id);
	})
	artist.name = req.body.name;
	console.log(req.body.name);
	//res.send(artist);
	res.sendStatus(200);*/
  db.collection('artists').updateOne(
    {_id:ObjectId(req.params.id)},{name:req.body.name},function(err,result){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
})
app.delete('/artists/:id', function (req, res) {
  db.collection('artists').deleteOne(
    { _id: ObjectID(req.params.id)},
    function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
    res.sendStatus(200);
  })
})

/*app.delete('/artists/:id',function(req,res){
  db.collections('artists').deleteOne({_id:ObjectId(req.params.id)},function(err,result){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
})*/
//-----------добавлено новое-------------------------
MongoClient.connect('mongodb://localhost:27017/myapi', function (err, database) {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(3012, function () {
        console.log('API app started');
    })
})








