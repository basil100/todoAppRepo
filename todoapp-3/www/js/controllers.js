angular.module('app.controllers', [])

.controller('todoListCtrl', function($scope,$state,$q, $window, $ionicHistory, $ionicLoading, $ionicListDelegate, HomeworkService) {

  //$state.go($state.current, {}, {reload: true});
  /*$scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope)
      return;
    // Your code which should only run once
    console.log('goood');
    //$scope.homeworks.load();
    //$window.location.reload(true);
  });*/
  //$window.location.reload(true);
  $scope.homeworks = HomeworkService;
  console.log('inside todoListCtrl');
  //console.log($scope.homeworks.load());

  $ionicLoading.show();
  $scope.homeworks.load().then(function () {
    console.log('loading');
    $ionicLoading.hide();
  });


  $scope.refreshItems = function () {
    $scope.homeworks.refresh().then(function () {
      //$scope.$broadcast('scroll.refreshComplete');
      console.log('refreshed');
    });
  };

  /*$scope.nextPage = function () {
    $scope.meals.next().then(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };*/
  /*
  var localDB = new PouchDB("todos");
  var remoteDB = new PouchDB("https://couchdb-1ac554.smileupps.com/todos");

  localDB.sync(remoteDB, {
    live: true,
    auth: {
      username: 'admin',
      password: '44823ed46740'
    }
  });

  $scope.homeworks = HomeworkService;

  $scope.session = function() {
    var defer = $q.defer();
    // getting sessions
    remoteDB.getSession(function (err, response) {
      if (err) {
        // network error
        console.log('network error');
      } else if (!response.userCtx.name) {
        // nobody's logged in
        console.log('nobody\'s logged in');
      } else {
        // response.userCtx.name is the current user
        console.log(response.userCtx.name + ' is the current user');
        //$scope.homeworks.load();
        defer.resolve();
      }
    });
    return defer.promise;
  };

  */

  /*$ionicLoading.show({template:'Loading feed...'});
  $scope.session().then(function(){
    $scope.homeworks.load();
    $ionicLoading.hide();
  });*/

  $scope.logout = function(){
    console.log("AccountCtrl::logout");
    //TODO
    Parse.User.logOut();
    $ionicHistory.clearCache();
    $state.go("login");
    /*remoteDB.logout(function (err, response) {
      if (err) {
        // network error
        console.log('network error');
      } else {
        console.log('logged out');
        console.log(response);
        $state.go('login');
      }
    })*/
  };



  $scope.showDelete = false;

  $scope.showButton = function() {
    $scope.showDelete = !$scope.showDelete;
  };

  $scope.search = {
    'title':''
  };

  $scope.deleteHomework = function($index) {
    $scope.homeworks.items.splice($index, 1);
  }

  $scope.markHomework = function($index) {
    console.log('inside mark');
    console.log($index);
    $scope.homeworks.items[$index].done= !$scope.homeworks.items[$index].done;
    console.log($scope.homeworks.items[$index]);//.done = false;
    $ionicListDelegate.closeOptionButtons();
  }

})

.controller('addTodoCtrl', function($scope, $state, $ionicLoading, HomeworkService) {

  $scope.resetFormData = function() {
    $scope.formData = {
      'title': '',
      'classname': '',
      'dueDate': '',
      'done': false
    };
  };
  $scope.resetFormData();

  $scope.addTodo = function (form) {

    if(form.$valid) {
      console.log("AddTodoCreateCtrl::addHomework");

      $ionicLoading.show();
      HomeworkService.addTodo($scope.formData)
        .then(function() {
          $scope.resetFormData();
          $ionicLoading.hide();
          form.$setPristine(true);
          $state.go("tabsController.todoList");
        });
    }
    //TODO
  };

  /*
  var localDB = new PouchDB("todos");
  var remoteDB = new PouchDB("https://couchdb-1ac554.smileupps.com/todos");

  localDB.sync(remoteDB, {
    live: true,
    auth: {
      username: 'admin',
      password: '44823ed46740'
    }
  });

  $scope.resetFormData = function() {
    $scope.formData = {
      'title': '',
      'className': '',
      'dueDate': '',
      'done': false,
      'username': null
    };
  };

  $scope.resetFormData();

  $scope.addTodo = function(form) {
    console.log('=== inside addTodo function ===');
    console.log(form);
    console.log($scope.formData);

    HomeworkService.add($scope.formData);
    $scope.resetFormData();
    form.$setPristine(true);
    $state.go('tabsController.todoList');

  };
  */
  //$scope.homeworks = HomeworkService;

  $scope.logout = function(){

    console.log("AccountCtrl::logout");
    //TODO
    Parse.User.logOut();
    $state.go("login");
    /*remoteDB.logout(function (err, response) {
      if (err) {
        // network error
        console.log('network error');
      } else {
        console.log('logged out');
        console.log(response);
        $state.go('login');
      }
    })*/
  };

})

.controller('loginCtrl', function($scope, $state, AuthService,$window, $ionicPopup, UserService, HomeworkService) {

  $scope.userFormData = {
    'username': '',
    'password': ''
  };

  $scope.login = function (form) {
    console.log("LoginCtrl::login");
    //TODO
    if(form.$valid) {
      AuthService.login($scope.userFormData.username, $scope.userFormData.password)
        .then(function(){
          //$state.reload("tabsController.todoList");
          //$state.transitionTo('tabsController.todoList', $state.$current.params, {reload: true});
          $state.go("tabsController.todoList",{}, {reload: true}).then(function(){
            //$route.reload();
            //$window.location.reload(true);
          });
        });
      console.log("valid form");
    }

  };

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


  /*localDB.get('E004D1AF-7A0A-35DB-B325-4C5654A01A57').then(function (doc) {
    // handle doc
    console.log(doc);
  }).catch(function (err) {
    console.log(err);
  });*/
  //localDB.query(function (doc, emit) {
  //  emit(doc.title);
  //}, {key: 'hello everyone'}).then(function (result) {
  //  // found docs with name === 'foo'
  //  console.log(result);
  //}).catch(function (err) {
  //  // handle any errors
  //  console.log(err);
  //});

  /*localDB.query(function (doc, emit) {
    emit(doc.username, doc.password);
  }, {key: 'basil', key:'123456'}).then(function (result) {
    // found docs with name === 'foo'
    console.log(result);
  }).catch(function (err) {
    // handle any errors
    console.log(err);
  });*/

  /*
  $scope.resetUserFormData = function() {
    $scope.userFormData = {
      'username': '',
      'password': ''
    };
  };

  $scope.resetUserFormData();

  $scope.user = UserService;

  console.log('im inside loginCtrl');
  // check the username and password in login page
  $scope.isValidUser = function(form){
    console.log(form);
    remoteDB.login($scope.userFormData.username, $scope.userFormData.password, function (err, response) {
      if (err) {
        if (err.name === 'unauthorized') {
          // name or password incorrect
          console.log('name or password incorrect');
          $ionicPopup.alert({
            title: 'Response',
            template: 'username or password incorrect'
          });
        } else {
          // cosmic rays, a meteor, etc.
          console.log('something unkown happens');
          $ionicPopup.alert({
            title: 'Response',
            template: 'something unkown happens'
          });
          console.log(err);
        }
      } else {
        console.log(response);
        console.log('im here');
        $scope.loggedInUser = $scope.userFormData.username;
        HomeworkService.load();
        //valid = true;
        //console.log('status of valid:' + valid);
        $state.go('tabsController.todoList');
        //return true;
      }
    });
    /*if ($scope.user.checkUser($scope.userFormData)) {
      console.log('inside check user CONTROLLER');
      $state.go('tabsController.todoList');
      console.log('after inside check user CONTROLLER');
    }*/
  //};
})

.controller('signupCtrl', function($scope, $state, AuthService /*UserService*/) {

  $scope.userSignupFormData = {
    'username': '',
    'password': ''
  };

  $scope.createUser = function (form) {

    console.log("SignupCtrl::signup");

    //if(form.$valid) {
      AuthService.signup($scope.userSignupFormData.username,
        $scope.userSignupFormData.password)
        .then(function() {
          $state.go("login");
        });

      console.log("valid form");
    //} else {
    //  console.log("ivalid form");
    //}
    //TODO
  };
  /*var localDB = new PouchDB("todos");
  var remoteDB = new PouchDB("https://basil.cloudant.com/todos");

  localDB.sync(remoteDB, {
    live: true,
    auth: {
      username: 'basil',
      password: 'Abu1Mahdi'
    }
  });*/
  // for the couchdb
/*
  $scope.resetUserSignupFormData = function() {
    $scope.userSignupFormData = {
      'username': '',
      'password': ''
    };
  };

  $scope.resetUserSignupFormData();

  $scope.user = UserService;

  console.log('im inside signupCtrl');
  $scope.createUser = function(form){
    console.log(form);
    if ($scope.user.add($scope.userSignupFormData)) {
      $scope.resetUserSignupFormData();
      form.$setPristine(true);
      //console.log('user added');
      $state.go('login');
    }
    else {
      console.log('user not added');
    }
  };

*/

})
