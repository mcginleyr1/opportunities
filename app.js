angular.module('jobapp', [])


.controller('phillycontroller', function($scope, $http) {
  var contentUrl ='https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-philadelphia.json';
  $http.get(contentUrl).success(function(data) {
      $scope.phillys = data;
  });
  $http.get(contentUrl).success(function(data) {
      $scope.montcos = data;
  });
});

