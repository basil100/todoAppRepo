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
  .state('tabsController.todoList', {
    url: '/list',
    views: {
      'todolistTab': {
        templateUrl: 'templates/todoList.html',
        controller: 'todoListCtrl'
      },
      'addTodoTab': {
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

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  $urlRouterProvider.otherwise('/login')
//$urlRouterProvider.otherwise('/page1/todolistTab/list')



});
