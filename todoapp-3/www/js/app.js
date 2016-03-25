// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    /*
    var localDB = new PouchDB("todos");
    var remoteDB = new PouchDB("https://couchdb-1ac554.smileupps.com/todos");

    localDB.sync(remoteDB, {
      live: true,
      auth: {
        username: 'admin',
        password: '44823ed46740'
      }
    });*/

    //localDB.sync(remoteDB, {live: true});
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // Initialise Parse
  Parse.initialize("KuvQcZKT4n95POEeuQ8tSckCmCwr4ItEIVF9w8Pg", "z5jT9Lzk1tQp9ssCgWcaQ2l1cGf366EujLKPkaHu");

})
