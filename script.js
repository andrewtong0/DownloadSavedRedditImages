// ==UserScript==
// @name         Reddit Download Saved Images
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Download a user's saved images
// @author       You
// @match        https://old.reddit.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        GM_download
// @grant        GM.download
// ==/UserScript==
// @run-at context-menu

const validSubreddits = [];
const downloadsFolderName = "Reddit Saved Images";
const shouldUnsaveDownloadedPosts = true;


(function() {
    'use strict';

    let posts = document.getElementById("siteTable").getElementsByClassName("thing");
    for (let i = 0; i < posts.length; i++) {
        const currPost = posts[i];
        if (!isPostValid(currPost)) continue;
        const imgNameAndUrl = getImgNameAndUrl(currPost);
        saveImg(getPostSubreddit(currPost), imgNameAndUrl.name, imgNameAndUrl.url);
        if (shouldUnsaveDownloadedPosts) unsavePost(currPost);
    }
})();

function getPostSubreddit(postEl) {
    return postEl.getAttribute("data-subreddit-prefixed").substring(2);
}

function checkPostAttrMatchesVal(postEl, attrName, attrVals) {
    for (let i = 0; i < attrVals.length; i++) {
        const attrVal = attrVals[i];
        if (postEl.getAttribute(attrName) == attrVal) return true;
    }
    return false;
}

function isPostValid(postEl) {
    // Veryify post is in valid subreddit set
    const validSubredditsSet = new Set(validSubreddits);
    const currSubreddit = getPostSubreddit(postEl);
    if (!validSubredditsSet.has(currSubreddit)) return false;
    if (!checkPostAttrMatchesVal(postEl, "data-is-gallery", ["false"])) return false;
    if (!checkPostAttrMatchesVal(postEl, "data-domain", ["i.redd.it", "i.imgur.com"])) return false;

    // Otherwise, post is valid
    return true;
}

function getImgNameAndUrl(postEl) {
    const currSubreddit = getPostSubreddit(postEl);
    const imgUrl = postEl.getAttribute("data-url");
    const postTItle = postEl.getElementsByClassName("title")[1].innerText;
    let imgName = postTItle;
    imgName = imgName.replace(/\//, " - ");
    console.log(imgName);
    return {
        name: imgName,
        url: imgUrl
    };
}

function saveImg(localDir, imgName, imgUrl) {
    const imgExtension = imgUrl.split(".").pop();
    localDir = localDir ? `${localDir}/` : "";
    const arg = {
        url: imgUrl,
        name: downloadsFolderName + "/" + localDir + imgName + "." + imgExtension
    };
    GM_download(arg);
}

function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
}

function simulateClick(targetNode) {
    triggerMouseEvent(targetNode, "mouseover");
    triggerMouseEvent(targetNode, "mousedown");
    triggerMouseEvent(targetNode, "mouseup");
    triggerMouseEvent(targetNode, "click");
}

function unsavePost(postEl) {
    const unsaveEl = postEl.getElementsByClassName("link-unsave-button")[0].getElementsByTagName("a")[0];
    if (unsaveEl) simulateClick(unsaveEl);
}
