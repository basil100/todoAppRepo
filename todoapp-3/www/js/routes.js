angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.todoList'
      2) Using $state.go programatically:
        $state.go('tabsController.todoList');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/list
      /page1/tab3/list
  */

    .state('tabsController', {
      url: '/tab',
      templateUrl: 'templates/tabsController.html',
      abstract:true
    })

  .state('tabsController.todoList', {
    url: '/list',
    cache: false,
    views: {
      'todolistTab': {
        templateUrl: 'templates/todoList.html',
        controller: 'todoListCtrl'
      }
    }
  })

  .state('tabsController.addTodo', {
    url: '/add',
    views: {
      'addTodoTab': {
        templateUrl: 'templates/addTodo.html',
        controller: 'addTodoCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    cache: false,
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  $urlRouterProvider.otherwise('/login')
//$urlRouterProvider.otherwise('/tab/list')



});
