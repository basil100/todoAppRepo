angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('HomeworkService', [function(){

  var self = {
    'results': [],
    'items': [
      {
        'id': 1,
        'title': 'Math homework',
        'className': 'Math',
        'dueDate': '',
        'done': true,
        'userId': 001
      },
      {
        'id': 2,
        'title': 'CS homework',
        'className': 'Computer Science',
        'dueDate': '',
        'done': false,
        'userId': 001
      },
      {
        'id': 3,
        'title': 'NTM homework',
        'className': 'Networking',
        'dueDate': '',
        'done': true,
        'userId': 001
      }
    ],
    'add': function(data){
      console.log('--- before the addition ---');
      console.log(self.items);

      console.log('--- after the addition ---');

      var item = {
        'id': 100,
        'title': data.title,
        'className': data.className,
        'dueDate': data.dueDate,
        'userId': 001
      }
      self.items.push(item);

      console.log(self.items);
    },
    'remove': function() {},
    'search': function() {}
  };

  return self;

}])

.service('UserService', [function(){

  var self = {

    'users': [
      {
      'id': 1,
      'username': 'test',
      'password': 'test'
    },
      {
        'id': 2,
        'username': 'test2',
        'password': 'test2'
      }
    ],
    'checkUser': function(data){
      console.log('im inside checkUser');
      console.log(data);

      for (var i=0; i < self.users.length; i++) {
        if (self.users[i].username === data.username && self.users[i].password === data.password) {
          console.log('its a valid user');
          return true;
          //break;
        } else {
          console.log('its not valid');
        }
      }
    },
    'add': function(data) {
      console.log('im inside add function');
      console.log('-- before adding a new user --');
      console.log(self.users);

      var numberOfUsers = self.users.length;

      self.users.push(data);

      if (self.users.length === (numberOfUsers+1)) {
        console.log('-- after adding a new user --');
        console.log(self.users);
        return true;
      }

      return false;
    }

  };

  return self;
}]);

