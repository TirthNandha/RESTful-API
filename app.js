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

app.route("/articles")

/////////////////Requests targeting all articles////////////////

.get(async function(req, res) {
        const articles = await Article.find({});
        res.send(articles);
})

.post(function(req,res) {

    const newArticle = new Article({
        title : req.body.title,
        content : req.body.content
    })
    newArticle.save()
    res.send("document saved successfully")
})

.delete(async function(req, res) {
    await Article.deleteMany({})
    res.send("Successfully deleted all items")
});

/////////////////Requests targeting a specific articles////////////////

app.route("/articles/:articleTitle")

.get(async function(req, res) {
    const foundArticle = await Article.findOne({title: req.params.articleTitle})
    if(foundArticle) {
        res.send(foundArticle)
    } else {
        res.send("No articles matching that title was found.")
    }
})

.put(function(req, res) {
    Article.updateOne(
        { title: req.params.articleTitle },
        { $set: { title: req.body.title, content: req.body.content } }
    );
    

});

app.listen(3000, function(req, res) {
    console.log("Server is running on port 3000")
})