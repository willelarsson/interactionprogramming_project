var drinkPlannerApp = angular.module('drinkPlanner', ['ngRoute','ngResource', 'ngCookies','firebase']);

drinkPlannerApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/home', {
    templateUrl: 'partials/home.html'
  }).
  when('/search', {
    templateUrl: 'partials/search.html',
    controller: 'SearchCtrl'
  }).
  when('/article/:article_id', {
    templateUrl: 'partials/article.html',
    controller: 'firebaseCtrl'
  }).
  when('/cabinet', {
    templateUrl: 'partials/cabinet.html',
    controller: 'firebaseCtrl'
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);
