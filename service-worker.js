"use strict";var precacheConfig=[["/burger-builder/index.html","b745bc5b61c51c5717dbd2e4c3bd3301"],["/burger-builder/static/css/main-cssmodules.60099956.css","393cc13609d94be330f11e42c24bcf05"],["/burger-builder/static/css/main.1ad2fddc.css","983c6cd44ee318b32a257b503bb9be7a"],["/burger-builder/static/js/0.a23bfc2c.chunk.js","c479ade6742d39e104e529fe1f4cb0d8"],["/burger-builder/static/js/1.ec21c963.chunk.js","838394c3a39caedd01a0df883f62a407"],["/burger-builder/static/js/2.c163108a.chunk.js","2b97410d92121d6c23c90886927592a4"],["/burger-builder/static/js/main.ca4573ca.js","a117d6f696c839320f07a0bb7e15a82f"],["/burger-builder/static/media/bacon.c7a30605.png","c7a306058dcab356eb9398abc8ebeed1"],["/burger-builder/static/media/beef.01377bab.png","01377babd2724faf6b97f045c352247b"],["/burger-builder/static/media/bunbottom.f3d4c602.png","f3d4c60294dea1f6df21156ad61fe4da"],["/burger-builder/static/media/buntop.2dc222ff.png","2dc222fffcc7557c0999f4990a4e6526"],["/burger-builder/static/media/cheese.005ff91f.png","005ff91fc28036c882d8b708584b7fa9"],["/burger-builder/static/media/logo.b8503d26.png","b8503d262bffbfb7c67fd6762963e7d1"],["/burger-builder/static/media/salad.740e76ed.png","740e76ed7a869635e8961102844bfc07"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var r=new URL(e);return"/"===r.pathname.slice(-1)&&(r.pathname+=t),r.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,r,n){var a=new URL(e);return n&&a.pathname.match(n)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(r)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var r=new URL(t).pathname;return e.some(function(e){return r.match(e)})},stripIgnoredUrlParameters=function(e,t){var r=new URL(e);return r.hash="",r.search=r.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),r.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],r=e[1],n=new URL(t,self.location),a=createCacheKey(n,hashParamName,r,/\.\w{8}\./);return[n.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(r){if(!t.has(r)){var n=new Request(r,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+r+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(r,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(r){return Promise.all(r.map(function(r){if(!t.has(r.url))return e.delete(r)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,r=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(r))||(r=addDirectoryIndex(r,n),t=urlsToCacheKeys.has(r));var a="/burger-builder/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(r=new URL(a,self.location).toString(),t=urlsToCacheKeys.has(r)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(r)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});