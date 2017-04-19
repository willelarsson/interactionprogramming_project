drinkPlannerApp.controller('cabinetCtrl', function ($scope,$routeParams,Drink, $cookieStore) {

  $scope.getTheMenu = Drink.getMenu();

});
