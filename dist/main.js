!function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);let i={};function s(e){return"#"+Object.keys(e).map(t=>`${t}=${(e=>encodeURIComponent(JSON.stringify(e)))(e[t])}`).join("&")}function o(e){return i=function(e){const t={};return e.replace(/^#/,"").split("&").map(e=>{const n=e.split("=");2===n.length&&(t[n[0]]=JSON.parse(decodeURIComponent(n[1])))}),t.tableId?t:{}}(e)}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const r=new WeakMap,l=e=>"function"==typeof e&&r.has(e),a=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,u=(e,t,n=null)=>{let i=t;for(;i!==n;){const t=i.nextSibling;e.removeChild(i),i=t}},c={},d=`{{lit-${String(Math.random()).slice(2)}}}`,h=`\x3c!--${d}--\x3e`,p=new RegExp(`${d}|${h}`),m=(()=>{const e=document.createElement("div");return e.setAttribute("style","{{bad value}}"),"{{bad value}}"!==e.getAttribute("style")})();class f{constructor(e,t){this.parts=[],this.element=t;let n=-1,i=0;const s=[],o=t=>{const r=t.content,l=document.createTreeWalker(r,133,null,!1);let a,u;for(;l.nextNode();){n++,a=u;const t=u=l.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const s=t.attributes;let o=0;for(let e=0;e<s.length;e++)s[e].value.indexOf(d)>=0&&o++;for(;o-- >0;){const s=e.strings[i],o=b.exec(s)[2],r=m&&"style"===o?"style$":/^[a-zA-Z-]*$/.test(o)?o:o.toLowerCase(),l=t.getAttribute(r).split(p);this.parts.push({type:"attribute",index:n,name:o,strings:l}),t.removeAttribute(r),i+=l.length-1}}"TEMPLATE"===t.tagName&&o(t)}else if(3===t.nodeType){const e=t.nodeValue;if(e.indexOf(d)<0)continue;const o=t.parentNode,r=e.split(p),l=r.length-1;i+=l;for(let e=0;e<l;e++)o.insertBefore(""===r[e]?v():document.createTextNode(r[e]),t),this.parts.push({type:"node",index:n++});o.insertBefore(""===r[l]?v():document.createTextNode(r[l]),t),s.push(t)}else if(8===t.nodeType)if(t.nodeValue===d){const e=t.parentNode,o=t.previousSibling;null===o||o!==a||o.nodeType!==Node.TEXT_NODE?e.insertBefore(v(),t):n--,this.parts.push({type:"node",index:n++}),s.push(t),null===t.nextSibling?e.insertBefore(v(),t):n--,u=a,i++}else{let e=-1;for(;-1!==(e=t.nodeValue.indexOf(d,e+1));)this.parts.push({type:"node",index:-1})}}};o(t);for(const e of s)e.parentNode.removeChild(e)}}const g=e=>-1!==e.index,v=()=>document.createComment(""),b=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y{constructor(e,t,n){this._parts=[],this.template=e,this.processor=t,this._getTemplate=n}update(e){let t=0;for(const n of this._parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let n=0,i=0;const s=e=>{const o=document.createTreeWalker(e,133,null,!1);let r=o.nextNode();for(;n<t.length&&null!==r;){const e=t[n];if(g(e))if(i===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this._getTemplate);e.insertAfterNode(r),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(r,e.name,e.strings));n++}else i++,"TEMPLATE"===r.nodeName&&s(r.content),r=o.nextNode();else this._parts.push(void 0),n++}};return s(e),a&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class x{constructor(e,t,n,i){this.strings=e,this.values=t,this.type=n,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",n=!0;for(let i=0;i<e;i++){const e=this.strings[i];t+=e;const s=e.lastIndexOf(">");!(n=(s>-1||n)&&-1===e.indexOf("<",s+1))&&m&&(t=t.replace(b,(e,t,n,i)=>"style"===n?`${t}style$${i}`:e)),t+=n?h:d}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const $=e=>null===e||!("object"==typeof e||"function"==typeof e);class _{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new w(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let i=0;i<t;i++){n+=e[i];const t=this.parts[i];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)n+="string"==typeof t?t:String(t);else n+="string"==typeof e?e:String(e)}}return n+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===c||$(e)&&e===this.value||(this.value=e,l(e)||(this.committer.dirty=!0))}commit(){for(;l(this.value);){const e=this.value;this.value=c,e(this)}this.value!==c&&this.committer.commit()}}class N{constructor(e){this.value=void 0,this._pendingValue=void 0,this.templateFactory=e}appendInto(e){this.startNode=e.appendChild(v()),this.endNode=e.appendChild(v())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=v()),e._insert(this.endNode=v())}insertAfterPart(e){e._insert(this.startNode=v()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;l(this._pendingValue);){const e=this._pendingValue;this._pendingValue=c,e(this)}const e=this._pendingValue;e!==c&&($(e)?e!==this.value&&this._commitText(e):e instanceof x?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):void 0!==e.then?this._commitPromise(e):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&t.nodeType===Node.TEXT_NODE?t.textContent=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.templateFactory(e);if(this.value&&this.value.template===t)this.value.update(e.values);else{const n=new y(t,e.processor,this.templateFactory),i=n._clone();n.update(e.values),this._commitNode(i),this.value=n}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,i=0;for(const s of e)void 0===(n=t[i])&&(n=new N(this.templateFactory),t.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(t[i-1])),n.setValue(s),n.commit(),i++;i<t.length&&(t.length=i,this.clear(n&&n.endNode))}_commitPromise(e){this.value=e,e.then(t=>{this.value===e&&(this.setValue(t),this.commit())})}clear(e=this.startNode){u(this.startNode.parentNode,e.nextSibling,this.endNode)}}class V{constructor(e,t,n){if(this.value=void 0,this._pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this._pendingValue=e}commit(){for(;l(this._pendingValue);){const e=this._pendingValue;this._pendingValue=c,e(this)}if(this._pendingValue===c)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=c}}class k extends _{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends w{}class A{constructor(e,t){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t}setValue(e){this._pendingValue=e}commit(){for(;l(this._pendingValue);){const e=this._pendingValue;this._pendingValue=c,e(this)}this._pendingValue!==c&&(null==this._pendingValue!=(null==this.value)&&(null==this._pendingValue?this.element.removeEventListener(this.eventName,this):this.element.addEventListener(this.eventName,this)),this.value=this._pendingValue,this._pendingValue=c)}handleEvent(e){"function"==typeof this.value?this.value.call(this.element,e):"function"==typeof this.value.handleEvent&&this.value.handleEvent(e)}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const E=new class{handleAttributeExpressions(e,t,n){const i=t[0];return"."===i?new k(e,t.slice(1),n).parts:"@"===i?[new A(e,t.slice(1))]:"?"===i?[new V(e,t.slice(1),n)]:new _(e,t,n).parts}handleTextExpression(e){return new N(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const S=new Map,O=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function I(e,t,n=function(e){let t=S.get(e.type);void 0===t&&(t=new Map,S.set(e.type,t));let n=t.get(e.strings);return void 0===n&&(n=new f(e,e.getTemplateElement()),t.set(e.strings,n)),n}){let i=O.get(t);void 0===i&&(u(t,t.firstChild),O.set(t,i=new N(n)),i.appendInto(t)),i.setValue(e),i.commit()}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const P=(e,...t)=>new x(e,t,"html",E),j={editable:!1,keydown(){},render(e){const t=/^(.*)\b([01][\w-]{34,42})\b(.*)$/.exec(e);return t?P`${t[1]}<a href=${s({tableId:t[2]})}>${t[2]}</a>${t[3]}`:e}};let C=-1;function F(e){return P`
<table class="pure-table pure-table-bordered">
  <thead>
    <tr>${e.tableHead.map(function(t){const n=e=>s(Object.assign({},i,{orderBy:`'${t}' ${e}`})),o=i.tableId?["pure-menu-item"]:["hidden"],r=(e=>e&&e.column===t?e:void 0)(e.filterEditor);return P`
<td class=${["pure-menu-item","pure-menu-has-children",r?"pure-menu-active":"pure-menu-allow-hover"].join(" ")}>
  <span class="pure-menu-link">${t}</span>
  <ul class="pure-menu-children" @keydown=${function(e){r&&"Enter"===e.key&&r.onDone()}} 
      style="border:1px solid gray;border-radius:10px">
    <li class=${o}><a href=${n("ASC")} class="pure-menu-link">Order A->Z</a></li>
    <li class=${o}><a href=${n("DESC")} class="pure-menu-link">Order Z->A</a></li>
    <li class=${o}>
      <a href=${r?"":e.editFilterLink(t)} class="pure-menu-link">Filter</a>
    </li>
      ${r?function(e){return P`
<li class="pure-menu-item">
  <button class="pure-menu-link pure-button-primary" @click=${()=>e.onDone()}>Apply filter
  </button>
</li>`}(r):""}
      ${r?function(e){return P`
<li class="pure-menu-item">
  <input class="pure-menu-link" type="text" placeholder="Regular expression" @input=${function(t){e.filterSearch=t.target.value,Z()}}>
</li>`}(r):""}
      ${r?function(e){return e.filter.map(function(e){return P`
<li class="pure-menu-item">
  <div class="pure-menu-link">
    <input type="checkbox" ?checked=${e.selected} @change=${function(t){e.selected=t.target.checked}}>
    <span>${e.value}</span>
    <span style='float:right'>${e.count}</span>
  </div>
</li>`})}(r):""}
  </ul>
</td>`})}</tr>
  </thead>
  <tbody>
    ${e.tableBody.map(function(t,n){const{editable:i,keydown:s,render:o}=n===C?function({tableBody:e,onRowChanged:t,redrawPage:n}){return{editable:!0,keydown:function(i){if("Escape"===i.code)C=-1,n();else if("Enter"===i.code){const s=i.target,o=s.closest("tr").cells,r=e[C];for(let e=o.length;--e>=0;)r[e]=o.item(e).textContent;t&&t(C),C=-1,n()}},render:e=>e}}(e):j;return P`<tr @dblclick=${function(t){C=n,e.redrawPage(),t.target.focus()}}>${t.map(function(e){return P`<td ?contenteditable=${i} @keydown=${s}>${o(""+e)}</td>`})}</tr>`})}
  </tbody>
</table>`}const L={heading:"Editable FT",menu:[{item:"About",link:"https://github.com/friends-of-fusion-tables/editable-ft"},{item:"Show tables",link:"#"}],tableHead:[],tableBody:[],editFilterLink:()=>"#",routeToPage:e=>window.location.hash=s(e),redrawPage:()=>H(B)},M=Object.assign({},L,{subtitle:"Loading..."}),q=Object.assign({},L,{title:"Authorization required",action:{text:"Authorize",click:()=>gapi.auth2.getAuthInstance().signIn()}});let B=M;function R({name:e,description:t,tableId:n},o,r,l,a,u=L){const c=((e,t)=>e&&t&&t.rows?function(e,t){const n=i.filter||{},s=n[e]||[],o=t.map(function(e){const t=""+e[0],n=s.includes(t);return{value:t,count:e[1],selected:n}});return{column:e,filterSearch:"",onDone:function(){const t=o.filter(e=>e.selected).map(e=>e.value);t.length?n[e]=t:delete n[e];Object.keys(n).length?i.filter=n:delete i.filter;delete i.addFilter,u.routeToPage(i)},get filter(){const e=new RegExp(this.filterSearch,"i");return o.filter(t=>e.test(t.value)).slice(0,20)}}}(e,t.rows):void 0)(l,a),d=Object.assign({},u,{title:e,subtitle:t,filterEditor:c,onRowChanged:function(e){const t=d.tableBody[e],i=r.rows[e][0],s=`update ${n} set ${d.tableHead.map((e,n)=>`'${e}' = '${t[n]}'`).join(", ")} where rowid = ${i}`;gapi.client.fusiontables.query.sql({sql:s}).execute(e=>console.debug("After "+s+": "+JSON.stringify(e)))},editFilterLink:function(e){return s(Object.assign({},i,{addFilter:e}))}});return B=D(d,o)}function D(e,{columns:t,rows:n}){return e.tableHead=t||[],e.tableBody=n||[],e}let W=!1;function H(e){const t=e.action?function({text:e,click:t}){return P`<button class="pure-button pure-button-primary" @click=${t}>${e}</button>`}(e.action):F(e);function n(){W=!W,e.redrawPage()}I(P`<div id="layout" class=${z("")}>
      <a href="#menu" id="menuLink" class=${z("menu-link")} @click=${n}>
        <span></span>
      </a>

      <div id="menu" class=${z("")}>
        <div class="pure-menu">
          <a class="pure-menu-heading" href="#">${e.heading}</a>

          <ul class="pure-menu-list">
            ${e.menu.map(e=>P`
            <li class="pure-menu-item"><a href=${e.link} class="pure-menu-link">${e.item}</a></li>
            `)}
          </ul>
        </div>
      </div>

      <div id="main">
        <div class="header">
        <span>Success</span>
          <h1>${e.title}</h1>
          <h2>${e.subtitle}</h2>
        </div>

        <div class="content" @click=${()=>W&&n()}>${t}</div>
      </div>
    </div>
`,document.body)}const z=e=>W?e+" active":e;const Z=()=>H(B);gapi.load("client:auth2",()=>{gapi.client.init({apiKey:"AIzaSyAXtETV2s9eaSPC06WVCW3u1eZku0Uh8ic",discoveryDocs:["https://people.googleapis.com/$discovery/rest?version=v1","https://www.googleapis.com/discovery/v1/apis/fusiontables/v2/rest"],clientId:"340312358145-cp3hbrs62fqpduq71voobsv6cqaoa0m0.apps.googleusercontent.com",scope:["profile https://www.googleapis.com/auth/fusiontables","https://www.googleapis.com/auth/fusiontables.readonly"].join(" ")}).then(()=>{gapi.auth2.getAuthInstance().isSignedIn.listen(J),J(gapi.auth2.getAuthInstance().isSignedIn.get())})});const J=e=>e?U(location.hash):H(q);function U(e){H(function(e){const{tableId:t,limit:n,orderBy:i,addFilter:s}=e;if(t){const r=o(),l=i?" order by "+i:"";return async function(e,t){const[n,i,r,l]=await Promise.all([gapi.client.fusiontables.table.get({tableId:e}),a("select * "+t),a("select ROWID "+t),function(){const t=o(s);return s?a(`select '${s}', count() from ${e}${t} group by '${s}'`):{}}()]);function a(e){return gapi.client.fusiontables.query.sql({sql:e})}H(R(n.result,i.result,r.result,s,s?l.result:void 0))}(t,`from ${t}${r}${l} limit ${n||30}`),M;function o(t){const n=function(e,t=""){return e?Object.keys(e).filter(e=>e!==t).map(function(t){const n=e[t];return 1===n.length?`'${t}' = '${n[0]}'`:`'${t}' in (${n.map(e=>`'${e}'`).join(",")})`}):[]}(e.filter,t);return n.length?" where "+n.join(" and "):""}}return async function(){const e="show tables",t=await gapi.client.fusiontables.query.sql({sql:e});H(function(e,t,n=L){return B=D(Object.assign({},n,{subtitle:e}),t)}(e,t.result))}(),M}(o(e)))}window.addEventListener("hashchange",()=>U(location.hash)),H(B)}]);
