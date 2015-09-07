function uiUploader(e) {
    function t(e) {
        for (var t = 0; t < e.length; t++) a.files.push(e[t])
    }
    function n() {
        return a.files
    }
    function r(e) {
        a.options = e;
        for (var t = 0; t < a.files.length && a.activeUploads != a.options.concurrency; t++) a.files[t].active || u(a.files[t], a.options.url)
    }
    function i(e) {
        a.files.splice(a.files.indexOf(e), 1)
    }
    function s() {
        a.files.splice(0, a.files.length)
    }
    function o(e) {
        var t = ["n/a", "bytes", "KiB", "MiB", "GiB", "TB", "PB", "EiB", "ZiB", "YiB"],
            n = +Math.floor(Math.log(e) / Math.log(1024));
        return (e / Math.pow(1024, n)).toFixed(n ? 1 : 0) + " " + t[isNaN(e) ? 0 : n + 1]
    }
    function u(e, t) {
        var n, i, s, u = "",
            f = "file";
        if (a.activeUploads += 1, e.active = !0, n = new window.XMLHttpRequest, i = new window.FormData, n.open("POST", t), n.upload.onloadstart = function() {},
            n.upload.onprogress = function(t) {
                t.lengthComputable && (e.loaded = t.loaded, e.humanSize = o(t.loaded), a.options.onProgress(e))
            },
            n.onload = function() {
                a.activeUploads -= 1,
                    r(a.options),
                    a.options.onCompleted(e, n.responseText)
            },
            n.onerror = function() {},
            u) for (s in u) u.hasOwnProperty(s) && i.append(s, u[s]);
        return i.append(f, e, e.name),
            n.send(i),
            n
    }
    var a = this;
    return a.files = [],
        a.options = {},
        a.activeUploads = 0,
        e.info("uiUploader loaded"),
    {
        addFiles: t,
        getFiles: n,
        files: a.files,
        startUpload: r,
        removeFile: i,
        removeAll: s
    }
}
//end ui loader

function eventClickCount(e) {
    $.ajax({
        url: "/app/event/click/" + e,
        type: "POST"
    })
} /**
 * Created by apple on 15/9/5.
 */
