define(["app", "app/home", "app/valid", "lib/bootstrap-tags", "app/people/people_get_comment", "app/people/people_get_overview", "app/people/people_get_resume", "app/people/people_get_follow", "app/people/people_get_visitor", "app/people/people_get_stage"],
    function(app, home, v) {
        app.controller("people_get", ['$scope', '$http', '$modal', 'commonService', '$location', 'hiUtils', 'peopleService',
            function($scope, $http, $modal, commonService, $location, util, peopleService) {
                $scope.userId = document.getElementById("#pId").value;
                $('#peopleQrCode').qrcode({
                    text: "http://www.histarter.com/html5/people/" + $scope.userId,
                    width: 167,
                    height: 167
                });
                var routes = {
                    '/overview': {
                        templateurl: '/p/people/people_get_overview'
                    },
                    '/follow': {
                        templateurl: '/p/people/people_get_follow'
                    },
                    '/comment': {
                        templateurl: '/p/people/people_get_comment'
                    },
                    '/stage': {
                        templateurl: '/p/people/people_get_stage'
                    },
                    '/visitor': {
                        templateurl: '/p/people/people_get_visitor'
                    },
                    '/resume': {
                        templateurl: '/p/people/people_get_resume'
                    }
                }
                var defaultRoute = routes['/overview'];
                $scope.$watch(function() {
                        return $location.path();
                    },
                    function(newPath, oldPath) {
                        $scope.selectedRouteName = newPath || "/overview";
                        $scope.selectedRoute = routes[newPath] || defaultRoute;
                    });
                $scope.openMessageDialog = commonService.openMessageDialog;
                peopleService.getPeopleFansCount($scope.userId).success(function(data) {
                    if (data.success == true) {
                        $scope.fansCount = data.str;
                    }
                });
                peopleService.getPeopleCommentCount($scope.userId).success(function(data) {
                    if (data.success == true) {
                        $scope.commentCount = data.str;
                    }
                });
                peopleService.getPeopleFansList($scope.userId, 1, 100).success(function(data) {
                    if (data.success == true) {
                        $scope.fansList = data.responseData.rows;
                    }
                });
                $scope.openEditInfo = function() {
                    peopleService.getPeopleEditInfo($scope.userId).success(function(data) {
                        if (data.success == true) {
                            $scope.peopleInfo = data.responseData;
                            $scope.$modalEditPeopleInfoModal = $modal({
                                scope: $scope,
                                contentTemplate: commonService.getTmpl("/people/_people_edit_info_modia"),
                                show: true
                            })
                        }
                    })
                }
                $scope.openEditHighInfo = function() {
                    peopleService.getPeopleHighInfo($scope.userId).success(function(data) {
                        if (data.success == true) {
                            $scope.peopleHighInfo = data.responseData;
                            console.log(data.responseData);
                            $scope.$modalEditPeopleHighInfoModal = $modal({
                                scope: $scope,
                                contentTemplate: commonService.getTmpl("/people/_people_edit_hight_info_modia"),
                                show: true
                            })
                        }
                    })
                }
                $scope.savePeopleInfo = function($event, peopleInfo) {
                    util.maskSpinnerInner($($event.target));
                    peopleService.updatePeopleInfo($scope.userId, peopleInfo).success(function(data) {
                        if (data.success == true) {
                            util.success(data.message);
                        } else {
                            util.error(data.message);
                        }
                        $scope.$modalEditPeopleInfoModal.hide();
                        util.unMaskSpinnerInner($($event.target), "保存");
                    });
                    location.reload();
                }
                $scope.savePeopleHighInfo = function($event, peopleInfo) {
                    util.maskSpinnerInner($($event.target));
                    peopleService.updatePeopleInfo($scope.userId, peopleInfo).success(function(data) {
                        if (data.success == true) {
                            util.success(data.message);
                            location.reload();
                        } else {
                            util.error(data.message);
                        }
                        $scope.$modalEditPeopleHighInfoModal.hide();
                        util.unMaskSpinnerInner($($event.target), "保存");
                    })
                }
                $scope.updateFollow = function(follow) {
                    peopleService.updatePeopleFollow($scope.userId).success(function(data) {
                        if (data.success == true) {
                            follow.isFollow = !follow.isFollow;
                            util.success(data.message);
                        }
                    })
                };
            }]);
        return {
            init: function() {}
        };
    });