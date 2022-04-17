let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 8230;
const mongoUrl = "mongodb://localhost:27017"
const mongoliveUrl = "mongodb+srv://local:test12345@netflix.rddsa.mongodb.net/netflixdata?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const cors = require('cors');

// middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors())



app.get('/',(req,res) => {
    res.send("Welcome to Netflix")
})

//webseries

app.get('/webseries',(req,res) => {
    db.collection('webseries').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// webseries on the basis of Category

app.get('/webseries/:Category',(req,res) => {
    let WebCat = (req.params.Category);
    // let WebCat = mongo.ObjectId(req.params.id)
    db.collection('webseries').find({Category:WebCat}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//webseries details

app.get('/webseries/:id',(req,res) => {
    let WebId = Number(req.params.id);
    // let WebId = mongo.ObjectId(req.params.id)
    db.collection('webseries').find({WebSeries_ID:WebId}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//webseries Played
app.get('webseriesPlayed',(req,res)=>{
    db.collection.insert('webseries').insert(req.body,(err,webseriesPlayed)=>{
        if (err) throw err;
        res.send(webseriesPlayed)
    })
})

//premium list

app.get('/premium',(req,res)=>{
    db.collection('premium').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})

//premium details by type
app.get('/premium/:Type',(req,res) => {
    let Prem_Type = (req.params.Type);
    // let PremId = mongo.ObjectId(req.params.id)
    db.collection('premium').find({Premium_Type:Prem_Type}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//movies

app.get('/movies',(req,res)=>{
    db.collection('movies').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})

//Movies Details By Id

app.get('/movies/:id',(req,res) => {
    let MovieId = Number(req.params.id);
    // let WebId = mongo.ObjectId(req.params.id)
    db.collection('movies').find({Movie_ID:MovieId}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// Movies on the basis of Category

app.get('/movies/:Category',(req,res) => {
    let MovCat = (req.params.Category);
    // let MovCat = mongo.ObjectId(req.params.Category)
    db.collection('movies').find({Category:MovCat}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//mylist

app.get('/mylist',(req,res)=>{
    db.collection('mylist').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})

//delete my list
app.delete('/webseries',(req,res)=>{
    db.webseries.remove({WebSeries_ID:3},(req,res)=>{
        res.send('Webseries Deleted')
    })
})

//update my list
app.put('/updatemylist/id:',(req,res)=>{
    let objId = mongo.ObjectId(req.params.id);
    db.collection('mylist').updateOne(
        {_id:objId},
        {$set:{
            "status":req.body.status
        }},(err,result)=>{
            if (err) throw err;
            res.send(`Mylist Updated ${req.body.status}`)
        }
    )
})

//tvshows

app.get('/tvshows',(req,res)=>{
    db.collection('tvshows').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})

//Tv Shows Details By Id

app.get('/tvshows/:id',(req,res) => {
    let TvId = (req.params.id);
    // let TvId = mongo.ObjectId(req.params.id)
    db.collection('tvshows').find({TvShows_ID:TvId}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//Tv shows on basis of langauge

app.get('/tvshows/:Language',(req,res) => {
    let TvLang = (req.params.Language);
    // let Tv_Rate = mongo.ObjectId(req.params.Rated)
    db.collection('tvshows').find({Language:TvLang}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//connection with dbs
MongoClient.connect(mongoliveUrl,(err,client) =>{
    if (err) console.log(`Error while Connecting`)
    db = client.db('netflixdata');
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
})