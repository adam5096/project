import{d as v,h as r,s as R,o,f as p,m as a,t as k,n as h,_ as C,a as T,e as l,F as g,q as D,v as m,w as n,x as w,g as e,r as x,y as X,T as Y,z as Z,b as z,A as ee,B as te,u as O,C as ne,j as F,D as N,p as oe,k as le}from"./index-nEBEK9n6.js";import{u as I}from"./setting-ciC8X26n.js";const ae={key:0,class:"logo"},se=["src"],ce={name:"Logo"},re=v({...ce,setup(d){return(c,s)=>r(R).logoHidden?(o(),p("div",ae,[a("img",{src:r(R).logo,alt:"logo圖示 "},null,8,se),a("p",null,k(r(R).title),1)])):h("",!0)}}),ue=C(re,[["__scopeId","data-v-80fa9984"]]),_e={class:"el-menu-demo"},de={name:"Menu"},ie=v({...de,props:["menuList"],setup(d){let c=T();const s=f=>{c.push(f.index)};return(f,_)=>{const u=l("el-icon"),i=l("el-menu-item"),b=l("Menu"),y=l("el-sub-menu");return o(),p("div",_e,[(o(!0),p(g,null,D(d.menuList,t=>(o(),p(g,{key:t.path},[t.children?h("",!0):(o(),p(g,{key:0},[t.meta.hidden?h("",!0):(o(),m(i,{key:0,index:t.path,onClick:s},{title:n(()=>[a("span",null,k(t.meta.title),1)]),default:n(()=>[e(u,null,{default:n(()=>[(o(),m(w(t.meta.icon)))]),_:2},1024)]),_:2},1032,["index"]))],64)),t.children&&t.children.length==1?(o(),p(g,{key:1},[t.children[0].meta.hidden?h("",!0):(o(),m(i,{key:0,index:t.children[0].path,onClick:s},{title:n(()=>[a("span",null,k(t.children[0].meta.title),1)]),default:n(()=>[e(u,null,{default:n(()=>[(o(),m(w(t.children[0].meta.icon)))]),_:2},1024)]),_:2},1032,["index"]))],64)):h("",!0),t.children&&t.children.length>1?(o(),m(y,{key:2,index:t.path},{title:n(()=>[e(u,null,{default:n(()=>[(o(),m(w(t.meta.icon)))]),_:2},1024),a("span",null,k(t.meta.title),1)]),default:n(()=>[e(b,{menuList:t.children},null,8,["menuList"])]),_:2},1032,["index"])):h("",!0)],64))),128))])}}}),me=C(ie,[["__scopeId","data-v-d2730d78"]]),pe={name:"Main"},fe=v({...pe,setup(d){let c=I(),s=x(!0);return X(()=>c.refsh,()=>{s.value=!1,Z(()=>{s.value=!0})}),(f,_)=>{const u=l("router-view");return o(),m(u,null,{default:n(({Component:i})=>[e(Y,{name:"fade"},{default:n(()=>[r(s)?(o(),m(w(i),{key:0})):h("",!0)]),_:2},1024)]),_:1})}}}),he=C(fe,[["__scopeId","data-v-8389a509"]]),ge={name:"Breadcrumb"},ve=v({...ge,setup(d){let c=I(),s=z();const f=()=>{c.fold=!c.fold};return(_,u)=>{const i=l("el-icon"),b=l("el-breadcrumb-item"),y=l("el-breadcrumb");return o(),p(g,null,[e(i,{style:{"margin-right":"10px"},onClick:f},{default:n(()=>[(o(),m(w(r(c).fold?"Fold":"Expand")))]),_:1}),e(y,{"separator-icon":"ArrowRight"},{default:n(()=>[(o(!0),p(g,null,D(r(s).matched,(t,S)=>te((o(),m(b,{key:S,to:t.path},{default:n(()=>[e(i,null,{default:n(()=>[(o(),m(w(t.meta.icon)))]),_:2},1024),a("span",null,k(t.meta.title),1)]),_:2},1032,["to"])),[[ee,t.meta.title]])),128))]),_:1})],64)}}}),be=["src"],ye={class:"el-dropdown-link"},ke={name:"Setting"},we=v({...ke,setup(d){let c=O(),s=T(),f=z(),_=x(!1),u=I();const i=()=>{u.refsh=!u.refsh},b=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()},y=async()=>{await c.userLogout(),s.push({path:"/login",query:{redirect:f.path}})},t=x("rgba(255, 69, 0, 0.68)"),S=x(["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585","rgba(255, 69, 0, 0.68)","rgb(255, 120, 0)","hsv(51, 100, 98)","hsva(120, 40, 94, 0.5)","hsl(181, 100%, 37%)","hsla(209, 100%, 56%, 0.73)","#c7158577"]),q=()=>{let $=document.documentElement;_.value?$.className="dark":$.className=""},U=()=>{document.documentElement.style.setProperty("--el-color-primary",t.value)};return($,L)=>{const M=l("el-button"),A=l("el-color-picker"),E=l("el-form-item"),j=l("el-switch"),H=l("el-form"),P=l("el-popover"),G=l("arrow-down"),J=l("el-icon"),K=l("el-dropdown-item"),Q=l("el-dropdown-menu"),W=l("el-dropdown");return o(),p(g,null,[e(M,{size:"large",icon:"Refresh",circle:"",onClick:i}),e(M,{size:"large",icon:"FullScreen",circle:"",onClick:b}),e(P,{placement:"bottom",title:"主題設定",width:300,trigger:"click"},{reference:n(()=>[e(M,{size:"large",icon:"Setting",circle:""})]),default:n(()=>[e(H,null,{default:n(()=>[e(E,{label:"主題顏色"},{default:n(()=>[e(A,{onChange:U,size:"small",modelValue:t.value,"onUpdate:modelValue":L[0]||(L[0]=V=>t.value=V),"show-alpha":"",predefine:S.value},null,8,["modelValue","predefine"])]),_:1}),e(E,{label:"暗黑模式"},{default:n(()=>[e(j,{onChange:q,modelValue:r(_),"onUpdate:modelValue":L[1]||(L[1]=V=>ne(_)?_.value=V:_=V),"inline-prompt":"",size:"small","active-icon":"Moon","inactive-icon":"Sunny"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),a("img",{src:r(c).avatar,style:{width:"40px",height:"40px",margin:"0px 10px","border-radius":"50%"}},null,8,be),e(W,null,{dropdown:n(()=>[e(Q,null,{default:n(()=>[e(K,{onClick:y},{default:n(()=>[F("退出後台")]),_:1})]),_:1})]),default:n(()=>[a("span",ye,[F(k(r(c).username)+" ",1),e(J,{class:"el-icon--right"},{default:n(()=>[e(G)]),_:1})])]),_:1})],64)}}}),xe={class:"tabbar"},Se={class:"tabbar_left"},$e={class:"tabbar_right"},Ce={name:"Tabbar"},Le=v({...Ce,setup(d){return(c,s)=>(o(),p("div",xe,[a("div",Se,[e(ve)]),a("div",$e,[e(we)])]))}}),Ve=C(Le,[["__scopeId","data-v-6e0309c7"]]),B=d=>(oe("data-v-e1d1cfba"),d=d(),le(),d),Ie={class:"layout_container"},Me={class:"layout_slider"},Re=B(()=>a("div",{class:"ham-dash"},null,-1)),ze=B(()=>a("div",{class:"ham-dash"},null,-1)),Be=B(()=>a("div",{class:"ham-dash"},null,-1)),Ee=[Re,ze,Be],Fe={name:"Layout"},Ne=v({...Fe,setup(d){let c=O(),s=I(),f=z(),_=x(),u=x(!0);const i=()=>{u.value=!u.value,u.value?_.value.style.display="none":_.value.style.display="block"};return(b,y)=>{const t=l("el-menu"),S=l("el-scrollbar");return o(),p("div",Ie,[a("div",Me,[e(ue),e(S,{class:"scrollbar"},{default:n(()=>[a("div",{class:"elmenu",ref_key:"elmenu",ref:_},[e(t,{collapse:!!r(s).fold,"default-active":r(f).path,"background-color":"#001529","text-color":"white"},{default:n(()=>[e(me,{menuList:r(c).menuRoutes},null,8,["menuList"])]),_:1},8,["collapse","default-active"])],512),a("section",{class:"mmenu"},[a("button",{id:"hamburger-button",class:"ham",onClick:i},Ee)])]),_:1})]),a("div",{class:N(["layout_tabbar",{fold:!!r(s).fold}])},[e(Ve)],2),a("div",{class:N(["layout_main",{fold:!!r(s).fold}])},[e(he)],2)])}}}),Oe=C(Ne,[["__scopeId","data-v-e1d1cfba"]]);export{Oe as default};