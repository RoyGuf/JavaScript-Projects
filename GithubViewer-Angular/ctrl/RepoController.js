(function(){

  var app = angular.module("githubViewer");

  var RepoController = function($scope, $routeParams, github){

    var onRepo = function(data) {
      $scope.repo = data;
    };

    var onError = function(reason) {
      $scope.error = reason;
    };

    var reponame = $routeParams.reponame;
    var username = $routeParams.username;
    github.getRepoDetail(username, reponame)
          .then(onRepo, onError);

  };

  app.controller('RepoController', RepoController)

}());
