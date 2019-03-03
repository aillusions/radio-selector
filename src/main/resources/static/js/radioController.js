/**
 *
 */
app.controller('radioController', ['$scope', '$rootScope', '$interval', '$http', '$timeout', '$route', '$location',
    function ($scope, $rootScope, $interval, $http, $timeout, $route, $location) {

        var vm = this;

        vm.availableStations = RADIO_SELECTOR.availableItems;

        $scope.$on("$locationChangeSuccess", function ($event, next, current) {
            var num = getCurrentNum();
            if (num) {
                RADIO_SELECTOR.setSelectedNumber(parseInt(num));
            }
        });

        var crawlInterval = null;
        vm.onToggleCrawl = function () {
            if (crawlInterval) {
                $interval.cancel(crawlInterval);
                crawlInterval = null;
            } else {
                crawlInterval = $interval(function () {
                    navigateToNum(getCurrentNum() + 1)
                }, 5000);
            }
        };

        function navigateToNum(num) {
            $location.search({"num": num})
        }

        function getCurrentNum() {
            var search = $location.search();
            var num = search['num'];
            console.info("num:" + num);
            if (num) {
                return parseInt(num);
            }
            return null;
        }

    }]);

