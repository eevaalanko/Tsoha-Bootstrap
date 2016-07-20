
/* global callback */

var app = angular.module("myApp", ['ui.bootstrap', 'angularMoment']);
angular.module("myApp").controller(
        "myCtrl",
        function ($scope, $http, $log, $uibModal) {
            $scope.current = null;
            $scope.newTuto = null;
            $scope.getAllTutos = function () {
                $http.get('allTutorials').then(function (result) {
                    console.log(result);
                    $scope.tutos = result.data;
                    console.log("Tutoriaalin nimi on: " + $scope.tutos[0].name);
                });
            };
            $scope.avgStars = function (id) {
                $scope.stars = null;
                $http({
                    url: "avgStars",
                    method: "POST",
                    data: id
                }).then(function (result) {
                    console.log(result);
                    $scope.stars = result;
                });
                return $scope.stars;
            };

            $scope.openTutoPage = function (tuto) {
                $scope.current = tuto;
                $scope.open('lg');
                console.log($scope.current);
            };
            $scope.addTuto = function () {
                $http({
                    url: "addTutorial",
                    method: "POST",
                    data: $scope.newTuto
                }).then(function (result) {
                    console.log(result);
                    init();
                });
                $scope.newTuto = null;
            };
            var init = function () {
                $scope.getAllTutos();
                console.log("test");
            };
            init();
            $scope.open = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        current: function () {
                            return $scope.current;
                        }
                    }
                });
                modalInstance.result.then(function () {

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });

angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $http, $uibModalInstance, current) {
    $scope.current = current;
    $scope.reviews = null;
    $scope.newReview = {tutorial_id: current.id};
    $scope.getAllReviews = function () {
        $http({
            url: "allReviews",
            method: "POST",
            data: current.id
        }).then(function (result) {
            console.log(result);
            $scope.reviews = result.data;
        });
    };
    var initReviews = function () {
        $scope.getAllReviews();
        console.log("tuto name: " + $scope.current.name);
    };
    initReviews();
    $scope.addReview = function () {
        $http({
            url: "addReview",
            method: "POST",
            data: $scope.newReview
        }).then(function (result) {
            console.log(result);
            initReviews();
        });
        $scope.newReview = {tutorial_id: current.id};
    };
    $scope.rate = 3;
    $scope.max = 5;
    $scope.min = 1;
    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});






 