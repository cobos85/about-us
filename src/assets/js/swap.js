/*! swap.js | Copyright © 2011-2020 CallRail Inc. | License: www.callrail.com/legal */function CallTrkSwap(e){for(var a in e)this[a]=e[a];CallTrk.pushNamespace("namespace_"+this.id,this)}!function(){var e=document.documentElement,a="crjs";e.classList?e.classList.add(a):e.className+=" "+a;var r=document.createElement("style");r.setAttribute("type","text/css");var t=".crjs .phoneswap { visibility: hidden; }";r.textContent!==undefined?r.textContent=t:r.cssText=t;var n=document.querySelector("head");n&&n.appendChild(r)}(),CallTrkSwap.prototype.run=function(){this.referrer=this.getReferrer(),this.landing=this.getLanding(),this.referrer_key=CallTrkSwap.getReferrerKey(this.referrer,this.landing),this.createReferrerAndLandingCookies(),this.applyTrumpLandingPage(),this.applyTrumpSources(),this.getWidgetScripts()},CallTrkSwap._nearestTLD=null,CallTrkSwap.perfData=function(){if(CallTrkSwap._perfData)return CallTrkSwap._perfData;if(CallTrkSwap._perfData={},window.performance)try{var e=window.performance.getEntriesByType("resource").filter(function(e){return e.name.match(/swap\.js/)})[0];if(e){var a=e.encodedBodySize>0&&e.transferSize>0&&e.transferSize<e.encodedBodySize,r=0===e.duration;if(a||r)return{};var t=e.secureConnectionStart>0?e.secureConnectionStart:e.connectEnd;CallTrkSwap._perfData={dns:e.domainLookupEnd-e.domainLookupStart,conn:t-e.connectStart,tls:e.connectEnd-t,wait:e.responseStart-e.requestStart,recv:e.responseEnd-e.responseStart}}}catch(e){}return CallTrkSwap._perfData},CallTrkSwap.perfData(),CallTrkSwap.documentReferrer=function(){return document.referrer},CallTrkSwap.documentURL=function(){return document.URL},CallTrkSwap.documentCookie=function(e){return e?document.cookie=e:document.cookie},CallTrkSwap.windowLocation=function(){return window.location},CallTrkSwap.nearestTLD=function(){if(CallTrkSwap._nearestTLD)return CallTrkSwap._nearestTLD;var e=this.documentCookie(),a=CallTrkSwap.windowLocation().hostname,r=a.split(".");if(""===a)return"";for(var t=r.length-1;t>=0;--t){var n=r.slice(t).join(".");if(this.createCookie("calltrk_nearest_tld",n,3600,n),e!==this.documentCookie())return this.eraseCookie("calltrk_nearest_tld",n),CallTrkSwap._nearestTLD=n,n}},CallTrkSwap.crossSubdomain=function(){var ns=this.firstNamespace();return ns&&ns.cross_subdomain},CallTrkSwap.cookieDuration=function(){return this.firstNamespace().cookie_duration},CallTrkSwap.isMulti=function(){return!!this.firstNamespace().multiswap_id},CallTrkSwap.namespaceIds=function(){var e=[];return CallTrk.eachNamespace(function(ns){e.push(ns.id)}),e},CallTrkSwap.createCookie=function(e,a,r,t){var n="";if(null==r&&(r=this.cookieDuration()),r){var l=new Date;l.setTime(l.getTime()+24*r*60*60*1e3),n="; expires="+l.toGMTString()}var i=e+"="+escape(a)+n+"; path=/";this.crossSubdomain()&&!1!==t&&!t&&(t=this.nearestTLD()),t&&(i+="; domain="+t);var o=this.getItem(e);return o&&o==a?this.documentCookie(i):this.hasCookie(i)?this.setItem(e,a):(this.setItem(e,a),this.documentCookie(i)),i},CallTrkSwap.crDeleteOldCookies=function(){this.eraseCookie("calltrk_referrer"),this.eraseCookie("calltrk_landing"),this.eraseCookie("calltrk_session_id");var e=document.cookie.match(/calltrk_session_swap_numbers_(\d+)=/g);if(e)for(var a=0;a<e.length;++a){var r=e[a],t=/[0-9]+/g,n=r.match(t)[0];this.eraseCookie("calltrk_session_id_"+n),this.eraseCookie("calltrk_session_swap_numbers_"+n)}},CallTrkSwap.hasWordpressCookies=function(){return window.crwpVer>=1},CallTrkSwap.wpProxy=function(){return 2===window.crwpVer},CallTrkSwap.proxyPath=function(e){var a;try{a=new URL(e)}catch(r){a=document.createElement("a"),a.href=e}return"/index.php?rest_route=/calltrk/sessions"+a.pathname},CallTrkSwap.hasCookie=function(e){return null!=this.documentCookie()&&!(this.cookieValues(e).length<1)},CallTrkSwap.readCookie=function(e){var a=this.getItem(e),r=this.cookieValues(e);return r.length<=1&&!a?(this.setItem(e,r[0]),r[0]||null):a?(this.createCookie(e,a),a):(this.crossSubdomain()?this.eraseCookie(e,!1):this.eraseCookie(e,this.nearestTLD()),r=this.cookieValues(e),r[0]||null)},CallTrkSwap.cookieValues=function(e){for(var a=e+"=",r=this.documentCookie().split(";"),t=[],n=0;n<r.length;n++){for(var l=r[n];" "===l.charAt(0);)l=l.substring(1,l.length);0===l.indexOf(a)&&t.push(unescape(l.substring(a.length,l.length)))}return t},CallTrkSwap.eraseCookie=function(e,a){this.createCookie(e,"",-1,a),this.removeItem(e)},CallTrkSwap.prototype.applyTrumpSources=function(){if(this.trump_sources){var e=CallTrkSwap.getReferrerKey(CallTrkSwap.documentReferrer(),CallTrkSwap.documentURL());CallTrkSwap.contains(["google_paid","yahoo_paid","bing_paid"],e)&&(CallTrkSwap.crDeleteOldCookies(),delete CallTrkSwap._referrer,delete CallTrkSwap._landing,CallTrkSwap._referrerAndLandingCookiesCreated=!1,this.referrer=CallTrkSwap.documentReferrer(),this.landing=CallTrkSwap.documentURL(),this.createReferrerAndLandingCookies(),this.referrer_key=e)}},CallTrkSwap.prototype.applyTrumpLandingPage=function(){function e(e){var a="(\\?|&)"+e+"($|&|=)";return CallTrkSwap.windowLocation().href.match(a)}if(this.trump_landing_param){e(this.trump_landing_page_param)&&(CallTrkSwap.crDeleteOldCookies(),delete CallTrkSwap._referrer,delete CallTrkSwap._landing,CallTrkSwap._referrerAndLandingCookiesCreated=!1,this.referrer=CallTrkSwap.documentReferrer(),this.landing=CallTrkSwap.documentURL(),this.createReferrerAndLandingCookies(),this.referrer_key=CallTrkSwap.getReferrerKey(this.referrer,this.landing))}},CallTrkSwap.prototype.createReferrerAndLandingCookies=function(){CallTrkSwap._referrerAndLandingCookiesCreated||(CallTrkSwap.hasWordpressCookies()?this.postWordpressCookies(this.referrer,this.landing):(CallTrkSwap.createCookie("calltrk_referrer",this.referrer),CallTrkSwap.createCookie("calltrk_landing",this.landing)),CallTrkSwap._referrerAndLandingCookiesCreated=!0)},CallTrkSwap.prototype.getReferrer=function(){if(CallTrkSwap._referrer)return CallTrkSwap._referrer;var e=CallTrkSwap.readCookie("calltrk_referrer");return e||(e=this.getCurrentReferrer()),CallTrkSwap._referrer=e,e},CallTrkSwap.prototype.getCurrentReferrer=function(){var e=this.getURLParameter("utm_referrer");return e||(e=CallTrkSwap.documentReferrer()),e||(e="direct"),e},CallTrkSwap.prototype.getLanding=function(){if(CallTrkSwap._landing)return CallTrkSwap._landing;var e=CallTrkSwap.readCookie("calltrk_landing");return e||(e=CallTrkSwap.documentURL()),CallTrkSwap._landing=e,e},CallTrkSwap.getReferrerKey=function(e,a){return e=e||"direct",e.match(/doubleclick/)||a.match(/gclid=/)?"google_paid":e.match(/google/)&&!e.match(/mail\.google\.com/)?e.match(/maps\.google\.[a-z\.]{2,5}/)?"google_local":e.match(/google\.[a-z\.]{2,5}\/(aclk|afs)/)||e.match(/googleadservices/)||a.match(/utm_(medium|source)=[cp]pc/i)||a.match(/(matchtype|adposition)=/i)?"google_paid":"google_organic":e.match(/yahoo/)&&!e.match(/mail\.yahoo\.com/)?e.match(/local\.(search\.)?yahoo\.com/)?"yahoo_local":a.match(/utm_medium=[cp]pc/i)?"yahoo_paid":"yahoo_organic":e.match(/(\/|\.)bing\./)||a.match(/utm_source=bing/i)||a.match(/msclkid=/)?e.match(/bing\.com\/local/)?"bing_local":a.match(/utm_medium=[pc]pc/i)||a.match(/msclkid=/i)?"bing_paid":"bing_organic":e.match(/msn\.com/)?"bing_paid":"direct"===e?a.match(/utm_medium=[cp]pc/i)&&a.match(/utm_source=google/i)?"google_paid":"direct":CallTrkSwap.getReferrerDomain(e)},CallTrkSwap.getReferrerDomain=function(e){var a=e.split("/")[2],r=a.split(".");return r.length>2?r[r.length-2]+"."+r[r.length-1]:a},CallTrkSwap.prototype.getHostnameAndPath=function(){var e=document.createElement("a");e.href=CallTrkSwap.windowLocation().href;var a=e.pathname;return 0!==a.indexOf("/")&&(a="/"+a),e.hostname+a},CallTrkSwap.prototype.getURLParameter=function(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[null,""])[1].replace(/\+/g,"%20"))||null},CallTrkSwap.makePhoneSwapVisible=function(){this.domEach(".phoneswap",function(e){e.style.visibility="visible"})},CallTrkSwap.domEach=function(e,a){for(var r=document.querySelectorAll(e),t=0;t<r.length;t++)a(r[t])},CallTrkSwap.hasClass=function(e,a){return e.classList?e.classList.contains(a):new RegExp("(^| )"+a+"( |$)","gi").test(e.className)},CallTrkSwap.prototype.exactTargetsIn=function(e,a){for(var r=0;r<this.session_exact_targets.length;r++){var t=this.session_exact_targets[r];e.indexOf(t)>=0&&a(this.session_exact_targets[r])}},CallTrkSwap.CHAR_SEP="([-. "+String.fromCharCode(160)+"]?)",CallTrkSwap.NUM_REGEX=new RegExp("(\\(?)\\d{3}(\\))?"+CallTrkSwap.CHAR_SEP+"\\d{3}"+CallTrkSwap.CHAR_SEP+"\\d{4}\\b","g"),CallTrkSwap.stringTargets=function(e){return e&&e.match(this.NUM_REGEX)||[]},CallTrkSwap.INTL_NUM_REGEX=/[(+]?[(+]?(?:[\d][ \-.()\u202F\u00A0]{0,2}){8,21}[\d]/g,CallTrkSwap.intlStringTargets=function(e){return e&&e.match(this.INTL_NUM_REGEX)||[]},CallTrkSwap.recurseDOM=function(e,a,r){for(var t=r||e,n=1;t;){var l=null;!1!==a(t)&&t.nodeType===n&&(l=t.firstChild),t.nextSibling&&t!==e&&CallTrkSwap.recurseDOM(e,a,t.nextSibling),t=l}},CallTrkSwap.traverseDOM=function(e,a){var r=["src","srcset","title","phone"],t=/(\bclk[ng]\/(sms|tel|imessage))|(^(sms|tel|imessage))/i,n=function(a,r,t){var n;n="undefined"==typeof getComputedStyle?a.currentStyle:getComputedStyle(a);var l=n[r]||t&&n[t];if(l){var i=e(l);null!=i&&(a.style[r]=i)}},l=function(a,r){var t=a.getAttribute(r);if(t){var n=e(t,r);null!=n&&a.setAttribute(r,n)}},i=function(e,a){for(var r=0;r<e.length;r++)l(a,e[r])},o=function(e){var a=e.getAttribute("href");a&&a.match(t)&&l(e,"href")};this.domEach(".cr_image, .cr_image *",function(e){n(e,"background"),n(e,"backgroundImage")}),CallTrkSwap.recurseDOM(a,function(a){switch(a.nodeType){case 1:if("SCRIPT"===a.tagName||a.hasAttribute("data-calltrk-noswap"))return!1;i(r,a),o(a);break;case 3:var t=e(a.nodeValue);null!=t&&(CallTrkSwap._isDebug&&(a.parentNode.className+=" calltrk-swap-occurred"),a.nodeValue=t)}})},CallTrkSwap.domTargets=function(e){var a,r,t=[],n=/\D/g;return this.traverseDOM(function(e){a=CallTrkSwap.stringTargets(e);for(var l=0;l<a.length;l++)r=a[l].replace(n,""),r.length>10&&(r=r.slice(r.length-10)),-1===CallTrkSwap.indexOf(t,r)&&t.push(r);CallTrk.eachNamespace(function(ns){ns.exactTargetsIn(e,function(e){t.push(e)})})},e),t},CallTrkSwap.replacementForPlainText=function(e,a){var r=a.substring(0,3),t=a.substring(3,6),n=a.substring(6,10),l="("+r+") "+t+"-"+n,i=r+"-"+t+"-"+n,o=r+"."+t+"."+n;return e=e.replace("###phone###",l),e=e.replace("###phone-dashes###",i),e=e.replace("###phone-dots###",o)},CallTrkSwap.prototype.getGoogleContentExperimentCookies=function(e){if(e.google_experiments!==undefined)return e.google_experiments;var a;if(a=CallTrkSwap.readCookie("calltrk_google_experiments")?CallTrkSwap.readCookie("calltrk_google_experiments"):"",this.getURLParameter("utm_expid")){var r=this.getURLParameter("utm_expid"),t=this.getHostnameAndPath(),n=r+","+t;a.indexOf(n)<0&&(a=""!==a?a+"|"+n:n),CallTrkSwap.createCookie("calltrk_google_experiments",a)}return e.google_experiments=a,a},CallTrkSwap.prototype.swapSessionURL=function(){return this.buildURL("multiswap_session",{multiswap_id:this.multiswap_id,host:this.swap_session_host,version:"12",multiswap_token:this.multiswap_token})},CallTrkSwap.visibleParent=function(){try{if(window.self===window.parent||window.self===window.top)return!1}catch(e){return!1}return!0},CallTrkSwap.prototype.iframeConflict=function(){if(!CallTrkSwap.visibleParent())return!1;var e=window.top.CallTrk&&window.top.CallTrk&&window.top.CallTrk._namespaces;return e&&e.indexOf(this.id)>=0},CallTrkSwap.prototype.getSecondScript=function(e,a,r){var t={cid:this.getURLParameter("cid"),uuid:CallTrkSwap.getSessionID(),ref:this.getCurrentReferrer(),landing:CallTrkSwap.documentURL(),user_agent:navigator.userAgent,record_pageview:a&&!this.iframeConflict(),domless:r,swaps:[],all_formats:!0};CallTrkSwap.isMulti()||(t.ids=CallTrkSwap.namespaceIds());var n=CallTrkSwap.getIntegrationData();for(var l in n)t[l]=n[l];var i={};for(var o in e){var s=e[o]||"",p=s;"object"==typeof s&&(p=s.national_string),p||(i[o]=null),t.swaps.push(o+"="+p)}if(Object.keys(i).length&&this.mergeUnassignedSwaps(i),"withCredentials"in new XMLHttpRequest){t.perf=CallTrkSwap.perfData(),CallTrkSwap._perfData={};var c=this.swapSessionURL().replace(/\.js$/,".json");CallTrkSwap.postScript(c,t,function(e){CallTrkSwap.parseSessionSwap(e)})}else CallTrkSwap.getScript(this.swapSessionURL(),t)},CallTrkSwap.prototype.postWordpressCookies=function(e,a){var r={calltrk_referrer:e,calltrk_landing:a,calltrk_session_id:CallTrkSwap.getSessionID(),domain:CallTrkSwap.nearestTLD(),duration:CallTrkSwap.firstNamespace().cookie_duration};CallTrkSwap.postCookies("/index.php?rest_route=/Calltrk/v1/store",r,function(r){CallTrkSwap.parseCookieResponse(r,e,a)})},CallTrkSwap.parseCookieResponse=function(e,a,r){204!==e&&(window.crwpVer=0,CallTrkSwap.createCookie("calltrk_referrer",a),CallTrkSwap.createCookie("calltrk_landing",r))},CallTrkSwap._debugEnabled=function(){return!!CallTrkSwap.windowLocation().href.match(/crl?dbg/)},CallTrkSwap._isDebug=CallTrkSwap._debugEnabled(),CallTrkSwap._log=[],CallTrkSwap._unassigns=[],CallTrkSwap.log=function(e,a){this._isDebug&&(a||(a=e,e="swap"),this._log.push(e.toString()+": "+a))},CallTrkSwap.prototype.log=function(e){CallTrkSwap.log(this.id,e)},CallTrkSwap.isArray=Array.isArray||function(e){return e instanceof Array},CallTrkSwap.parseSessionSwap=function(e){!0===e.domless?CallTrkSwap.swapCallback(e.a):!0===e.number_assignment&&(CallTrkSwap.mergeStoredSwaps(e.a),CallTrkSwap.mergeUnassignedSwaps(e.a),CallTrkSwap.startSessionSwap(e.r)),CallTrkSwap.makePhoneSwapVisible(),!0===e.integration_retry&&CallTrkSwap.integrationRetry(e.integration_retries)},CallTrkSwap.startSessionSwap=function(e,a){var r=["advanced","simple"],t=this.adjustExactFormat(e),n=document.title;a=a||document.body,r.forEach(function(e){for(var a in t[e])n=CallTrkSwap.scanString(n,a,t[e][a])},this);for(var l in CallTrk._namespaceObjs)n=CallTrk._namespaceObjs[l].swapString(n);if(n!==document.title&&(document.title=n),this.traverseDOM(function(e,a){var n=e;CallTrkSwap._isDebug&&CallTrkSwap.foundTargets.push(e),r.forEach(function(e){for(var r in t[e])n=CallTrkSwap.scanString(n,r,t[e][r],undefined,a)},this);for(var l in CallTrk._namespaceObjs)n=CallTrk._namespaceObjs[l].swapString(n,a);if(n!==e)return n},a),CallTrkSwap.swapCleanup(),window.Cufon)try{window.Cufon.refresh()}catch(e){}this.firstNamespace().mutation_observer&&CallTrkSwap.startObserving(),CallTrkSwap.makePhoneSwapVisible()},CallTrkSwap.adjustExactFormat=function(e){var a={advanced:{},simple:{}};for(var r in e)if(-1!==r.indexOf(",")){var t=r.split(","),n=decodeURIComponent(t[0]),l=decodeURIComponent(t[1]);if(CallTrkSwap.isArray(e[r])){var i=this.replacementForPlainText(l,e[r][0]);a.advanced[i]=["."===e[r][1][0]?n:l,e[r][1]]}else a.advanced[n]=[l,e[r]]}else a.simple[r]=e[r];return a},CallTrkSwap.prototype.swapString=function(e,a){return this._storedSwapCache||(this._storedSwapCache=CallTrkSwap.adjustExactFormat(this.getStoredSwaps())),["advanced","simple"].forEach(function(r){for(var t in this._storedSwapCache[r]){var n=this._storedSwapCache[r][t];e=CallTrkSwap.scanString(e,t,n,undefined,a)}},this),e},CallTrkSwap.isArray=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)},CallTrkSwap.scanString=function(e,a,r,t,n){function l(a,t){var n=CallTrkSwap.intlStringTargets(e?e.trim():e);if(n.length>0){for(var l="",i=0;i<n.length;i++)l=t(r,n[i]);return l}return e}function i(r,t){if("^"===a.charAt(0)){if("href"===n)return o(r.e164,t);var l=CallTrkSwap.findFormat(t,r.formats);return null!==l?o(l,t):o(r.national_string,t)}return CallTrkSwap.standardReplace(e,a,r.national_string)}function o(r,t){var n=t.replace(/\D/g,"");if(a.slice(1)===n.slice(n.length-8)){var l=new RegExp(CallTrkSwap.escapeRegExp(t),"g");CallTrkSwap._isDebug&&(CallTrkSwap.doneSwaps[e]=r),e=e.replace(l,r)}return e}var s,p=t!==undefined;return p||CallTrkSwap.isArray(r)?e.indexOf(a)>-1&&(s=this.replacementForPlainText(p?t:r[0],p?r:r[1]),CallTrkSwap._isDebug&&(CallTrkSwap.doneSwaps[a]=s),e=e.replace(a,s)):e="object"==typeof r&&null!==r?l(r,i):"^"===a.charAt(0)?l(r,o):this.standardReplace(e,a,r),e},CallTrkSwap.defaultNumberFormat=function(e){return"object"==typeof e&&null!==e&&(e=e.national_string),e},CallTrkSwap.escapeRegExp=function(e){return e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")},CallTrkSwap.findFormat=function(e,a){for(var r in a)if(this.isSameFormat(e,a[r]))return r;return null},CallTrkSwap.isSameFormat=function(e,a){return new RegExp(a.slice(1,-1)).test(e)},CallTrkSwap.standardReplace=function(e,a,r){if(this._numberRegexCache||(this._numberRegexCache={}),!this._numberRegexCache[a]){var t=a.substring(0,3),n=a.substring(3,6),l=a.substring(6,10),i="(\\(?)"+t+"(\\))?"+this.CHAR_SEP+n+this.CHAR_SEP+l,o=r.substring(0,3),s=r.substring(3,6),p=r.substring(6,10),c="$1"+o+"$2$3"+s+"$4"+p;this._numberRegexCache[a]=[l,new RegExp(i,"g"),c]}var u=this._numberRegexCache[a];if(e.indexOf(u[0])>-1){if(CallTrkSwap._isDebug){var d=e.match(u[1]);if(d){var w=d[0],k=w.replace(u[1],u[2]);CallTrkSwap.doneSwaps[w]=k}}e=e.replace(u[1],u[2])}return e},CallTrkSwap.swapCleanup=function(){delete this._numberRegexCache,CallTrk.eachNamespace(function(ns){ns._storedSwapCache=null})},CallTrkSwap.mergeStoredSwaps=function(e){var a=e.global;CallTrk.eachNamespace(function(ns){a&&ns.mergeStoredSwaps(a),e[ns.id]&&ns.mergeStoredSwaps(e[ns.id])})},CallTrkSwap.mergeUnassignedSwaps=function(e){var a=e.global;CallTrk.eachNamespace(function(ns){a&&ns.mergeUnassignedSwaps(a),e[ns.id]&&ns.mergeUnassignedSwaps(e[ns.id])})},CallTrkSwap.prototype.mergeStoredSwaps=function(e){var a=this.getStoredSwaps();for(var r in e)e[r]?a[r]=e[r]:a[r]&&delete a[r];this.assigns(a)},CallTrkSwap.prototype.mergeUnassignedSwaps=function(e){var a=this.getUnassignedSwaps();for(var r in e)if(e[r]){var t=a.indexOf(r);t>-1&&a.splice(t,1)}else-1===a.lastIndexOf(r)&&a.push(r);this.unassigns(a)},CallTrkSwap.prototype.getStoredSwaps=function(){var e=this.assigns();return e||{}},CallTrkSwap.prototype.getUnassignedSwaps=function(){var e=this.unassigns();return e||[]},CallTrkSwap.prototype.assigns=function(e){var a=this.id+"-assigns-"+CallTrkSwap.getSessionID();return e?CallTrkSwap.setItem(a,e):CallTrkSwap.getItem(a)},CallTrkSwap.prototype.unassigns=function(e){return e?CallTrkSwap._unassigns=e:CallTrkSwap._unassigns},CallTrkSwap.setItem=function(e,a){return e="calltrk-"+e,a===undefined?window.localStorage.removeItem(e):window.localStorage.setItem(e,CallTrkSwap.jsonify(a)),this.getItem(e)},CallTrkSwap.getItem=function(){for(var e=0;e<arguments.length;e++){var a="calltrk-"+arguments[e],r=window.localStorage.getItem(a);if(r)return JSON.parse(r)}return null},CallTrkSwap.removeItem=function(){for(var e=0;e<arguments.length;e++){var a="calltrk-"+arguments[e];window.localStorage.removeItem(a)}return null},CallTrkSwap.prototype.domlessSessionSwap=function(e,a){if(!this.hasSessionTracker()||!e||0===e.length)return void a({});for(var r={},t=0;t<e.length;t++)r[e[t]]=null;CallTrkSwap.swapCallback=a,this.getSecondScript(r,!1,!0)},CallTrkSwap.prototype.hasSessionTracker=function(){return this.session_number_target_exists||this.session_exact_targets.length>0},CallTrkSwap.prototype.hasFormsOrChat=function(){return this.chat_or_form_exists},CallTrkSwap.isEmptyObject=function(e){for(var a in e)return!1;return!0},CallTrkSwap.checkFormsOrChat=function(){var e=!1,a=!1;CallTrk.eachNamespace(function(ns){e=e||ns.hasSessionTracker(),a=a||ns.hasFormsOrChat()}),!e&&a&&CallTrkSwap.firstNamespace().getSecondScript({},!0)},CallTrkSwap.checkSessionSwap=function(e,a){a=a||document.body;var r={},t=null,n=!1,l=!1;if(CallTrk.eachNamespace(function(ns){ns.hasSessionTracker()&&(l=!0,t=ns.session_poll_interval,n=n||ns.session_polling)}),l){for(var i=CallTrkSwap.domTargets(a),o=!1,s=e,p=0;p<i.length;p++)r[i[p]]=null,CallTrkSwap._isDebug&&CallTrkSwap.foundTargets.push(i[p]);CallTrk.eachNamespace(function(ns){var e=ns.checkSessionSwap(r);o=o||e}),o&&CallTrkSwap.startSessionSwap({},a),CallTrk.eachNamespace(function(ns){s=s||ns.checkUnassignedSwaps(r)}),s&&(CallTrkSwap.firstNamespace().getSecondScript(r,e),t&&n&&CallTrkSwap.pollInit())}this.firstNamespace().mutation_observer&&CallTrkSwap.startObserving(),CallTrkSwap.isEmptyObject(r)&&CallTrkSwap.makePhoneSwapVisible()},CallTrkSwap.prototype.checkUnassignedSwaps=function(e){for(var a=this.getUnassignedSwaps(),r=this.assigns()||{},t=Object.keys(e),n=0;n<t.length;n++){var l=t[n];if(-1===a.indexOf(l)&&!(l in r))return!0}return!1},CallTrkSwap.prototype.checkSessionSwap=function(e){var a=this.getStoredSwaps(),r=!1;for(var t in a){var n=a[t];if(!e[t])if(null===e[t])e[t]=n,r=!0;else if(-1!==t.indexOf(",")){var l=t.split(","),i=decodeURIComponent(l[0]);null===e[i]&&(delete e[i],e[t]=n,r=!0)}}return r},CallTrkSwap.pollSessionURL=function(){var ns=CallTrkSwap.firstNamespace();return ns.buildURL("poll_session",{multiswap_id:ns.multiswap_id,host:ns.swap_session_host,uuid:CallTrkSwap.getSessionID(),multiswap_token:ns.multiswap_token})},CallTrkSwap.pollSession=function(){CallTrkSwap.pollUnwatch();var ns=CallTrkSwap.firstNamespace(),e={},a=Date.now(),r=.9*ns.session_poll_interval;setTimeout(CallTrkSwap.pollWatch,ns.session_poll_interval),CallTrkSwap.lastPoll&&a-CallTrkSwap.lastPoll<r||(CallTrkSwap.lastPoll=a,CallTrkSwap.isMulti()||(e.ids=CallTrkSwap.namespaceIds()),CallTrkSwap.getScript(CallTrkSwap.pollSessionURL(),e))},CallTrkSwap.pollInit=function(){var e=this.firstNamespace().session_poll_interval;this.pollInitted||(this.pollInitted=!0,setTimeout(this.pollWatch,e))},CallTrkSwap.pollWatch=function(){CallTrkSwap.addEventListener(document,"mousemove",CallTrkSwap.pollSession),CallTrkSwap.addEventListener(document,"keypress",CallTrkSwap.pollSession),CallTrkSwap.addEventListener(window,"focus",CallTrkSwap.pollSession)},CallTrkSwap.pollUnwatch=function(){CallTrkSwap.removeEventListener(document,"mousemove",CallTrkSwap.pollSession),CallTrkSwap.removeEventListener(document,"keypress",CallTrkSwap.pollSession),CallTrkSwap.removeEventListener(window,"focus",CallTrkSwap.pollSession)},CallTrkSwap.addEventListener=function(e,a,r){e.addEventListener?e.addEventListener(a,r):e.attachEvent("on"+a,function(){r.call(e)})},CallTrkSwap.removeEventListener=function(e,a,r){e.removeEventListener?e.removeEventListener(a,r):e.detachEvent("on"+a,r)},CallTrkSwap.getSessionID=function(e){if(!e){if(this._session_id)return this._session_id;e="calltrk_session_id"}var a=this.readCookie(e),r=this;return a||CallTrk.eachNamespace(function(ns){a||(a=r.readCookie("calltrk_session_id_"+ns.id.toString()))}),a||(a=this.generateUUID(),this.createCookie(e,a)),this._session_id=a,a},CallTrkSwap.getFormCaptureCookie=function(e){if(!e){if(this._fcid)return this._fcid;e="calltrk_fcid"}var a=this.readCookie(e);return a||(a=this.generateUUID()),this.createCookie(e,a),this._fcid=a,a},CallTrkSwap.generateUUID=function(){var e=window.crypto||window.msCrypto;return e&&e.getRandomValues?"10000000-1000-4000-8000-100000000000".replace(/[018]/g,function(a){return a=parseInt(a),(a^e.getRandomValues(new Uint8Array(1))[0]&15>>a/4).toString(16)}):"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var a=16*Math.random()|0;return("x"==e?a:3&a|8).toString(16)})},CallTrkSwap.swapEntry=function(){var e=CallTrkSwap;e.startSwaps(),window.Squarespace&&window.Squarespace.onInitialize&&window.Squarespace.onInitialize(window.Y,function(){e.startSwaps()})},CallTrkSwap.startSwaps=function(){document.removeEventListener&&document.removeEventListener("visibilitychange",CallTrkSwap.swapEntry,!1),this.iframeAwareReady(function(){var e=CallTrkSwap;e.doneSwaps={},e.foundTargets=[],e.startSourceSwap(),e.checkSessionSwap(!0),e.checkFormsOrChat(),e.broadcastReady()})},CallTrkSwap.iframeAwareReady=function(e){var a=this;a.readyRan=!1;var r=function(){a.readyRan||(a.readyRan=!0,a.documentReady(e))};if(!this.visibleParent()||"loading"!==window.parent.document.readyState)return r();window.addEventListener("message",function(e){"calltrkReady"===e.data&&r()}),"loading"!==window.parent.document.readyState&&r(),setTimeout(r,2e3)},CallTrkSwap.broadcastReady=function(){var e=window.frames;if(0!==e.length)for(var a=0;a<e.length;a++)e[a].postMessage("calltrkReady","*")},CallTrkSwap.documentReady=function(e){"loading"!==document.readyState?e():document.addEventListener?document.addEventListener("DOMContentLoaded",e):document.attachEvent("onreadystatechange",function(){"loading"!==document.readyState&&e()})},CallTrkSwap.startObserving=function(){CallTrkSwap.observer||"undefined"==typeof MutationObserver||(CallTrkSwap.observer=new MutationObserver(this.mutationCallback),CallTrkSwap.observer.observe(document.body,{childList:!0,subtree:!0}))},CallTrkSwap.stopObserving=function(){CallTrkSwap.observer&&(CallTrkSwap.observer.disconnect(),CallTrkSwap.observer=null)},CallTrkSwap.mutationCallback=function(e){for(var a=CallTrkSwap.firstNamespace().session_observer,r=!1,t=0;t<e.length;t++)for(var n=e[t],l=0;l<n.addedNodes.length;l++){var i=n.addedNodes[l];CallTrkSwap.startSourceSwap(i),a&&(r=r||CallTrkSwap.domTargets(i).length>0)}a&&r&&CallTrkSwap.checkSessionSwap(!1)},CallTrkSwap.firstNamespace=function(){return CallTrk._namespaceObjs[CallTrk._namespaces[0]]},CallTrkSwap.whenPageVisible=function(e){"prerender"!==document.visibilityState?e():document.addEventListener&&document.addEventListener("visibilitychange",e,!1)},CallTrkSwap.existingForms=function(){},CallTrkSwap.prototype.buildURL=function(e,a){var r=this.endpoints[e];for(var t in a)r=r.replace("$"+t,a[t]);return this.force_https&&!r.match(/https:/)&&(r="https:"+r),CallTrkSwap.wpProxy()&&(r=CallTrkSwap.proxyPath(r)),r&&r.indexOf("app.calltrk")&&r.indexOf("form_capture")&&(r=r.replace("app.calltrk","trk.calltrk")),r},CallTrkSwap.prototype.addLoadEvent=function(e){"loading"!==document.readyState?e():document.addEventListener?document.addEventListener("DOMContentLoaded",e):document.attachEvent("onreadystatechange",function(){"loading"!==document.readyState&&e()})},CallTrkSwap.jsonify=function(e){var a=Array.prototype.toJSON;if(!a)return JSON.stringify(e);delete Array.prototype.toJSON;var r=JSON.stringify(e);return Array.prototype.toJSON=a,r},CallTrkSwap.contains=function(e,a){return this.indexOf(e,a)>-1},CallTrkSwap.indexOf=function(e,a){if(e.indexOf)return e.indexOf(a);for(var r=0;r<e.length;r++)if(e[r]===a)return r;return-1},CallTrkSwap.getScript=function(e,a,r){var t=document.createElement("script");t.type="text/javascript",-1!==e.indexOf("?")?e+="&":e+="?",e+="t="+(new Date).getTime().toString(),e+="&"+this.param(a),CallTrkSwap.wpProxy()&&r&&(e=this.proxyPath(e)),t.src=e,document.body.appendChild(t)},CallTrkSwap.postScript=function(e,a,r){var t=this.post(e);t.setRequestHeader("Content-Type","text/plain"),t.setRequestHeader("Accept","application/json"),t.onload=function(){var e=JSON.parse(t.response);r(e)},t.send(CallTrkSwap.jsonify(a))},CallTrkSwap.postCookies=function(e,a,r){var t=this.post(e);t.setRequestHeader("Content-Type","application/json"),t.onload=function(){var e=t.status;r(e)},t.send(CallTrkSwap.jsonify(a))},CallTrkSwap.post=function(e){var a=new XMLHttpRequest;return a.open("POST",e),a},CallTrkSwap.startSourceSwap=function(e){e=e||document.body;var a=this.matchingSourceTrackers(),r=function(e,r){for(var t=e,n=0;n<a.length;n++){var l=CallTrkSwap.defaultNumberFormat(a[n].number);for(var i in a[n].advanced_swap_targets){var o=a[n].advanced_swap_targets[i];t=CallTrkSwap.scanString(t,i,l,o,r)}l=a[n].number;for(var s=0;s<a[n].swap_targets.length;s++){var p=a[n].swap_targets[s];t=CallTrkSwap.scanString(t,p,l,undefined,r)}}if(t!==e)return t};if(0!==a.length){var t=r(document.title);if(t&&(document.title=t),CallTrkSwap.traverseDOM(r,e),window.Cufon)try{window.Cufon.refresh()}catch(e){}}},CallTrkSwap.matchingSourceTrackers=function(){var e=[];return CallTrk.eachNamespace(function(ns){ns.is_bot||e.push.apply(e,ns.matchingSourceTrackers())}),e},CallTrkSwap.prototype.matchingSourceTrackers=function(){for(var e=[],a=0;a<this.source_trackers.length;a++){var r=this.source_trackers[a];if("all"!==r.referrer_tracking_source){-1!==r.referrer_tracking_source.indexOf("landing")&&-1!==this.landing.indexOf(r.landing_tracking_source)?e.push(r):CallTrkSwap.contains(r.referrer_keys,this.referrer_key)&&e.push(r)}else e.push(r)}return e},function(){CallTrkSwap.prototype.getIntegrationData=function(cookieCache){var ic=this.data_collection_config.cookies,ij=this.data_collection_config.scripts,params={google_content_cookies:this.getGoogleContentExperimentCookies(cookieCache)};for(var reportName in ic){var cookie=ic[reportName],value;cookieCache[cookie]!==undefined?params[reportName]=cookieCache[cookie]:(value=CallTrkSwap.readCookie(cookie),cookieCache[cookie]=value,null!==value&&(params[reportName]=value))}for(var reportAs in ij){var code=ij[reportAs];try{var rc=eval(code);"object"!=typeof rc||CallTrkSwap.isArray(rc)||(rc=CallTrkSwap.param(rc)),params[reportAs]=rc}catch(e){}}return params},CallTrkSwap.param=function(e,a,r){if("string"==typeof e)return e;a||(a=[]);for(var t in e){var n=e[t];e.hasOwnProperty(t)&&n&&(r&&(t=r+"["+(this.isArray(e)&&!this.isArray(e[0])?"":t)+"]"),"object"!=typeof n?a.push(encodeURIComponent(t)+"="+encodeURIComponent(n)):this.param(n,a,t))}return r?void 0:a.join("&")},CallTrkSwap.getIntegrationData=function(e){var a={},r={};return CallTrk.eachNamespace(function(ns){if(!e||CallTrkSwap.indexOf(e,ns.id)>-1){var t=ns.getIntegrationData(r);for(var n in t)a[n]=t[n]}}),a},CallTrkSwap.integrationRetry=function(e){var a=CallTrkSwap.getIntegrationData(e),r=CallTrkSwap.firstNamespace();CallTrkSwap.isEmptyObject(a)||(a.uuid=CallTrkSwap.getSessionID(),CallTrkSwap.isMulti()||(a.ids=e),CallTrkSwap.getScript(r.icapURL(),a))},CallTrkSwap.prototype.icapURL=function(){return this.buildURL("integration_retry",{multiswap_id:this.multiswap_id,multiswap_token:this.multiswap_token,version:"12",host:this.swap_session_host})}}(),function(){CallTrkSwap.prototype.getWidgetScripts=function(){function e(e){a.endpoints[e]&&-1===CallTrk.appendedScripts.indexOf(e)&&(CallTrkSwap.getScript(a.endpoints[e],{},!0),CallTrk.appendedScripts.push(e))}var a=this;CallTrkSwap.documentReady(function(){a.endpoints.chat&&CallTrkSwap.getScript(a.endpoints.chat,{},!0),a.endpoints.contact&&!a.endpoints.chat&&CallTrkSwap.getScript(a.endpoints.contact,{},!0),a.endpoints.external_chats&&CallTrkSwap.getScript(a.endpoints.external_chats,{},!0),e("custom_forms"),e("external_forms")})},window.CallTrkSwap=window.CallTrkSwap||CallTrkSwap}(),function(){function e(ns,e){for(var a=window.CallTrk._namespaces,r=0;r<a.length;++r)if(a[r]===ns)return;a.push(ns),e&&(window.CallTrk._namespaceObjs[ns]=e)}function a(e){for(var a=window.CallTrk._namespaces,r=0;r<a.length;++r){var ns=a[r];if(e(window.CallTrk._namespaceObjs[ns]))return ns}return null}function r(e){for(var a=window.CallTrk._namespaces,r=0;r<a.length;++r){var ns=a[r];e(window.CallTrk._namespaceObjs[ns])}}function t(){var e={};r(function(ns){var a=ns.getStoredSwaps();for(var r in a)e[r]=a[r]});for(var a=CallTrkSwap.matchingSourceTrackers(),t=0;t<a.length;t++)for(var n=a[t],l=0;l<n.swap_targets.length;l++){var i=n.swap_targets[l];e[i]||(e[i]=n.number)}return e}window.CallTrk=window.CallTrk||{_namespaces:[],_namespaceObjs:{},pushNamespace:e,eachNamespace:r,findNamespace:a,appendedScripts:[],swap:function(e){CallTrkSwap.doneSwaps={},CallTrkSwap.foundTargets=[],e=e||document.body,CallTrkSwap.startSourceSwap(e),CallTrkSwap.checkSessionSwap(!1,e)},getSwapNumbers:function(e,a){CallTrkSwap.isArray(e)||(e=[e]);for(var r=t(),n=window.CallTrk._namespaces[0],ns=window.CallTrk._namespaceObjs[n],l={},i=0;i<e.length;i++){var o=e[i];r[o]&&(l[o]=CallTrkSwap.defaultNumberFormat(r[o]),e.splice(i--,1))}return 0===e.length?a(l):ns.domlessSessionSwap(e,function(e){e=e&&e[ns.id]||{};for(var r in e)l[r]=CallTrkSwap.defaultNumberFormat(e[r]);a(l)}),l}}}();!function(){new CallTrkSwap({id:896335703,cookie_duration:365,cross_subdomain:!0,session_poll_interval:6e4,session_polling:!0,session_observer:!1,access_key:"f67e0b9a1e0c9668483e",form_capture_config:{enabled:!1,url_scope:"all",urls:[],source:null},trump_landing_param:!1,trump_landing_page_param:null,trump_sources:!1,mutation_observer:null,is_bot:!1,force_https:!0,data_collection_config:{cookies:{GoogleAnalytics__ga:"_ga",GoogleAnalytics___utma:"__utma",GoogleAnalytics___utmb:"__utmb",GoogleAnalytics___utmc:"__utmc",GoogleAnalytics___utmv:"__utmv",GoogleAnalytics___utmz:"__utmz",GoogleAnalytics___utmx:"__utmx",Unbounce_ubvs:"ubvs",ga:"_ga",utma:"__utma",utmb:"__utmb",utmc:"__utmc",utmv:"__utmv",utmx:"__utmx",utmz:"__utmz"},scripts:{Unbounce_ub_page:"window.ub && ub.page && { visitorId: ub.page.visitorId, id: ub.page.id, name: ub.page.name, url: ub.page.url, variantId: ub.page.variantId }"}},source_trackers:[],endpoints:{multiswap_session:"//js.callrail.com/group/0/f67e0b9a1e0c9668483e/12/swap_session.js",integration_retry:"//js.callrail.com/group/0/f67e0b9a1e0c9668483e/12/icap.js",form_capture:"//app.callrail.com/companies/896335703/f67e0b9a1e0c9668483e/12/form_capture.js",poll_session:"//js.callrail.com/group/0/f67e0b9a1e0c9668483e/$uuid/poll.js",cr_form:"//js.callrail.com/forms/$formid"},swap_session_host:"js.callrail.com",session_number_target_exists:!0,session_exact_targets:[],chat_or_form_exists:null}).run()}(),CallTrk.installed||(CallTrk.installed=!0,CallTrkSwap.whenPageVisible(function(){CallTrkSwap.swapEntry()}));