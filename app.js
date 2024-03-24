const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const ejs = require("ejs")

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

mongoose.connect("mongodb://0.0.0.0:27017/wikiDB")

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model("Article", articleSchema)
app.get("/", function(req, res) {
    res.send("Hello World!!")
})

app.get("/articles", async function(req, res) {
        const articles = await Article.find({});
        res.send(articles);
});

app.post("/articles", function(req,res) {
   
    const newArticle = new Article({
        title : req.body.title,
        content : req.body.content
    })
    newArticle.save(function(err) {
        if(!err) {
            res.send("Successfully added a new article")
        } else {
            res.send(err)
        }
    })
})

app.listen(3000, function(req, res) {
    console.log("Server is running on port 3000")
})