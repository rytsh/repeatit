function $(){}function J(t,e){for(const n in e)t[n]=e[n];return t}function D(t){return t()}function T(){return Object.create(null)}function p(t){t.forEach(D)}function P(t){return typeof t=="function"}function at(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function K(t){return Object.keys(t).length===0}function W(t,...e){if(t==null)return $;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function ft(t){let e;return W(t,n=>e=n)(),e}function dt(t,e,n){t.$$.on_destroy.push(W(e,n))}function _t(t,e,n,i){if(t){const r=B(t,e,n,i);return t[0](r)}}function B(t,e,n,i){return t[1]&&i?J(n.ctx.slice(),t[1](i(e))):n.ctx}function ht(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],o=Math.max(e.dirty.length,r.length);for(let l=0;l<o;l+=1)u[l]=e.dirty[l]|r[l];return u}return e.dirty|r}return e.dirty}function mt(t,e,n,i,r,u){if(r){const o=B(e,n,i,u);t.p(o,r)}}function pt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function yt(t){return t==null?"":t}let v=!1;function Q(){v=!0}function U(){v=!1}function V(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function X(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let c=0;c<e.length;c++){const f=e[c];f.claim_order!==void 0&&s.push(f)}e=s}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let s=0;s<e.length;s++){const c=e[s].claim_order,f=(r>0&&e[n[r]].claim_order<=c?r+1:V(1,r,y=>e[n[y]].claim_order,c))-1;i[s]=n[f]+1;const a=f+1;n[a]=s,r=Math.max(a,r)}const u=[],o=[];let l=e.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(u.push(e[s-1]);l>=s;l--)o.push(e[l]);l--}for(;l>=0;l--)o.push(e[l]);u.reverse(),o.sort((s,c)=>s.claim_order-c.claim_order);for(let s=0,c=0;s<o.length;s++){for(;c<u.length&&o[s].claim_order>=u[c].claim_order;)c++;const f=c<u.length?u[c]:null;t.insertBefore(o[s],f)}}function Y(t,e){t.appendChild(e)}function Z(t,e){if(v){for(X(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function gt(t,e,n){v&&!n?Z(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function H(t){t.parentNode.removeChild(t)}function bt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function L(t){return document.createElement(t)}function tt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S(t){return document.createTextNode(t)}function xt(){return S(" ")}function wt(){return S("")}function k(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function $t(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function vt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function et(t){return Array.from(t.childNodes)}function nt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function O(t,e,n,i,r=!1){nt(t);const u=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const l=t[o];if(e(l)){const s=n(l);return s===void 0?t.splice(o,1):t[o]=s,r||(t.claim_info.last_index=o),l}}for(let o=t.claim_info.last_index-1;o>=0;o--){const l=t[o];if(e(l)){const s=n(l);return s===void 0?t.splice(o,1):t[o]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=o,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function q(t,e,n,i){return O(t,r=>r.nodeName===e,r=>{const u=[];for(let o=0;o<r.attributes.length;o++){const l=r.attributes[o];n[l.name]||u.push(l.name)}u.forEach(o=>r.removeAttribute(o))},()=>i(e))}function Et(t,e,n){return q(t,e,n,L)}function At(t,e,n){return q(t,e,n,tt)}function it(t,e){return O(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>S(e),!0)}function Nt(t){return it(t," ")}function St(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Ct(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function jt(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}function Tt(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}let g;function rt(){if(g===void 0){g=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{g=!0}}return g}function kt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=L("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=rt();let u;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",u=k(window,"message",o=>{o.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{u=k(i.contentWindow,"resize",e)}),Y(t,i),()=>{(r||u&&i.contentWindow)&&u(),H(i)}}function Mt(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const u=r.textContent.trim();u===`HEAD_${t}_END`?(i-=1,n.push(r)):u===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function zt(t,e){return new t(e)}let m;function h(t){m=t}function I(){if(!m)throw new Error("Function called outside component initialization");return m}function Dt(t){I().$$.on_mount.push(t)}function Pt(t){I().$$.after_update.push(t)}const _=[],M=[],x=[],z=[],F=Promise.resolve();let A=!1;function R(){A||(A=!0,F.then(G))}function Wt(){return R(),F}function N(t){x.push(t)}const E=new Set;let b=0;function G(){const t=m;do{for(;b<_.length;){const e=_[b];b++,h(e),ot(e.$$)}for(h(null),_.length=0,b=0;M.length;)M.pop()();for(let e=0;e<x.length;e+=1){const n=x[e];E.has(n)||(E.add(n),n())}x.length=0}while(_.length);for(;z.length;)z.pop()();A=!1,E.clear(),h(t)}function ot(t){if(t.fragment!==null){t.update(),p(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}const w=new Set;let d;function Bt(){d={r:0,c:[],p:d}}function Ht(){d.r||p(d.c),d=d.p}function st(t,e){t&&t.i&&(w.delete(t),t.i(e))}function Lt(t,e,n,i){if(t&&t.o){if(w.has(t))return;w.add(t),d.c.push(()=>{w.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Ot(t){t&&t.c()}function qt(t,e){t&&t.l(e)}function ct(t,e,n,i){const{fragment:r,after_update:u}=t.$$;r&&r.m(e,n),i||N(()=>{const o=t.$$.on_mount.map(D).filter(P);t.$$.on_destroy?t.$$.on_destroy.push(...o):p(o),t.$$.on_mount=[]}),u.forEach(N)}function ut(t,e){const n=t.$$;n.fragment!==null&&(p(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function lt(t,e){t.$$.dirty[0]===-1&&(_.push(t),R(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function It(t,e,n,i,r,u,o,l=[-1]){const s=m;h(t);const c=t.$$={fragment:null,ctx:[],props:u,update:$,not_equal:r,bound:T(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:T(),dirty:l,skip_bound:!1,root:e.target||s.$$.root};o&&o(c.root);let f=!1;if(c.ctx=n?n(t,e.props||{},(a,y,...C)=>{const j=C.length?C[0]:y;return c.ctx&&r(c.ctx[a],c.ctx[a]=j)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](j),f&&lt(t,a)),y}):[],c.update(),f=!0,p(c.before_update),c.fragment=i?i(c.ctx):!1,e.target){if(e.hydrate){Q();const a=et(e.target);c.fragment&&c.fragment.l(a),a.forEach(H)}else c.fragment&&c.fragment.c();e.intro&&st(t.$$.fragment),ct(t,e.target,e.anchor,e.customElement),U(),G()}h(s)}class Ft{$destroy(){ut(this,1),this.$destroy=$}$on(e,n){if(!P(n))return $;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!K(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Wt as A,$ as B,W as C,p as D,P as E,_t as F,Mt as G,Z as H,mt as I,pt as J,ht as K,dt as L,tt as M,At as N,yt as O,ft as P,k as Q,$t as R,Ft as S,N as T,jt as U,bt as V,Tt as W,M as X,kt as Y,xt as a,gt as b,Nt as c,Ht as d,wt as e,st as f,Bt as g,H as h,It as i,Pt as j,L as k,Et as l,et as m,vt as n,Dt as o,Ct as p,S as q,it as r,at as s,Lt as t,St as u,zt as v,Ot as w,qt as x,ct as y,ut as z};