drinkPlannerApp.controller('articleCtrl', function ($scope,$routeParams,Drink, Fire, $cookieStore) {

  $scope.getPage = Drink.getCookiePage();

  // $scope.changeamount = function(bev, add) {
  //   Drink.changeamount(bev, add)
  // }

  $scope.resetGuest = function() {
    Drink.resetGuest();
  }


});
