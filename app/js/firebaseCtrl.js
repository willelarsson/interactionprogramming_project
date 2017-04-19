drinkPlannerApp.controller('firebaseCtrl',
function ($scope,Fire,Drink, $routeParams, $cookieStore, $firebaseObject, $firebaseArray) {


  // ----------------- VARIABLES ----------------- //

  const rootRef = firebase.database().ref();
  $scope.pool = $firebaseArray(rootRef);
  $scope.totalprice = 0;
  $scope.bevmenu = [];
  $scope.getPage = Drink.getCookiePage();
  $scope.fire = Fire;





    // ----------------- FUNCTIONS -----------------  //


  $scope.pool.$loaded().then(function(array) {
    for (var n=0; array.length>n; n++) {
      $scope.bevmenu.push(array[n]);
      $scope.totalprice += array[n].price * array[n].amount
    }
  })


  $scope.addtofire = function(selectedbev) {
    $scope.firebev = selectedbev.name;
    $scope.fireamount = Drink.getNumberOfDrinks();
    $scope.fireprice = selectedbev.price
    $scope.fireid = selectedbev.article_id;
    $scope.firename2 = selectedbev.name_2;
    $scope.firecountry = selectedbev.country;
    $scope.fireball = selectedbev.alcohol;
    $scope.firevolume = selectedbev.volume;
    $scope.fireapk = selectedbev.apk;
    $scope.fireppl = selectedbev.price_per_liter;
    $scope.firestart = selectedbev.start_date;

    if (selectedbev.tags  !== undefined) {
      $scope.firetype = selectedbev.tags;
    } else {
      $scope.firetype = null;
    }

    $scope.fireVar = {
      name: $scope.firebev,
      name_2: $scope.firename2,
      country: $scope.firecountry,
      amount: $scope.fireamount,
      price: $scope.fireprice,
      alcohol: $scope.fireball,
      volume: $scope.firevolume,
      apk: $scope.fireapk,
      price_per_liter: $scope.fireppl,
      article_id: $scope.fireid,
      start_date: $scope.firestart,
      tags: $scope.firetype,
    }

    $scope.fire.$add(
      $scope.fireVar
    )
  }

  $scope.updateFire = function(bev, amount, num) {

    // This function updates the amount in of a given beverage in firebase.
    // The beverage stored in firebase with the same name as bev is deleted, and
    // then re-added with the right amount.
    // bev is the beverage, amount the amount, and num is the indicator used in deletefromfire()

    for (var b = 0; $scope.pool.length>b; b++) {
      if ($scope.pool[b].name === bev.name) {
        $scope.deletefromfire($scope.pool[b], num);
      }
    }
    bev.amount = amount;
    $scope.fire.$add(bev);
  }

  $scope.changeamount = function(bev, add, update) {

    // bev is the selected beverage
    // add is the indicator of which type of button was pressed (1=delete, 2=minus, 3=plus)
    // update is the indicator of from where the button was pressed, (true is from sidebar and false from article)

    if (bev.amount === undefined) {
      bev.amount = -1;
    }

    if (add === 3) {
      bev.amount += 1;
      $scope.bevmenu.push(bev)
    }
    else if (add===2) {
      bev.amount -= 1;
      if ( bev.amount < 1) {
        bev.amount = 1;
      }
      $scope.bevmenu.push(bev)
    }
    else if (add===1) {
      $scope.deletefromfire(bev, 1)
    }

    if (update===true) {
      $scope.updateFire(bev, bev.amount, add)
    }

  }

  $scope.deletefromfire = function(bev, del) {

    // Deletes a given beverage from Firebase.
    // bev is the selected beverage
    // del is the indicator of what to do with the totalprice
    // (1=delete the beverage's value in SEK as a whole, 2=delete the value of 1pcs of the beverage
    // ,3=add the value of 1pcs of the beverage)

    $scope.pool.$remove(bev);
    elemPos = $scope.bevmenu.indexOf(bev);
    $scope.bevmenu.splice(elemPos, 1)

    if (del === 1) {
      $scope.totalprice -= (bev.price*bev.amount);
    }
    else if (del === 2) {
      if (bev.amount > 1) {
        $scope.totalprice -= bev.price;
      }
      else {
      }
    }
    else if (del === 3) {
      $scope.totalprice += bev.price;
    }
  }
});
