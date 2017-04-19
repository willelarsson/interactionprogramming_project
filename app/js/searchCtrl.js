drinkPlannerApp.controller('SearchCtrl', function ($scope,$routeParams,Drink, Fire) {

$('#loading').hide();
$('#items').hide();
$('#fail').hide();

  $scope.search = function(name, bev_gen, bev_pref, bev_type) {

    $scope.status = "Searching...";

    $('#loading').show();
    $('#items').hide();

      var ecobool = null;
      var kosbool = null;
      var gluten = ""
      var orderby = "name";
      var ascdesc = "ASC"
      var bevtype = null;



      if (bev_gen === "") {
        ecobool = null;
        kosbool = null;
      }
      else if (bev_gen === "1") {
        ecobool = true;
      }
      else if (bev_gen === "2") {
        kosbool = true;
      }
      else if (bev_gen === "3") {
        gluten = "gluten";
      }





     if (bev_pref === "" || bev_pref === "2") {
            orderby="name";
          }

          else if (bev_pref === "1") {
            orderby= "apk";
            ascdesc ="DESC"
          }
          else if (bev_pref === "3") {
            orderby= "name";
            ascdesc ="DESC"
          }

          else if (bev_pref === "4") {
            orderby="alcohol";
            ascdesc="DESC"
          }
          else if (bev_pref === "5") {
            orderby="alcohol";
            ascdesc="ASC"
          }
          else if (bev_pref === "6") {
            orderby="price";
            ascdesc="DESC"
          }
          else if (bev_pref === "7") {
            orderby="price";
            ascdesc="ASC"
          }



      if (bev_type === "") {
        bevtype = null;
      }
      else if (bev_type === "1") { // CIDER
        bevtype = "16"
      }
      else if (bev_type === "2") { // BEER
        bevtype = "6"
      }
      else if (bev_type === "3") { // WINE
        bevtype = "20"
      }
      else if (bev_type === "4") { // LIQUOR
        bevtype = "2"
      }
      else if (bev_type === "5") { // GIN
        bevtype = "10"
      }
      else if (bev_type === "6") { // RUM
        bevtype = "5"
      }
      else if (bev_type === "7") { // WHISKEY
        bevtype = "3"
      }
      else if (bev_type === "8") { // TEQUILA
        bevtype = "11"
      }

      // console.log("Nu är ecobool: " + ecobool + " :-)");
      // console.log("Nu är kosbool: " + kosbool + " :-)");
      // console.log("Nu är gluten: " + gluten + " :-)");

      Drink.BevSearch.get({name:name, ecological:ecobool, koscher:kosbool, order_by:orderby, order:ascdesc, limit:150, tag:bevtype}, function(data){
        $scope.status = "Showing " + data.length + " results";
        $('#loading').hide();
        $('#items').show();
        $scope.bevs=data;

      }, function(data){
        $scope.status = "Something went wrong"
        $('#fail').show();
        $('#loading').hide();
        console.log(data)
        $scope.faildata = data;
      });
  }


  $scope.getPage = Drink.getCookiePage();

  $scope.resetGuest = function() {
    Drink.resetGuest();
  }

  $scope.getbevamount = function(bev) {
    return Drink.getbevAmount(bev);
  }

// $scope.changeamount = function(bev, add) {
//   if ( bev.amount === undefined) {
//     bev.amount = 0;
//   }
//
//   if (add === true) {
//     bev.amount += 1;
//   }
//   else {
//     bev.amount -= 1;
//     if ( bev.amount < 1) {
//       bev.amount = 1;
//     }
//   }
//
// }



  $scope.selectedbev = Drink.getSelectedBev()


  $scope.setbev = function(bev) {

    Drink.setSelectedBev(bev);
  }

  $scope.getNumberOfGuest = function() {
    return Drink.getNumberOfGuests();
  }

  $scope.setNumberOfGuest = function(number, amount){
    Drink.setNumberOfGuests(number, amount);
  }
  $scope.totalPrice = function(){
    return Drink.getTotalMenuPrice();
  }

  $scope.getTheMenu = Drink.getMenu();

  $scope.getVisibleNumber = function(guests, amount) {
    $scope.visNumber = 0;
    // totalNumber = guests + amount;
    if (guests + amount > 0) {
      $scope.visNumber = guests + amount;
      console.log($scope.visNumber)
      return $scope.visNumber;
    }
    else {
      $scope.setNumberOfGuest(0, amount)
      console.log($scope.visNumber)
      return $scope.visNumber;
    }
  }




});
