angular.module('jobapp', [])


.controller('mycontroller', function($scope, $http) {
    var contentUrl ='https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-philadelphia.json';
    $http.get(contentUrl).success(function(data) {
      $scope.listings = data;
  });
});

