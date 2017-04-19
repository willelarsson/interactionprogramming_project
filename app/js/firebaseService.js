drinkPlannerApp.factory("Fire", ["$firebaseArray",

// INITIALIZES FIREBASE

function($firebaseArray) {
  // create a reference to the database location where we will store our data
  var ref = firebase.database().ref();

  // this uses AngularFire to create the synchronized array
  return $firebaseArray(ref);

}

]);
