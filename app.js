angular.module('jobapp', [])


.controller('phillycontroller', function($scope, $http) {
  var phillyUrl ='https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-philadelphia.json';
  var montcoUrl ='https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-montgomery.json';

  $http.get(phillyUrl).success(function(data) {
      $scope.phillys = data;
  });

  $http.get(montcoUrl).success(function(data) {
      $scope.montcos = data;
  });
});

