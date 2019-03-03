/**
 *
 */


var app = angular.module('radio', ['ngStorage', 'ngRoute']);

/*app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            redirectTo: '?idx=0'
        });
});*/

app.controller('radioController', ['$scope', '$rootScope', '$interval', '$http', '$timeout', '$route', '$location',
    function ($scope, $rootScope, $interval, $http, $timeout, $route, $location) {

        var vm = this;

        $scope.$on("$locationChangeSuccess", function ($event, next, current) {
            var search = $location.search();
            var idx = search['idx'];
            console.info("idx:" + idx)
            RADIO_SELECTOR.selectorItemHandler(idx);
        });

    }]);

