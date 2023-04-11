// ==UserScript==
// @name         下载logoVI
// @namespace
// @version      0.1
// @description  一键下载
// @author       loveliness
// @match        *://*.logosc.cn/vi/editor*
// @icon         http://q1.qlogo.cn/g?b=qq&nk=1695560542&s=640
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.min.js
// @require      https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/save-svg-as-png/1.4.17/saveSvgAsPng.min.js
// @grant        none
// @license MIT
// ==/UserScript==

(function ($) {
    'use strict';

    //xpath定位方式
    let xpath = function (xpathToExecute) {
        var result = [];
        var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
            result.push(nodesSnapshot.snapshotItem(i));
        }
        return result;
    }

    setTimeout(function () {
        let btnGroup = $(".vi-editor__tool-item--download");

        // btnGroup.removeChild(btnGroup.childNodes[0]);

        let btn =
            '<a id="xzlogoPNG" class="vi-button vi-button--theme-dark vi-button--size-default" style="background-color:red;"><i class="icon-vi-download-stroke"></i>FREE下载PNG</>';
        //添加按钮
        btnGroup.prepend(btn);

        let logo = xpath("//div[@class='editor-element-container'][1]/*[1]");
        $("a#xzlogoSVG").click(function () {
            let s = new XMLSerializer();
            //SVGSVGElement转为字符
            logo = s.serializeToString(logo[0]);
            let svg = new Blob([logo], {
                type: "image/svg+xml;charset=utf-8"
            });
            saveAs(svg, "logo.svg")
        });

        $("a#xzlogoPNG").click(function () {
            saveSvgAsPng(logo[0], "logo.png");
        });
    }, 5000)
})(jQuery);

