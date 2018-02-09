// Code goes here

(function() {

  var app = angular.module("githubViewer");

  var MainController = function($scope, $interval, $location) {

    var decrement = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };
    var countDownInterval = null;
    var startCount = function() {
      countDownInterval = $interval(decrement, 1000, $scope.countdown);
    };

    $scope.search = function(username) {
      if (countDownInterval) {
        $interval.cancel(countDownInterval);
        $scope.countdown = null;
      }
      $location.path('/user/'+username)
    };

    $scope.username = 'angular';
    $scope.countdown = 10;
    startCount();
  };

  app.controller('MainController', MainController)
}());