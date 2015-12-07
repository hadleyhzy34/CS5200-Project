angular.module('cs5200Project')
.controller('landscapeController', function ($scope, $location, landscapeService, regionService) {
    climateService.getClimateTypes().then(function (result) {
        $scope.climateTypeOptions = result.data;
    });

    $scope.addClimate = function () {
        climateService.addClimate({
                "windSpeed":$scope.windSpeed,
                "humidity":$scope.humidity,
                "precipitation":$scope.precipitation,
                "isFor":$scope.regionId,
                "climateType":$scope.climateType,
                "min":$scope.min,
                "max":$scope.max,
                "surfaceTemp":$scope.surfaceTemp,
                "airTemp":$scope.airTemp,
                "averageTemp":$scope.averageTemp
            })
        .then(function (result) {
            $scope.windSpeed = $scope.humidity = $scope.precipitation = $scope.min = '';
            $scope.climateType = $scope.max = $scope.surfaceTemp = $scope.airTemp = '';
            $scope.regionId = $scope.averageTemp = '';
            $scope.regions = null;
            $scope.addClimateFlag = false;
            $location.path("/success");
        }, function (error) {
            console.log(error);
        });
    };

    $scope.initRegion = function () {
        regionService.getRegions().then(function (result) {
            var lookup = {}, array = result.data;
            for (var i = 0, len = array.length; i < len; i++) {
                lookup[array[i].id] = array[i];
            }
            $scope.regions = lookup;
        });
    };

    $scope.$watch('landscape.regionId', function (newValue, oldValue) {
        landscapeService.getLandscape({
            "regionId":$scope.landscape.regionId
        })
        .then(function (result) {
            $scope.landscapeInfo = result.data;
        }, function (error) {
            console.log(error);
        });
    });
});
