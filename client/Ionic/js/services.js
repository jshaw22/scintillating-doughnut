var socket = io();

angular.module('SD.services', [])

.service('GameService', [function ($state, $http){
  this.playerName = '';
  this.gameState = {};
  this.gameStatus = '';
  this.myPlayer={};

  var currentPlayers = [];
  var readyCounter = 0;
  var currentGame;
  var teamVoteCounter = 0;
  var questVoteCounter = 0;
  var currentQuestSize = 0;
  var questMembers = [];


  this.enterPlayerName = function (name) {
    this.playerName = name;
    socket.emit('enterPlayerName', name);
  };

  this.ready = function () {
    socket.emit('ready', this.playerName);
  };

  this.voteYesForTeam = function () {
    if (this.myPlayer.votedForTeam === false) {
      socket.emit('teamPlayerVote', {name: this.playerName, teamVote: true});
      this.myPlayer.votedForTeam = true;
    }
  };

  this.voteNoForTeam = function () {
    if (this.myPlayer.votedForTeam === false) {
      socket.emit('teamPlayerVote', {name: this.playerName, teamVote: false});
      this.myPlayer.votedForTeam = true;
    }
  };

  this.voteYesForQuest = function () {
    if (this.myPlayer.votedForQuest === false ) {
      socket.emit('teamQuestVote', {name: this.playerName, questVote: true});
      this.myPlayer.votedForQuest = true;
    }
  };

  this.voteNoForQuest = function () {
    if (this.myPlayer.votedForQuest === false ) {
      socket.emit('questVote', {name: this.playerName, questVote: false});
      this.myPlayer.votedForQuest = true;
    }
  };

  this.confirmQuestMembers = function () {
    console.log('confirm');
    // only sends data to server if this player is a captain
    if (this.myPlayer.isLeader) {
      // after setting those player's .onQuest to be true, send the gameState.

      for(var i=0; i<this.gameState.players.length; i++) {
        if(this.gameState.players[i].onQuest) {
          questMembers.push(this.gameState.players[i].name);
        }
      }

      if (questMembers.length === this.gameState.numberOfPlayersOnQuest) {
        socket.emit('confirmQuestMembers', questMembers);
      } else {
        alert('Select ' + this.gameState.numberOfPlayersOnQuest + ' players for this quest');
      }
    }
  };

  this.startQuestMemberSelection = function () {
    socket.emit('questSize', this.gameState);
  };

  this.updateMyself = function (gameState) {
    for (var i = 0; i<gameState.players.length; i++) {
      if(gameState.players[i].name === this.playerName) {
        this.myPlayer = gameState.players[i];
        break;
      }
    }
  };

  socket.on('game-state-notReady', function() {
    this.waitingStatus = 'Waiting for players...';
  });

  // socket.on('game-state-ready', function (gameStateObject){
  //   alert("All players ready! See console for gamestate object");
  //   // set global gameState with incoming gameStateobject
  //   this.gameState = gameStateObject;

  //   // Work around to update roster, due to ng-repeat one-time binding characteristic
  //   // $timeout(function() {
  //   //   $scope.showRoster = true;
  //   // });

  //   // assign $scope.thisPlayer to the correct player
  //   // loop through all players, find the one that matches my name
  //   updateMyself(this.gameState);

  //   $state.go('playerView');
  //   // $scope.refresh();

  //   // ask captain to select a team
  //   if (this.myPlayer.isLeader) {
  //     alert('Use below checkbox to select a team for the quest');
  //   } else {
  //     alert('Waiting for captain to select a team');
  //   }
  // });

  // after captain selects a team, update everyone's roster, also ask player to vote on it
  socket.on('captain-team-pick', function (gameStateObject) {
    // console.log('captain selected team');
    this.gameState = gameStateObject;

    ///////////////////////////////////
    // navigate to somewhere depending
    ///////////////////////////////////



    // // Display voting options
    // this.gameState.votingForTeam = true;

    // Work around to update roster, due to ng-repeat one-time binding characteristic
    // $timeout(function() {
    //   $scope.showRoster = true;
    // });
  });

  // if all voting are in, and the team passes, lets go on a quest
  // socket.on('start-quest', function (gameStateObject) {
  //   console.log('team voting complete, going on a quest');
  //   this.gameState = gameStateObject;
  //   // debugger;
  //   this.updateMyself(this.gameState);

  //   // may need routing depending

  //   // quest started, enable voting for the quest for players who are on the quest
  //   // if ($scope.thisPlayer.onQuest) {
  //   //   $scope.gameState.votingForQuest = true;
  //   // }

  //   // $timeout(function() {
  //   //   $scope.showRoster = true;
  //   // });
  // });

  socket.on('team-vote-failed', function (gameStateObject) {
    console.log('team voting complete, failed, not going on a quest');
    $scope.gameState = gameStateObject;
    $scope.updateMyself($scope.gameState);
  });

  socket.on('game-over', function (gameStateObject) {
    $scope.gameState = gameStateObject;
    this.addStats(gameStateOject);
    if ($scope.gameState.winner) {
      console.log('Good team wins!');
    } else {
      console.log('Bad team wins!');
    }
  });

  socket.on('quest-game', function (result) {
    if (result) {
      alert('This quest passed');
    } else {
      alert('This quest failed');
    }
  });

  this.getAllStats = function () {
    return $http({
      method: 'GET',
      url: '/api/stats'
    }).then(function (resp) {
      return resp.data;
    });
  };

  this.addStats = function (gameStateObject) {
    return $http({
      method: 'POST',
      url: '/api/stats/',
      data: gameStateObject
    }).then(function (resp) {
      return resp;
    });
  };

  this.getAll = function () {
    this.getAllStats().then(function (resp) {
      this.stats = resp;
    });
  };

  // this.getAll();

}]);

