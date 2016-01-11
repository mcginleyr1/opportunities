angular.module('jobapp', ['ngRoute'])

.config(function ($routeProvider,$locationProvider,$httpProvider) {

    $routeProvider
      .when('/', {
        controller: 'countyController',
        templateUrl: '/templates/all.html'
      })
      .when('/county/:countyname', {
        controller: 'countyController',
        templateUrl: '/templates/counties.html'
      })

})

.controller("rootcontroller",function($scope){
  console.log("rootcontroller");
})
.controller("countyController",function
  ($scope,$http,$routeParams){
    $scope.countyName=$routeParams.countyname;

  var urls={
    "philly": 'https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-philadelphia.json',
    "montco": 'https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-montgomery.json',
    "bucks": 'https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-bucks.json',
    "chester": 'https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-chester.json',
    "delaware": 'https://raw.githubusercontent.com/mcelaney/opportunities/master/pa-delaware.json',
    "camden": 'https://raw.githubusercontent.com/mcelaney/opportunities/master/nj-camden.json'
  }
  var url=urls[$scope.countyName]
    $http.get(url).success(function(data) {
      $scope.data = data;
    });
  })


