import{d as T,M as H,r as N,c as K,y as R,N as G,H as Q,e as i,o as y,f as k,g as e,h as r,w as l,j as m,F as W,t as L,v as A,q as X,m as z,A as I,B,z as O,O as Y,K as f,P as Z}from"./index-nEBEK9n6.js";const ee=["onClick"],le=T({__name:"index",setup(te){let p=H(),v=N([]),u=N(0),t=K({attrName:"",attrValueList:[],categoryId:"",categoryLevel:3}),b=N([]);R(()=>p.c3Id,()=>{v.value=[],p.c3Id&&V()});const V=async()=>{const{c1Id:s,c2Id:o,c3Id:g}=p;let n=await G(s,o,g);n.code==200&&(v.value=n.data)},S=()=>{Object.assign(t,{attrName:"",attrValueList:[],categoryId:p.c3Id,categoryLevel:3}),u.value=1},U=s=>{u.value=1,Object.assign(t,JSON.parse(JSON.stringify(s)))},C=()=>{u.value=0},q=()=>{t.attrValueList.push({valueName:"",flag:!0}),O(()=>{b.value[t.attrValueList.length-1].focus()})},w=async()=>{(await Y(t)).code==200?(u.value=0,f({type:"success",message:t.id?"修改 成功":"新增 成功"}),V()):f({type:"error",message:t.id?"修改 失敗":"新增 失敗"})},D=(s,o)=>{if(s.valueName.trim()==""){t.attrValueList.splice(o,1),f({type:"error",message:"屬性值必須填"});return}if(t.attrValueList.find(n=>{if(n!=s)return n.valueName===s.valueName})){t.attrValueList.splice(o,1),f({type:"error",message:"屬性值不得重複"});return}s.flag=!1},E=(s,o)=>{s.flag=!0,O(()=>{b.value[o].focus()})},P=async s=>{(await Z(s)).code==200?(f({type:"success",message:"刪除 成功"}),V()):f({type:"error",message:"刪除 失敗"})};return Q(()=>{p.$reset()}),(s,o)=>{const g=i("Category"),n=i("el-button"),d=i("el-table-column"),$=i("el-tag"),j=i("el-popconfirm"),x=i("el-table"),h=i("el-input"),F=i("el-form-item"),J=i("el-form"),M=i("el-card");return y(),k("div",null,[e(g,{scene:r(u)},null,8,["scene"]),e(M,{style:{margin:"10px 0px"}},{default:l(()=>[B(z("div",null,[e(n,{onClick:S,type:"primary",size:"default",icon:"Plus",disabled:!r(p).c3Id},{default:l(()=>[m("新增規格")]),_:1},8,["disabled"]),e(x,{border:"",style:{margin:"10px 0px"},data:r(v)},{default:l(()=>[e(d,{label:"項次",type:"index",align:"center",width:"80px"}),e(d,{label:"屬性名稱",width:"120px",prop:"attrName"}),e(d,{label:"屬性數值"},{default:l(({row:a})=>[(y(!0),k(W,null,X(a.attrValueList,c=>(y(),A($,{style:{margin:"5px"},key:c.id},{default:l(()=>[m(L(c.valueName),1)]),_:2},1024))),128))]),_:1}),e(d,{label:"屬性值操作",width:"120px"},{default:l(({row:a})=>[e(n,{type:"warning",size:"small",icon:"Edit",onClick:c=>U(a)},null,8,["onClick"]),e(j,{title:`確定刪除 ${a.attrName} ?`,width:"200px",onConfirm:c=>P(a.id)},{reference:l(()=>[e(n,{type:"danger",size:"small",icon:"Delete"})]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"])],512),[[I,r(u)==0]]),B(z("div",null,[e(J,{inline:!0},{default:l(()=>[e(F,{label:"屬性名稱"},{default:l(()=>[e(h,{placeholder:"請輸入屬性名稱",modelValue:r(t).attrName,"onUpdate:modelValue":o[0]||(o[0]=a=>r(t).attrName=a)},null,8,["modelValue"])]),_:1})]),_:1}),e(n,{onClick:q,disabled:!r(t).attrName,type:"primary",size:"default",icon:"Plus"},{default:l(()=>[m("新增屬性")]),_:1},8,["disabled"]),e(n,{type:"primary",size:"default",onClick:C},{default:l(()=>[m("取消")]),_:1}),e(x,{border:"",style:{margin:"10px 0px"},data:r(t).attrValueList},{default:l(()=>[e(d,{label:"項次",width:"80px",type:"index",align:"center"}),e(d,{label:"屬性值名稱"},{default:l(({row:a,$index:c})=>[a.flag?(y(),A(h,{key:0,ref:_=>r(b)[c]=_,onBlur:_=>D(a,c),size:"small",placeholder:"請輸入屬性值名稱",modelValue:a.valueName,"onUpdate:modelValue":_=>a.valueName=_},null,8,["onBlur","modelValue","onUpdate:modelValue"])):(y(),k("div",{key:1,onClick:_=>E(a,c)},L(a.valueName),9,ee))]),_:1}),e(d,{label:"屬性值操作"},{default:l(({index:a})=>[e(n,{type:"danger",size:"small",icon:"Delete",onClick:c=>r(t).attrValueList.splice(a,1)},null,8,["onClick"])]),_:1})]),_:1},8,["data"]),e(n,{type:"primary",size:"default",onClick:w,disabled:!(r(t).attrValueList.length>0)},{default:l(()=>[m("保存")]),_:1},8,["disabled"]),e(n,{type:"primary",size:"default",onClick:C},{default:l(()=>[m("取消")]),_:1})],512),[[I,r(u)==1]])]),_:1})])}}});export{le as default};
