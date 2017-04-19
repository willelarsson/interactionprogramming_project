drinkPlannerApp.factory('Drink',function (Fire, $resource, $cookieStore, $firebaseObject) {



  // ----------------- VARIABLES ----------------- //


  var selectedBev = null;
  var numberOfGuest = 0;
  var url = "https://crossorigin.me/http://systemetapi.se/product?";
  var cookieSpecPage = null;





  // ----------------- FUNCTIONS -----------------  //


  this.getMenu = function () {
    return menu;
  }

  this.resetGuest = function() {
    numberOfGuest = 0;
  }

  this.getSelectedBev = function () {
    return selectedBev;
  }

  this.setSelectedBev = function(bev) {
    cookieSpecPage = bev;
    if (cookieSpecPage.amount === undefined) {
      cookieSpecPage.amount = 1;
    }
    updateCookie();
  }

  var updateCookie = function() {
    var cookiePage = cookieSpecPage;
    $cookieStore.put('cookiePage', cookiePage);
  }

  this.getbevAmount = function(bev) {
    var bevAmount = 0
    if (bev.amount === undefined) {
      bevAmount = 0
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
    selectedBeverage = bev;
    updateCookie();
  }

  this.setNumberOfDrinks = function(num, amount) {

    if (num+amount < 0) {
      numberOfGuest = -amount + (0-(num+amount));
      updateCookieGuests();
    }
    else {
      numberOfGuest = num;
      updateCookieGuests();
    }
  }

  this.getNumberOfDrinks = function() {
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
    var cookiePage = $cookieStore.get("cookiePage");
    var cookiesGuests = $cookieStore.get('cookieGuests');

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
