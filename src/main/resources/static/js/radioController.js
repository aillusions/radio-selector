/**
 *
 */
app.controller('radioController', ['$scope', '$rootScope', '$interval', '$http', '$timeout', '$route', '$location',
    function ($scope, $rootScope, $interval, $http, $timeout, $route, $location) {

        var vm = this;

        vm.availableStations = RADIO_SELECTOR.availableItems;

        $scope.$on("$locationChangeSuccess", function ($event, next, current) {
            var search = $location.search();
            var num = search['num'];
            console.info("num:" + num);
            if(num) {
                RADIO_SELECTOR.setSelectedNumber(parseInt(num));
            }
        });

    }]);

