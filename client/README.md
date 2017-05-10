# node-ionic-loopback
A Simple Ionic Tab Web Application integrated with Loopback and MonDB Database

# frameworks
- Loopback 2.38.3
- Loopback MongoDB connector
- Angular Resources 1.5.3
- Ionic framework 2.0.0

# code steps

- **Step 01**:
   Create a node loopback application
```
slc loopback
```

- **Step 02**:
 Install mongoDB loopback connector
```
npm install loopback-connector-mongodb
```
 
- **Step 03**:
Configure database connection with mongoDB and create s simple Stock model to test
```
datasource.js:
	{
	   "test": {
	        "host": "localhost",
	        "port": 27017,
	        "database": "testdb",
	        "name": "test",
	        "connector": "mongodb"
	    }
	}

model-config.json:
    "Stock": {
        "dataSource": "test",
        "public": true
	}

stock.json:
	{
	    "name": "Stock",
	    "description": "A Stock model",
	    "plural": "Stocks",
	    "base": "PersistedModel",
	    "idInjection": true,
	    "options": {
	        "validateUpsert": true
	    },
	    "properties": {
	        "product": {
	            "type": "string",
	            "required": true,
	            "comments": "Stock product"
	        },
	        "quantity": {
	            "type": "number",
	            "required": true,
	            "comments": "Stock quantity"
	        },
	        "date": {
	            "type": "date",
	            "required": true,
	            "comments": "Stock date"
	        }
	    },
	    "validations": [],
	    "relations": {},
	    "acls": [],
	    "methods": {}
	}

stock.js:
	module.exports = function(Stock) {
	}

```

- **Step 04**:
 Create a simple ionic tab application called client 
```
ionic start client tabs
```

- **Step 05**:
 Create a simple ionic tab application called client without typescript
```
ionic start client tabs
```

- **Step 06**:
 Generate Angular service layer from loopback models and cut and paste inside js folder of the ionic client app
```
lb-ng ./server/server.js lb-services.js
```

- **Step 07**:
 Load the angular resource and angular loopnack services in the index template
```
    <!-- angular-resource js -->
    <script src="js/angular-resource.js"></script>

    <!-- your loopback services js -->
    <script src="js/lb-services.js"></script>
```

- **Step 08**:
 Inject the Stock service in any ionic template ans use it for example loading all stock
```
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

tab-chats.html:
<ion-view view-title="Products">
  <ion-content>
    <ion-list>
      <ion-item class="item-remove-animate item-avatar item-icon-right" ng-repeat="stock in stocks" type="item-text-wrap" href="#/tab/chats/{{chat.id}}">
        <!--<img ng-src="{{chat.face}}">
        <h2>{{chat.name}}</h2>
        <p>{{chat.lastText}}</p>-->
        <h2>{{stock.product}}</h2>
        <p>{{stock.quantity}} - {{stock.date}} </p>
        <i class="icon ion-chevron-right icon-accessory"></i>

        <ion-option-button class="button-assertive" ng-click="remove(chat)">
          Delete
        </ion-option-button>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-view>
```
