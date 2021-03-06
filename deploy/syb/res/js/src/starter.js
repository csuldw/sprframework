require(['$', "app", 'app/home', 'app/header', 'text', "jsrender", "lib/qrcode", 'bootstrap', 'lib/jquery-ui', "lib/input_switch", 'app/factory', "lib/notyfy", "lib/wmd", 'lib/scrollup', "lib/snowfall", 'app/service', "app/tpl/common", "app/service/commonService", 'app/common/common', "lib/selectize", "lib/to-markdown", "lib/sketch", "lib/caret", "lib/atwho", "lib/angular-promise-buttons.min", "lib/froala_editor.min", "lib/star-rating.min", 'app/event/event_main', "lib/jquery.dragsort-0.5.2.min", "app/page/user-log-reg", "app/company/company_main", "app/company/company_add", "app/company/company_get", "app/media/media_get", "app/jobs/job_main", "app/company/company_main_find", "app/forum/forum_main", "app/people/people_main", "app/people/people_get", "app/message/message_main", "app/people/people_setting", "app/notify/list", "app/public/activeUser", "app/public/resetpassword", "app/resume/resume_get", "app/incubator/incubator_get", "app/search/search", "lib/selectize", "app/people/people_info_perfect"],
    function(jq, app, home, header) {
        $(function() {
            require(["app/" + appId],
                function(j) {
                    if (j.hasOwnProperty("init")) {
                        j.init();
                    }
                    header.init();
                    app.bootstrap();
                });
        })
    });