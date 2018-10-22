let e={};function t(e,t=""){return e?Object.keys(e).filter(e=>e!==t).map(function(t){const n=e[t];return 1===n.length?`'${t}' = '${n[0]}'`:`'${t}' in (${n.map(e=>`'${e}'`).join(",")})`}):[]}function n(e){const t={};return e.replace(/^#/,"").split("&").map(e=>{const n=e.split("=");2===n.length&&(t[n[0]]=JSON.parse(decodeURIComponent(n[1])))}),t.tableId?t:{}}function i(e){return"#"+Object.keys(e).map(t=>`${t}=${(e=>encodeURIComponent(JSON.stringify(e)))(e[t])}`).join("&")}function s(t){return e=n(t)}const r=new WeakMap,a=e=>"function"==typeof e&&r.has(e),o=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,l=(e,t,n=null)=>{let i=t;for(;i!==n;){const t=i.nextSibling;e.removeChild(i),i=t}},c={},u=`{{lit-${String(Math.random()).slice(2)}}}`,p=`\x3c!--${u}--\x3e`,d=new RegExp(`${u}|${p}`),h=(()=>{const e=document.createElement("div");return e.setAttribute("style","{{bad value}}"),"{{bad value}}"!==e.getAttribute("style")})();class m{constructor(e,t){this.parts=[],this.element=t;let n=-1,i=0;const s=[],r=t=>{const a=t.content,o=document.createTreeWalker(a,133,null,!1);let l,c;for(;o.nextNode();){n++,l=c;const t=c=o.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const s=t.attributes;let r=0;for(let e=0;e<s.length;e++)s[e].value.indexOf(u)>=0&&r++;for(;r-- >0;){const s=e.strings[i],r=b.exec(s)[2],a=h&&"style"===r?"style$":/^[a-zA-Z-]*$/.test(r)?r:r.toLowerCase(),o=t.getAttribute(a).split(d);this.parts.push({type:"attribute",index:n,name:r,strings:o}),t.removeAttribute(a),i+=o.length-1}}"TEMPLATE"===t.tagName&&r(t)}else if(3===t.nodeType){const e=t.nodeValue;if(e.indexOf(u)<0)continue;const r=t.parentNode,a=e.split(d),o=a.length-1;i+=o;for(let e=0;e<o;e++)r.insertBefore(""===a[e]?f():document.createTextNode(a[e]),t),this.parts.push({type:"node",index:n++});r.insertBefore(""===a[o]?f():document.createTextNode(a[o]),t),s.push(t)}else if(8===t.nodeType)if(t.nodeValue===u){const e=t.parentNode,r=t.previousSibling;null===r||r!==l||r.nodeType!==Node.TEXT_NODE?e.insertBefore(f(),t):n--,this.parts.push({type:"node",index:n++}),s.push(t),null===t.nextSibling?e.insertBefore(f(),t):n--,c=l,i++}else{let e=-1;for(;-1!==(e=t.nodeValue.indexOf(u,e+1));)this.parts.push({type:"node",index:-1})}}};r(t);for(const e of s)e.parentNode.removeChild(e)}}const g=e=>-1!==e.index,f=()=>document.createComment(""),b=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class y{constructor(e,t,n){this._parts=[],this.template=e,this.processor=t,this._getTemplate=n}update(e){let t=0;for(const n of this._parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let n=0,i=0;const s=e=>{const r=document.createTreeWalker(e,133,null,!1);let a=r.nextNode();for(;n<t.length&&null!==a;){const e=t[n];if(g(e))if(i===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this._getTemplate);e.insertAfterNode(a),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(a,e.name,e.strings));n++}else i++,"TEMPLATE"===a.nodeName&&s(a.content),a=r.nextNode();else this._parts.push(void 0),n++}};return s(e),o&&(document.adoptNode(e),customElements.upgrade(e)),e}}class _{constructor(e,t,n,i){this.strings=e,this.values=t,this.type=n,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",n=!0;for(let i=0;i<e;i++){const e=this.strings[i];t+=e;const s=e.lastIndexOf(">");!(n=(s>-1||n)&&-1===e.indexOf("<",s+1))&&h&&(t=t.replace(b,(e,t,n,i)=>"style"===n?`${t}style$${i}`:e)),t+=n?p:u}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const v=e=>null===e||!("object"==typeof e||"function"==typeof e);class ${constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new N(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let i=0;i<t;i++){n+=e[i];const t=this.parts[i];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)n+="string"==typeof t?t:String(t);else n+="string"==typeof e?e:String(e)}}return n+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===c||v(e)&&e===this.value||(this.value=e,a(e)||(this.committer.dirty=!0))}commit(){for(;a(this.value);){const e=this.value;this.value=c,e(this)}this.value!==c&&this.committer.commit()}}class T{constructor(e){this.value=void 0,this._pendingValue=void 0,this.templateFactory=e}appendInto(e){this.startNode=e.appendChild(f()),this.endNode=e.appendChild(f())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=f()),e._insert(this.endNode=f())}insertAfterPart(e){e._insert(this.startNode=f()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;a(this._pendingValue);){const e=this._pendingValue;this._pendingValue=c,e(this)}const e=this._pendingValue;e!==c&&(v(e)?e!==this.value&&this._commitText(e):e instanceof _?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):void 0!==e.then?this._commitPromise(e):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&t.nodeType===Node.TEXT_NODE?t.textContent=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.templateFactory(e);if(this.value&&this.value.template===t)this.value.update(e.values);else{const n=new y(t,e.processor,this.templateFactory),i=n._clone();n.update(e.values),this._commitNode(i),this.value=n}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,i=0;for(const s of e)void 0===(n=t[i])&&(n=new T(this.templateFactory),t.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(t[i-1])),n.setValue(s),n.commit(),i++;i<t.length&&(t.length=i,this.clear(n&&n.endNode))}_commitPromise(e){this.value=e,e.then(t=>{this.value===e&&(this.setValue(t),this.commit())})}clear(e=this.startNode){l(this.startNode.parentNode,e.nextSibling,this.endNode)}}class E{constructor(e,t,n){if(this.value=void 0,this._pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this._pendingValue=e}commit(){for(;a(this._pendingValue);){const e=this._pendingValue;this._pendingValue=c,e(this)}if(this._pendingValue===c)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=c}}class x extends ${constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new I(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class I extends N{}class O{constructor(e,t){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t}setValue(e){this._pendingValue=e}commit(){for(;a(this._pendingValue);){const e=this._pendingValue;this._pendingValue=c,e(this)}this._pendingValue!==c&&(null==this._pendingValue!=(null==this.value)&&(null==this._pendingValue?this.element.removeEventListener(this.eventName,this):this.element.addEventListener(this.eventName,this)),this.value=this._pendingValue,this._pendingValue=c)}handleEvent(e){"function"==typeof this.value?this.value.call(this.element,e):"function"==typeof this.value.handleEvent&&this.value.handleEvent(e)}}class w{handleAttributeExpressions(e,t,n){const i=t[0];if("."===i){return new x(e,t.slice(1),n).parts}return"@"===i?[new O(e,t.slice(1))]:"?"===i?[new E(e,t.slice(1),n)]:new $(e,t,n).parts}handleTextExpression(e){return new T(e)}}const A=new w;function D(e){let t=S.get(e.type);void 0===t&&(t=new Map,S.set(e.type,t));let n=t.get(e.strings);return void 0===n&&(n=new m(e,e.getTemplateElement()),t.set(e.strings,n)),n}const S=new Map,k=new WeakMap;function M(e,t,n=D){let i=k.get(t);void 0===i&&(l(t,t.firstChild),k.set(t,i=new T(n)),i.appendInto(t)),i.setValue(e),i.commit()}const R=(e,...t)=>new _(e,t,"html",A),V={editable:!1,keydown(){},render(e){const t=/^(.*)\b([01][\w-]{34,42})\b(.*)$/.exec(e);return t?R`${t[1]}<a href=${i({tableId:t[2]})}>${t[2]}</a>${t[3]}`:e}};let j=-1;function C({tableBody:e,onRowChanged:t,redrawPage:n}){return{editable:!0,keydown:function(i){if("Escape"===i.code)j=-1,n();else if("Enter"===i.code){const s=i.target,r=s.closest("tr").cells,a=e[j];for(let e=r.length;--e>=0;)a[e]=r.item(e).textContent;t&&t(j),j=-1,n()}},render:e=>e}}function P(t){return R`
<table class="pure-table pure-table-bordered">
  <thead>
    <tr>${t.tableHead.map(function(n){const s=t=>i(Object.assign({},e,{orderBy:`'${n}' ${t}`})),r=e.tableId?["pure-menu-item"]:["hidden"],a=(e=>e&&e.column===n?e:void 0)(t.filterEditor);return R`
<td class=${["pure-menu-item","pure-menu-has-children",a?"pure-menu-active":"pure-menu-allow-hover"].join(" ")}>
  <span class="pure-menu-link">${n}</span>
  <ul class="pure-menu-children" @keydown=${function(e){a&&"Enter"===e.key&&a.onDone()}}
      style="border:1px solid gray;border-radius:10px">
    <li class=${r}><a href=${s("ASC")} class="pure-menu-link">Order A->Z</a></li>
    <li class=${r}><a href=${s("DESC")} class="pure-menu-link">Order Z->A</a></li>
    <li class=${r}>
      <a href=${a?"":t.editFilterLink(n)} class="pure-menu-link">Filter</a>
    </li>
      ${a?function(e){return R`
<li class="pure-menu-item">
  <button class="pure-menu-link pure-button-primary" @click=${()=>e.onDone()}>Apply filter
  </button>
</li>`}(a):""}
      ${a?function(e){return R`
<li class="pure-menu-item">
  <input class="pure-menu-link" type="text" placeholder="Regular expression" @input=${function(t){e.filterSearch=t.target.value,Ee()}}>
</li>`}(a):""}
      ${a?function(e){return e.filter.map(function(e){return R`
<li class="pure-menu-item">
  <div class="pure-menu-link">
    <input type="checkbox" ?checked=${e.selected} @change=${function(t){e.selected=t.target.checked}}>
    <span>${e.value}</span>
    <span style='float:right'>${e.count}</span>
  </div>
</li>`})}(a):""}
  </ul>
</td>`})}</tr>
  </thead>
  <tbody>
    ${t.tableBody.map(function(e,n){const{editable:i,keydown:s,render:r}=n===j?C(t):V;return R`<tr @dblclick=${function(e){j=n,t.redrawPage(),e.target.focus()}}>${e.map(function(e){return R`<td ?contenteditable=${i} @keydown=${s}>${r(""+e)}</td>`})}</tr>`})}
  </tbody>
</table>`}const L=()=>R``,J=new Event("Item removed"),G=(e,t,n)=>R`
  <textarea class="pure-input-3-4" @change=${e=>{t(JSON.parse(e.target.value)),n(e)}}>${JSON.stringify(e)}
  </textarea>`,H=(e,t,n)=>R`
  <textarea class="pure-input-1-2" @change=${e=>{t(e.target.value.split("\n")),n(e)}}>${(e||[]).join("\n")}</textarea>`,Y=e=>(t,n,i)=>R`
  <input
    type="checkbox"
    class="pure-input"
    ?checked=${t}
    ?readOnly=${!!e.readOnly}
    @change=${e=>{n(e.target.checked),i(e)}}>`,B=e=>(t,n,i)=>R`
  <input
    type="text"
    class="pure-input-1-2"
    value=${t||e.default||0}
    ?readOnly=${!!e.readOnly}
    pattern="^-?\d*\.?\d*$"
    @change=${e=>{n(Number.parseFloat(e.target.value)),i(e)}}>`,F=e=>(t,n,i)=>R`
  <input
    type="text"
    class="pure-input-1-2"
    value=${t}
    ?readOnly=${!!e.readOnly}
    pattern=${e.pattern||".*"}
    minlength=${e.minLength||0}
    maxlength=${e.maxLength||1e6}
    @change=${e=>{n(e.target.value),i(e)}}>`,U=e=>(t,n,i)=>R`
  <select
    class="pure-input-1-2"
    ?readOnly=${!!e.readOnly}
    @change=${e=>{n(e.target.value),i(e)}}>
    ${(e.enum||[]).map(e=>R`<option ?selected=${e===t}>${e}</option>`)}
  </select>`,q=e=>e.enum?U(e):F(e),W=e=>t=>(n,i,s,r)=>e(t(n,i,s,r),r),z=({title:e,description:t},n)=>i=>R`
  <div class="pure-control-group">
    <label>${e}</label>
    ${i}
    <span class="pure-form-message-inline pure-input-1-4">
      <p>${t}</p>${n||""}
    </span>
  </div>`,X=e=>z(e,"Enter one item per line"),Z=e=>t=>R`
    <div class="pure-control-group">
      <label></label>${t}
      <span class="pure-button" style="border-radius:50%" @click=${e}>
            &#x00D7;
      </span>
     </div>`,K=R`&#9662;`,Q=R`&#9656;`,ee=({title:e,description:t,expanded:n})=>(i,s)=>R`
<fieldset>
  <div class=${"pure-button pure-input-1"+(n?" pure-button-active":"")} @click=${()=>{n=!n,s()}}>
  ${e}
  <span class="pure-form-message-inline">${t}</span>
  ${n?K:Q}
  </div>
  <span style=${n?"":"display:none"}>
  ${i}
  </span>
</fieldset>`,te=({title:e,description:t,expanded:n},i)=>(s,r)=>R`
<fieldset>
  <div class=${"pure-button pure-input-3-4"+(n?" pure-button-active":"")} @click=${()=>{n=!n,r()}}>
  ${e}
  <span class="pure-form-message-inline">${t}</span>
  ${n?K:Q}
  </div><span class="pure-button" style="border-radius:50%" @click=${i}>
            &#x00D7;
          </span>
  <span style=${n?"":"display:none"}>
  ${s}
  </span>
</fieldset>`;function ne(e){if(!1===e.display)return L;if(e.customEditor)return e.customEditor;switch(e.type){case"object":return W(ee(e))(t(e));case"array":const n=e;if("string"===n.items.type){const t=n.items;if(!t.enum&&!t.pattern&&!t.readOnly)return W(X(e))(H)}return function(e){const n=e.items;let i=1;const s=e=>te((()=>n.title?n:Object.assign({},n,{title:n.title||"#"+i++}))(),e);return W(ee(e))(r(function e(n){switch(n.type){case"object":const i=t(n);return e=>W(s(e))(i);case"array":const a=r(e(n.items));return e=>W(s(e))(a);default:const o=ie(n);return e=>W(Z(e))(o)}}(n)));function r(e){const t=[];return(i,s,r,a)=>{return R`
        <fieldset>
          ${(i||[]).map(function(n,i,o){t.length<=i&&(t[i]=e(()=>(function(e,n){e.splice(n,1),t.splice(n,1),s(e),r(J),a()})(o,i)));return t[i](n,e=>(function(e,t,n){e[t]=n,s(e)})(o,i,e),r,a)})}
          <div class="pure-control-group">
            <label></label>
            <span class="pure-button" style="border-radius:50%" @click=${function(e){const t=n.default||"";i?(i.push(t),s(i)):s([t]);a(),e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.focus()}}>&#x002B;</span>
          </div>
        </fieldset>`}}}(n);default:return W(z(e))(ie(e))}function t({properties:e}){const t={};return Object.keys(e).forEach(n=>t[n]=ne(((e,t)=>t.title?t:Object.assign({},t,{title:e}))(n,e[n]))),(e,n,i,s)=>{e||(e={});const r=t=>i=>{e[t]=i,n(e)},a={};return R`${Object.keys(t).map(n=>t[n](e[n],r(n),i,s))}
       ${Object.keys(e).filter(e=>!t[e]).map(function(t){return(a[t]||(a[t]=z({title:t})))(G(e[t],r(t),i,s),s)})}`}}}function ie(e){switch(e.type){case"string":return q(e);case"number":return B(e);case"boolean":return Y(e);default:return G}}function se(e,t){return function e(n){if(n.type)switch(n.type){case"object":if(n.properties){const t={};return Object.keys(n.properties).forEach(i=>{const s=e(n.properties[i]);s&&(t[i]=s)}),Object.assign({},n,{properties:t})}break;case"array":if(n.items){const t=e(n.items);if(t)return Object.assign({},n,{items:t})}break;case"string":return n.enum&&1===n.enum.length&&"$columns"===n.enum[0]?Object.assign({},n,{type:"string",enum:t,default:t[0]}):n;case"boolean":case"number":return n}return}(function(){const t=t=>t.replace(/^#./,"").split("/").reduce((e,t)=>e[t],e),n=e=>"object"!=typeof e?e:Object.keys(e).reduce(i,e);return n(e);function i(e,i){if("$ref"!==i)return e[i]=n(e[i]),e;const s=e[i];return delete e[i],Object.assign({},t(s),e)}}())}const re={type:"object",properties:{name:{type:"string",title:"Name"},description:{type:"string",title:"Description"},type:{type:"string",title:"Type",enum:["DATETIME","LOCATION","NUMBER","STRING"]},validValues:{type:"array",description:"List of valid values used to validate data and supply a drop-down list of values in the web application",items:{type:"string"}},validateData:{type:"boolean",description:"If true, data entered via the web application is validated"},baseColumn:{type:"object",display:!1},columnId:{type:"number",title:"Column ID",readOnly:!0},formatPattern:{type:"string",title:"Format pattern",enum:["DT_DATE_MEDIUM","DT_DATE_SHORT","DT_DATE_TIME_MEDIUM","DT_DATE_TIME_SHORT","DT_DAY_MONTH_2_DIGIT_YEAR","DT_DAY_MONTH_2_DIGIT_YEAR_TIME","DT_DAY_MONTH_2_DIGIT_YEAR_TIME_MERIDIAN","DT_DAY_MONTH_4_DIGIT_YEAR","DT_DAY_MONTH_4_DIGIT_YEAR_TIME","DT_DAY_MONTH_4_DIGIT_YEAR_TIME_MERIDIAN","DT_ISO_YEAR_MONTH_DAY","DT_ISO_YEAR_MONTH_DAY_TIME","DT_MONTH_DAY_4_DIGIT_YEAR","DT_TIME_LONG","DT_TIME_MEDIUM","DT_TIME_SHORT","DT_YEAR_ONLY","HIGHLIGHT_UNTYPED_CELLS","NONE","NUMBER_CURRENCY","NUMBER_DEFAULT","NUMBER_INTEGER","NUMBER_NO_SEPARATOR","NUMBER_PERCENT","NUMBER_SCIENTIFIC","STRING_EIGHT_LINE_IMAGE","STRING_FOUR_LINE_IMAGE","STRING_JSON_TEXT","STRING_LINK","STRING_ONE_LINE_IMAGE","STRING_VIDEO_OR_MAP"]},graphPredicate:{type:"string",title:"Column graph predicate",description:"Used to map table to graph data model (subject,predicate,object). See W3C Graph-based Data Model"},columnJsonSchema:{type:"string",title:"Column JSON schema",description:"JSON schema for interpreting column properties JSON"},columnPropertiesJson:{type:"string",title:"Column properties JSON",description:"Custom column properties in JSON format"},kind:{type:"string",display:!1}}},ae=(e,t)=>{t||(t={type:"object",properties:{}});const n=ne(Object.assign({},t,{title:e}));return{type:"string",title:e,customEditor:(e,t,i,s)=>n(JSON.parse(e||"{}"),e=>t(JSON.stringify(e)),i,s)}},oe={type:"object",title:"Table properties",expanded:!0,properties:{name:{type:"string",title:"Name"},description:{title:"Description",description:"Description assigned to the table",type:"string"},tableId:{type:"string",readOnly:!0},attribution:{title:"Attribution",description:"Attribution assigned to the table.",type:"string"},attributionLink:{type:"string",title:"Attribution link"},baseTableIds:{type:"array",display:!1},kind:{type:"string",display:!1},tablePropertiesJson:ae("Custom Properties"),isExportable:{title:"Exportable?",type:"boolean"},columns:{type:"array",title:"Columns",display:!1,items:re},tablePropertiesJsonSchema:ae("Properties Schema"),columnPropertiesJsonSchema:ae("Column Properties Schema")}},le=e=>e.tablePropertiesJsonSchema&&""!=e.tablePropertiesJsonSchema?Object.assign({},oe,{properties:Object.assign({},oe.properties,{tablePropertiesJson:ae("Custom Properties",se(JSON.parse(e.tablePropertiesJsonSchema),(e.columns||[]).map(e=>e.name||"")))})}):oe;var ce,ue;function pe(e){return ce&&ue&&e.table.tableId==ue||(ce=ne(le(e.table)),ue=e.table.tableId),R`
    <div class="pure-form pure-form-aligned">
      ${ce(e.table,function(e){console.log("updated "+JSON.stringify(e))},function(){e.isDirty||(e.isDirty=!0,Ee())},Ee)}
    </div>
    <div class="pure-button-primary pure-button"
      ?disabled=${!e.isDirty}
      @click=${e.saveChanges}>Save changes</div>`}const de={type:"abstract",heading:"Editable FT",menu:[{item:"About",link:"https://github.com/friends-of-fusion-tables/editable-ft"},{item:"Show tables",link:"#"}],tableHead:[],tableBody:[],editFilterLink:()=>"#",routeToPage:e=>window.location.hash=i(e),redrawPage:()=>$e(ge)},he=Object.assign({},de,{type:"loading",subtitle:"Loading..."}),me=Object.assign({},de,{type:"action",title:"Authorization required",action:{text:"Authorize",click:()=>gapi.auth2.getAuthInstance().signIn()}});let ge=he;function fe(t,n,s,r,a,o=de){const{name:l,description:c,tableId:u}=t,p=((t,n)=>t&&n&&n.rows?function(t,n){const i=e.filter||{},s=i[t]||[],r=n.map(function(e){const t=""+e[0],n=s.includes(t);return{value:t,count:e[1],selected:n}});return{column:t,filterSearch:"",onDone:function(){const n=r.filter(e=>e.selected).map(e=>e.value);n.length?i[t]=n:delete i[t];Object.keys(i).length?e.filter=i:delete e.filter;delete e.addFilter,o.routeToPage(e)},get filter(){const e=new RegExp(this.filterSearch,"i");return r.filter(t=>e.test(t.value)).slice(0,20)}}}(t,n.rows):void 0)(r,a),d=Object.assign({},o,{type:"table",title:l,subtitle:c,table:t,filterEditor:p,onRowChanged:function(e){const t=d.tableBody[e],n=s.rows[e][0],i=`update ${u} set ${d.tableHead.map((e,n)=>`'${e}' = '${t[n]}'`).join(", ")} where rowid = ${n}`;gapi.client.fusiontables.query.sql({sql:i}).execute(e=>console.debug("After "+i+": "+JSON.stringify(e)))},editFilterLink:function(t){return i(Object.assign({},e,{addFilter:t}))}});return d.menu=[...d.menu,{item:"Metadata",link:i({tableId:u,meta:[]})}],ge=_e(d,n)}function be(e,t=de){const{name:n,description:i}=e,s=e.tableId,r=Object.assign({},t,{type:"meta",title:n,subtitle:i,table:e,saveChanges:function(){r.isDirty&&gapi.client.fusiontables.table.update({tableId:s,resource:e}).execute(n=>{console.log("Update metadata response "+JSON.stringify(n)),r.feedback=n.statusText,r.isDirty=!1,r.title=e.name,r.subtitle=e.description,t.redrawPage()})}});return ge=r,r}function ye(e,t,n=de){return ge=_e(Object.assign({},n,{subtitle:e}),t)}function _e(e,{columns:t,rows:n}){return e.tableHead=t||[],e.tableBody=n||[],e}let ve=!1;function $e(e){function t(){ve=!ve,e.redrawPage()}M(R`<div id="layout" class=${Ne("")}>
      <a href="#menu" id="menuLink" class=${Ne("menu-link")} @click=${t}>
        <span></span>
      </a>

      <div id="menu" class=${Ne("")}>
        <div class="pure-menu">
          <a class="pure-menu-heading" href="#">${e.heading}</a>

          <ul class="pure-menu-list">
            ${e.menu.map(e=>R`
            <li class="pure-menu-item"><a href=${e.link} class="pure-menu-link">${e.item}</a></li>
            `)}
          </ul>
        </div>
      </div>

      <div id="main">
        <div class="header">
        <span>${e.feedback}</span>
          <h1>${e.title}</h1>
          <h2>${e.subtitle}</h2>
        </div>

        <div class="content" @click=${()=>ve&&t()}>${function(){switch(e.type){case"action":return Te(e.action);case"meta":return pe(e);case"table":default:return P(e)}}()}</div>
      </div>
    </div>
`,document.body)}const Ne=e=>ve?e+" active":e;function Te({text:e,click:t}){return R`<button class="pure-button pure-button-primary" @click=${t}>${e}</button>`}const Ee=()=>$e(ge);gapi.load("client:auth2",()=>{gapi.client.init({apiKey:"AIzaSyAXtETV2s9eaSPC06WVCW3u1eZku0Uh8ic",discoveryDocs:["https://people.googleapis.com/$discovery/rest?version=v1","https://www.googleapis.com/discovery/v1/apis/fusiontables/v2/rest"],clientId:"340312358145-7kum53te698am4dlopel4ea6j8fqqq79.apps.googleusercontent.com",scope:["profile https://www.googleapis.com/auth/fusiontables","https://www.googleapis.com/auth/fusiontables.readonly"].join(" ")}).then(()=>{gapi.auth2.getAuthInstance().isSignedIn.listen(xe),xe(gapi.auth2.getAuthInstance().isSignedIn.get())})});const xe=e=>e?Ie(location.hash):$e(me);function Ie(e){$e(Oe(s(e)))}function Oe(e){const{tableId:n,limit:i,orderBy:s,addFilter:r,meta:a}=e;if(n){return async function(e,t){const[n,i,s,l]=await Promise.all([gapi.client.fusiontables.table.get({tableId:e}),c("select * "+t),c("select ROWID "+t),function(){const t=o(r);return r?c(`select '${r}', count() from ${e}${t} group by '${r}'`):{}}()]);function c(e){return gapi.client.fusiontables.query.sql({sql:e})}$e(a?be(n.result):fe(n.result,i.result,s.result,r,r?l.result:void 0))}(n,`from ${n}${o()}${s?" order by "+s:""} limit ${i||30}`),he;function o(n){const i=t(e.filter,n);return i.length?" where "+i.join(" and "):""}}return async function(){const e="show tables",t=await gapi.client.fusiontables.query.sql({sql:e});$e(ye(e,t.result))}(),he}window.addEventListener("hashchange",()=>Ie(location.hash)),$e(ge);
