if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),d={module:{uri:l},exports:o,require:t};s[l]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AdminView-8b972a19.js",revision:null},{url:"assets/AdminView-da7c8d9a.css",revision:null},{url:"assets/index-2b2f8c65.js",revision:null},{url:"assets/index-7241629e.css",revision:null},{url:"assets/LoginView-a64f84db.js",revision:null},{url:"assets/LoginView-f5eb75fc.css",revision:null},{url:"assets/ProjectDraftView-6f457b2e.js",revision:null},{url:"assets/ProjectDraftView-c5886bcd.css",revision:null},{url:"index.html",revision:"0fb11fe9edbcfea1a377227d14b44771"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"1ba2ae710d927f13d483fd5d1e548c9b"},{url:"logo.png",revision:"95d64d4d8cdaa5ffe37389183c5db74f"},{url:"logo.svg",revision:"5d31c7176b7f4aedb75658aaa5ccc214"},{url:"manifest.webmanifest",revision:"f17c4520e514044b032ddabfe450401f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
