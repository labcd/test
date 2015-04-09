angular.module('starter.controllers', [])

// dashboard controller

.controller('DashCtrl', function($scope) {})

// chats controller

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
.controller('UsersCtrl', function($scope, $state, $ionicLoading, Users) {

  function toast (txt){
      $ionicLoading.show({ template: txt, noBackdrop: true, duration: 2000 });
  }

  $scope.removeUser = function(user) { 

      Users.delete(user).then(function(response){
          console.log(response);

          if(response.status == 204){
            toast('User Deleted');
          } else if (response.status == 404) {
            // we should take care of this for the user sake
            toast('the resource was not found');
          } else {
            toast('what the hell?');
          }
      });
  };


  $scope.doSomething = function() {
    console.log("do something");
    $state.go('tab.user-add');
  };

  Users.getUsers().then(function(users){

      if(typeof(users) === 'object' ){
        $scope.users = users;
      } else {
        console.log(users);
      }
	});
})

.controller('UsersAddCtrl', function($scope, $state, $stateParams, $ionicLoading, Users) {

    function toast (txt){
      $ionicLoading.show({ template: txt, noBackdrop: true, duration: 2000 });
    }

    // cancel action of adding a new user
    $scope.cancelUserForm = function(){
      console.log("canceling");
      $state.go('tab.users');
    };

    // form has been submited
    // we need to add validation (is filled, has min chars, is email...)
    $scope.createUser = function(user){
      console.log(user);

      Users.add(user).then(function(response){

        console.log(response);
        // checking the header status
        if(response.status == 201){
          console.log('user just added');
          $state.go('tab.users');
        } else if (response.status == 400) {
          // bad request
          console.log(response.data);

          // common problems (username taken) this one cannot be checked locally
          // common problems (username too long)
          // common problems (username invalid chars)
          if(response.data.username) {
            toast(response.data.username[0]);
          } else if (response.data.email) {
            toast(response.data.email[0]);
          } else {
            toast(response.status + ' ' + response.statusText);
          }
        } else {
          toast('what the hell happened, dog?');
        }

      });
    };

})

.controller('UserDetailCtrl', function($scope, $state, $stateParams, Users) {

    // cancel action of adding a new user
    $scope.editUser = function(user){
      console.log(user);
      // https://github.com/angular-ui/ui-router/wiki/Quick-Reference#stategoto--toparams--options
      $state.go('tab.user-edit', { 'userId': user.id });
    };

    Users.get($stateParams.userId).then(function(users){

      if(typeof(users) === 'object' ){
        $scope.user = users;
      } else {
        console.log(users);
      }
  });

})

.controller('UserEditCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicLoading, Users) {

    function toast (txt){
      $ionicLoading.show({ template: txt, noBackdrop: true, duration: 2000 });
    }

    console.log("the user is is: " + $stateParams.userId);

    // cancel action of adding a new user
    $scope.cancelEditUser = function(){
      console.log("dismiss edit form");
      
      // check if the form is "dirty" if it is do not allow leaving

      // go to back view if view exists
      // http://ionicframework.com/docs/api/service/$ionicHistory/
      $ionicHistory.goBack();
    };

    $scope.updateUser = function(user){
      console.log('updating user');
      console.log(user);

      Users.edit(user).then(function(response){
        
        console.log(response);
        
        if(response.status == 200){
          toast('User Updated');
          $state.go('tab.users');
        } else if (response.status == 400) {
            if(response.data.username) {
              toast(response.data.username[0]);
            } else if (response.data.email) {
              toast(response.data.email[0]);
            } else {
              toast(response.status + ' ' + response.statusText);
            }
        } else {
          toast('What the Hell');
        }

      });

    };

    Users.get($stateParams.userId).then(function(users){

      if(typeof(users) === 'object' ){
        $scope.user = users;
      } else {
        console.log(users);
      }
  });



})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
