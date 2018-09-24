!function(e){var t={};function n(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(s,i,function(t){return e[t]}.bind(null,i));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);
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
const s=new WeakMap,i=e=>"function"==typeof e&&s.has(e),o=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,a=(e,t,n=null)=>{let s=t;for(;s!==n;){const t=s.nextSibling;e.removeChild(s),s=t}},r={},l=`{{lit-${String(Math.random()).slice(2)}}}`,u=`\x3c!--${l}--\x3e`,c=new RegExp(`${l}|${u}`),d=(()=>{const e=document.createElement("div");return e.setAttribute("style","{{bad value}}"),"{{bad value}}"!==e.getAttribute("style")})();class h{constructor(e,t){this.parts=[],this.element=t;let n=-1,s=0;const i=[],o=t=>{const a=t.content,r=document.createTreeWalker(a,133,null,!1);let u,h;for(;r.nextNode();){n++,u=h;const t=h=r.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const i=t.attributes;let o=0;for(let e=0;e<i.length;e++)i[e].value.indexOf(l)>=0&&o++;for(;o-- >0;){const i=e.strings[s],o=f.exec(i)[2],a=d&&"style"===o?"style$":/^[a-zA-Z-]*$/.test(o)?o:o.toLowerCase(),r=t.getAttribute(a).split(c);this.parts.push({type:"attribute",index:n,name:o,strings:r}),t.removeAttribute(a),s+=r.length-1}}"TEMPLATE"===t.tagName&&o(t)}else if(3===t.nodeType){const e=t.nodeValue;if(e.indexOf(l)<0)continue;const o=t.parentNode,a=e.split(c),r=a.length-1;s+=r;for(let e=0;e<r;e++)o.insertBefore(""===a[e]?m():document.createTextNode(a[e]),t),this.parts.push({type:"node",index:n++});o.insertBefore(""===a[r]?m():document.createTextNode(a[r]),t),i.push(t)}else if(8===t.nodeType)if(t.nodeValue===l){const e=t.parentNode,o=t.previousSibling;null===o||o!==u||o.nodeType!==Node.TEXT_NODE?e.insertBefore(m(),t):n--,this.parts.push({type:"node",index:n++}),i.push(t),null===t.nextSibling?e.insertBefore(m(),t):n--,h=u,s++}else{let e=-1;for(;-1!==(e=t.nodeValue.indexOf(l,e+1));)this.parts.push({type:"node",index:-1})}}};o(t);for(const e of i)e.parentNode.removeChild(e)}}const p=e=>-1!==e.index,m=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class g{constructor(e,t,n){this._parts=[],this.template=e,this.processor=t,this._getTemplate=n}update(e){let t=0;for(const n of this._parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let n=0,s=0;const i=e=>{const o=document.createTreeWalker(e,133,null,!1);let a=o.nextNode();for(;n<t.length&&null!==a;){const e=t[n];if(p(e))if(s===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this._getTemplate);e.insertAfterNode(a),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(a,e.name,e.strings));n++}else s++,"TEMPLATE"===a.nodeName&&i(a.content),a=o.nextNode();else this._parts.push(void 0),n++}};return i(e),o&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */class v{constructor(e,t,n,s){this.strings=e,this.values=t,this.type=n,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",n=!0;for(let s=0;s<e;s++){const e=this.strings[s];t+=e;const i=e.lastIndexOf(">");!(n=(i>-1||n)&&-1===e.indexOf("<",i+1))&&d&&(t=t.replace(f,(e,t,n,s)=>"style"===n?`${t}style$${s}`:e)),t+=n?u:l}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
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
const b=e=>null===e||!("object"==typeof e||"function"==typeof e);class y{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new x(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let s=0;s<t;s++){n+=e[s];const t=this.parts[s];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)n+="string"==typeof t?t:String(t);else n+="string"==typeof e?e:String(e)}}return n+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===r||b(e)&&e===this.value||(this.value=e,i(e)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const e=this.value;this.value=r,e(this)}this.value!==r&&this.committer.commit()}}class _{constructor(e){this.value=void 0,this._pendingValue=void 0,this.templateFactory=e}appendInto(e){this.startNode=e.appendChild(m()),this.endNode=e.appendChild(m())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=m()),e._insert(this.endNode=m())}insertAfterPart(e){e._insert(this.startNode=m()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;i(this._pendingValue);){const e=this._pendingValue;this._pendingValue=r,e(this)}const e=this._pendingValue;e!==r&&(b(e)?e!==this.value&&this._commitText(e):e instanceof v?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):void 0!==e.then?this._commitPromise(e):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&t.nodeType===Node.TEXT_NODE?t.textContent=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.templateFactory(e);if(this.value&&this.value.template===t)this.value.update(e.values);else{const n=new g(t,e.processor,this.templateFactory),s=n._clone();n.update(e.values),this._commitNode(s),this.value=n}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,s=0;for(const i of e)void 0===(n=t[s])&&(n=new _(this.templateFactory),t.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(t[s-1])),n.setValue(i),n.commit(),s++;s<t.length&&(t.length=s,this.clear(n&&n.endNode))}_commitPromise(e){this.value=e,e.then(t=>{this.value===e&&(this.setValue(t),this.commit())})}clear(e=this.startNode){a(this.startNode.parentNode,e.nextSibling,this.endNode)}}class w{constructor(e,t,n){if(this.value=void 0,this._pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this._pendingValue=e}commit(){for(;i(this._pendingValue);){const e=this._pendingValue;this._pendingValue=r,e(this)}if(this._pendingValue===r)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=r}}class N extends y{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new $(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class $ extends x{}class V{constructor(e,t){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t}setValue(e){this._pendingValue=e}commit(){for(;i(this._pendingValue);){const e=this._pendingValue;this._pendingValue=r,e(this)}this._pendingValue!==r&&(null==this._pendingValue!=(null==this.value)&&(null==this._pendingValue?this.element.removeEventListener(this.eventName,this):this.element.addEventListener(this.eventName,this)),this.value=this._pendingValue,this._pendingValue=r)}handleEvent(e){"function"==typeof this.value?this.value.call(this.element,e):"function"==typeof this.value.handleEvent&&this.value.handleEvent(e)}}
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
 */const T=new class{handleAttributeExpressions(e,t,n){const s=t[0];return"."===s?new N(e,t.slice(1),n).parts:"@"===s?[new V(e,t.slice(1))]:"?"===s?[new w(e,t.slice(1),n)]:new y(e,t,n).parts}handleTextExpression(e){return new _(e)}};
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
 */const A=new Map,E=new WeakMap;
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
 */function I(e,t,n=function(e){let t=A.get(e.type);void 0===t&&(t=new Map,A.set(e.type,t));let n=t.get(e.strings);return void 0===n&&(n=new h(e,e.getTemplateElement()),t.set(e.strings,n)),n}){let s=E.get(t);void 0===s&&(a(t,t.firstChild),E.set(t,s=new _(n)),s.appendInto(t)),s.setValue(e),s.commit()}
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
 */const O=(e,...t)=>new v(e,t,"html",T);gapi.load("client:auth2",()=>{gapi.client.init({apiKey:"AIzaSyAXtETV2s9eaSPC06WVCW3u1eZku0Uh8ic",discoveryDocs:["https://people.googleapis.com/$discovery/rest?version=v1","https://www.googleapis.com/discovery/v1/apis/fusiontables/v2/rest"],clientId:"340312358145-cp3hbrs62fqpduq71voobsv6cqaoa0m0.apps.googleusercontent.com",scope:"profile https://www.googleapis.com/auth/fusiontables https://www.googleapis.com/auth/fusiontables.readonly"}).then(()=>{gapi.auth2.getAuthInstance().isSignedIn.listen(k),k(gapi.auth2.getAuthInstance().isSignedIn.get())})});const k=e=>e?P(location.hash):F(q);var S={};function P(e){F(function(e){const{tableId:t,limit:n,orderBy:s}=e;if(t){const e=s?" order by "+s:"";return async function(e,t){const[n,s,i]=await Promise.all([gapi.client.fusiontables.table.get({tableId:e}),gapi.client.fusiontables.query.sql({sql:"select * "+t}),gapi.client.fusiontables.query.sql({sql:"select ROWID "+t})]);F(B=function(e,t,n){const{name:s,description:i,tableId:o}=e.result,a=L(Object.assign({},j,{title:s,subtitle:i,onRowChanged:function(e){const t=a.tableBody[e],s=n.result.rows[e][0],i=`update ${o} set ${a.tableHead.map((e,n)=>`'${e}' = '${t[n]}'`).join(", ")} where rowid = ${s}`;gapi.client.fusiontables.query.sql({sql:i}).execute(e=>console.debug("After "+i+": "+JSON.stringify(e)))}}),t);return a}(n,s,i))}(t,`from ${t}${e} limit ${n||30}`),M}return async function(){const e="show tables",t=await gapi.client.fusiontables.query.sql({sql:e});F(B=L(Object.assign({},j,{subtitle:e}),t))}(),M}(S=function(e){const t={};return e.replace(/^#/,"").split("&").map(e=>{const n=e.split("=");2==n.length&&(t[n[0]]=decodeURIComponent(n[1]))}),t.tableId?t:{}}(e)))}function C(e){var t="",n="#";for(var s in e)e.hasOwnProperty(s)&&(t+=n+s+"="+encodeURIComponent(e[s]),n="&");return t}window.addEventListener("hashchange",()=>P(location.hash));const j={heading:"Editable FT",menu:[{item:"About",link:"https://github.com/friends-of-fusion-tables/editable-ft"},{item:"Show tables",link:"#"}],tableHead:[],tableBody:[]},M=Object.assign({},j,{subtitle:"Loading..."}),q=Object.assign({},j,{title:"Authorization required",action:{text:"Authorize",click:()=>gapi.auth2.getAuthInstance().signIn()}});var B=M;function L(e,t){const{columns:n,rows:s}=t.result;return e.tableHead=n||[],e.tableBody=s||[],e}var R=!1;function F(e){const t=e.action?function({text:e,click:t}){return O`<button class="pure-button pure-button-primary" @click=${t}>${e}</button>`}(e.action):function(e){return O`
    <table class="pure-table pure-table-bordered">
	   <thead>
       <tr>${e.tableHead.map(function(e){const t=t=>C(Object.assign({},S,{orderBy:`'${e}' ${t}`})),n=S.tableId?["pure-menu-item"]:["hidden"];return O`
<td class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
  <span class="pure-menu-link">${e}</span>
	<ul class="pure-menu-children">
	  <li class=${n}><a href=${t("ASC")} class="pure-menu-link">Order A->Z</a></li>
	  <li class=${n}><a href=${t("DESC")} class="pure-menu-link">Order Z->A</a></li>
	</ul>
</td>`})}</tr>
	   </thead>
     <tbody>
       ${e.tableBody.map(function(t,n){const{editable:s,keydown:i,render:o}=n==W?function({tableBody:e,onRowChanged:t}){return{editable:!0,keydown:function(n){if("Escape"==n.code)W=-1,U();else if("Enter"==n.code){const i=n.target,o=i.closest("tr").cells,a=e[W];for(var s=o.length;--s>=0;)a[s]=o.item(s).textContent;t&&t(W),W=-1,U()}},render:e=>e}}(e):D;return O`<tr @dblclick=${function(e){W=n,U(),e.target.focus()}}>${t.map(e=>(function(e){return O`<td contenteditable=${s} @keydown=${i}>${o(""+e)}</td>`})(e))}</tr>`})}
     </tbody>
    </table>`}(e);function n(){R=!R,U()}I(O`<div id="layout" class=${H("")}>
      <a href="#menu" id="menuLink" class=${H("menu-link")} @click=${n}>
        <span></span>
      </a>

      <div id="menu" class=${H("")}>
        <div class="pure-menu">
          <a class="pure-menu-heading" href="#">${e.heading}</a>

          <ul class="pure-menu-list">
            ${e.menu.map(e=>O`
            <li class="pure-menu-item"><a href=${e.link} class="pure-menu-link">${e.item}</a></li>
            `)}
          </ul>
        </div>
      </div>

      <div id="main">
        <div class="header">
          <h1>${e.title}</h1>
          <h2>${e.subtitle}</h2>
        </div>

        <div class="content" @click=${()=>R&&n()}>${t}</div>
      </div>
    </div>
`,document.body)}const H=e=>R?e+" active":e;const D={editable:!1,keydown(){},render(e){const t=/^(.*)\b([01][\w-]{34,38})\b(.*)$/.exec(e);return t?O`${t[1]}<a href=${C({tableId:t[2]})}>${t[2]}</a>${t[3]}`:e}};var W=-1;const U=()=>F(B);U()}]);
