var mongoose = require('mongoose');

var StatsSchema = new mongoose.Schema({
	sweetWon: Boolean,
	numPlayers: Number,
	gameTime: Number,
	numRoundsPlayed: Number
});

module.exports = mongoose.model('Stats', StatsSchema);
