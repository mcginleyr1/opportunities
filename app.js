angular.module('jobapp', [])


.controller('phillycontroller', function($scope, $http) {
  var phillyUrl ='https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-philadelphia.json';
  var montcoUrl ='https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-montgomery.json';
  var bucksUrl ='https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-bucks.json';
  var chesterUrl ='https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-chester.json';
  var delawareUrl ='https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-delaware.json';
  var camdenUrl ='https://raw.githubusercontent.com/mcelaney/opportunities/master/nj-camden.json';

  $http.get(phillyUrl).success(function(data) {
      $scope.phillys = data;
  });

  $http.get(montcoUrl).success(function(data) {
      $scope.montcos = data;
  });

  $http.get(bucksUrl).success(function(data) {
      $scope.bucks = data;
  });

  $http.get(chesterUrl).success(function(data) {
    $scope.chesters = data;
  });

  $http.get(delawareUrl).success(function(data) {
    $scope.delawares = data;
  });

  $http.get(camdenUrl).success(function(data) {
    $scope.camdens = data;
  });
});

