angular.module('app.controllers', [])

.controller('todoListCtrl', function($scope, $ionicListDelegate, HomeworkService) {

  $scope.homeworks = HomeworkService;

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

.controller('addTodoCtrl', function($scope, $state, HomeworkService) {

  $scope.resetFormData = function() {
    $scope.formData = {
      'id': 100,
      'title': '',
      'className': '',
      'dueDate': '',
      'done': false,
      'userId': 001
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

  //$scope.homeworks = HomeworkService;

})

.controller('loginCtrl', function($scope, $state, UserService) {

  $scope.resetUserFormData = function() {
    $scope.userFormData = {
      'username': '',
      'password': ''
    };
  };

  $scope.resetUserFormData();

  $scope.user = UserService;

  console.log('im inside loginCtrl');
  $scope.isValidUser = function(form){
    console.log(form);
    if ($scope.user.checkUser($scope.userFormData)) {
      $state.go('tabsController.todoList')
    }
  };
})

.controller('signupCtrl', function($scope, $state, UserService) {

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
      console.log('user added');
      $state.go('login');
    }
    else {
      console.log('user not added');
    }
  };



})
