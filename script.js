// ==UserScript==
// @name         Alter twitter interface in some capacity
// @namespace    http://cleyfaye.net/
// @version      0.4
// @description  Try to remove/change some of twitter UI to be less annoying.
// @author       Gabriel Paul "Cley Faye" Risterucci
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

/** Hide the given DOM element */
function hideDOM(elem) {
  const hideValue = "none!important";
  if (elem.style.display !== hideValue) elem.style.display = hideValue;
}

/**
 * Locate the "trending" panel
 *
 * This is based on accessibility labels and the hope that twitter UI layout won't change too much.
 */
function getTrendingDiv() {
  // We look through different locales.
  const str = [
    "Fil d'actualités : Tendance actuellement",
    "Timeline: Trending now",
  ];
  for (let i = 0; i < str.length; ++i) {
    const candidate = str[i];
    const res = document.querySelector(`div[aria-label=\"${candidate}\"]`)
    if (res) return res.parentElement.parentElement.parentElement;
  }
}

/** Remove the trending panel */
function removeTrending() {
  const trendingDiv = getTrendingDiv();
  if (trendingDiv) hideDOM(trendingDiv);
}

/** Check if a DOM element is blurry */
function isBlurred(elem) {
  return elem && window.getComputedStyle(elem).filter.startsWith("blur");
}

/** Remove bluriness that's forced onto users */
function clearSpoilerFrom(elems) {
  for (const elem of elems) {
    if (elem.dataset.nospoil) continue;
    elem.dataset.nospoil = true;
    let tries = 12;
    let candidate = elem.parentElement;
    while (tries > 0 && candidate && !isBlurred(candidate)) {
      --tries;
      candidate = candidate.parentElement;
    }
    if (isBlurred(candidate)) {
      candidate.style.filter = "none";
      candidate.nextSibling.remove();
    }
  }
}

/** Remove image/video bluriness that's forced onto users */
function clearSpoiler() {
  const images = document.querySelectorAll("div[aria-label=Image] > img");
  clearSpoilerFrom(images);
  const videos = document.querySelectorAll("video");
  clearSpoilerFrom(videos);
}

/** Remove the message pane in the bottom right */
function removeMessagePane() {
  const panel = document.querySelector("div[data-testid=DMDrawer");
  if (panel) hideDOM(panel);
}

/** Run all removes in a slow loop */
function runStuff() {
  clearTrend();
  clearSpoiler();
  removeMessagePane();
  setTimeout(runStuff, 1000);
}

/** Start running all remover in the next tick */
function armTimer() {
    setTimeout(runStuff, 1);
}

// Make sure we run at some point
if (document.readyState === "complete" || document.readyState === "interactive") {
    armTimer();
} else {
    document.addEventListener("DOMContentLoaded", armTimer);
}
