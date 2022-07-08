// ==UserScript==
// @name         logosc下载logo
// @namespace
// @version      0.1
// @description  一键下载
// @author       loveliness
// @match        https://*.logosc.cn/edit
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

    let is_transp = function () {
        if ($("#transparent")[0].checked) {
            //logo的下一层
            let logo_rect = xpath("//div[@class='card__upper-view'][1]/div/*[2]/*[1]");
            logo_rect[0].setAttribute("fill", "none");
        }
    }

    //去除水印
    $(".watermarklayer").remove();
    let btn = '透明:<input type="checkbox" id="transparent" name="transparent"/>' +
        '<a id="xzlogoSVG" href="javascript:;" style="color: #ff6d23;display: inline-block;width: 96px;height: 42px;font-size: 15px;line-height: 42px;text-align: center;pointer-events: auto;background-color: #fff;border-radius: 21px;box-shadow: 0 3px 8px 0 rgb(0 0 0 / 10%);transition: all 300ms ease;">下载SVG</a>' +
        '<a id="xzlogoPNG" href="javascript:;" style="color: #a3ff23;display: inline-block;width: 96px;height: 42px;font-size: 15px;line-height: 42px;text-align: center;pointer-events: auto;background-color: #fff;border-radius: 21px;box-shadow: 0 3px 8px 0 rgb(0 0 0 / 10%);transition: all 300ms ease;">下载PNG</a>';
    //移除多余元素
    let btnGroup = $(".display-actions");
    btnGroup = btnGroup[0];
    btnGroup.removeChild(btnGroup.childNodes[2]);
    btnGroup.removeChild(btnGroup.childNodes[1]);
    //添加按钮
    $(".display-actions").prepend(btn);

    let logo = xpath("//div[@class='card__upper-view'][1]/div/*[2]");
    $("a#xzlogoSVG").click(function () {
        is_transp();
        let s = new XMLSerializer();
        //SVGSVGElement转为字符
        logo = s.serializeToString(logo[0]);
        let svg = new Blob([logo], {
            type: "image/svg+xml;charset=utf-8"
        });
        saveAs(svg, "logo.svg")
    });

    $("a#xzlogoPNG").click(function () {
        is_transp();
        saveSvgAsPng(logo[0], "logo.png");
    });
})(jQuery);

