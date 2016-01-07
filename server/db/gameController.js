var Gamestats = require('./gameModel.js');
    Q = require('q');

var getStats = Q.nbind(Gamestats.find. Gamestats);
var addStats = Q.nbind(Gamestats.create, Gamestats);

/* allStats should be called back in the server.js GET function.
addGameStats should be called back in the serverjs POST function.
Please conform to the correct object parameters */

module.exports = {
	allStats: function (req, res) {
		getStats({})
		.then(function (stats) {
			res.json(stats);
		})
		.fail(function (err) {
			next(error);
		});
	},

	addGameStats: function (req, res) {
		return addStats({
			spyWin: req.body.spyWin,
			spyLose: req.body.spyLose,
			numPlayers: req.body.numPlayers,
			gameTime: req.body.gameTime,
			numRoundsPlayed: req.body.numRoundsPlayed
		});

	}
}