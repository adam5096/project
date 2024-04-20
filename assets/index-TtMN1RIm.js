import{J as P,d as Y,r as c,Q as de,e as s,o as g,v as w,w as t,h as u,g as e,F as M,q as R,f as B,C as j,m as Q,j as F,t as ie,K as z,c as pe,N as ce,M as me,y as _e,H as ge,A as W,B as X}from"./index-92mO3-zR.js";const fe=(f,b,V)=>P.get(`/admin/product/${f}/${b}?category3Id=${V}`),Z=()=>P.get("/admin/product/baseTrademark/getTrademarkList"),le=f=>P.get("/admin/product/spuImageList/"+f),te=f=>P.get("/admin/product/spuSaleAttrList/"+f),ee=()=>P.get("/admin/product/baseSaleAttrList"),Se=f=>f.id?P.post("/admin/product/updateSpuInfo",f):P.post("/admin/product/saveSpuInfo",f),ye=f=>P.post("/admin/product/saveSkuInfo",f),ve=f=>P.get("/admin/product/findBySpuId/"+f),be=f=>P.delete("/admin/product/deleteSpu/"+f),Ve=["src"],ke=Y({__name:"spuForm",emits:["changeScene"],setup(f,{expose:b,emit:V}){let v=V;const h=()=>{v("changeScene",{flag:0,params:"update"})};let x=c([]),k=c([]),o=c([]),K=c([]),C=c(!1),N=c(""),r=c({category3Id:"",spuName:"",description:"",tmId:"",spuImageList:[],spuSaleAttrList:[]}),I=c("");const L=async l=>{r.value=l;let a=await Z(),S=await le(l.id),U=await te(l.id),E=await ee();x.value=a.data,k.value=S.data.map($=>({name:$.imgName,url:$.imgUrl})),o.value=U.data,K.value=E.data},d=l=>{N.value=l.url,C.value=!0},i=()=>{},m=l=>l.type=="image/png"||l.type=="image/jpeg"||l.type=="image/gif"?(l.size/1024/1024<3||z({type:"error",message:"上傳文件務必小於3MB"}),!0):(z({type:"error",message:"上傳文件務必是PNG|JPF|GIF"}),!1);let A=de(()=>K.value.filter(a=>o.value.every(S=>a.name!=S.saleAttrName)));const D=()=>{const[l,a]=I.value.split(":");let S={baseSaleAttrId:l,saleAttrName:a,spuSaleAttrValueList:[]};o.value.push(S),I.value=""},_=l=>{l.flag=!0,l.saleAttrValue=""},p=l=>{const{baseSaleAttrId:a,saleAttrValue:S}=l;let U={baseSaleAttrId:a,saleAttrValueName:S};if(S.trim()==""){z({type:"error",message:"屬性值不得留白,請填寫"});return}if(l.spuSaleAttrValueList.find($=>$.saleAttrValueName==S)){z({type:"error",message:"屬性值出現重複,請改名"});return}l.spuSaleAttrValueList.push(U),l.flag=!1},H=async()=>{r.value.spuImageList=k.value.map(a=>({imgName:a.name,imgUrl:a.response&&a.response.data||a.url})),r.value.spuSaleAttrList=o.value,(await Se(r.value)).code==200?(z({type:"success",message:r.value.id?"編輯 成功":"新增 成功"}),v("changeScene",{flag:0,params:r.value.id?"update":"add"})):z({type:"error",message:r.value.id?"編輯 失敗":"新增 失敗"})};return b({initHasSpuData:L,initAddSpu:async l=>{k.value=[],o.value=[],I.value="",Object.assign(r.value,{category3Id:"",spuName:"",description:"",tmId:"",spuImageList:[],spuSaleAttrList:[]}),r.value.category3Id=l;let a=await Z(),S=await ee();x.value=a.data,K.value=S.data}}),(l,a)=>{const S=s("el-input"),U=s("el-form-item"),E=s("el-option"),$=s("el-select"),y=s("Plus"),G=s("el-icon"),ae=s("el-upload"),ue=s("el-dialog"),J=s("el-button"),O=s("el-table-column"),ne=s("el-tag"),se=s("el-table"),oe=s("el-form");return g(),w(oe,{"label-width":"100px"},{default:t(()=>[e(U,{label:"SPU名稱"},{default:t(()=>[e(S,{placeholder:"請輸入名稱",modelValue:u(r).spuName,"onUpdate:modelValue":a[0]||(a[0]=n=>u(r).spuName=n)},null,8,["modelValue"])]),_:1}),e(U,{label:"SPU品牌"},{default:t(()=>[e($,{modelValue:u(r).tmId,"onUpdate:modelValue":a[1]||(a[1]=n=>u(r).tmId=n)},{default:t(()=>[(g(!0),B(M,null,R(u(x),n=>(g(),w(E,{key:n.id,label:n.tmName,value:n.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(U,{label:"SPU描述"},{default:t(()=>[e(S,{type:"textarea",placeholder:"請輸入描述",modelValue:u(r).description,"onUpdate:modelValue":a[2]||(a[2]=n=>u(r).description=n)},null,8,["modelValue"])]),_:1}),e(U,{label:"SPU圖片"},{default:t(()=>[e(ae,{"file-list":u(k),"onUpdate:fileList":a[3]||(a[3]=n=>j(k)?k.value=n:k=n),action:"/api/admin/product/fileUpload","list-type":"picture-card","on-preview":d,"on-remove":i,"before-upload":m},{default:t(()=>[e(G,null,{default:t(()=>[e(y)]),_:1})]),_:1},8,["file-list"]),e(ue,{modelValue:u(C),"onUpdate:modelValue":a[4]||(a[4]=n=>j(C)?C.value=n:C=n)},{default:t(()=>[Q("img",{"w-full":"",src:u(N),alt:"Preview Image",style:{width:"100%",height:"100%"}},null,8,Ve)]),_:1},8,["modelValue"])]),_:1}),e(U,{label:"SPU銷售屬性"},{default:t(()=>[e($,{style:{width:"200px"},modelValue:u(I),"onUpdate:modelValue":a[5]||(a[5]=n=>j(I)?I.value=n:I=n),placeholder:u(A).length?`還有${u(A).length}個未選擇`:"無"},{default:t(()=>[(g(!0),B(M,null,R(u(A),n=>(g(),w(E,{value:`${n.id}:${n.name}`,key:n.id,label:n.name},null,8,["value","label"]))),128))]),_:1},8,["modelValue","placeholder"]),e(J,{onClick:D,disabled:!u(I),style:{"margin-left":"10px"},type:"primary",size:"default",icon:"Plus"},{default:t(()=>[F("新增屬性")]),_:1},8,["disabled"])]),_:1}),e(se,{border:"",style:{margin:"10px 0px"},data:u(o)},{default:t(()=>[e(O,{label:"序",type:"index",align:"center",width:"80px"}),e(O,{label:"銷售屬性名稱",width:"120px",prop:"saleAttrName"}),e(O,{label:"銷售屬性值"},{default:t(({row:n})=>[(g(!0),B(M,null,R(n.spuSaleAttrValueList,(T,re)=>(g(),w(ne,{style:{margin:"0px 5px"},onClose:he=>n.spuSaleAttrValueList.splice(re,1),key:n.id,closable:""},{default:t(()=>[F(ie(T.saleAttrValueName),1)]),_:2},1032,["onClose"]))),128)),n.flag==!0?(g(),w(S,{key:0,onBlur:T=>p(n),modelValue:n.saleAttrValue,"onUpdate:modelValue":T=>n.saleAttrValue=T,placeholder:"請輸入屬性值",size:"small",style:{width:"100px"}},null,8,["onBlur","modelValue","onUpdate:modelValue"])):(g(),w(J,{key:1,onClick:T=>_(n),type:"success",size:"small",icon:"Plus"},null,8,["onClick"]))]),_:1}),e(O,{label:"操作",width:"120px"},{default:t(({$index:n})=>[e(J,{type:"danger",size:"small",icon:"Delete",onClick:T=>u(o).splice(n,1)},null,8,["onClick"])]),_:1})]),_:1},8,["data"]),e(U,null,{default:t(()=>[e(J,{disabled:!(u(o).length>0),type:"primary",size:"default",onClick:H},{default:t(()=>[F("保存")]),_:1},8,["disabled"]),e(J,{type:"primary",size:"default",onClick:h},{default:t(()=>[F("取消")]),_:1})]),_:1})]),_:1})}}}),Ae=["src"],Ie=Y({__name:"skuForm",emits:["changeScene"],setup(f,{expose:b,emit:V}){let v=c([]),h=c([]),x=c([]),k=c(),o=pe({category3Id:"",spuId:"",tmId:"",skuName:"",price:"",weight:"",skuDesc:"",skuAttrValueList:[],skuSaleAttrValueList:[],skuDefaultImg:""});const K=async(L,d,i)=>{o.category3Id=i.category3Id,o.spuId=i.id,o.tmId=i.tmId;let m=await ce(L,d,i.category3Id),A=await te(i.id),D=await le(i.id);v.value=m.data,h.value=A.data,x.value=D.data},C=()=>{I("changeScene",{flag:0,params:""})},N=L=>{x.value.forEach(d=>{k.value.toggleRowSelection(d,!1)}),k.value.toggleRowSelection(L,!0),o.skuDefaultImg=L.imgUrl},r=async()=>{o.skuAttrValueList=v.value.reduce((d,i)=>{if(i.attrIdAndValueId){let[m,A]=i.attrIdAndValueId.split(":");d.push({attrId:m,valueId:A})}return d},[]),o.skuSaleAttrValueList=h.value.reduce((d,i)=>{if(i.saleIdAndValueId){let[m,A]=i.saleIdAndValueId.split(":");d.push({saleAttrId:m,saleAttrValueId:A})}return d},[]),(await ye(o)).code==200?(z({type:"success",message:"新增SKU 成功"}),I("changeScene",{flag:0,params:""})):z({type:"error",message:"新增SKU 失敗"})};b({initSkuData:K});let I=V;return(L,d)=>{const i=s("el-input"),m=s("el-form-item"),A=s("el-option"),D=s("el-select"),_=s("el-form"),p=s("el-table-column"),H=s("el-button"),q=s("el-table");return g(),w(_,{"label-width":"100px"},{default:t(()=>[e(m,{label:"SKU名稱"},{default:t(()=>[e(i,{placeholder:"SKU名稱",modelValue:u(o).skuName,"onUpdate:modelValue":d[0]||(d[0]=l=>u(o).skuName=l)},null,8,["modelValue"])]),_:1}),e(m,{label:"價格(元)"},{default:t(()=>[e(i,{placeholder:"價格(元)",type:"number",modelValue:u(o).price,"onUpdate:modelValue":d[1]||(d[1]=l=>u(o).price=l)},null,8,["modelValue"])]),_:1}),e(m,{label:"重量(g)"},{default:t(()=>[e(i,{placeholder:"重量(g)",type:"number",modelValue:u(o).weight,"onUpdate:modelValue":d[2]||(d[2]=l=>u(o).weight=l)},null,8,["modelValue"])]),_:1}),e(m,{label:"SKU描述"},{default:t(()=>[e(i,{placeholder:"SKU描述",type:"textarea",modelValue:u(o).skuDesc,"onUpdate:modelValue":d[3]||(d[3]=l=>u(o).skuDesc=l)},null,8,["modelValue"])]),_:1}),e(m,{label:"平台屬性"},{default:t(()=>[e(_,{inline:!0},{default:t(()=>[(g(!0),B(M,null,R(u(v),l=>(g(),w(m,{key:l.id,label:l.attrName},{default:t(()=>[e(D,{modelValue:l.attrIdAndValueId,"onUpdate:modelValue":a=>l.attrIdAndValueId=a,style:{width:"150px"}},{default:t(()=>[(g(!0),B(M,null,R(l.attrValueList,a=>(g(),w(A,{value:`${l.id}:${a.id}`,key:a.id,label:a.valueName},null,8,["value","label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1}),e(m,{label:"銷售屬性"},{default:t(()=>[e(_,{inline:!0},{default:t(()=>[(g(!0),B(M,null,R(u(h),l=>(g(),w(m,{label:l.saleAttrName,key:l.id},{default:t(()=>[e(D,{modelValue:l.saleIdAndValueId,"onUpdate:modelValue":a=>l.saleIdAndValueId=a,style:{width:"150px"}},{default:t(()=>[(g(!0),B(M,null,R(l.spuSaleAttrValueList,a=>(g(),w(A,{value:`${l.id}:${a.id}`,key:a.id,label:a.saleAttrValueName},null,8,["value","label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1}),e(m,{label:"圖片名稱"},{default:t(()=>[e(q,{border:"",data:u(x),ref_key:"table",ref:k},{default:t(()=>[e(p,{type:"selection",width:"80px",align:"center"}),e(p,{label:"圖片"},{default:t(({row:l})=>[Q("img",{src:l.imgUrl,alt:"圖片",style:{width:"100px",height:"100px"}},null,8,Ae)]),_:1}),e(p,{label:"名稱",prop:"imgName"}),e(p,{label:"操作"},{default:t(({row:l})=>[e(H,{type:"warning",size:"small",onClick:a=>N(l)},{default:t(()=>[F("設置默認")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),_:1}),e(m,null,{default:t(()=>[e(H,{type:"primary",size:"default",onClick:r},{default:t(()=>[F("保存")]),_:1}),e(H,{type:"primary",size:"default",onClick:C},{default:t(()=>[F("取消")]),_:1})]),_:1})]),_:1})}}}),Ue=["src"],we=Y({__name:"index",setup(f){let b=me(),V=c(0),v=c(1),h=c(3),x=c([]),k=c(0),o=c(),K=c(),C=c([]),N=c(!1);_e(()=>b.c3Id,()=>{b.c3Id&&r()});const r=async(_=1)=>{v.value=_;let p=await fe(v.value,h.value,b.c3Id);p.code==200&&(x.value=p.data.records,k.value=p.data.total)},I=()=>{r()},L=()=>{V.value=1,o.value.initAddSpu(b.c3Id)},d=_=>{V.value=1,o.value.initHasSpuData(_)},i=_=>{V.value=_.flag,_.params=="update"?r(v.value):r()},m=_=>{V.value=2,K.value.initSkuData(b.c1Id,b.c2Id,_)},A=async _=>{let p=await ve(_.id);p.code==200&&(C.value=p.data,N.value=!0)},D=async _=>{(await be(_.id)).code==200?(z({type:"success",message:"刪除 成功"}),r(x.value.length>1?v.value:v.value-1)):z({type:"error",message:"刪除 失敗"})};return ge(()=>{b.$reset()}),(_,p)=>{const H=s("category"),q=s("el-button"),l=s("el-table-column"),a=s("el-popconfirm"),S=s("el-table"),U=s("el-pagination"),E=s("el-dialog"),$=s("el-card");return g(),B("div",null,[e(H,{scene:u(V)},null,8,["scene"]),e($,{style:{margin:"10px 0px"}},{default:t(()=>[X(Q("div",null,[e(q,{onClick:L,type:"primary",size:"default",icon:"Plus",disabled:!u(b).c3Id},{default:t(()=>[F("新增SPU")]),_:1},8,["disabled"]),e(S,{style:{margin:"10px 0px"},border:"",stripe:"",data:u(x)},{default:t(()=>[e(l,{label:"序",type:"index",align:"center",width:"80px"}),e(l,{label:"SPU名稱",prop:"spuName"}),e(l,{label:"SPU描述",prop:"description","show-overflow-tooltip":""}),e(l,{label:"操作"},{default:t(({row:y})=>[e(q,{type:"primary",size:"small",icon:"Plus",title:"新增SKU",plain:"",onClick:G=>m(y)},null,8,["onClick"]),e(q,{type:"warning",size:"small",icon:"Edit",title:"修改SKU",onClick:G=>d(y),plain:""},null,8,["onClick"]),e(q,{type:"primary",size:"small",icon:"Search",title:"查看SKU",onClick:G=>A(y),plain:""},null,8,["onClick"]),e(a,{title:`確定刪除${y.spuName}?`,width:"200px",onConfirm:G=>D(y)},{reference:t(()=>[e(q,{type:"danger",size:"small",icon:"Delete",title:"刪除SKU",plain:""})]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),e(U,{"current-page":u(v),"onUpdate:currentPage":p[0]||(p[0]=y=>j(v)?v.value=y:v=y),"page-size":u(h),"onUpdate:pageSize":p[1]||(p[1]=y=>j(h)?h.value=y:h=y),"page-sizes":[5,10,20,40],background:!0,layout:" prev, pager, next, jumper,->, sizes,total,",total:u(k),onCurrentChange:r,onSizeChange:I},null,8,["current-page","page-size","total"])],512),[[W,u(V)==0]]),X(e(ke,{ref_key:"spu",ref:o,onChangeScene:i},null,512),[[W,u(V)==1]]),X(e(Ie,{ref_key:"sku",ref:K,onChangeScene:i},null,512),[[W,u(V)==2]]),e(E,{modelValue:u(N),"onUpdate:modelValue":p[2]||(p[2]=y=>j(N)?N.value=y:N=y),title:"SKU列表"},{default:t(()=>[e(S,{border:"",data:u(C)},{default:t(()=>[e(l,{label:"SKU名稱",prop:"skuName"}),e(l,{label:"SKU價格",prop:"price"}),e(l,{label:"SKU重量",prop:"weight"}),e(l,{label:"SKU圖片"},{default:t(({row:y})=>[Q("img",{src:y.skuDefaultImg,style:{width:"100px",height:"100px"}},null,8,Ue)]),_:1})]),_:1},8,["data"])]),_:1},8,["modelValue"])]),_:1})])}}});export{we as default};