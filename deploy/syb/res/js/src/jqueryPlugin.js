require.config({
//    paths:{
//        'jsrender':'lib/jsrender.min'
//    },
    shim: {
        'lib/qrcode':['$'],
        'bootstrap':['$'],
        'lib/notyfy':['$'],
        'lib/scrollup':['$'],
        'lib/slimscroll':['$'],
        'lib/bootstrap-tags':['$'],
        'lib/snowfall':['$'],
        'lib/sketch':['$'],
        'lib/star-rating.min':['$'],
        'lib/jquery.lazyloadxt':['$'],
        'jsrender':['$'],
        'lib/jquery.dragsort-0.5.2.min':['$'],
        'lib/froala_editor.min':['$'],
        'lib/angular-promise-buttons.min':['angular'],
        'lib/input_switch':['$'],
        'app/common/dictDirective':['angular'],
        'app/home':['$'],
        'lib/plugins/tables.min':['$','lib/froala_editor.min'],
        'lib/plugins/urls.min':['$','lib/froala_editor.min'],
        'lib/plugins/lists.min':['$','lib/froala_editor.min'],
        'lib/plugins/colors.min':['$','lib/froala_editor.min'],
        'lib/plugins/font_family.min':['$','lib/froala_editor.min'],
        'lib/plugins/font_size.min':['$','lib/froala_editor.min'],
        'lib/plugins/block_styles.min':['$','lib/froala_editor.min'],
        'lib/plugins/media_manager.min':['$','lib/froala_editor.min'],
        'lib/plugins/video.min':['$','lib/froala_editor.min'],
        'lib/plugins/char_counter.min':['$','lib/froala_editor.min'],
        'lib/plugins/zh_cn':['$','lib/froala_editor.min'],
        'lib/selectize':[]
  }
});