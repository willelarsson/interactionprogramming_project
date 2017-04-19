drinkPlannerApp.controller('firebaseCtrl',
function ($scope,Fire,Drink, $routeParams, $cookieStore, $firebaseObject, $firebaseArray) {

  // console.log("Inne i firebaseCtrl");

  const rootRef = firebase.database().ref();
  $scope.pool = $firebaseArray(rootRef);
  $scope.totalprice = 0;

  $scope.bevmenu = [];
  $scope.pool.$loaded().then(function(array) {
    for (var n=0; array.length>n; n++) {
      $scope.bevmenu.push(array[n]);

      $scope.totalprice += array[n].price * array[n].amount
      // console.log(array[n]);
      // console.log($scope.bevmenu)
    }

  })

  $scope.getPage = Drink.getCookiePage();

  $scope.fire = Fire;

  $scope.addtofire = function(selectedbev) {
    // console.log("inne i addtofire")
    // console.log(selectedbev)
    $scope.firebev = selectedbev.name;
    $scope.fireamount = Drink.getNumberOfGuests();
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
    // $scope.firetype2 = selectedbev.tags[1].name;

    // for(var i=0; $scope.bevmenu.length>i; i++) {
    //   if($scope.firebev === bevmenu[i].beverage) {
    //     $scope.pool.$remove($scope.firebev)
    //   }
    // }
    $scope.fire.$add(
      $scope.fireVar
      // {
      // beverage: $scope.firebev,
      // beverage_2: $scope.firename2,
      // country: $scope.firecountry,
      // amount: $scope.fireamount,
      // price: $scope.fireprice,
      // alcohol: $scope.fireball,
      // volume: $scope.firevolume,
      // apk: $scope.fireapk,
      // price_per_liter: $scope.fireppl,
      // article_id: $scope.fireid,
      // start_date: $scope.firestart,
      // tags: $scope.firetype,
    // }
  )
  // return fireVar;
  }
// function updateFire(amount) {

$scope.updateFire = function(bev, amount, num) {
  // var newPostKey = firebase.database().ref().push().key;
  // console.log("kommer in iupdate")
  for (var b = 0; $scope.pool.length>b; b++) {
    if ($scope.pool[b].name === bev.name) {
      $scope.deletefromfire($scope.pool[b], num);
    }
  }
  // $scope.deletefromfire(bev)
  bev.amount = amount;
  $scope.fire.$add(bev);
}

$scope.getPage = Drink.getCookiePage();

$scope.resetGuest = function() {
  Drink.resetGuest();
}

$scope.changeamount = function(bev, add, update) {
    if ( bev.amount === undefined) {
      bev.amount = -1;
      console.log("Den är undefined, ändras till: " +bev.amount)
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

    // $scope.bevmenu.push(bev);

    // DAGEN INNAN DEADLINE: Ni måste göra olika funktioner av +/- på article respektive sidemenu.
    // Ni vill köra updatefire() när ni klickar i sidebar men inte från article. Fixa det här och ni är game.


  }




  $scope.setbev = function(bev) {

    Drink.setSelectedBev(bev);
  }


// $scope.updateFire = function(amount) {
//   // var newPostKey = firebase.database().ref().push().key;
// console.log("kommer in iupdate")
//   var updates = {};
//   console.log($scope.fireVar);
//     updates['/amount/'] = $scope.fireVar;
//     return firebase.database().ref().update(updates);
// }


  $scope.deletefromfire = function(bev, del) {
    // console.log("delete from fire")
    // console.log(bev);
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
  //
  // $scope.updateAmount(bev, newAmount) {
  //   var updates = {};
  //   updates[] =
  //
  //   return firebase.database().ref().update(updates);
  // }

});
