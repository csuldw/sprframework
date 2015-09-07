var Markdown;
if (typeof exports === "object" && typeof require === "function") Markdown = exports;
else Markdown = {}; (function() {
    function identity(x) {
        return x;
    }
    function returnFalse(x) {
        return false;
    }
    function HookCollection() {}
    HookCollection.prototype = {
        chain: function(hookname, func) {
            var original = this[hookname];
            if (!original) throw new Error("unknown hook " + hookname);
            if (original === identity) this[hookname] = func;
            else this[hookname] = function(x) {
                return func(original(x));
            }
        },
        set: function(hookname, func) {
            if (!this[hookname]) throw new Error("unknown hook " + hookname);
            this[hookname] = func;
        },
        addNoop: function(hookname) {
            this[hookname] = identity;
        },
        addFalse: function(hookname) {
            this[hookname] = returnFalse;
        }
    };
    Markdown.HookCollection = HookCollection;
    function SaveHash() {}
    SaveHash.prototype = {
        set: function(key, value) {
            this["s_" + key] = value;
        },
        get: function(key) {
            return this["s_" + key];
        }
    };
    Markdown.Converter = function() {
        var pluginHooks = this.hooks = new HookCollection();
        pluginHooks.addNoop("plainLinkText");
        pluginHooks.addNoop("preConversion");
        pluginHooks.addNoop("postConversion");
        var g_urls;
        var g_titles;
        var g_html_blocks;
        var g_list_level;
        this.makeHtml = function(text) {
            if (g_urls) throw new Error("Recursive call to converter.makeHtml");
            g_urls = new SaveHash();
            g_titles = new SaveHash();
            g_html_blocks = [];
            g_list_level = 0;
            text = pluginHooks.preConversion(text);
            text = text.replace(/~/g, "~T");
            text = text.replace(/\$/g, "~D");
            text = text.replace(/\r\n/g, "\n");
            text = text.replace(/\r/g, "\n");
            text = "\n\n" + text + "\n\n";
            text = _Detab(text);
            text = text.replace(/^[ \t]+$/mg, "");
            text = _HashHTMLBlocks(text);
            text = _StripLinkDefinitions(text);
            text = _RunBlockGamut(text);
            text = _UnescapeSpecialChars(text);
            text = text.replace(/~D/g, "$$");
            text = text.replace(/~T/g, "~");
            text = pluginHooks.postConversion(text);
            g_html_blocks = g_titles = g_urls = null;
            return text;
        };
        function _StripLinkDefinitions(text) {
            text = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,
                function(wholeMatch, m1, m2, m3, m4, m5) {
                    m1 = m1.toLowerCase();
                    g_urls.set(m1, _EncodeAmpsAndAngles(m2));
                    if (m4) {
                        return m3;
                    } else if (m5) {
                        g_titles.set(m1, m5.replace(/"/g, "&quot;"));
                    }
                    return "";
                });
            return text;
        }
        function _HashHTMLBlocks(text) {
            var block_tags_a = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del";
            var block_tags_b = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";
            text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, hashElement);
            text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, hashElement);
            text = text.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, hashElement);
            text = text.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, hashElement);
            text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, hashElement);
            return text;
        }
        function hashElement(wholeMatch, m1) {
            var blockText = m1;
            blockText = blockText.replace(/^\n+/, "");
            blockText = blockText.replace(/\n+$/g, "");
            blockText = "\n\n~K" + (g_html_blocks.push(blockText) - 1) + "K\n\n";
            return blockText;
        }
        function _RunBlockGamut(text, doNotUnhash) {
            text = _DoHeaders(text);
            var replacement = "<hr />\n";
            text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, replacement);
            text = text.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, replacement);
            text = text.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, replacement);
            text = _DoLists(text);
            text = _DoBlockQuotes(text);
            text = _HashHTMLBlocks(text);
            text = _FormParagraphs(text, doNotUnhash);
            text = _DoCodeBlocks(text);
            return text;
        }
        function _RunSpanGamut(text) {
            text = _DoCodeSpans(text);
            text = _EscapeSpecialCharsWithinTagAttributes(text);
            text = _EncodeBackslashEscapes(text);
            text = _DoImages(text);
            text = _DoAnchors(text);
            text = _DoAutoLinks(text);
            text = text.replace(/~P/g, "://");
            text = _EncodeAmpsAndAngles(text);
            text = _DoItalicsAndBold(text);
            text = text.replace(/ *\n/g, " <br>\n");
            return text;
        }
        function _EscapeSpecialCharsWithinTagAttributes(text) {
            var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
            text = text.replace(regex,
                function(wholeMatch) {
                    var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`");
                    tag = escapeCharacters(tag, wholeMatch.charAt(1) == "!" ? "\\`*_/": "\\`*_");
                    return tag;
                });
            return text;
        }
        function _DoAnchors(text) {
            text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, writeAnchorTag);
            text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeAnchorTag);
            text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, writeAnchorTag);
            return text;
        }
        function writeAnchorTag(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
            if (m7 == undefined) m7 = "";
            var whole_match = m1;
            var link_text = m2.replace(/:\/\//g, "~P");
            var link_id = m3.toLowerCase();
            var url = m4;
            var title = m7;
            if (url == "") {
                if (link_id == "") {
                    link_id = link_text.toLowerCase().replace(/ ?\n/g, " ");
                }
                url = "#" + link_id;
                if (g_urls.get(link_id) != undefined) {
                    url = g_urls.get(link_id);
                    if (g_titles.get(link_id) != undefined) {
                        title = g_titles.get(link_id);
                    }
                } else {
                    if (whole_match.search(/\(\s*\)$/m) > -1) {
                        url = "";
                    } else {
                        return whole_match;
                    }
                }
            }
            url = encodeProblemUrlChars(url);
            url = escapeCharacters(url, "*_");
            var result = "<a href=\"" + url + "\"";
            if (title != "") {
                title = attributeEncode(title);
                title = escapeCharacters(title, "*_");
                result += " title=\"" + title + "\"";
            }
            result += ">" + link_text + "</a>";
            return result;
        }
        function _DoImages(text) {
            text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, writeImageTag);
            text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeImageTag);
            return text;
        }
        function attributeEncode(text) {
            return text.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        }
        function writeImageTag(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
            var whole_match = m1;
            var alt_text = m2;
            var link_id = m3.toLowerCase();
            var url = m4;
            var title = m7;
            if (!title) title = "";
            if (url == "") {
                if (link_id == "") {
                    link_id = alt_text.toLowerCase().replace(/ ?\n/g, " ");
                }
                url = "#" + link_id;
                if (g_urls.get(link_id) != undefined) {
                    url = g_urls.get(link_id);
                    if (g_titles.get(link_id) != undefined) {
                        title = g_titles.get(link_id);
                    }
                } else {
                    return whole_match;
                }
            }
            alt_text = escapeCharacters(attributeEncode(alt_text), "*_[]()");
            url = escapeCharacters(url, "*_");
            var result = "<img src=\"" + url + "\" alt=\"" + alt_text + "\"";
            title = attributeEncode(title);
            title = escapeCharacters(title, "*_");
            result += " title=\"" + title + "\"";
            result += " />";
            return result;
        }
        function _DoHeaders(text) {
            var reg = new RegExp('^[ \\t]*(#{2,3})' + '[ \\t]*' + '([^#]+?)' + '[ \\t]*' + '#*' + '(?:[ ]+\\{#([-_:a-zA-Z0-9]+)\\}[ ]*)?' + '\\n', "gm");
            text = text.replace(reg,
                function($0, $1, $2, $3) {
                    return "<h" + $1.length + ">" + _RunSpanGamut($2) + "</h" + $1.length + ">";
                });
            return text;
        }
        function _DoLists(text) {
            text += "~0";
            var whole_list = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
            if (g_list_level) {
                text = text.replace(whole_list,
                    function(wholeMatch, m1, m2) {
                        var list = m1;
                        var list_type = (m2.search(/[*+-]/g) > -1) ? "ul": "ol";
                        var result = _ProcessListItems(list, list_type);
                        result = result.replace(/\s+$/, "");
                        result = "<" + list_type + ">" + result + "</" + list_type + ">\n";
                        return result;
                    });
            } else {
                whole_list = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
                text = text.replace(whole_list,
                    function(wholeMatch, m1, m2, m3) {
                        var runup = m1;
                        var list = m2;
                        var list_type = (m3.search(/[*+-]/g) > -1) ? "ul": "ol";
                        var result = _ProcessListItems(list, list_type);
                        result = runup + "<" + list_type + ">\n" + result + "</" + list_type + ">\n";
                        return result;
                    });
            }
            text = text.replace(/~0/, "");
            return text;
        }
        var _listItemMarkers = {
            ol: "\\d+[.]",
            ul: "[*+-]"
        };
        function _ProcessListItems(list_str, list_type) {
            g_list_level++;
            list_str = list_str.replace(/\n{2,}$/, "\n");
            list_str += "~0";
            var marker = _listItemMarkers[list_type];
            var re = new RegExp("(^[ \\t]*)(" + marker + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + marker + ")[ \\t]+))", "gm");
            var last_item_had_a_double_newline = false;
            list_str = list_str.replace(re,
                function(wholeMatch, m1, m2, m3) {
                    var item = m3;
                    var leading_space = m1;
                    var ends_with_double_newline = /\n\n$/.test(item);
                    var contains_double_newline = ends_with_double_newline || item.search(/\n{2,}/) > -1;
                    if (contains_double_newline || last_item_had_a_double_newline) {
                        item = _RunBlockGamut(_Outdent(item), true);
                    } else {
                        item = _DoLists(_Outdent(item));
                        item = item.replace(/\n$/, "");
                        item = _RunSpanGamut(item);
                    }
                    last_item_had_a_double_newline = ends_with_double_newline;
                    return "<li>" + item + "</li>\n";
                });
            list_str = list_str.replace(/~0/g, "");
            g_list_level--;
            return list_str;
        }
        function _DoCodeBlocks(text) {
            var reg = new RegExp('(?:(^|[\n]*)?)(\{\{\{)[\n]*([\\s\\S]+?[\\s\\S][\{\}]*)(\}\}\})', 'g');
            text = text.replace(reg,
                function(wholeMatch, m1, m2, m3, m4) {
                    var codeblock = m3;
                    codeblock = _EncodeCode(_Outdent(codeblock));
                    codeblock = _Detab(codeblock);
                    codeblock = codeblock.replace(/^\n+/g, "");
                    codeblock = codeblock.replace(/\n+$/g, "");
                    codeblock = codeblock.replace(/\n/g, '<br/>');
                    codeblock = codeblock.replace(/\&lt;\/p\&gt;/g, "");
                    codeblock = codeblock.replace(/&lt;\p\&gt;/g, "");
                    codeblock = codeblock.replace(/\&lt;br\&gt;/g, "");
                    return '\n\n<pre class="prettyprint">' + codeblock + '</pre>\n\n';
                });
            return text;
        }
        function hashBlock(text) {
            text = text.replace(/(^\n+|\n+$)/g, "");
            return "\n\n~K" + (g_html_blocks.push(text) - 1) + "K\n\n";
        }
        function _DoCodeSpans(text) {
            text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
                function(wholeMatch, m1, m2, m3, m4) {
                    var c = m3;
                    c = c.replace(/^([ \t]*)/g, "");
                    c = c.replace(/[ \t]*$/g, "");
                    c = _EncodeCode(c);
                    c = c.replace(/:\/\//g, "~P");
                    return m1 + "<code>" + c + "</code>";
                });
            return text;
        }
        function _EncodeCode(text) {
            text = text.replace(/&/g, "&amp;");
            text = text.replace(/</g, "&lt;");
            text = text.replace(/>/g, "&gt;");
            text = escapeCharacters(text, "\*_{}[]\\", false);
            return text;
        }
        function _DoItalicsAndBold(text) {
            text = text.replace(/([\S\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g, "$1<strong>$3</strong>$4");
            text = text.replace(/([\S\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g, "$1<em>$3</em>$4");
            return text;
        }
        function _DoBlockQuotes(text) {
            text = text.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,
                function(wholeMatch, m1) {
                    var bq = m1;
                    bq = bq.replace(/^[ \t]*>[ \t]?/gm, "~0");
                    bq = bq.replace(/~0/g, "");
                    bq = bq.replace(/^[ \t]+$/gm, "");
                    bq = _RunBlockGamut(bq);
                    bq = bq.replace(/(^|\n)/g, "$1  ");
                    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,
                        function(wholeMatch, m1) {
                            var pre = m1;
                            pre = pre.replace(/^  /mg, "~0");
                            pre = pre.replace(/~0/g, "");
                            return pre;
                        });
                    return hashBlock("<blockquote>\n" + bq + "\n</blockquote>");
                });
            return text;
        }
        function _FormParagraphs(text, doNotUnhash) {
            text = text.replace(/^\n+/g, "");
            text = text.replace(/\n+$/g, "");
            var grafs = text.split(/\n{2,}/g);
            var grafsOut = [];
            var markerRe = /~K(\d+)K/;
            var end = grafs.length;
            for (var i = 0; i < end; i++) {
                var str = grafs[i];
                if (markerRe.test(str)) {
                    grafsOut.push(str);
                } else if (/\S/.test(str)) {
                    str = _RunSpanGamut(str);
                    str = str.replace(/^([ \t]*)/g, "<p>");
                    str += "</p>"+grafsOut.push(str);
                }
            }
            if (!doNotUnhash) {
                end = grafsOut.length;
                for (var i = 0; i < end; i++) {
                    var foundAny = true;
                    while (foundAny) {
                        foundAny = false;
                        grafsOut[i] = grafsOut[i].replace(/~K(\d+)K/g,
                            function(wholeMatch, id) {
                                foundAny = true;
                                return g_html_blocks[id];
                            });
                    }
                }
            }
            return grafsOut.join("\n\n");
        }
        function _EncodeAmpsAndAngles(text) {
            text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
            text = text.replace(/<(?![a-z\/?\$!])/gi, "&lt;");
            return text;
        }
        function _EncodeBackslashEscapes(text) {
            text = text.replace(/\\(\\)/g, escapeCharacters_callback);
            text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, escapeCharacters_callback);
            return text;
        }
        function _DoAutoLinks(text) {
            text = text.replace(/(^|\s)(https?|ftp)(:\/\/[-A-Z0-9+&@#\/%?=~_|\[\]\(\)!:,\.;]*[-A-Z0-9+&@#\/%=~_|\[\]])($|\W)/gi, "$1<$2$3>$4");
            var replacer = function(wholematch, m1) {
                return "<a href=\"" + m1 + "\">" + pluginHooks.plainLinkText(m1) + "</a>";
            }
            text = text.replace(/<((https?|ftp):[^'">\s]+)>/gi, replacer);
            var email_replacer = function(wholematch, m1) {
                var mailto = 'mailto:'
                var link
                var email
                if (m1.substring(0, mailto.length) != mailto) {
                    link = mailto + m1;
                    email = m1;
                } else {
                    link = m1;
                    email = m1.substring(mailto.length, m1.length);
                }
                return "<a href=\"" + link + "\">" + pluginHooks.plainLinkText(email) + "</a>";
            }
            text = text.replace(/<((?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+))>/gi, email_replacer);
            return text;
        }
        function _UnescapeSpecialChars(text) {
            text = text.replace(/~E(\d+)E/g,
                function(wholeMatch, m1) {
                    var charCodeToReplace = parseInt(m1);
                    return String.fromCharCode(charCodeToReplace);
                });
            return text;
        }
        function _Outdent(text) {
            text = text.replace(/^(\t|[ ]{1,4})/gm, "~0");
            text = text.replace(/~0/g, "") ;
            return text;
        }
        function _Detab(text) {
            if (!/\t/.test(text)) return text;
            var spaces = ["    ", "   ", "  ", " "],
                skew = 0,
                v;
            return text.replace(/[\n\t]/g,
                function(match, offset) {
                    if (match === "\n") {
                        skew = offset + 1;
                        return match;
                    }
                    v = (offset - skew) % 4;
                    skew = offset + 1;
                    return spaces[v];
                });
        }
        var _problemUrlChars = /(?:["'*()[\]:]|~D)/g;
        function encodeProblemUrlChars(url) {
            if (!url) return "";
            var len = url.length;
            return url.replace(_problemUrlChars,
                function(match, offset) {
                    if (match == "~D") return "%24";
                    if (match == ":") {
                        if (offset == len - 1 || /[0-9\/]/.test(url.charAt(offset + 1))) return ":";
                        if (url.substring(0, 'mailto:'.length) === 'mailto:') return ":";
                        if (url.substring(0, 'magnet:'.length) === 'magnet:') return ":";
                    }
                    return "%" + match.charCodeAt(0).toString(16);
                });
        }
        function escapeCharacters(text, charsToEscape, afterBackslash) {
            var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
            if (afterBackslash) {
                regexString = "\\\\" + regexString;
            }
            var regex = new RegExp(regexString, "g");
            text = text.replace(regex, escapeCharacters_callback);
            return text;
        }
        function escapeCharacters_callback(wholeMatch, m1) {
            var charCodeToEscape = m1.charCodeAt(0);
            return "~E" + charCodeToEscape + "E";
        }
    };
})(); (function() {
    var util = {},
        position = {},
        ui = {},
        doc = window.document,
        re = window.RegExp,
        nav = window.navigator,
        SETTINGS = {
            lineLength: 72
        },
        uaSniffed = {
            isIE: /msie/.test(nav.userAgent.toLowerCase()),
            isIE_5or6: /msie 6/.test(nav.userAgent.toLowerCase()) || /msie 5/.test(nav.userAgent.toLowerCase()),
            isOpera: /opera/.test(nav.userAgent.toLowerCase())
        };
    var linkDialogText = "<p>http://example.com/ \"optional title\"</p>";
    var imageDialogText = "<p>http://example.com/images/diagram.jpg \"optional title\"</p>";
    var imageDefaultText = "http://";
    var linkDefaultText = "http://";
    var defaultHelpHoverTitle = "编辑器语法帮助";
    Markdown.Editor = function(markdownConverter, container, preview, help) {
        var hooks = this.hooks = new Markdown.HookCollection();
        hooks.addNoop("onPreviewRefresh");
        hooks.addNoop("postBlockquoteCreation");
        hooks.addFalse("insertImageDialog");
        this.getConverter = function() {
            return markdownConverter;
        }
        var that = this,
            panels;
        this.run = function() {
            if (panels) return;
            panels = new PanelCollection(container, preview);
            var commandManager = new CommandManager(hooks);
            var previewManager = new PreviewManager(markdownConverter, panels,
                function() {
                    hooks.onPreviewRefresh();
                });
            var undoManager, uiManager;
            if (!/\?noundo/.test(doc.location.href)) {
                undoManager = new UndoManager(function() {
                        previewManager.refresh();
                        if (uiManager) uiManager.setUndoRedoButtonStates();
                    },
                    panels);
                this.textOperation = function(f) {
                    undoManager.setCommandMode();
                    f();
                    that.refreshPreview();
                }
            }
            uiManager = new UIManager(panels, undoManager, previewManager, commandManager, help);
            uiManager.setUndoRedoButtonStates();
            var forceRefresh = that.refreshPreview = function() {
                previewManager.refresh(true);
            };
            forceRefresh();
        };
    }
    function Chunks() {}
    Chunks.prototype.findTags = function(startRegex, endRegex) {
        var chunkObj = this;
        var regex;
        if (startRegex) {
            regex = util.extendRegExp(startRegex, "", "$");
            this.before = this.before.replace(regex,
                function(match) {
                    chunkObj.startTag = chunkObj.startTag + match;
                    return "";
                });
            regex = util.extendRegExp(startRegex, "^", "");
            this.selection = this.selection.replace(regex,
                function(match) {
                    chunkObj.startTag = chunkObj.startTag + match;
                    return "";
                });
        }
        if (endRegex) {
            regex = util.extendRegExp(endRegex, "", "$");
            this.selection = this.selection.replace(regex,
                function(match) {
                    chunkObj.endTag = match + chunkObj.endTag;
                    return "";
                });
            regex = util.extendRegExp(endRegex, "^", "");
            this.after = this.after.replace(regex,
                function(match) {
                    chunkObj.endTag = match + chunkObj.endTag;
                    return "";
                });
        }
    };
    Chunks.prototype.trimWhitespace = function(remove) {
        var beforeReplacer, afterReplacer, that = this;
        if (remove) {
            beforeReplacer = afterReplacer = "";
        } else {
            beforeReplacer = function(s) {
                that.before += s;
                return "";
            }
            afterReplacer = function(s) {
                that.after = s + that.after;
                return "";
            }
        }
        this.selection = this.selection.replace(/^(\s*)/, beforeReplacer).replace(/(\s*)$/, afterReplacer);
    };
    Chunks.prototype.skipLines = function(nLinesBefore, nLinesAfter, findExtraNewlines) {
        if (nLinesBefore === undefined) {
            nLinesBefore = 1;
        }
        if (nLinesAfter === undefined) {
            nLinesAfter = 1;
        }
        nLinesBefore++;
        nLinesAfter++;
        var regexText;
        var replacementText;
        if (navigator.userAgent.match(/Chrome/)) {
            "X".match(/()./);
        }
        this.selection = this.selection.replace(/(^\n*)/, "");
        this.startTag = this.startTag + re.$1;
        this.selection = this.selection.replace(/(\n*$)/, "");
        this.endTag = this.endTag + re.$1;
        this.startTag = this.startTag.replace(/(^\n*)/, "");
        this.before = this.before + re.$1;
        this.endTag = this.endTag.replace(/(\n*$)/, "");
        this.after = this.after + re.$1;
        if (this.before) {
            regexText = replacementText = "";
            while (nLinesBefore--) {
                regexText += "\\n?";
                replacementText += "\n";
            }
            if (findExtraNewlines) {
                regexText = "\\n*";
            }
            this.before = this.before.replace(new re(regexText + "$", ""), replacementText);
        }
        if (this.after) {
            regexText = replacementText = "";
            while (nLinesAfter--) {
                regexText += "\\n?";
                replacementText += "\n";
            }
            if (findExtraNewlines) {
                regexText = "\\n*";
            }
            this.after = this.after.replace(new re(regexText, ""), replacementText);
        }
    };
    function PanelCollection(container, preview) {
        this.buttonBar = container.find('#wmd-button-bar')[0];
        this.preview = preview[0];
        this.input = container.find('#wmd-input')[0];
    };
    util.isVisible = function(elem) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(elem, null).getPropertyValue("display") !== "none";
        } else if (elem.currentStyle) {
            return elem.currentStyle["display"] !== "none";
        }
    };
    util.addEvent = function(elem, event, listener) {
        if (elem.attachEvent) {
            elem.attachEvent("on" + event, listener);
        } else {
            elem.addEventListener(event, listener, false);
        }
    };
    util.removeEvent = function(elem, event, listener) {
        if (elem.detachEvent) {
            elem.detachEvent("on" + event, listener);
        } else {
            elem.removeEventListener(event, listener, false);
        }
    };
    util.fixEolChars = function(text) {
        text = text.replace(/\r\n/g, "\n");
        text = text.replace(/\r/g, "\n");
        return text;
    };
    util.extendRegExp = function(regex, pre, post) {
        if (pre === null || pre === undefined) {
            pre = "";
        }
        if (post === null || post === undefined) {
            post = "";
        }
        var pattern = regex.toString();
        var flags;
        pattern = pattern.replace(/\/([gim]*)$/,
            function(wholeMatch, flagsPart) {
                flags = flagsPart;
                return "";
            });
        pattern = pattern.replace(/(^\/|\/$)/g, "");
        pattern = pre + pattern + post;
        return new re(pattern, flags);
    }
    position.getTop = function(elem, isInner) {
        var result = elem.offsetTop;
        if (!isInner) {
            while (elem = elem.offsetParent) {
                result += elem.offsetTop;
            }
        }
        return result;
    };
    position.getHeight = function(elem) {
        return elem.offsetHeight || elem.scrollHeight;
    };
    position.getWidth = function(elem) {
        return elem.offsetWidth || elem.scrollWidth;
    };
    position.getPageSize = function() {
        var scrollWidth, scrollHeight;
        var innerWidth, innerHeight;
        if (self.innerHeight && self.scrollMaxY) {
            scrollWidth = doc.body.scrollWidth;
            scrollHeight = self.innerHeight + self.scrollMaxY;
        } else if (doc.body.scrollHeight > doc.body.offsetHeight) {
            scrollWidth = doc.body.scrollWidth;
            scrollHeight = doc.body.scrollHeight;
        } else {
            scrollWidth = doc.body.offsetWidth;
            scrollHeight = doc.body.offsetHeight;
        }
        if (self.innerHeight) {
            innerWidth = self.innerWidth;
            innerHeight = self.innerHeight;
        } else if (doc.documentElement && doc.documentElement.clientHeight) {
            innerWidth = doc.documentElement.clientWidth;
            innerHeight = doc.documentElement.clientHeight;
        } else if (doc.body) {
            innerWidth = doc.body.clientWidth;
            innerHeight = doc.body.clientHeight;
        }
        var maxWidth = Math.max(scrollWidth, innerWidth);
        var maxHeight = Math.max(scrollHeight, innerHeight);
        return [maxWidth, maxHeight, innerWidth, innerHeight];
    };
    function UndoManager(callback, panels) {
        var undoObj = this;
        var undoStack = [];
        var stackPtr = 0;
        var mode = "none";
        var lastState;
        var timer;
        var inputStateObj;
        var setMode = function(newMode, noSave) {
            if (mode != newMode) {
                mode = newMode;
                if (!noSave) {
                    saveState();
                }
            }
            if (!uaSniffed.isIE || mode != "moving") {
                timer = setTimeout(refreshState, 1);
            } else {
                inputStateObj = null;
            }
        };
        var refreshState = function(isInitialState) {
            inputStateObj = new TextareaState(panels, isInitialState);
            timer = undefined;
        };
        this.setCommandMode = function() {
            mode = "command";
            saveState();
            timer = setTimeout(refreshState, 0);
        };
        this.canUndo = function() {
            return stackPtr > 1;
        };
        this.canRedo = function() {
            if (undoStack[stackPtr + 1]) {
                return true;
            }
            return false;
        };
        this.undo = function() {
            if (undoObj.canUndo()) {
                if (lastState) {
                    lastState.restore();
                    lastState = null;
                } else {
                    undoStack[stackPtr] = new TextareaState(panels);
                    undoStack[--stackPtr].restore();
                    if (callback) {
                        callback();
                    }
                }
            }
            mode = "none";
            panels.input.focus();
            refreshState();
        };
        this.redo = function() {
            if (undoObj.canRedo()) {
                undoStack[++stackPtr].restore();
                if (callback) {
                    callback();
                }
            }
            mode = "none";
            panels.input.focus();
            refreshState();
        };
        var saveState = function() {
            var currState = inputStateObj || new TextareaState(panels);
            if (!currState) {
                return false;
            }
            if (mode == "moving") {
                if (!lastState) {
                    lastState = currState;
                }
                return;
            }
            if (lastState) {
                if (undoStack[stackPtr - 1].text != lastState.text) {
                    undoStack[stackPtr++] = lastState;
                }
                lastState = null;
            }
            undoStack[stackPtr++] = currState;
            undoStack[stackPtr + 1] = null;
            if (callback) {
                callback();
            }
        };
        var handleCtrlYZ = function(event) {
            var handled = false;
            if (event.ctrlKey || event.metaKey) {
                var keyCode = event.charCode || event.keyCode;
                var keyCodeChar = String.fromCharCode(keyCode);
                switch (keyCodeChar) {
                    case "y":
                        undoObj.redo();
                        handled = true;
                        break;
                    case "z":
                        if (!event.shiftKey) {
                            undoObj.undo();
                        } else {
                            undoObj.redo();
                        }
                        handled = true;
                        break;
                }
            }
            if (handled) {
                if (event.preventDefault) {
                    event.preventDefault();
                }
                if (window.event) {
                    window.event.returnValue = false;
                }
                return;
            }
        };
        var handleModeChange = function(event) {
            if (!event.ctrlKey && !event.metaKey) {
                var keyCode = event.keyCode;
                if ((keyCode >= 33 && keyCode <= 40) || (keyCode >= 63232 && keyCode <= 63235)) {
                    setMode("moving");
                } else if (keyCode == 8 || keyCode == 46 || keyCode == 127) {
                    setMode("deleting");
                } else if (keyCode == 13) {
                    setMode("newlines");
                } else if (keyCode == 27) {
                    setMode("escape");
                } else if ((keyCode < 16 || keyCode > 20) && keyCode != 91) {
                    setMode("typing");
                }
            }
        };
        var setEventHandlers = function() {
            util.addEvent(panels.input, "keypress",
                function(event) {
                    if ((event.ctrlKey || event.metaKey) && (event.keyCode == 89 || event.keyCode == 90)) {
                        event.preventDefault();
                    }
                });
            var handlePaste = function() {
                if (uaSniffed.isIE || (inputStateObj && inputStateObj.text != panels.input.value)) {
                    if (timer == undefined) {
                        mode = "paste";
                        saveState();
                        refreshState();
                    }
                }
            };
            util.addEvent(panels.input, "keydown", handleCtrlYZ);
            util.addEvent(panels.input, "keydown", handleModeChange);
            util.addEvent(panels.input, "keydown",
                function(e) {
                    if (e.keyCode === 13 || e.keyCode === 10) {
                        get(panels.input);
                        var cursor = caretPosition,
                            lines = panels.input.value.split(/\r?\n/),
                            count = 0,
                            linecount = 0,
                            preLine = "";
                        for (var i = 0; i < lines.length; i++) {
                            if (count <= cursor && (count + lines[i].length + 1) > cursor) {
                                preLine = lines[i];
                                if (document.all) {
                                    linecount = i;
                                }
                                break;
                            }
                            count += lines[i].length + 1;
                        }
                        if (/^(\-|\d\.)/i.test(preLine)) {
                            var matches = preLine.match(/(\-|\d\.)/i);
                            var block = '';
                            switch (matches[1]) {
                                case '-':
                                    block = '\n- ';
                                    break;
                                default:
                                    block = '\n' + (parseInt(matches[1].substring(0, 1)) + 1) + '. ';
                                    break;
                            }
                            panels.input.value = panels.input.value.substring(0, cursor + linecount) + block + panels.input.value.substring(cursor + linecount, panels.input.value.length);
                            e.preventDefault();
                            set(panels.input, cursor + linecount + block.length, 0);
                        }
                    }
                });
            util.addEvent(panels.input, "mousedown",
                function() {
                    setMode("moving");
                });
            panels.input.onpaste = handlePaste;
            panels.input.ondrop = handlePaste;
        };
        var init = function() {
            setEventHandlers();
            refreshState(true);
            saveState();
        };
        init();
    }
    function get(textarea) {
        textarea.focus();
        scrollPosition = textarea.scrollTop;
        if (document.selection) {
            selection = document.selection.createRange().text;
            if (/MSIE/.test(navigator.userAgent)) {
                var range = document.selection.createRange(),
                    rangeCopy = range.duplicate();
                rangeCopy.moveToElementText(textarea);
                caretPosition = -1;
                while (rangeCopy.inRange(range)) {
                    rangeCopy.moveStart('character');
                    caretPosition++;
                }
            } else {
                caretPosition = textarea.selectionStart;
            }
        } else {
            caretPosition = textarea.selectionStart;
            selection = textarea.value.substring(caretPosition, textarea.selectionEnd);
        }
        return selection;
    }
    function set(textarea, start, len) {
        if (textarea.createTextRange) {
            range = textarea.createTextRange();
            range.collapse(true);
            range.moveStart('character', start);
            range.moveEnd('character', len);
            range.select();
        } else if (textarea.setSelectionRange) {
            textarea.setSelectionRange(start, start + len);
        }
        textarea.scrollTop = scrollPosition;
        textarea.focus();
    }
    function TextareaState(panels, isInitialState) {
        var stateObj = this;
        var inputArea = panels.input;
        this.init = function() {
            if (!util.isVisible(inputArea)) {
                return;
            }
            if (!isInitialState && doc.activeElement && doc.activeElement !== inputArea) {
                return;
            }
            this.setInputAreaSelectionStartEnd();
            this.scrollTop = inputArea.scrollTop;
            if (!this.text && inputArea.selectionStart || inputArea.selectionStart === 0) {
                this.text = inputArea.value;
            }
        }
        this.setInputAreaSelection = function() {
            if (!util.isVisible(inputArea)) {
                return;
            }
            if (inputArea.selectionStart !== undefined && !uaSniffed.isOpera) {
                inputArea.focus();
                inputArea.selectionStart = stateObj.start;
                inputArea.selectionEnd = stateObj.end;
                inputArea.scrollTop = stateObj.scrollTop;
            } else if (doc.selection) {
                if (doc.activeElement && doc.activeElement !== inputArea) {
                    return;
                }
                inputArea.focus();
                var range = inputArea.createTextRange();
                range.moveStart("character", -inputArea.value.length);
                range.moveEnd("character", -inputArea.value.length);
                range.moveEnd("character", stateObj.end);
                range.moveStart("character", stateObj.start);
                range.select();
            }
        };
        this.setInputAreaSelectionStartEnd = function() {
            if (!panels.ieCachedRange && (inputArea.selectionStart || inputArea.selectionStart === 0)) {
                stateObj.start = inputArea.selectionStart;
                stateObj.end = inputArea.selectionEnd;
            } else if (doc.selection) {
                stateObj.text = util.fixEolChars(inputArea.value);
                var range = panels.ieCachedRange || doc.selection.createRange();
                var fixedRange = util.fixEolChars(range.text);
                var marker = "\x07";
                var markedRange = marker + fixedRange + marker;
                range.text = markedRange;
                var inputText = util.fixEolChars(inputArea.value);
                range.moveStart("character", -markedRange.length);
                range.text = fixedRange;
                stateObj.start = inputText.indexOf(marker);
                stateObj.end = inputText.lastIndexOf(marker) - marker.length;
                var len = stateObj.text.length - util.fixEolChars(inputArea.value).length;
                if (len) {
                    range.moveStart("character", -fixedRange.length);
                    while (len--) {
                        fixedRange += "\n";
                        stateObj.end += 1;
                    }
                    range.text = fixedRange;
                }
                if (panels.ieCachedRange) stateObj.scrollTop = panels.ieCachedScrollTop;
                panels.ieCachedRange = null;
                this.setInputAreaSelection();
            }
        };
        this.restore = function() {
            if (stateObj.text != undefined && stateObj.text != inputArea.value) {
                inputArea.value = stateObj.text;
            }
            this.setInputAreaSelection();
            inputArea.scrollTop = stateObj.scrollTop;
        };
        this.getChunks = function() {
            var chunk = new Chunks();
            chunk.before = util.fixEolChars(stateObj.text.substring(0, stateObj.start));
            chunk.startTag = "";
            chunk.selection = util.fixEolChars(stateObj.text.substring(stateObj.start, stateObj.end));
            chunk.endTag = "";
            chunk.after = util.fixEolChars(stateObj.text.substring(stateObj.end));
            chunk.scrollTop = stateObj.scrollTop;
            return chunk;
        };
        this.setChunks = function(chunk) {
            chunk.before = chunk.before + chunk.startTag;
            chunk.after = chunk.endTag + chunk.after;
            this.start = chunk.before.length;
            this.end = chunk.before.length + chunk.selection.length;
            this.text = chunk.before + chunk.selection + chunk.after;
            this.scrollTop = chunk.scrollTop;
        };
        this.init();
    };
    function PreviewManager(converter, panels, previewRefreshCallback) {
        var managerObj = this;
        var timeout;
        var elapsedTime;
        var oldInputText;
        var maxDelay = 3000;
        var startType = "delayed";
        var setupEvents = function(inputElem, listener) {
            util.addEvent(inputElem, "input", listener);
            inputElem.onpaste = listener;
            inputElem.ondrop = listener;
            util.addEvent(inputElem, "keypress", listener);
            util.addEvent(inputElem, "keydown", listener);
        };
        var getDocScrollTop = function() {
            var result = 0;
            if (window.innerHeight) {
                result = window.pageYOffset;
            } else if (doc.documentElement && doc.documentElement.scrollTop) {
                result = doc.documentElement.scrollTop;
            } else if (doc.body) {
                result = doc.body.scrollTop;
            }
            return result;
        };
        var makePreviewHtml = function() {
            if (!panels.preview) return;
            var text = panels.input.value;
            if (text && text == oldInputText) {
                return;
            } else {
                oldInputText = text;
            }
            var prevTime = new Date().getTime();
            text = converter.makeHtml(text);
            var currTime = new Date().getTime();
            elapsedTime = currTime - prevTime;
            pushPreviewHtml(text);
        };
        var applyTimeout = function() {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }
            if (startType !== "manual") {
                var delay = 0;
                if (startType === "delayed") {
                    delay = elapsedTime;
                }
                if (delay > maxDelay) {
                    delay = maxDelay;
                }
                timeout = setTimeout(makePreviewHtml, delay);
            }
        };
        var getScaleFactor = function(panel) {
            if (panel.scrollHeight <= panel.clientHeight) {
                return 1;
            }
            return panel.scrollTop / (panel.scrollHeight - panel.clientHeight);
        };
        var setPanelScrollTops = function() {
            if (panels.preview) {
                panels.preview.scrollTop = (panels.preview.scrollHeight - panels.preview.clientHeight) * getScaleFactor(panels.preview);
            }
        };
        this.refresh = function(requiresRefresh) {
            if (requiresRefresh) {
                oldInputText = "";
                makePreviewHtml();
            } else {
                applyTimeout();
            }
        };
        this.processingTime = function() {
            return elapsedTime;
        };
        var isFirstTimeFilled = true;
        var ieSafePreviewSet = function(text) {
            var preview = panels.preview;
            var parent = preview.parentNode;
            var sibling = preview.nextSibling;
            parent.removeChild(preview);
            preview.innerHTML = text;
            if (!sibling) parent.appendChild(preview);
            else parent.insertBefore(preview, sibling);
        }
        var nonSuckyBrowserPreviewSet = function(text) {
            panels.preview.innerHTML = text;
        }
        var previewSetter;
        var previewSet = function(text) {
            if (previewSetter) return previewSetter(text);
            try {
                nonSuckyBrowserPreviewSet(text);
                previewSetter = nonSuckyBrowserPreviewSet;
            } catch(e) {
                previewSetter = ieSafePreviewSet;
                previewSetter(text);
            }
        };
        var pushPreviewHtml = function(text) {
            var emptyTop = position.getTop(panels.input) - getDocScrollTop();
            if (panels.preview) {
                previewSet(text);
                previewRefreshCallback();
            }
            setPanelScrollTops();
            if (isFirstTimeFilled) {
                isFirstTimeFilled = false;
                return;
            }
            var fullTop = position.getTop(panels.input) - getDocScrollTop();
            if (uaSniffed.isIE) {
                setTimeout(function() {
                        window.scrollBy(0, fullTop - emptyTop);
                    },
                    0);
            } else {
                window.scrollBy(0, fullTop - emptyTop);
            }
        };
        var init = function() {
            setupEvents(panels.input, applyTimeout);
            makePreviewHtml();
            if (panels.preview) {
                panels.preview.scrollTop = 0;
            }
        };
        init();
    };
    ui.prompt = function(title, text, defaultInputText, callback) {
        var dialog;
        var input;
        if (defaultInputText === undefined) {
            defaultInputText = "";
        }
        var checkEscape = function(key) {
            var code = (key.charCode || key.keyCode);
            if (code === 27) {
                close(true);
            }
        };
        var close = function(isCancel) {
            util.removeEvent(doc.body, "keydown", checkEscape);
            var text = input.value;
            if (isCancel) {
                text = null;
            } else {
                text = text.replace(/^http:\/\/(https?|ftp):\/\//, '$1://');
                if (!/^(?:https?|ftp):\/\//.test(text)) text = 'http://' + text;
            }
            $(dialog).modal('hide');
            callback(text);
            return false;
        };
        var createDialog = function() {
            dialog = doc.createElement("div");
            dialog.className = "modal  fade";
            dialog.style.display = "none";
            if (title == '插入图片' || title == '插入视频') {
                dialog.className += ' aw-imageVideo-box';
            }
            var box = doc.createElement("div");
            box.className = "modal-dialog";
            dialog.appendChild(box);
            var content = doc.createElement("div");
            content.className = "modal-content";
            box.appendChild(content);
            var header = doc.createElement("div");
            header.className = "modal-header";
            header.innerHTML = '<a class="close" data-dismiss="modal">×</a> <h3>' + title + '</h3>';
            content.appendChild(header);
            var body = doc.createElement("div");
            body.className = "modal-body";
            content.appendChild(body);
            var footer = doc.createElement("div");
            footer.className = "modal-footer";
            content.appendChild(footer);
            var question = doc.createElement("p");
            question.style.padding = "5px";
            body.appendChild(question);
            var form = doc.createElement("form"),
                style = form.style;
            form.onsubmit = function() {
                return close(false);
            };
            style.padding = "0";
            style.margin = "0";
            body.appendChild(form);
            input = doc.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.value = defaultInputText;
            style = input.style;
            style.display = "block";
            style.width = "95%";
            style.marginLeft = style.marginRight = "auto";
            form.appendChild(input);
            var okButton = doc.createElement("button");
            okButton.className = "btn btn-success";
            okButton.onclick = function() {
                return close(false);
            };
            okButton.innerHTML = "确定";
            var cancelButton = doc.createElement("button");
            cancelButton.className = "btn btn-default";
            cancelButton.onclick = function() {
                return close(true);
            };
            cancelButton.innerHTML = "取消";
            footer.appendChild(okButton);
            footer.appendChild(cancelButton);
            if (title == '插入图片') {
                $(box).attr("id", "img-wmd-dialog");
                var tips = doc.createElement('p');
                $(body).html($("#insertImgDiv").render({}));
                $(body).find("#remotePic").html(input);
                require(["app/home"],
                    function(home) {
                        var str = "正在上传";
                        $("#avatar").change(function() {
                            var $span = $(this).prev();
                            var $btn = $(this).parent();
                            var src = $btn.next();
                            if ($btn.attr("disabled") == "disabled") {
                                return;
                            }
                            $span.html($("#common-loading-tmpl").render({
                                data: str
                            }));
                            $btn.attr("disabled", "disabled");
                            var flist = $(this).val().split('\\');
                            var length = flist.length;
                            var fname = flist[length - 1];
                            $.ajax({
                                url: "/attachment/getYunPicInfo;jsessionid='" + $("#sessionUID").val(),
                                type: "POST",
                                data: {
                                    fileName: fname
                                }
                            }).done(function(data) {
                                if (data.success == true) {
                                    $.ajax({
                                        url: data.responseData.postUrl,
                                        type: 'POST',
                                        data: home.buildFormData(data.responseData, $("#avatar")),
                                        processData: false,
                                        contentType: false
                                    }).done(function(restr) {
                                        $("#avatar").val("");
                                        restr = $.parseJSON(restr);
                                        home.success("上传成功,请点击确认按钮添加至文本框！");
                                        $span.html("已上传");
                                        $btn.attr("disabled", false);
                                        if (restr.code == 200) {
                                            $(input).val(home.imgUrl + restr.url);
                                        }
                                    }).fail(function() {
                                        home.error("请选择正确的图片文件,并且最大为5M！");
                                        $span.html(str);
                                        $btn.attr("disabled", false);
                                    });
                                } else {
                                    $span.html(str);
                                    $btn.attr("disabled", false);
                                }
                            }).fail(function() {
                                $span.html(str);
                                $btn.attr("disabled", false);
                            });
                        });
                    });
                tips.innerHTML = '';
                form.appendChild(tips);
            } else if (title == '插入视频') {
                var tips = doc.createElement('p');
                tips.innerHTML = '我们目前支持: 优酷、酷六、土豆、56、新浪播客、乐视、Youtube 与 SWF 文件!';
                form.appendChild(tips);
            }
            util.addEvent(doc.body, "keydown", checkEscape);
            doc.body.appendChild(dialog);
            $(dialog).on('hidden.bs.modal',
                function(e) {
                    $(dialog).remove();
                })
        };
        setTimeout(function() {
                createDialog();
                var defTextLen = defaultInputText.length;
                if (input.selectionStart !== undefined) {
                    input.selectionStart = 0;
                    input.selectionEnd = defTextLen;
                    input.focus();
                    setTimeout(function() {
                            $('.modal .form-control').focus();
                        },
                        300);
                } else if (input.createTextRange) {
                    var range = input.createTextRange();
                    range.collapse(false);
                    range.moveStart("character", -defTextLen);
                    range.moveEnd("character", defTextLen);
                    range.select();
                }
                $(dialog).on('shown',
                    function() {
                        input.focus();
                    }) ;
                $(dialog).on('hidden',
                    function() {
                        dialog.parentNode.removeChild(dialog);
                    });
                $(dialog).modal();
                $('.modal .form-control').focus();
            },
            0);
    };
    function UIManager(panels, undoManager, previewManager, commandManager, helpOptions) {
        var inputBox = panels.input,
            buttons = {};
        makeSpritedButtonRow();
        makeHelperRow();
        var keyEvent = "keydown";
        if (uaSniffed.isOpera) {
            keyEvent = "keypress";
        }
        util.addEvent(inputBox, keyEvent,
            function(key) {
                if ((key.ctrlKey || key.metaKey) && !key.altKey && !key.shiftKey) {
                    var keyCode = key.charCode || key.keyCode;
                    var keyCodeStr = String.fromCharCode(keyCode).toLowerCase();
                    switch (keyCodeStr) {
                        case "b":
                            doClick(buttons.bold);
                            break;
                        case "i":
                            doClick(buttons.italic);
                            break;
                        case "l":
                            doClick(buttons.link);
                            break;
                        case "h":
                            doClick(buttons.heading);
                            break;
                        case "k":
                            doClick(buttons.code);
                            break;
                        case "g":
                            doClick(buttons.image);
                            break;
                        case "o":
                            doClick(buttons.olist);
                            break;
                        case "u":
                            doClick(buttons.ulist);
                            break;
                        case "y":
                            doClick(buttons.quote);
                            break;
                        case "e":
                            doClick(buttons.video);
                            break;
                        case "y":
                            doClick(buttons.redo);
                            break;
                        case "z":
                            if (key.shiftKey) {
                                doClick(buttons.redo);
                            } else {
                                doClick(buttons.undo);
                            }
                            break;
                        default:
                            return;
                    }
                    if (key.preventDefault) {
                        key.preventDefault();
                    }
                    if (window.event) {
                        window.event.returnValue = false;
                    }
                }
            });
        util.addEvent(inputBox, "keyup",
            function(key) {
                if (key.shiftKey && !key.ctrlKey && !key.metaKey) {
                    var keyCode = key.charCode || key.keyCode;
                    if (keyCode === 13) {
                        var fakeButton = {};
                        fakeButton.textOp = bindCommand("doAutoindent");
                        doClick(fakeButton);
                    }
                }
            });
        if (uaSniffed.isIE) {
            util.addEvent(inputBox, "keydown",
                function(key) {
                    var code = key.keyCode;
                    if (code === 27) {
                        return false;
                    }
                });
        }
        function doClick(button) {
            inputBox.focus();
            if (button.textOp) {
                if (undoManager) {
                    undoManager.setCommandMode();
                }
                var state = new TextareaState(panels);
                if (!state) {
                    return;
                }
                var chunks = state.getChunks();
                var fixupInputArea = function() {
                    inputBox.focus();
                    if (chunks) {
                        state.setChunks(chunks);
                    }
                    state.restore();
                    previewManager.refresh();
                };
                var noCleanup = button.textOp(chunks, fixupInputArea);
                if (!noCleanup) {
                    fixupInputArea();
                }
            }
            if (button.execute) {
                button.execute(undoManager);
            }
        };
        function setupButton(button, isEnabled) {
            if (isEnabled) {
                button.disabled = false;
                if (!button.isHelp) {
                    button.onclick = function() {
                        if (this.onmouseout) {
                            this.onmouseout();
                        }
                        doClick(this);
                        return false;
                    }
                }
            } else {
                button.disabled = true;
            }
        }
        function bindCommand(method) {
            if (typeof method === "string") method = commandManager[method];
            return function() {
                method.apply(commandManager, arguments);
            }
        }
        function makeSpritedButtonRow() {
            var buttonBar = panels.buttonBar;
            var buttonRow = document.createElement("div");
            buttonRow.id = "wmd-button-row";
            buttonRow.className = 'btn-toolbar';
            buttonRow = buttonBar.appendChild(buttonRow);
            var makeButton = function(id, title, icon, textOp, group) {
                var button = document.createElement("button");
                button.className = "btn";
                var buttonImage = document.createElement("i");
                buttonImage.className = icon;
                button.id = id;
                button.appendChild(buttonImage);
                button.title = title;
                $(button).tooltip({
                    placement: 'bottom'
                });
                if (textOp) button.textOp = textOp;
                setupButton(button, true);
                if (group) {
                    group.appendChild(button);
                } else {
                    buttonRow.appendChild(button);
                }
                return button;
            };
            var makeGroup = function(num) {
                var group = document.createElement("div");
                group.className = "btn-group wmd-button-group" + num;
                group.id = "wmd-button-group" + num;
                buttonRow.appendChild(group);
                return group
            }
            if (navigator.appVersion.indexOf('Mac') > -1) {
                var ckeys = '⌘';
            } else {
                var ckeys = 'Ctrl';
            }
            group1 = makeGroup(1);
            buttons.bold = makeButton("wmd-bold-button", "加粗 - " + ckeys + "+B", "fa fa-bold", bindCommand("doBold"), group1);
            buttons.italic = makeButton("wmd-italic-button", "斜体 - " + ckeys + "+I", "fa fa-italic", bindCommand("doItalic"), group1);
            buttons.heading = makeButton("wmd-heading-button", "标题 - " + ckeys + "+H", "fa fa-header", bindCommand("doHeading"), group1);
            group2 = makeGroup(2);
            buttons.olist = makeButton("wmd-olist-button", "数字列表 - " + ckeys + "+O", "fa fa-list-ol", bindCommand(function(chunk, postProcessing) {
                this.doList(chunk, postProcessing, true);
            }), group2);
            buttons.ulist = makeButton("wmd-ulist-button", "普通列表 - " + ckeys + "+U", "fa fa-list-ul", bindCommand(function(chunk, postProcessing) {
                this.doList(chunk, postProcessing, false);
            }), group2);
            group4 = makeGroup(4);
            buttons.quote = makeButton("wmd-quote-button", "引用 - " + ckeys + "+Y", "fa fa-quote-left", bindCommand("doBlockquote"), group4);
            buttons.code = makeButton("wmd-code-button", "代码 - " + ckeys + "+K", "fa fa-code", bindCommand("doCode"), group4);
            group3 = makeGroup(3);
            buttons.image = makeButton("wmd-image-button", "图片 - " + ckeys + "+G", "fa fa-image", bindCommand(function(chunk, postProcessing) {
                return this.doLinkOrImage(chunk, postProcessing, true);
            }), group3);
            buttons.video = makeButton("wmd-video-button", "视频 - " + ckeys + "+E", "fa fa-youtube-play", bindCommand(function(chunk, postProcessing) {
                return this.doVideo(chunk, postProcessing, true)
            }), group3);
            buttons.link = makeButton("wmd-link-button", "链接 - " + ckeys + "+L", "fa fa-link", bindCommand(function(chunk, postProcessing) {
                return this.doLinkOrImage(chunk, postProcessing, false);
            }), group3);
            group5 = makeGroup(5);
            buttons.undo = makeButton("wmd-undo-button", "撤销 - " + ckeys + "+Z", "fa fa-undo", null, group5);
            buttons.undo.execute = function(manager) {
                if (manager) manager.undo();
            };
            var redoTitle = /win/.test(nav.platform.toLowerCase()) ? "Redo - " + ckeys + "+Y": "Redo - " + ckeys + "+Shift+Z";
            buttons.redo = makeButton("wmd-redo-button", "重做 - " + ckeys + "+Y", "fa fa-repeat", null, group5);
            buttons.redo.execute = function(manager) {
                if (manager) manager.redo();
            };
            group6 = makeGroup(6);
            group6.className = group6.className + " pull-right";
            buttons.eye = makeButton("wmd-quote-button", "开关预览模式", "fa fa-eye", null, group6);
            buttons.eye.execute = function(manager) {
                $(this).toggleClass('hover');
                if ($(panels.preview).is(':visible')) {
                    $(panels.preview).hide();
                    $(this).removeClass('active');
                } else {
                    $(panels.preview).show();
                    $(this).addClass('active');
                }
            };
            buttons.help = makeButton("wmd-quote-button", "编辑器语法帮助", "fa fa-question", null, group6);
            buttons.help.execute = function(manager) {
                if ($(buttonBar).find('.wmd-helper').is(':visible')) {
                    $(this).removeClass('active');
                    $(buttonBar).find('.wmd-helper').hide();
                } else {
                    $(this).addClass('active');
                    $(buttonBar).find('.wmd-helper').show();
                }
            };
            if (helpOptions) {
                group7 = makeGroup(7);
                group7.className = group6.className + " pull-right";
                var helpButton = document.createElement("button");
                var helpButtonImage = document.createElement("i");
                helpButtonImage.className = "fa fa-question";
                helpButton.appendChild(helpButtonImage);
                helpButton.className = "btn";
                helpButton.id = "wmd-help-button";
                helpButton.isHelp = true;
                helpButton.title = helpOptions.title || defaultHelpHoverTitle;
                $(helpButton).tooltip({
                    placement: 'bottom'
                });
                helpButton.onclick = helpOptions.handler;
                setupButton(helpButton, true);
                group6.appendChild(helpButton);
                buttons.help = helpButton;
            }
            setUndoRedoButtonStates();
        }
        function makeHelperRow() {
            var buttonBar = panels.buttonBar;
            var helperRow = document.createElement("div");
            helperRow.className = "wmd-helper hide";
            buttonBar.appendChild(helperRow);
            helperRow.innerHTML = '<ul class="clearfix">' + '<li class="active">标题 / 粗斜体</li>' + '<li>代码片段</li>' + '<li>超链接 / 图片 / 视频</li>' + '<li>列表 / 引用</li>' + '</ul>' + '<div class="content">' + '<div class="tab-pane active">' + '<p>文章内容较多时，可以用标题分段 : </p>' + '<pre>## 大标题 <br/>### 小标题</pre>' + '<p>斜体 / 粗体 : </p>' + '<pre>**粗体** <br/>*斜体* <br/>***粗斜体*** </pre>' + '</div>' + '<div class="tab-pane hide">' + '<p>代码片段 : </p>' + '<pre>{{{<br/>代码片段<br/>}}}' + '</pre>' + '</div>' + '<div class="tab-pane hide">' + '<p>超链接 : </p>' + '<pre>[链接文字](链接地址) 例: [百度](http://www.baidu.com)</pre>' + '<p>图片 : </p>' + '<pre>![图片说明](图片地址) 例: ![百度logo](http://www.baidu.com/img/bdlogo.gif)</pre>' + '<p>视频 : </p>' + '<pre>!![视频说明](视频地址) 例: !![优酷视频](http://youku.com)</pre>' + '</div>' + '<div class="tab-pane hide">' + '<p>有序列表 : </p>' + '<pre>1. 123<br/>2. 123<br/>3. 123</pre>' + '<p>无序列表 : </p>' + '<pre>- 123<br/>- 123<br/>- 123<br/></pre>' + '<p>引用 : ( 双回车后结束引用 )</p>' + '<pre>&gt 引用内容<br/>引用内容<br/>引用内容</pre>' + '</div>' + '</div>';
            $('#wmd-button-bar .wmd-helper ul li').click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                $(this).parents('.wmd-helper').find('.content div').eq($(this).index()).show().siblings().hide();
            });
        }
        function setUndoRedoButtonStates() {
            if (undoManager) {
                setupButton(buttons.undo, undoManager.canUndo());
                setupButton(buttons.redo, undoManager.canRedo());
            }
        };
        this.setUndoRedoButtonStates = setUndoRedoButtonStates;
    }
    function CommandManager(pluginHooks) {
        this.hooks = pluginHooks;
    }
    var commandProto = CommandManager.prototype;
    commandProto.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)";
    commandProto.unwrap = function(chunk) {
        var txt = new re("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
        chunk.selection = chunk.selection.replace(txt, "$1 $2");
    };
    commandProto.wrap = function(chunk, len) {
        this.unwrap(chunk);
        var regex = new re("(.{1," + len + "})( +|$\\n?)", "gm"),
            that = this;
        chunk.selection = chunk.selection.replace(regex,
            function(line, marked) {
                if (new re("^" + that.prefixes, "").test(line)) {
                    return line;
                }
                return marked + "\n";
            });
        chunk.selection = chunk.selection.replace(/\s+$/, "");
    };
    commandProto.doBold = function(chunk, postProcessing) {
        return this.doBorI(chunk, postProcessing, 2, "加粗文字");
    };
    commandProto.doItalic = function(chunk, postProcessing) {
        return this.doBorI(chunk, postProcessing, 1, "斜体文字");
    };
    commandProto.doBorI = function(chunk, postProcessing, nStars, insertText) {
        chunk.trimWhitespace();
        chunk.selection = chunk.selection.replace(/\n{2,}/g, "\n");
        var starsBefore = /(\**$)/.exec(chunk.before)[0];
        var starsAfter = /(^\**)/.exec(chunk.after)[0];
        var prevStars = Math.min(starsBefore.length, starsAfter.length);
        if ((prevStars >= nStars) && (prevStars != 2 || nStars != 1)) {
            chunk.before = chunk.before.replace(re("[*]{" + nStars + "}$", ""), "");
            chunk.after = chunk.after.replace(re("^[*]{" + nStars + "}", ""), "");
        } else if (!chunk.selection && starsAfter) {
            chunk.after = chunk.after.replace(/^([*_]*)/, "");
            chunk.before = chunk.before.replace(/(\s?)$/, "");
            var whitespace = re.$1;
            chunk.before = chunk.before + starsAfter + whitespace;
        } else {
            if (!chunk.selection && !starsAfter) {
                chunk.selection = insertText;
            }
            var markup = nStars <= 1 ? "*": "**";
            chunk.before = chunk.before + markup;
            chunk.after = markup + chunk.after;
        }
        return;
    };
    commandProto.stripLinkDefs = function(text, defsToAdd) {
        text = text.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm,
            function(totalMatch, id, link, newlines, title) {
                defsToAdd[id] = totalMatch.replace(/\s*$/, "");
                if (newlines) {
                    defsToAdd[id] = totalMatch.replace(/["(](.+?)[")]$/, "");
                    return newlines + title;
                }
                return "";
            });
        return text;
    };
    commandProto.addLinkDef = function(chunk, linkDef) {
        var refNumber = 0;
        var defsToAdd = {};
        chunk.before = this.stripLinkDefs(chunk.before, defsToAdd);
        chunk.selection = this.stripLinkDefs(chunk.selection, defsToAdd);
        chunk.after = this.stripLinkDefs(chunk.after, defsToAdd);
        var defs = "";
        var regex = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g;
        var addDefNumber = function(def) {
            refNumber++;
            def = def.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + refNumber + "]:");
            defs += "\n" + def;
        };
        var getLink = function(wholeMatch, before, inner, afterInner, id, end) {
            inner = inner.replace(regex, getLink);
            if (defsToAdd[id]) {
                addDefNumber(defsToAdd[id]);
                return before + inner + afterInner + refNumber + end;
            }
            return wholeMatch;
        };
        chunk.before = chunk.before.replace(regex, getLink);
        if (linkDef) {
            addDefNumber(linkDef);
        } else {
            chunk.selection = chunk.selection.replace(regex, getLink);
        }
        var refOut = refNumber;
        chunk.after = chunk.after.replace(regex, getLink);
        if (chunk.after) {
            chunk.after = chunk.after.replace(/\n*$/, "");
        }
        if (!chunk.after) {
            chunk.selection = chunk.selection.replace(/\n*$/, "");
        }
        chunk.after += "\n\n" + defs;
        return refOut;
    };
    function properlyEncoded(linkdef) {
        return linkdef.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/,
            function(wholematch, link, title) {
                link = link.replace(/\?.*$/,
                    function(querypart) {
                        return querypart.replace(/\+/g, " ");
                    });
                link = decodeURIComponent(link);
                link = encodeURI(link).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
                link = link.replace(/\?.*$/,
                    function(querypart) {
                        return querypart.replace(/\+/g, "%2b");
                    });
                if (title) {
                    title = title.trim ? title.trim() : title.replace(/^\s*/, "").replace(/\s*$/, "");
                    title = $.trim(title).replace(/"/g, "quot;").replace(/\(/g, "&#40;").replace(/\)/g, "&#41;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                }
                return title ? link + ' "' + title + '"': link;
            });
    }
    commandProto.doVideo = function(chunk, postProcessing, isVideo) {
        chunk.selection = chunk.startTag + chunk.selection + chunk.endTag;
        chunk.startTag = chunk.endTag = "";
        var that = this;
        var videoEnteredCallback = function(link) {
            if (link !== null) {
                chunk.selection = (" " + chunk.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1);
                chunk.startTag = isVideo ? "!![": "[";
                chunk.endTag = "](" + link + ")";
                if (!chunk.selection) {
                    if (isVideo) {
                        chunk.selection = "请输入视频名称";
                    }
                }
            }
            postProcessing();
        };
        ui.prompt('插入视频', linkDialogText, linkDefaultText, videoEnteredCallback);
    };
    commandProto.doLinkOrImage = function(chunk, postProcessing, isImage) {
        chunk.trimWhitespace();
        chunk.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);
        var background;
        if (chunk.endTag.length > 1 && chunk.startTag.length > 0) {
            chunk.startTag = chunk.startTag.replace(/!?\[/, "");
            chunk.endTag = "";
            this.addLinkDef(chunk, null);
        } else {
            chunk.selection = chunk.startTag + chunk.selection + chunk.endTag;
            chunk.startTag = chunk.endTag = "";
            if (/\n\n/.test(chunk.selection)) {
                this.addLinkDef(chunk, null);
                return;
            }
            var that = this;
            var linkEnteredCallback = function(link) {
                if (link !== null) {
                    chunk.selection = (" " + chunk.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1);
                    var linkDef = " [999]: " + properlyEncoded(link);
                    chunk.startTag = isImage ? "![": "[";
                    chunk.endTag = "](" + link + ")";
                    if (!chunk.selection) {
                        if (isImage) {
                            chunk.selection = "请输入图片名称";
                        } else {
                            chunk.selection = "请输入链接描述";
                        }
                    }
                }
                postProcessing();
            };
            if (isImage) {
                if (!this.hooks.insertImageDialog(linkEnteredCallback)) ui.prompt('插入图片', imageDialogText, imageDefaultText, linkEnteredCallback);
            } else {
                ui.prompt('插入链接', linkDialogText, linkDefaultText, linkEnteredCallback);
            }
            return true;
        }
    };
    commandProto.doAutoindent = function(chunk, postProcessing) {
        var commandMgr = this,
            fakeSelection = false;
        chunk.before = chunk.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n");
        chunk.before = chunk.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n");
        chunk.before = chunk.before.replace(/(\n|^)[ \t]+\n$/, "\n\n");
        if (!chunk.selection && !/^[ \t]*(?:\n|$)/.test(chunk.after)) {
            chunk.after = chunk.after.replace(/^[^\n]*/,
                function(wholeMatch) {
                    chunk.selection = wholeMatch;
                    return "";
                });
            fakeSelection = true;
        }
        if (/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(chunk.before)) {
            if (commandMgr.doList) {
                commandMgr.doList(chunk);
            }
        }
        if (/(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(chunk.before)) {
            if (commandMgr.doBlockquote) {
                commandMgr.doBlockquote(chunk);
            }
        }
        if (/(\n|^)(\t|[ ]{4,}).*\n$/.test(chunk.before)) {
            if (commandMgr.doCode) {
                commandMgr.doCode(chunk);
            }
        }
        if (fakeSelection) {
            chunk.after = chunk.selection + chunk.after;
            chunk.selection = "";
        }
    };
    commandProto.doBlockquote = function(chunk, postProcessing) {
        chunk.selection = chunk.selection.replace(/^(\n*)([^\r]+?)(\n*)$/,
            function(totalMatch, newlinesBefore, text, newlinesAfter) {
                chunk.before += newlinesBefore;
                chunk.after = newlinesAfter + chunk.after;
                return text;
            });
        chunk.before = chunk.before.replace(/(>[ \t]*)$/,
            function(totalMatch, blankLine) {
                chunk.selection = blankLine + chunk.selection;
                return "";
            });
        chunk.selection = chunk.selection.replace(/^(\s|>)+$/, "");
        chunk.selection = chunk.selection || "引用文字";
        var match = "",
            leftOver = "",
            line;
        if (chunk.before) {
            var lines = chunk.before.replace(/\n$/, "").split("\n");
            var inChain = false;
            for (var i = 0; i < lines.length; i++) {
                var good = false;
                line = lines[i];
                inChain = inChain && line.length > 0;
                if (/^>/.test(line)) {
                    good = true;
                    if (!inChain && line.length > 1) inChain = true;
                } else if (/^[ \t]*$/.test(line)) {
                    good = true;
                } else {
                    good = inChain;
                }
                if (good) {
                    match += line + "\n";
                } else {
                    leftOver += match + line;
                    match = "\n";
                }
            }
            if (!/(^|\n)>/.test(match)) {
                leftOver += match;
                match = "";
            }
        }
        chunk.startTag = match;
        chunk.before = leftOver;
        if (chunk.after) {
            chunk.after = chunk.after.replace(/^\n?/, "\n");
        }
        chunk.after = chunk.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/,
            function(totalMatch) {
                chunk.endTag = totalMatch;
                return "";
            });
        var replaceBlanksInTags = function(useBracket) {
            var replacement = useBracket ? "> ": "";
            if (chunk.startTag) {
                chunk.startTag = chunk.startTag.replace(/\n((>|\s)*)\n$/,
                    function(totalMatch, markdown) {
                        return "\n" + markdown.replace(/^[ ]{0,3}>?[ \t]*$/gm, replacement) + "\n";
                    });
            }
            if (chunk.endTag) {
                chunk.endTag = chunk.endTag.replace(/^\n((>|\s)*)\n/,
                    function(totalMatch, markdown) {
                        return "\n" + markdown.replace(/^[ ]{0,3}>?[ \t]*$/gm, replacement) + "\n";
                    });
            }
        };
        if (/^(?![ ]{0,3}>)/m.test(chunk.selection)) {
            this.wrap(chunk, SETTINGS.lineLength - 2);
            chunk.selection = chunk.selection.replace(/^/gm, "> ");
            replaceBlanksInTags(true);
            chunk.skipLines();
        } else {
            chunk.selection = chunk.selection.replace(/^[ ]{0,3}> ?/gm, "");
            this.unwrap(chunk);
            replaceBlanksInTags(false);
            if (!/^(\n|^)[ ]{0,3}>/.test(chunk.selection) && chunk.startTag) {
                chunk.startTag = chunk.startTag.replace(/\n{0,2}$/, "\n\n");
            }
            if (!/(\n|^)[ ]{0,3}>.*$/.test(chunk.selection) && chunk.endTag) {
                chunk.endTag = chunk.endTag.replace(/^\n{0,2}/, "\n\n");
            }
        }
        chunk.selection = this.hooks.postBlockquoteCreation(chunk.selection);
        if (!/\n/.test(chunk.selection)) {
            chunk.selection = chunk.selection.replace(/^(> *)/,
                function(wholeMatch, blanks) {
                    chunk.startTag += blanks;
                    return "";
                });
        }
    };
    commandProto.doCode = function(chunk, postProcessing) {
        var hasTextBefore = /\S[ ]*$/.test(chunk.before);
        var hasTextAfter = /^[ ]*\S/.test(chunk.after);
        if ((!hasTextAfter && !hasTextBefore) || /\n/.test(chunk.selection)) {
            chunk.before = chunk.before.replace(/[ ]{4}$/,
                function(totalMatch) {
                    chunk.selection = totalMatch + chunk.selection;
                    return "";
                });
            var nLinesBack = 1;
            var nLinesForward = 1;
            if (/(\n|^)(\t|[ ]{4,}).*\n$/.test(chunk.before)) {
                nLinesBack = 0;
            }
            if (/^\n(\t|[ ]{4,})/.test(chunk.after)) {
                nLinesForward = 0;
            }
            chunk.skipLines(nLinesBack, nLinesForward);
            if (!chunk.selection) {
                chunk.startTag = "{{{\n";
                chunk.selection = "请输入代码";
                chunk.endTag = "\n}}}";
            } else {
                chunk.selection = "{{{" + chunk.selection + "}}}";
            }
        } else {
            chunk.trimWhitespace();
            chunk.findTags(/`/, /`/);
            if (!chunk.startTag && !chunk.endTag) {
                chunk.startTag = chunk.endTag = "`";
                if (!chunk.selection) {
                    chunk.selection = "enter code here";
                }
            } else if (chunk.endTag && !chunk.startTag) {
                chunk.before += chunk.endTag;
                chunk.endTag = "";
            } else {
                chunk.startTag = chunk.endTag = "";
            }
        }
    };
    commandProto.doList = function(chunk, postProcessing, isNumberedList) {
        var previousItemsRegex = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/;
        var nextItemsRegex = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/;
        var bullet = "-";
        var num = 1;
        var getItemPrefix = function() {
            var prefix;
            if (isNumberedList) {
                prefix = num + ". ";
                num++;
            } else {
                prefix = bullet + " ";
            }
            return prefix;
        };
        var getPrefixedItem = function(itemText) {
            if (isNumberedList === undefined) {
                isNumberedList = /^\s*\d/.test(itemText);
            }
            itemText = itemText.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm,
                function(_) {
                    return getItemPrefix();
                });
            return itemText;
        };
        chunk.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null);
        if (chunk.before && !/\n$/.test(chunk.before) && !/^\n/.test(chunk.startTag)) {
            chunk.before += chunk.startTag;
            chunk.startTag = "";
        }
        if (chunk.startTag) {
            var hasDigits = /\d+[.]/.test(chunk.startTag);
            chunk.startTag = "";
            chunk.selection = chunk.selection.replace(/\n[ ]{4}/g, "\n");
            this.unwrap(chunk);
            chunk.skipLines();
            if (hasDigits) {
                chunk.after = chunk.after.replace(nextItemsRegex, getPrefixedItem);
            }
            if (isNumberedList == hasDigits) {
                return;
            }
        }
        var nLinesUp = 1;
        chunk.before = chunk.before.replace(previousItemsRegex,
            function(itemText) {
                if (/^\s*([*+-])/.test(itemText)) {
                    bullet = re.$1;
                }
                nLinesUp = /[^\n]\n\n[^\n]/.test(itemText) ? 1 : 0;
                return getPrefixedItem(itemText);
            });
        if (!chunk.selection) {
            chunk.selection = "列表";
        }
        var prefix = getItemPrefix();
        var nLinesDown = 1;
        chunk.after = chunk.after.replace(nextItemsRegex,
            function(itemText) {
                nLinesDown = /[^\n]\n\n[^\n]/.test(itemText) ? 1 : 0;
                return getPrefixedItem(itemText);
            });
        chunk.trimWhitespace(true);
        chunk.skipLines(nLinesUp, nLinesDown, true);
        chunk.startTag = prefix;
        var spaces = prefix.replace(/./g, " ");
        this.wrap(chunk, SETTINGS.lineLength - spaces.length);
        chunk.selection = chunk.selection.replace(/\n/g, "\n" + spaces);
    };
    commandProto.doHeading = function(chunk, postProcessing) {
        chunk.selection = chunk.selection.replace(/\s+/g, " ");
        chunk.selection = chunk.selection.replace(/(^\s+|\s+$)/g, "");
        if (!chunk.selection) {
            chunk.startTag = "## ";
            chunk.selection = "标题";
            chunk.endTag = " ##";
            return;
        } else {
            chunk.selection = "## " + chunk.selection + " ##";
        }
    };
    commandProto.doHorizontalRule = function(chunk, postProcessing) {
        chunk.startTag = "----------\n";
        chunk.selection = "";
        chunk.skipLines(2, 1, true);
    }
})(); (function() {
    var output, Converter;
    if (typeof exports === "object" && typeof require === "function") {
        output = exports;
        Converter = require("./Markdown.Converter").Converter;
    } else {
        output = window.Markdown;
        Converter = output.Converter;
    }
    output.getSanitizingConverter = function() {
        var converter = new Converter();
        converter.hooks.chain("postConversion", sanitizeHtml);
        converter.hooks.chain("postConversion", balanceTags);
        return converter;
    }
    function sanitizeHtml(html) {
        return html.replace(/<[^>]*>?/gi, sanitizeTag);
    }
    var basic_tag_whitelist = /^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol|p|s|sup|sub|strong|strike|ul)>|<(br|hr)\s?\/?>)$/i;
    var a_white = /^(<a\shref="(https?:(\/\/|\/)|ftp:(\/\/|\/)|mailto:|magnet:)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i;
    var img_white = /^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i;
    var pre_white = /^(<pre(\sclass="prettyprint linenums")?>|<\/pre>)$/i;
    function sanitizeTag(tag) {
        if (tag.match(basic_tag_whitelist) || tag.match(a_white) || tag.match(img_white) || tag.match(pre_white)) return tag;
        else return "";
    }
    function balanceTags(html) {
        if (html == "") return "";
        var re = /<\/?\w+[^>]*(\s|$|>)/g;
        var tags = html.toLowerCase().match(re);
        var tagcount = (tags || []).length;
        if (tagcount == 0) return html;
        var tagname, tag;
        var ignoredtags = "<p><img><br><li><hr>";
        var match;
        var tagpaired = [];
        var tagremove = [];
        var needsRemoval = false;
        for (var ctag = 0; ctag < tagcount; ctag++) {
            tagname = tags[ctag].replace(/<\/?(\w+).*/, "$1");
            if (tagpaired[ctag] || ignoredtags.search("<" + tagname + ">") > -1) continue;
            tag = tags[ctag];
            match = -1;
            if (!/^<\//.test(tag)) {
                for (var ntag = ctag + 1; ntag < tagcount; ntag++) {
                    if (!tagpaired[ntag] && tags[ntag] == "</" + tagname + ">") {
                        match = ntag;
                        break;
                    }
                }
            }
            if (match == -1) needsRemoval = tagremove[ctag] = true;
            else tagpaired[match] = true;
        }
        if (!needsRemoval) return html;
        var ctag = 0;
        html = html.replace(re,
            function(match) {
                var res = tagremove[ctag] ? "": match;
                ctag++;
                return res;
            });
        return html;
    }
})();