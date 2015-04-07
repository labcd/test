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

  var fakeusers = [{
    id: 0,
    name: 'Ricardo Lobo',
    description: 'A very complex and robust project manager'
  }, {
    id: 1,
    name: 'Nuno Barros',
    description: 'A screw you too app to use with your friends'
  }, {
    id: 2,
    name: 'Ighor Martins',
    description: 'A would-be processing app to learn how to kick'
  }, {
    id: 3,
    name: 'Daniel Bento',
    description: 'A would-be processing app to learn how to kick'
  }];

  var users = [];

  return {
    all: function() {
      return fakeusers;
    },
    getUsers: function(){
      
      $http.defaults.headers.common.Authorization = 'Basic bG9ibzpsb2Jv';

      return $http.get("http://busycoaches.com/users/").then(function(response){
        users = response;
        return users.data.results;
      });
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


