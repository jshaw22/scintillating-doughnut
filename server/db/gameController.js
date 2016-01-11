var Gamestats = require('./gameModel.js');
    Q = require('q');

var getStats = Q.nbind(Gamestats.find, Gamestats);
var addStats = Q.nbind(Gamestats.create, Gamestats);

module.exports = {
	allStats: function (req, res) {
		getStats({})
		.then(function (stats) {
			res.json(stats);
		})
		.fail(function (err) {
			next(error);
		})
	},

	storeFinishedGameStats: function (req, res, next) {
		return addStats({
			sweetWon: req.body.winner,
			numPlayers: req.body.numberOfPlayers,
			gameTime: req.body.gameTime,
			numRoundsPlayed: req.body.numRoundsPlayed
		})
	}
}