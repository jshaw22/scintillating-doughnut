var socket = io();
//shrinkwrap
//dedeoop
//prune
angular.module('SD.controllers', [])
  .controller('gameCtrl', function ($scope, $window,$ionicHistory, $location, $state, GameService) {
    // initialize the controller
    $scope.refresh = function () {
      console.log('refreshing');
      $scope.gameState = GameService.gameState;
      for(var i = 0 ; i < GameService.gameState.numberOfPlayers; i++){
        if(GameService.gameState.players[i].name === GameService.playerName){
          GameService.myPlayer = GameService.gameState.players[i];
          $scope.myPlayer = GameService.gameState.players[i];
        }
      }
      $scope.myPlayer = GameService.myPlayer;
      return GameService.myPlayer;
    };

    // when player enters a name, update the $scope
    $scope.enterPlayerName = function (name) {
      GameService.enterPlayerName(name);
    };

    $scope.ready = function () {
      GameService.ready();
    };

    // when player votes yes for the team
    $scope.voteYesForTeam = function () {
      GameService.voteYesForTeam();
    };

    // when player votes no for the team
    $scope.voteNoForTeam = function () {
      GameService.voteNoForTeam();
    };

    // when player votes yes for the quest
    $scope.voteYesForQuest = function () {
      GameService.voteYesForQuest();
    };

    // when player votes yes for the quest
    $scope.voteNoForQuest = function () {
      GameService.voteNoForQuest();
    };

    // when captain finishes selecting quest team, and confirms
    // TODO
    $scope.confirmQuestMembers = function () {
      GameService.confirmQuestMembers();
    };
    //TODO 
    // $scope.startQuestMemberSelection= function () {
    //   // only sends data to server if this player is a captain
    //     // after setting those player's .onQuest to be true, send the gameState.
    //     socket.emit('questSize', GameService.gameState);
      
    // };
    ////////////////////
    /* LISTENERS FOR BACKEND EVENTS */
    ////////////////////

    socket.on('game-state-notReady', function() {
      GameService.gameStatus = 'Waiting for players...';
    });

    socket.on('game-state-ready', function(gameStateObject){
      GameService.gameState = gameStateObject;
      $state.go('playerView');
      setTimeout(function(){
        $state.go('mainView');
        $ionicHistory.clearHistory();
      },1000);

      console.log(gameStateObject);

      GameService.updateMyself(GameService.gameState);

      if(GameService.myPlayer.isLeader) {
        alert('You are the captain, pick a team');
      }
    });

    socket.on('next-quest', function (gameStateObject) {
      GameService.gameState = gameStateObject;
      $scope.refresh();
    });

    socket.on('leader-selected-team', function (data){
      $scope.$apply(function(){
        GameService.gameState = data;
        GameService.gameState.votingForTeam = true;
        $scope.refresh();
      });
    });

    socket.on('start-quest', function (data) {
      data.votingForTeam = false;
      data.votingForQuest = true;
      $scope.$apply(function() {
        GameService.gameState = data;
        $scope.refresh();
      });
      debugger;
    });

});

  


  //   socket.on('questSizeReply', function(){
  // });
