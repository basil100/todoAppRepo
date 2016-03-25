var app = angular.module('app.services', [])

  /*
.factory('PouchDBListener', [function(){

  localDB.changes({
    continuous: true,
    onChange: function(change) {
      if (!change.deleted) {
        $rootScope.$apply(function() {
          localDB.get(change.id, function(err, doc) {
            $rootScope.$apply(function() {
              if (err) console.log(err);
              $rootScope.$broadcast('add', doc);
            })
          });
        })
      } else {
        $rootScope.$apply(function() {
          $rootScope.$broadcast('delete', change.id);
        });
      }
    }
  });

  return true;

}])*/
  app.service('AuthService', function ($q, $ionicPopup) {
    var self = {
      user: Parse.User.current(),
      login: function (username, password) {
        var d = $q.defer();

        //TODO

        Parse.User.logIn(username, password,{
          success: function(user){
            console.log("Logged In");
            self.user = user;
            d.resolve(self.user);
          },
          error: function(user, error) {
            console.log("Log In Fail");
            $ionicPopup.alert({
              title:"Log In Error",
              subTitle: error.message
            });
            d.reject(error);
          }
        });

        return d.promise;
      },
      signup: function (username, password) {
        var d = $q.defer();

        //TODO

        var user = new Parse.User();
        user.set("username", username);
        //user.set("name", name);
        user.set("password", password);
        //user.set("email", email);

        user.signUp(null, {
          success: function(user) {
            console.log("Account Created");
            self.user = user;
            d.resolve(self.user);
          },
          error: function(user, error) {
            $ionicPopup.alert({
              title:"Signup Error",
              subTitle:error.message
            });

            d.reject(error);
          }
        });

        return d.promise;
      }/*,
      'update': function (data)  {
        var d = $q.defer();

        //TODO
        var user = self.user;
        user.set("username", data.email);
        user.set("name", data.name);
        user.set("email", data.email);

        user.save(null, {
          success: function(user) {
            self.user = Parse.User.current();
            d.resolve(self.user);
          },
          error: function(user, error) {
            $ionicPopup.alert({
              title:"Update Error",
              subTitle: error.message
            });
            d.reject(error);
          }
        });
        return d.promise;
      }*/
    };

    return self;
  });

app.service('HomeworkService', function ($q, $ionicPopup, AuthService){

  var self = {
    'isLoading': false,
    'isSaving': false,
    'results': [],
    'refresh': function () {
      self.isLoading = false;
      self.isSaving = false;
      self.results = [];
      return self.load();
    },
    'load': function () {
      self.results = [];
      self.isLoading = true;
      var d = $q.defer();

      //TODO
      // Initialize Query
      var Homework = Parse.Object.extend("Homework");
      var homeworkQuery = new Parse.Query(Homework);
      homeworkQuery.descending("created");
      homeworkQuery.equalTo("owner", Parse.User.current());

      // Perform the query
      homeworkQuery.find({
        success: function(results) {
          console.log(results);
          console.log("=========== ITEMS HERE =============");
          angular.forEach(results, function(item) {
            console.log(item.attributes);
            //var homework = new Homework(item.attributes);
            //self.results.push(homework); //self.results.push(item);  the same
            self.results.push(item.attributes);

          });
          console.log("========= RESULTS HERE ==============");
          console.log(self.results);

          // are we at the end of the list
          /*if(results.length == 0) {
            self.hasMore = false;
          }*/
          // Finished
          d.resolve()
        }
      });

      return d.promise;
    },
    'addTodo': function (data) {
      self.isSaving = true;
      var d = $q.defer();

      //TODO
      var Homework = Parse.Object.extend("Homework");
      var user = AuthService.user;
      //var file = data.picture? new Parse.File("photo.jpg", {base64: data.picture}) : null;

      var homework = new Homework();
      homework.set("owner", user);
      homework.set("title", data.title);
      homework.set("classname", data.classname);
      homework.set("dueDate", data.dueDate);
      homework.set("done", false);
      homework.set("created", new Date());

      homework.save(null, {
        success: function(homework){
          console.log("a new Homework Added");
          self.results.unshift(homework.attributes);
          console.log(self.results);
          d.resolve(homework);
        },
        error: function(item, error) {
          $ionicPopup.alert({
            title:"Error saving homework",
            subTitle: error.message
          });
          d.reject(error);

        }
      });

      return d.promise;
    }

  };

  return self;

  /*var localDB = new PouchDB("todos");
  var remoteDB = new PouchDB("https://couchdb-1ac554.smileupps.com/todos");

  localDB.sync(remoteDB, {
    live: true,
    auth: {
      username: 'admin',
      password: '44823ed46740'
    }
  });

  var loggedInUser = null;
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
      loggedInUser = response.userCtx.name;
      //self.load();
    }
  }).then(function(){
    console.log('gooooooooooodie');
    console.log(loggedInUser);
  });

  var self = {
    'results': [],
    'items': [
      /*{
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
      }*/
    /*],
    'load': function() {
      console.log(loggedInUser);
      localDB.query(function (doc, emit) {
        emit(doc.username, {
          _id: doc._id,
          className: doc.className,
          done: doc.done,
          dueDate: doc.dueDate,
          title: doc.title,
          username: doc.username
        });
      }, {key: loggedInUser}).then(function (result) {

        //var defer = $q.defer();
        // found docs with name === 'foo'
        console.log('the results');
        console.log(result);
        console.log('AFTER the results');
        //console.log(result.rows[1].value);
        //getting data from the results
        result.rows.forEach(function(item) {
          console.log(item.value);
          self.items.push(item.value);
        });

        //defer.resolve(self.items);
        //self.items.push(result.value);
      });/*.catch(function (err) {
        // handle any errors
        console.log(err);
      });*/

      //return defer.promise;
    /*},
    'add': function(data){
      console.log('--- before the addition ---');
      console.log(self.items);

      console.log('--- after the addition ---');

      var item = {
        'title': data.title,
        'className': data.className,
        'dueDate': data.dueDate,
        'done': false,
        username: loggedInUser
      };

      //self.items.push(item);

      localDB.post(item)
        .then(function(response) {
        console.log('created inside couchDB');
        console.log(response);
          self.items.push(item);

        //self.load();

        //console.log('Values');
        //console.log(response.value);

      });

      //self.load();

      console.log(self.items);
    },
    'remove': function() {},
    'search': function() {}
  };
  //self.load();

  return self;*/

});

app.service('UserService', [function($state){

  var localDB = new PouchDB("todos");
  var remoteDB = new PouchDB("https://couchdb-1ac554.smileupps.com/todos");

  localDB.sync(remoteDB, {
    live: true,
    auth: {
      username: 'admin',
      password: '44823ed46740'
    }
  });

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

      /*var valid = false;

      remoteDB.login(data.username, data.password, function (err, response) {
        if (err) {
          if (err.name === 'unauthorized') {
            // name or password incorrect
            console.log('name or password incorrect');
          } else {
            // cosmic rays, a meteor, etc.
            console.log('something unkown happens');
            console.log(err);
          }
        } else {
          console.log(response);
          console.log('im here');
          valid = true;
          console.log('status of valid:' + valid);
          //$state.go('tabsController.todoList');
          return true;
        }
      });
      console.log('status of valid:' + valid);
      return false;
      // getting sessions
      /*remoteDB.getSession(function (err, response) {
        if (err) {
          // network error
          console.log('network error');
        } else if (!response.userCtx.name) {
          // nobody's logged in
          console.log('nobody\'s logged in');
        } else {
          // response.userCtx.name is the current user
          console.log(response.userCtx.name + ' is the current user');
        }
      });*/

      /*for (var i=0; i < self.users.length; i++) {
        if (self.users[i].username === data.username && self.users[i].password === data.password) {
          console.log('its a valid user');
          return true;
          //break;
        } else {
          console.log('its not valid');
        }
      }*/
    },
    'add': function(data) {
      console.log('im inside add function');
      console.log('-- before adding a new user --');
      //console.log(self.users);

      //var numberOfUsers = self.users.length;

      //self.users.push(data);


      /*remoteDB.signup(data.username, data.password, function (err, response) {
        if (err) {
          if (err.name === 'conflict') {
            //already exists, choose another username
            console.log('already exists, choose another username');
            console.log(err);
          } else if (err.name === 'forbidden') {
            //invalid username
            console.log('invalid username');
            console.log(err);
          } else {
            //HTTP error, cosmic rays, etc.
            console.log('HTTP error');
            console.log(err);
          }
        } else {
          console.log(response);
          console.log('new user added');
          $state.go('login');
          return true;
        }
      });*/
      /*localDB.post({
        username:data.username,
        password: data.password
      }).then(function(response) {
        console.log('created inside couchDB');
        console.log(response);
      });*/

      /*function showTodos() {
        localDB.allDocs({include_docs: true, descending: true}, function(err, doc) {
          redrawTodosUI(doc.rows);
        });
      }
      console(showTodos());
      */
      /*
      if (self.users.length === (numberOfUsers+1)) {
        console.log('-- after adding a new user --');
        console.log(self.users);
        return true;
      }
      */
      return false;
    }
  };
  return self;
}]);

