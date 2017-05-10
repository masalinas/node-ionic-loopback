angular.module('starter.controllers', ['lbServices'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, Stock) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  function getStocks() {
      Stock.find()
          .$promise
          .then(function(stocks, responseHeaders) {
              if (stocks.length > 0)
                  $scope.stocks = JSON.parse(angular.toJson(stocks));
              else
                  $scope.stocks = [];
          },
          function(httpResponse) {
              var error = httpResponse.data.error;
              console.log('Error querying stocks - ' + error.status + ": " + error.message);
          });
  }

  $scope.chats = Chats.all();

  // recover entities
  getStocks();

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
