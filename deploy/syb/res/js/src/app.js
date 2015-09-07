define(["angular", 'angularRoute', 'angularUtils', 'angularSanitize', 'angularUb', 'angularUpload', 'angularStrap', 'angularStrapTpl', 'angularAnimate', 'bindonce'],
    function() {
        var moduleName = 'app';
        var app = angular.module(moduleName, ['ngRoute', 'ngSanitize', 'angularFileUpload', 'ui.utils', 'pasvaz.bindonce', 'ngAnimate', 'mgcrea.ngStrap', 'common-tpl', 'angularPromiseButtons']);
        app.config(['$httpProvider', '$modalProvider', '$datepickerProvider', '$typeaheadProvider', 'angularPromiseButtonsProvider',
            function($httpProvider, $modalProvider, $datepickerProvider, $typeaheadProvider, angularPromiseButtonsProvider) {
                $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                angular.extend($modalProvider.defaults, {
                    animation: 'am-fade-and-scale'
                });
                angular.extend($datepickerProvider.defaults, {
                    dateFormat: 'yyyy年MM月dd日',
                    startWeek: 1,
                    autoclose: 1,
                    maxDate: "today",
                    dateType: "string"
                });
                angular.extend($typeaheadProvider.defaults, {
                    animation: 'am-flip-x',
                    minLength: 2,
                    limit: 8
                });
                angularPromiseButtonsProvider.extendConfig({
                    spinnerTpl: '<span class="fa-spin-btn-load"><i class="fa fa-spinner fa-spin ">&nbsp;</i></span>',
                    disableBtn: true,
                    btnLoadingClass: 'is-btn-load'
                });
            }]).filter("toHtml",
            function() {
                var toHtml = function(htmlString) {
                    if (htmlString) {
                        htmlString = htmlString.replace(new RegExp("&", "gm"), "&amp;");
                        htmlString = htmlString.replace(new RegExp("<", "gm"), "&lt;");
                        htmlString = htmlString.replace(new RegExp(">", "gm"), "&gt;");
                        htmlString = htmlString.replace(new RegExp("\x00", "gm"), "&quot;");
                        htmlString = htmlString.replace(new RegExp("'", "gm"), "&#39;");
                        htmlString = htmlString.replace(new RegExp('"', "gm"), "&#34;");
                        htmlString = htmlString.replace(new RegExp('`', "gm"), "&#96;");
                        htmlString = htmlString.replace(new RegExp("\n", "gm"), "<br/>");
                        htmlString = htmlString.replace(new RegExp(" ", "gm"), "&nbsp;");
                        return htmlString;
                    } else {
                        return "";
                    }
                };
                return toHtml;
            });
        return {
            getApp: function() {
                return app;
            },
            config: function() {
                app.config.apply(this, arguments);
                return this;
            },
            controller: function() {
                app.controller.apply(this, arguments);
                return this;
            },
            directive: function() {
                app.directive.apply(this, arguments);
                return this;
            },
            service: function() {
                app.service.apply(this, arguments);
                return this;
            },
            factory: function() {
                app.service.apply(this, arguments);
                return this;
            },
            bootstrap: function() {
                angular.bootstrap(document.body, [moduleName]);
            }
        }
    });