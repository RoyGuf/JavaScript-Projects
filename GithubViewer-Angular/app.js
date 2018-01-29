(function(){

  var app = angular.module("githubViewer", ['ngRoute']);

  app.config(function($routeProvider){
    $routeProvider
        .when('/main', {
          templateUrl: 'views/main.html',
          controller: 'MainController'
        })
        .when('/user/:username', {
          templateUrl: 'views/userdetail.html',
          controller: 'UserController'
        })
        .when('/repo/:username/:reponame', {
          templateUrl: 'views/repo.html',
          controller: 'RepoController'
        })
        .otherwise({redirectTo: '/main'});
  });
}());
