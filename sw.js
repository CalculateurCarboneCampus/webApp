if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),d={module:{uri:l},exports:o,require:t};s[l]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AdminView-0e86501a.js",revision:null},{url:"assets/AdminView-da7c8d9a.css",revision:null},{url:"assets/index-61efb843.js",revision:null},{url:"assets/index-7241629e.css",revision:null},{url:"assets/LoginView-633d2bed.js",revision:null},{url:"assets/LoginView-f5eb75fc.css",revision:null},{url:"assets/ProjectDraftView-a43ace41.css",revision:null},{url:"assets/ProjectDraftView-e4cd33e9.js",revision:null},{url:"index.html",revision:"82b058bdf5512d2e3b1157b50bad1d9a"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"fbbaf6ec4388a2766e9d6230552aae8a"},{url:"logo.png",revision:"95d64d4d8cdaa5ffe37389183c5db74f"},{url:"logo.svg",revision:"5d31c7176b7f4aedb75658aaa5ccc214"},{url:"manifest.webmanifest",revision:"f17c4520e514044b032ddabfe450401f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));