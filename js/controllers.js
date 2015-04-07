angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log("hello");
  $scope.chat = Chats.get($stateParams.chatId);
})

// projects controller
.controller('ProjectsCtrl', function($scope, Projects) {
	$scope.projects = Projects.all();
	console.log("Projects Controller");
})

// users controller
.controller('UsersCtrl', function($scope, Users) {
	Users.getUsers().then(function(users){
		//users is an array of user objects
		console.log("getting users");
		console.log(users);
		$scope.users = users;
	});
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
