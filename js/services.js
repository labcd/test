angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Users', function($http) {
  // Might use a resource here that returns a JSON array

  var users = [];

  return {
    getUsers: function(){
      
      $http.defaults.headers.common.Authorization = 'Basic bG9ibzpsb2Jv';

      // https://docs.angularjs.org/api/ng/service/$http#get  
      var HttpPromise = $http.get("http://busycoaches.com/users/").then(
        function success (response){
            console.log("success");
            users = response.data.results;
            return users;
      }, function failure (reason){
            console.log(reason);
            var errorMessage = reason.status + " " + reason.statusText + " " + reason.data.detail;
            return errorMessage;
      });

      return HttpPromise;
    },
    get: function(userId) {

      $http.defaults.headers.common.Authorization = 'Basic bG9ibzpsb2Jv';
      
      // https://docs.angularjs.org/api/ng/service/$http#get  
      var HttpPromise = $http.get("http://busycoaches.com/users/" + userId + "/").then(
        function success (response){
            console.log("success");
            user = response;
            return user.data;
      }, function failure (reason){
            console.log(reason);
            var errorMessage = reason.status + " " + reason.statusText + " " + reason.data.detail;
            return errorMessage;
      });

      return HttpPromise;

    },
    add: function(user){
        console.log("lets add a user to the service");
        console.log(user);

        $http.defaults.headers.common.Authorization = 'Basic bG9ibzpsb2Jv';
      
        // https://docs.angularjs.org/api/ng/service/$http#post          
        var HttpPromise = $http.post("http://busycoaches.com/users/", angular.toJson(user)).then(
          function success(response){
            console.log("success");
            users.push(response.data);
            return response;
          },
          function failure(response){
            // console.log(response);
            return response;
          });

        return HttpPromise;
    },
    edit: function(user){

      $http.defaults.headers.common.Authorization = 'Basic bG9ibzpsb2Jv';

      // https://docs.angularjs.org/api/ng/service/$http#post
      var HttpPromise = $http.put(user.url, angular.toJson(user)).then(
        function success(response) {
          console.log(response.data);

          for (var i = 0; i < users.length; i++) {
            // console.log();
            // console.log("---");
            // console.log();
            if (users[i].id === response.data.id) {
              users[i] = response.data;
              break;
            }
          }

          return response;
        },
        function failure(response) {
          console.log(response);
          return response;
        }
      );

      return HttpPromise;


    },
    delete: function(user){
      console.log("removing " + user.id + " " + users.length);      

      $http.defaults.headers.common.Authorization = 'Basic bG9ibzpsb2Jv';

      // https://docs.angularjs.org/api/ng/service/$http#post
      var HttpPromise = $http.delete("http://busycoaches.com/users/" + user.id + "/").then(
        function success(response) {
          console.log("success");
          console.log(users);
          // users.splice(2,1);
          users.splice(users.indexOf(user), 1);
          return response;
        },
        function failure(response) {
          console.log("error");
          return response;
        }
      );

      return HttpPromise;

    }
  };
})

.factory('Projects', function() {
  // Might use a resource here that returns a JSON array

  // for now i'll use this shit
  var projs = [{
    id: 0,
    name: 'Taskatone',
    description: 'A very complex and robust project manager'
  }, {
    id: 1,
    name: 'Please do Not...',
    description: 'A screw you too app to use with your friends'
  }, {
    id: 2,
    name: 'Punching Bag',
    description: 'A would-be processing app to learn how to kick'
  }];


  return {
    all: function() {
      return projs;
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});


