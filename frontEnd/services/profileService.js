angular.module("TraderApp")
    .service("ProfileService", ["$http", "UserService", function ($http, UserService) {
        this.loggedInUser = UserService.loggedInUser;
        var _this = this;
        var baseUrl = "http://localhost:8080/";

        // POST a new trade item for the logged in user
        this.postItem = function (itemObj) {
            return $http.post(baseUrl + "/api/user", itemObj).then(function (response) {
                _this.loggedInUser.tradeItems.push(response.data);
                return response.data;
            });
        };

        // PUT an item update for a user
        this.putItem = function (index, itemObj) {
            return $http.put(baseUrl + "/api/user", itemObj).then(function (response) {
                _this.loggedInUser.tradeItems.splice(index, 1, response.data);
                return response.data;
            });
        };

        // DELETE an item post for a user
        this.deleteItem = function (index) {
            var itemId = _this.loggedInUser.tradeItems[index]._id;
            return $http.delete(baseUrl + "/api/user/items/" + itemId).then(function (response) {
                _this.loggedInUser.tradeItems.splice(index, 1);
                return response.data;
            });
        };

    }]);