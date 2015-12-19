angular.module('jobapp', [])


.controller('phillycontroller', function($scope, $http) {
  $http.get('https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-philadelphia.json').success(function(data) {
      $scope.phillys = data;
  });
  $http.get('https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-montgomery.json').success(function(data) {
      $scope.montcos = data;
  });
});

