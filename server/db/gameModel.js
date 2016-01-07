var mongoose = require('mongoose');

/* At the end of our game, we want to persist game stats
to render in the frontend stats.html. These are the parameters*/

var GameSchema = new mongoose.Schema({
 spyWin: Number,
 spyLose: Number,
 numPlayers: Number,
 gameTime: Number,
 numRoundsPlayed: Number
});

module.exports = mongoose.model('Gamestats', GameSchema);