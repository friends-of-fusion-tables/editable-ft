!function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var i={};function s(e){var t="",n="#";for(var i in e)e.hasOwnProperty(i)&&(t+=n+i+"="+encodeURIComponent(JSON.stringify(e[i])),n="&");return t}function o(e){return i=function(e){const t={};return e.replace(/^#/,"").split("&").map(e=>{const n=e.split("=");2==n.length&&(t[n[0]]=JSON.parse(decodeURIComponent(n[1])))}),t.tableId?t:{}}(e)}const r={heading:"Editable FT",menu:[{item:"About",link:"https://github.com/friends-of-fusion-tables/editable-ft"},{item:"Show tables",link:"#"}],tableHead:[],tableBody:[],editFilterLink:()=>"#"},l=Object.assign({},r,{subtitle:"Loading..."}),a=Object.assign({},r,{title:"Authorization required",action:{text:"Authorize",click:()=>gapi.auth2.getAuthInstance().signIn()}});var u=l;function c(e,{columns:t,rows:n}){return e.tableHead=t||[],e.tableBody=n||[],e}
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
 */const d=new WeakMap,h=e=>"function"==typeof e&&d.has(e),p=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,m=(e,t,n=null)=>{let i=t;for(;i!==n;){const t=i.nextSibling;e.removeChild(i),i=t}},f={},g=`{{lit-${String(Math.random()).slice(2)}}}`,v=`\x3c!--${g}--\x3e`,b=new RegExp(`${g}|${v}`),y=(()=>{const e=document.createElement("div");return e.setAttribute("style","{{bad value}}"),"{{bad value}}"!==e.getAttribute("style")})();class x{constructor(e,t){this.parts=[],this.element=t;let n=-1,i=0;const s=[],o=t=>{const r=t.content,l=document.createTreeWalker(r,133,null,!1);let a,u;for(;l.nextNode();){n++,a=u;const t=u=l.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const s=t.attributes;let o=0;for(let e=0;e<s.length;e++)s[e].value.indexOf(g)>=0&&o++;for(;o-- >0;){const s=e.strings[i],o=w.exec(s)[2],r=y&&"style"===o?"style$":/^[a-zA-Z-]*$/.test(o)?o:o.toLowerCase(),l=t.getAttribute(r).split(b);this.parts.push({type:"attribute",index:n,name:o,strings:l}),t.removeAttribute(r),i+=l.length-1}}"TEMPLATE"===t.tagName&&o(t)}else if(3===t.nodeType){const e=t.nodeValue;if(e.indexOf(g)<0)continue;const o=t.parentNode,r=e.split(b),l=r.length-1;i+=l;for(let e=0;e<l;e++)o.insertBefore(""===r[e]?_():document.createTextNode(r[e]),t),this.parts.push({type:"node",index:n++});o.insertBefore(""===r[l]?_():document.createTextNode(r[l]),t),s.push(t)}else if(8===t.nodeType)if(t.nodeValue===g){const e=t.parentNode,o=t.previousSibling;null===o||o!==a||o.nodeType!==Node.TEXT_NODE?e.insertBefore(_(),t):n--,this.parts.push({type:"node",index:n++}),s.push(t),null===t.nextSibling?e.insertBefore(_(),t):n--,u=a,i++}else{let e=-1;for(;-1!==(e=t.nodeValue.indexOf(g,e+1));)this.parts.push({type:"node",index:-1})}}};o(t);for(const e of s)e.parentNode.removeChild(e)}}const $=e=>-1!==e.index,_=()=>document.createComment(""),w=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class N{constructor(e,t,n){this._parts=[],this.template=e,this.processor=t,this._getTemplate=n}update(e){let t=0;for(const n of this._parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=p?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let n=0,i=0;const s=e=>{const o=document.createTreeWalker(e,133,null,!1);let r=o.nextNode();for(;n<t.length&&null!==r;){const e=t[n];if($(e))if(i===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this._getTemplate);e.insertAfterNode(r),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(r,e.name,e.strings));n++}else i++,"TEMPLATE"===r.nodeName&&s(r.content),r=o.nextNode();else this._parts.push(void 0),n++}};return s(e),p&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */class V{constructor(e,t,n,i){this.strings=e,this.values=t,this.type=n,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",n=!0;for(let i=0;i<e;i++){const e=this.strings[i];t+=e;const s=e.lastIndexOf(">");!(n=(s>-1||n)&&-1===e.indexOf("<",s+1))&&y&&(t=t.replace(w,(e,t,n,i)=>"style"===n?`${t}style$${i}`:e)),t+=n?v:g}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
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
const k=e=>null===e||!("object"==typeof e||"function"==typeof e);class T{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new A(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let i=0;i<t;i++){n+=e[i];const t=this.parts[i];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)n+="string"==typeof t?t:String(t);else n+="string"==typeof e?e:String(e)}}return n+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class A{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||k(e)&&e===this.value||(this.value=e,h(e)||(this.committer.dirty=!0))}commit(){for(;h(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class E{constructor(e){this.value=void 0,this._pendingValue=void 0,this.templateFactory=e}appendInto(e){this.startNode=e.appendChild(_()),this.endNode=e.appendChild(_())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=_()),e._insert(this.endNode=_())}insertAfterPart(e){e._insert(this.startNode=_()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;h(this._pendingValue);){const e=this._pendingValue;this._pendingValue=f,e(this)}const e=this._pendingValue;e!==f&&(k(e)?e!==this.value&&this._commitText(e):e instanceof V?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):void 0!==e.then?this._commitPromise(e):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&t.nodeType===Node.TEXT_NODE?t.textContent=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.templateFactory(e);if(this.value&&this.value.template===t)this.value.update(e.values);else{const n=new N(t,e.processor,this.templateFactory),i=n._clone();n.update(e.values),this._commitNode(i),this.value=n}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,i=0;for(const s of e)void 0===(n=t[i])&&(n=new E(this.templateFactory),t.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(t[i-1])),n.setValue(s),n.commit(),i++;i<t.length&&(t.length=i,this.clear(n&&n.endNode))}_commitPromise(e){this.value=e,e.then(t=>{this.value===e&&(this.setValue(t),this.commit())})}clear(e=this.startNode){m(this.startNode.parentNode,e.nextSibling,this.endNode)}}class O{constructor(e,t,n){if(this.value=void 0,this._pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this._pendingValue=e}commit(){for(;h(this._pendingValue);){const e=this._pendingValue;this._pendingValue=f,e(this)}if(this._pendingValue===f)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=f}}class S extends T{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new I(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class I extends A{}class j{constructor(e,t){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t}setValue(e){this._pendingValue=e}commit(){for(;h(this._pendingValue);){const e=this._pendingValue;this._pendingValue=f,e(this)}this._pendingValue!==f&&(null==this._pendingValue!=(null==this.value)&&(null==this._pendingValue?this.element.removeEventListener(this.eventName,this):this.element.addEventListener(this.eventName,this)),this.value=this._pendingValue,this._pendingValue=f)}handleEvent(e){"function"==typeof this.value?this.value.call(this.element,e):"function"==typeof this.value.handleEvent&&this.value.handleEvent(e)}}
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
 */const P=new class{handleAttributeExpressions(e,t,n){const i=t[0];return"."===i?new S(e,t.slice(1),n).parts:"@"===i?[new j(e,t.slice(1))]:"?"===i?[new O(e,t.slice(1),n)]:new T(e,t,n).parts}handleTextExpression(e){return new E(e)}};
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
 */const C=new Map,F=new WeakMap;
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
 */function L(e,t,n=function(e){let t=C.get(e.type);void 0===t&&(t=new Map,C.set(e.type,t));let n=t.get(e.strings);return void 0===n&&(n=new x(e,e.getTemplateElement()),t.set(e.strings,n)),n}){let i=F.get(t);void 0===i&&(m(t,t.firstChild),F.set(t,i=new E(n)),i.appendInto(t)),i.setValue(e),i.commit()}
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
 */const M=(e,...t)=>new V(e,t,"html",P),q={editable:!1,keydown(){},render(e){const t=/^(.*)\b([01][\w-]{34,42})\b(.*)$/.exec(e);return t?M`${t[1]}<a href=${s({tableId:t[2]})}>${t[2]}</a>${t[3]}`:e}};var B=-1;function R(e){return M`
    <table class="pure-table pure-table-bordered">
	   <thead>
       <tr>${e.tableHead.map(function(t){const n=e=>s(Object.assign({},i,{orderBy:`'${t}' ${e}`})),o=i.tableId?["pure-menu-item"]:["hidden"],r=function(e){return e&&e.column==t?e:void 0}(e.filterEditor);return M` 
<td class=${["pure-menu-item","pure-menu-has-children",r?"pure-menu-active":"pure-menu-allow-hover"].join(" ")}>
  <span class="pure-menu-link">${t}</span>
	<ul class="pure-menu-children" @keydown=${function(e){r&&"Enter"==e.key&&r.onDone()}}>
	  <li class=${o}><a href=${n("ASC")} class="pure-menu-link">Order A->Z</a></li>
	  <li class=${o}><a href=${n("DESC")} class="pure-menu-link">Order Z->A</a></li>
	  <li class=${o}>
	    <a href=${e.editFilterLink(t)} class="pure-menu-link">Filter</a> 
	  </li>
	  ${r?function(e){return e.filters.map(function(e){return M`
     <li class="pure-menu-item">
       <input type="checkbox" ?checked=${e.selected} @change=${function(t){e.selected=t.target.checked}}>
       <span>${e.value}</span>
       <span style='float:right'>${e.count}</span>
     </li>`})}(r):""}
	</ul>
</td>`})}</tr>
	   </thead>
     <tbody>
       ${e.tableBody.map(function(t,n){const{editable:i,keydown:s,render:o}=n==B?function({tableBody:e,onRowChanged:t}){return{editable:!0,keydown:function(n){if("Escape"==n.code)B=-1,z();else if("Enter"==n.code){const s=n.target,o=s.closest("tr").cells,r=e[B];for(var i=o.length;--i>=0;)r[i]=o.item(i).textContent;t&&t(B),B=-1,z()}},render:e=>e}}(e):q;return M`<tr @dblclick=${function(e){B=n,z(),e.target.focus()}}>${t.map(e=>(function(e){return M`<td contenteditable=${i} @keydown=${s}>${o(""+e)}</td>`})(e))}</tr>`})}
     </tbody>
    </table>`}var W=!1;function D(e){const t=e.action?function({text:e,click:t}){return M`<button class="pure-button pure-button-primary" @click=${t}>${e}</button>`}(e.action):R(e);function n(){W=!W,z()}L(M`<div id="layout" class=${H("")}>
      <a href="#menu" id="menuLink" class=${H("menu-link")} @click=${n}>
        <span></span>
      </a>

      <div id="menu" class=${H("")}>
        <div class="pure-menu">
          <a class="pure-menu-heading" href="#">${e.heading}</a>

          <ul class="pure-menu-list">
            ${e.menu.map(e=>M`
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
`,document.body)}const H=e=>W?e+" active":e;const z=()=>D(u);gapi.load("client:auth2",()=>{gapi.client.init({apiKey:"AIzaSyAXtETV2s9eaSPC06WVCW3u1eZku0Uh8ic",discoveryDocs:["https://people.googleapis.com/$discovery/rest?version=v1","https://www.googleapis.com/discovery/v1/apis/fusiontables/v2/rest"],clientId:"340312358145-7kum53te698am4dlopel4ea6j8fqqq79.apps.googleusercontent.com",scope:"profile https://www.googleapis.com/auth/fusiontables https://www.googleapis.com/auth/fusiontables.readonly"}).then(()=>{gapi.auth2.getAuthInstance().isSignedIn.listen(Z),Z(gapi.auth2.getAuthInstance().isSignedIn.get())})});const Z=e=>e?J(location.hash):D(a);function J(e){D(function(e){const{tableId:t,limit:n,orderBy:o,addFilter:a}=e;if(t){const h=d(),p=o?" order by "+o:"";return async function(e,t){const[n,o,l,h]=await Promise.all([gapi.client.fusiontables.table.get({tableId:e}),p("select * "+t),p("select ROWID "+t),function(){const t=d(a);return a?p(`select '${a}', count() from ${e}${t} group by '${a}'`):{}}()]);function p(e){return gapi.client.fusiontables.query.sql({sql:e})}D(function({name:e,description:t,tableId:n},o,l,a,d){return u=function(){const u=a?function(e){const t=i.filter||{},n=t[e]||[],o=d.rows.map(function(e){const t=""+e[0],i=n.includes(t);return{value:t,count:e[1],selected:i}});return{column:e,filters:o,onDone:function(){const n=o.filter(e=>e.selected).map(e=>e.value);n.length?t[e]=n:delete t[e],Object.keys(t).length?i.filter=t:delete i.filter,delete i.addFilter,window.location.hash=s(i)}}}(a):void 0,h=Object.assign({},r,{title:e,subtitle:t,filterEditor:u,onRowChanged:function(e){const t=h.tableBody[e],i=l.rows[e][0],s=`update ${n} set ${h.tableHead.map((e,n)=>`'${e}' = '${t[n]}'`).join(", ")} where rowid = ${i}`;gapi.client.fusiontables.query.sql({sql:s}).execute(e=>console.debug("After "+s+": "+JSON.stringify(e)))},editFilterLink:function(e){return s(Object.assign({},i,{addFilter:e}))}});return c(h,o)}()}(n.result,o.result,l.result,a,a?h.result:void 0))}(t,`from ${t}${h}${p} limit ${n||30}`),l;function d(t){const n=function(e,t=""){return e?Object.keys(e).filter(e=>e!=t).map(function(t){const n=e[t];return 1==n.length?`'${t}' = '${n[0]}'`:`'${t}' in (${n.map(e=>`'${e}'`)})`}):[]}(e.filter,t);return n.length?" where "+n.join(" and "):""}}return async function(){const e="show tables",t=await gapi.client.fusiontables.query.sql({sql:e});D(function(e,t){return u=c(Object.assign({},r,{subtitle:e}),t)}(e,t.result))}(),l}(o(e)))}window.addEventListener("hashchange",()=>J(location.hash)),z()}]);
