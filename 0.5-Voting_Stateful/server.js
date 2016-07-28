var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8888;
var jokes=[{setup:"Our wedding was so beautiful,",punchline:"even the cake was in tiers"},{setup:"I'm reading a book on the history of glue",punchline:"I just can't seem to put it down"},{setup:"What do you call an Argentinian with a rubber toe?",punchline:"Roberto"}];
var lastjoke = 0;

app.use(bodyParser.json());
app.listen(process.env.PORT || port, function(){
    console.log("Listening on " + port);
});

app.use(express.static('static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

app.get('/jokes', function(req, res) {

    var randomNumber = Math.floor(Math.random() * jokes.length);
    jokes[randomNumber].id = randomNumber;
    lastjoke = randomNumber;
    console.log("Someone requested joke: " + lastjoke);
    res.send(jokes[randomNumber]);
});

app.get('/upvote', function (req,res) {
    if (typeof jokes[lastjoke].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[lastjoke].votes = 0;
    }
    jokes[lastjoke].votes++;
    console.log("Someone upvoted joke " + lastjoke);
    res.send(jokes[lastjoke]);
});

app.get('/downvote', function (req,res) {
    if (typeof jokes[lastjoke].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[lastjoke].votes = 0;
    }
    jokes[lastjoke].votes--;
    console.log("Someone downvoted joke " + lastjoke);
    res.send(jokes[lastjoke]);
});
