import{c as d,o as i,a as t,t as g,h as _,r as h,b as p,j as u,F as y,l as b,p as f,f as x}from"./index--K2Yny0p.js";const C=["disabled"],L={__name:"SingleComponent",props:{index:{type:Number,required:!0},comment:{type:Object,required:!0},isLoading:{type:Boolean,required:!0}},emits:["deleteHandler"],setup(s,{emit:l}){const c=l,a=({comment:r,index:e})=>{c("deleteHandler",{comment:r,index:e})};return(r,e)=>(i(),d("tr",null,[t("td",null,g(s.comment.content),1),t("td",null,[t("button",{class:"btn btn-danger",disabled:s.isLoading,onClick:e[0]||(e[0]=o=>a({comment:s.comment,index:s.index}))},"Delete",8,C)])]))}},k={class:"container my-5"},w={class:"row"},B={class:"table"},E={__name:"Comments",setup(s){const{axiosCall:l,isLoading:c}=_(),a=h([]);p(async()=>{try{const e=await l("GET","/comments/get-all",{},{withCredentials:!0});e!=null&&e.success&&a.push(...e.data)}catch(e){u({type:"error",messages:e.message})}});const r=async({comment:e,index:o})=>{const n=await l("DELETE",`/comments/delete/${e._id}`,{},{withCredentials:!0});n!=null&&n.success&&(a.splice(o,1),u({type:"success",messages:n.message}))};return(e,o)=>(i(),d("div",k,[t("div",w,[t("table",B,[o[0]||(o[0]=t("thead",null,[t("tr",null,[t("th",null,"Contenido del mensaje"),t("th")])],-1)),t("tbody",null,[(i(!0),d(y,null,b(a,(n,m)=>(i(),f(L,{key:m,index:m,comment:n,isLoading:x(c),onDeleteHandler:r},null,8,["index","comment","isLoading"]))),128))])])])]))}};export{E as default};
