var app = angular.module('TraderApp', ['ngMaterial', 'ngRoute', 'TraderApp.Auth']);


app.config(function ($routeProvider) {
    $routeProvider
        .otherwise("/", {
            templateUrl: "./templates/home.html",
            controller: "AppCtrl"
        })
        .when("/", {
            templateUrl: "./templates/home.html",
            controller: "AppCtrl"
        })

    .when("/auth", {
        templateUrl: "./templates/auth.html",
        controller: "AppCtrl"
    })

    .when("/logout", {
        templateUrl: "./templates/logout.html",
        controller: "AppCtrl"
    })

    .when("/messages", {
        templateUrl: "./templates/messages.html",
        controller: "AppCtrl"
    });
});

//app.factory('items', ['$http', function($http){
//	
//	var obj = {
//		items: []
//	};
//	
//	obj.getAll = function () {
//		return $http.get('/items').success(function(data) {
//			angular.copy(data, obj.items);
//		});
//	};
//	
//	obj.create = function(item) {
//		return $http.post('/items', item).success(function(data) {
//			obj.items.push(data);
//		});
//	};
//	
//	obj.get = function (id) {
//		return $http.get('/items/' + id)
//		.then(function (res) {
//			return res.data;
//		});
//	};
//	
//	return obj;
//}]);


//app.factory('messages', ['$http', function($http){
//	
//	var mes = {
//		messages: []
//	};
//	
//	mes.getAll = function () {
//		return $http.get('/messages').success(function(data) {
//			angular.copy(data, mes.messages);
//		});
//	};
//	
//	mes.create = function(item) {
//		return $http.post('/messages', message).success(function(data) {
//			mes.messages.push(data);
//		});
//	};
//	
//	mes.get = function (id) {
//		return $http.get('/messages/' + id)
//		.then(function (res) {
//			return res.data;
//		});
//	};
//	
//	return mes;
//}]);
//
//
//app.controller('MessageCtrl', ['$scope', function($scope){
//	
//	$scope.messages = mes.messages;
//	
//	$scope.addMessage = function() {
//		if (!$scope.name || $scope.name === '') {
//			return;
//		}
//		messages.create({
//			to: $scope.to,
//			from: $scope.from,
//			subject: $scope.subject,
//			content: $scope.content
//		});
//		$scope.to = '';
//		$scope.from = '';
//		$scope.subject = '';
//		$scope.content = ''
//	};
//
//	
//}]);






// ProfileService is to update user / UserService is to sign up and log in / out
app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', 'ProfileService', 'UserService', '$location', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, ProfileService, UserService, $location) {
    $scope.newUser = {};
    $scope.loginUser = {};
    $scope.user = UserService.loggedInUser;

    $scope.signup = function () {
        UserService.signup($scope.newUser).then(function (response) {
            UserService.login($scope.newUser).then(function (response) {
                $scope.newUser = {};
            });
        });
    };

    $scope.login = function () {
        UserService.login($scope.loginUser).then(function (response) {
            $scope.loginUser = {};
        });
    };

    $scope.logout = function () {
        UserService.logout().then(function () {
            $location.path('/logout');
        });
    };

    $scope.postItem = function () {
        ProfileService.postItem(items);
    };

    $scope.deleteItem = function (index) {
        ProfileService.deleteItem(index);
    };

    $scope.updateItem = function () {

    };

    $scope.message = function () {

    };


    //  $scope.items = obj.items;
    //  
    //  
    //  $scope.addItem = function() {
    //      if (!$scope.name || $scope.name === '') {
    //          return;
    //      }
    //      items.create({
    //          name: $scope.name,
    //          description: $scope.description,
    //          willTradeFor: $scope.willTradeFor,
    //          imgUrl: $scope.imgUrl
    //      });
    //      $scope.name = '';
    //      $scope.description = '';
    //      $scope.willTradeFor = '';
    //      $scope.imgUrl = ''
    //  };
    //  
    // Toolbar search toggle
    $scope.toggleSearch = function (element) {
        $scope.showSearch = !$scope.showSearch;
    };
    // Sidenav toggle
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };
    // Menu items
    $scope.menu = [{
        link: '#/',
        title: 'Home',
        icon: 'action:ic_dashboard_24px',
    }, {
        link: '#/profile',
        title: 'Profile',
        icon: 'social:ic_group_24px',
    }, {
        link: '#/messages',
        title: 'Messages',
        icon: 'communication:ic_message_24px',
    }];
    $scope.admin = [{
        link: '#/logout',
        title: 'Logout',
        icon: 'action:ic_settings_24px',
    }, {
        link: '#/auth',
        title: 'temp auth',
        icon: 'action:ic_settings_24px',
    }];
    //  mock user activity
    $scope.user = {
        firstName: "John",
        lastName: "Franklin",
        username: "user123",
        password: "password",
        imgUrl: "http://a4.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTE1ODA0OTcxODA2OTgzNjkz.jpg",
        location: "Los Angeles, CA",
        lookingFor: "cool stuff",
        messages: [{
            from: $scope.user,
            content: "Hey I Would like to trade for your macbook. Is there anything on my profile you would like to exchange for?"
        }, {
            from: $scope.user,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }, {
            from: $scope.user,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }, {
            from: $scope.user,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }],
        tradeItems: [{
            name: "Yoga Mat",
            description: "Slightly used but in great condition",
            owner: "John Gates",
            offers: [{
                from: "Mark"
            }],
            willTradeFor: "Cereal Boxes or new tires",
            imgUrl: "http://www.texasrockgym.com/wp-content/uploads/2016/04/Yoga-mat-for-fitness-1329383585-0.jpg"
        }, {
            name: "MacBook Pro 2012",
            description: "Slightly used but sooo goood",
            owner: "John Gates",
            offers: [{
                from: "Becky"
            }],
            willTradeFor: "newer iphone",
            imgUrl: "http://images.newseveryday.com/data/images/full/43002/apple-may-finally-put-down-the-legacy-macbook-pro.jpg"
        }]
    };
    // Mock activity
    $scope.activity = [{
        name: "Kindle Fire",
        description: "Good condition",
        owner: "Mike",
        willTradeFor: "ipad or ipad mini",
        imgUrl: "http://www.androidcentral.com/sites/androidcentral.com/files/styles/larger/public/article_images/2014/09/Amazon-Kindle-Fire-HDX89.jpg?itok=5fenbZ5F"
    }, {
        name: "Lawn Chairs",
        description: "Slightly used",
        owner: "Dillon",
        willTradeFor: "Samsung Note 7",
        imgUrl: "http://tart.highbarmiami.com/wp-content/uploads/2016/03/Foldable-Lawn-Chairs-Big-Lots.jpg"
    }, {
        name: "Cowboy Boots",
        description: "Snake skin size 11",
        owner: "Sam",
        willTradeFor: "iphone",
        imgUrl: "http://www.zappos.com/images/z/1/5/8/7/3/0/1587307-p-4x.jpg"
    }, {
        name: "Playstation 4",
        description: "Works just fine",
        owner: "Jo Jo",
        willTradeFor: "french fries",
        imgUrl: "https://cnet3.cbsistatic.com/img/UxcARCVAmoih6RLZqLUT964Lvuw=/620x0/2013/11/11/3dd2de99-84cb-11e3-beb9-14feb5ca9861/Sony_PS4_35618167_03.jpg"
    }, {
        name: "Yoga Mat",
        description: "Slightly but in great condition",
        owner: "John Gates",
        willTradeFor: "Cereal Boxes or new tires",
        imgUrl: "http://www.texasrockgym.com/wp-content/uploads/2016/04/Yoga-mat-for-fitness-1329383585-0.jpg"
    }, {
        name: "MacBook Pro 2012",
        description: "Slightly used but sooo goood",
        owner: "John Gates",
        willTradeFor: "newer iphone",
        imgUrl: "http://images.newseveryday.com/data/images/full/43002/apple-may-finally-put-down-the-legacy-macbook-pro.jpg"
    }];
    // Bottomsheet & Modal Dialogs
    $scope.alert = '';
    $scope.showListBottomSheet = function ($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
            template: '<md-bottom-sheet class="md-list md-has-header"><md-list><md-list-item class="md-2-line" ng-repeat="item in items" role="link" md-ink-ripple><md-icon md-svg-icon="{{item.icon}}" aria-label="{{item.name}}"></md-icon><div class="md-list-item-text"><h3>{{item.name}}</h3></div></md-list-item> </md-list></md-bottom-sheet>',
            controller: 'ListBottomSheetCtrl',
            targetEvent: $event
        }).then(function (clickedItem) {
            $scope.alert = clickedItem.name + ' clicked!';
        });
    };
    //  $scope.postItem = 
    $scope.showAdd = function (ev) {
        $mdDialog.show({
                controller: DialogController,
                template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="userForm"> <md-input-container flex> <label>Item Name</label> <textarea ng-model="name" columns="1" md-maxlength="150"></textarea> </md-input-container> <md-input-container flex> <label>Item Description</label> <textarea ng-model="description" columns="1" md-maxlength="150"></textarea> </md-input-container> <md-input-container flex> <label>Will Trade For</label> <textarea ng-model="willTradeFor" columns="1" md-maxlength="150"></textarea> </md-input-container> <md-input-container flex> <label>Image Url</label> <textarea ng-model="imgUrl" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="addItem()" class="md-primary"> Post </md-button> </div></md-dialog>',
                targetEvent: ev,
            })
            .then(function (answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.alert = 'You cancelled the dialog.';
            });
    };
}]);
app.controller('ListBottomSheetCtrl', function ($scope, $mdBottomSheet) {
    $scope.items = [{
        name: 'Share',
        icon: 'social:ic_share_24px'
    }, {
        name: 'Upload',
        icon: 'file:ic_cloud_upload_24px'
    }, {
        name: 'Copy',
        icon: 'content:ic_content_copy_24px'
    }, {
        name: 'Print this page',
        icon: 'action:ic_print_24px'
    }, ];
    $scope.listItemClick = function ($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };
});

function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
};
app.controller('DemoCtrl', DemoCtrl);

function DemoCtrl($timeout, $q) {
    var self = this;
    // list of `state` value/display objects
    self.states = loadAll();
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        var results = query ? self.states.filter(createFilterFor(query)) : [];
        return results;
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
        var allStates = 'Ali Conners, Alex, Scott, Jennifer, \
              Sandra Adams, Brian Holt, \
              Trevor Hansen';
        return allStates.split(/, +/g).map(function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };
    }
};
//color theme//
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('orange')
        .warnPalette('red');
});




app.config(function ($mdIconProvider) {
    $mdIconProvider
    // linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
    // 
        .iconSet('action', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24)
        .iconSet('alert', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24)
        .iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24)
        .iconSet('communication', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-communication.svg', 24)
        .iconSet('content', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-content.svg', 24)
        .iconSet('device', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-device.svg', 24)
        .iconSet('editor', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-editor.svg', 24)
        .iconSet('file', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-file.svg', 24)
        .iconSet('hardware', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-hardware.svg', 24)
        .iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24)
        .iconSet('maps', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-maps.svg', 24)
        .iconSet('navigation', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-navigation.svg', 24)
        .iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24)
        .iconSet('social', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-social.svg', 24)
        .iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24)

    // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
    .iconSet('avatars', 'https://raw.githubusercontent.com/angular/material/master/docs/app/icons/avatar-icons.svg', 24)
        .defaultIconSet('https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24);
});