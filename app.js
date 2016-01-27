angular.module('jobapp', [])
.controller('mycontroller', function($scope, $http) {
  $http.get('https://raw.githubusercontent.com/fbongiovanni29/opportunities/web-app/all-companies.json').success(function(data) {
    $scope.listings = data;
  });
});
