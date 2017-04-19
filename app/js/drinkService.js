
drinkPlannerApp.factory('Drink',function (Fire, $resource, $cookieStore, $firebaseObject) {



  // ----------------- VARIABLES ----------------- //

  var selectedBev = null;
  var numberOfGuest = 0;
  // var bevAmount = 0;
  var url = "https://crossorigin.me/http://systemetapi.se/product?";
  var cookieSpecPage = null;

  // ----------------- FUNCTIONS -----------------  //

    //
    // this.setBevAmount = function(num) {
    //   console.log("vi är i setnumberOfGuests")
    //
    //   if (num > 0) {
    //     bevAmount++;
    //     // updateCookieGuests();
    //
    // }


  this.getMenu = function () {
    return menu;
  }

  this.resetGuest = function() {
    numberOfGuest = 0;
  }

  this.getSelectedBev = function () {
    // console.log("inne i getselectedbev med: ")
    // console.log(selectedBev);
    return selectedBev;
  }

  this.setSelectedBev = function(bev) {
    cookieSpecPage = bev;
    if (cookieSpecPage.amount === undefined) {
    cookieSpecPage.amount = 1;
  }
    // console.log(cookieSpecPage);
    updateCookie();
  }

  var updateCookie = function() {

    // var cookieMenu = [];
    var cookiePage = cookieSpecPage;
    console.log("Inne i updatecookie");
    console.log("Här är cokiePage: " + cookiePage);

    // $cookieStore.put('cookieMenu', cookieMenu);
    $cookieStore.put('cookiePage', cookiePage);

  }

 this.getbevAmount = function(bev) {
   var bevAmount = 0
   if (bev.amount === undefined) {
     bevAmount = 0
    //  bev.amount = 0;
   }
   else {
   bevAmount = bev.amount;
 }
 return bevAmount;
 }

  var updateCookieGuests = function() {
    $cookieStore.put('cookieGuests', numberOfGuest);
  }

  this.selectedBev = function(bev) {
    console.log("inne i selectedBev")
    selectedBeverage = bev;
    updateCookie();
  }

  this.setNumberOfGuests = function(num, amount) {
    console.log("vi är i setnumberOfGuests")

    if (num+amount < 0) {
      numberOfGuest = -amount + (0-(num+amount));
      updateCookieGuests();
    }
    else {
      numberOfGuest = num;
      updateCookieGuests();
    }
  }

  this.getNumberOfGuests = function() {
    console.log("vi är i getnumberOfGuests")
    return numberOfGuest;
  }

  this.BevSearch = $resource(url,{},{
    get: { isArray: true


    }
  });


  this.getCookiePage = function() {
    return cookieSpecPage;
  }

  var _this = this;
  var init = function() {
    menu = [];
    // var cookies = $cookieStore.get('cookieMenu');
    var cookiePage = $cookieStore.get("cookiePage");
    var cookiesGuests = $cookieStore.get('cookieGuests');

    var uh = false;

    if (cookiePage !== undefined){
      cookieSpecPage = cookiePage;
    }

    if (cookiesGuests !== undefined){
      numberOfGuest = cookiesGuests;
    }


  }

  init();

  return this;

});
