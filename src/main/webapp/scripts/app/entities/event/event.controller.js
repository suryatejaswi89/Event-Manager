'use strict';

angular.module('eventmanagerApp')
    .controller('EventController', function ($scope, $state, Event, ParseLinks,$http,$stateParams) {

        console.log($stateParams);
        $scope.events = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 0;
        $scope.loadAll = function() {
            if($stateParams.hallid !=='undefined' && $stateParams.hallid !==""){
                $http({method: 'GET', url: '/api/events/atvenue/'+$stateParams.hallid}).then(function successCallback(response) {
                    $scope.events = response.data;
                }, function errorCallback(response) {
                    console.log(response);
                });
            }else{
                Event.query({page: $scope.page, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                    $scope.links = ParseLinks.parse(headers('link'));
                    for (var i = 0; i < result.length; i++) {
                        $scope.events.push(result[i]);
                    }
                });
            }

        };
        $scope.reset = function() {
            $scope.page = 0;
            $scope.events = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.event = {
                name: null,
                venue: null,
                startDate: null,
                endDate: null,
                id: null
            };
        };



    });
