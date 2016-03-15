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

.controller('loginCtrl', function($scope, UserService) {

  $scope.user = UserService;

  $scope.isValidUser = function(form){

    $scope.user.checkUser(form);
  }

  console.log('im inside loginCtrl');

  //$scope.user.

})

.controller('signupCtrl', function($scope) {

})
