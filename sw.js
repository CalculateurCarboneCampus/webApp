if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),c={module:{uri:l},exports:o,require:t};s[l]=Promise.all(n.map((e=>c[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AdminView-23e48b7a.js",revision:null},{url:"assets/AdminView-e202ccb7.css",revision:null},{url:"assets/index-092319b8.css",revision:null},{url:"assets/index-76cbbf76.js",revision:null},{url:"assets/LoginView-521c7679.js",revision:null},{url:"assets/LoginView-f5eb75fc.css",revision:null},{url:"assets/ProjectDraftView-5f43d352.css",revision:null},{url:"assets/ProjectDraftView-7a591889.js",revision:null},{url:"index.html",revision:"dbf25f36a9bfdff8974243a6630ef09e"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"1ba2ae710d927f13d483fd5d1e548c9b"},{url:"logo.png",revision:"95d64d4d8cdaa5ffe37389183c5db74f"},{url:"logo.svg",revision:"5d31c7176b7f4aedb75658aaa5ccc214"},{url:"manifest.webmanifest",revision:"f17c4520e514044b032ddabfe450401f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
