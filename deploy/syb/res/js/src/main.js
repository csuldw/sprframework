require.config({
    baseUrl: '/res/js/src',
    paths: {
        "jquery":'lib/jquery',
        "$": "lib/jquery",
        "angular": "lib/angular",
        "angularRoute": "lib/angular-route",
        "angularUtils": "lib/ui-utils.min",
        "angularAnimate": "lib/angular-animate.min",
        "angularStrap": "lib/angular-strap",
        "angularStrapTpl": "lib/angular-strap.tpl",
        "angularSanitize": "lib/angular.sanitize",
        "text": "lib/text",
        "bootstrap": "lib/bootstrap",
        'jsrender': "lib/jsrender.min",
        'angularUb': "lib/angular-ui-bootstrap",
        "angularUpload": "lib/angular-file-upload",
        'bindonce': "lib/bindonce",
        'app': "app"
    },
    shim: {
        '$': {
            exports: '$'
        },
        'angular': {
            deps: ['$'],
            exports: "angular"
        },
        "angularRoute": {
            deps: ['angular'],
            exports: "angularRoute"
        },
        "angularUtils": {
            deps: ['angularRoute'],
            exports: "angularUtils"
        },
        "angularSanitize": {
            deps: ['angularUtils'],
            exports: "angularSanitize"
        },
        "angularUb": {
            deps: ['angularSanitize'],
            exports: "angularUb"
        },
        "angularUpload": {
            deps: ['angularUb'],
            exports: "angularUpload"
        },
        "angularStrap": {
            deps: ['angularUpload'],
            exports: "angularStrap"
        },
        "angularStrapTpl": {
            deps: ['angularStrap'],
            exports: "angularStrapTpl"
        },
        "angularAnimate": {
            deps: ['angularStrapTpl'],
            exports: "angularAnimate"
        },
        "bindonce": {
            deps: ['angularAnimate'],
            exports: "bindonce"
        },
        'app': {
            deps: ['bindonce'],
            exports: 'app'
        }
    }
});