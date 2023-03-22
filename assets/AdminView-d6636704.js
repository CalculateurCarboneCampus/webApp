import{d as p,u as v,_ as h,r as w,o as r,c as i,a,t as d,F as f,g as j,w as g,v as S,h as l,i as m,j as _}from"./index-45bfd5e0.js";const C=p({data(){return{dataStore:v(),newProjectName:""}},computed:{user(){return this.dataStore.$state.user},projectsArchived(){return Object.values(this.dataStore.$state.user.listOfProjects).filter(t=>JSON.parse(t.content.content).status==="draft")}},methods:{changeProjectContentStatus(t,s,u){this.dataStore.waitForSavingData=!0;const o=JSON.parse(t.content.content);o.status=s,this.dataStore.user.save({value:o,projectName:u}).then(n=>{n.success?this.dataStore.user.reloadData().then(()=>{this.dataStore.waitForSavingData=!1,this.dataStore.dataHasChange=!1}):this.dataStore.user.error=n.error})},async addCalculation(){const t=await this.dataStore.user.createNewProject(this.dataStore.CCCData,this.newProjectName);t.success&&await this.$router.push({name:"admin.project",params:{userID:this.user.userID,projectSlug:t.slugOfNewProject}})},focusToInput(){this.$refs.nameNewDocumentInput instanceof HTMLInputElement&&this.$refs.nameNewDocumentInput.focus()}}});const N={class:"v-admin-view ccc-with-gutter"},D={class:"ccc-with-gutter"},I={class:"v-admin-view__projects"},P={class:"v-admin-view__projects__item ccc-with-gutter"},$={class:"v-admin-view__projects__item__slug"},b=["onClick"],k=_("notes projet"),y=_("modifier ->"),T=a("div",null,"Nouveau Calcul",-1);function V(t,s,u,o,n,O){const c=w("router-link");return r(),i("div",N,[a("h1",D,"Mon espace: "+d(t.dataStore.user.username),1),a("div",I,[(r(!0),i(f,null,j(t.projectsArchived,e=>(r(),i("div",P,[a("div",$,d(e.slug),1),a("div",null,[a("div",{style:{"margin-right":"1rem"},class:"ccc-ui-button--small v-admin-view__projects__item__button",onClick:A=>t.changeProjectContentStatus(e,"archive",e.slug)},"archiver",8,b),l(c,{style:{"margin-right":"1rem"},class:"ccc-ui-button--small v-admin-view__projects__item__button",to:{name:"admin.project",params:{userID:t.user.userID,projectSlug:e.slug,currentEntityName:"Résultat"}}},{default:m(()=>[k]),_:2},1032,["to"]),l(c,{class:"ccc-ui-button--small v-admin-view__projects__item__button",to:{name:"admin.project",params:{userID:t.user.userID,projectSlug:e.slug}}},{default:m(()=>[y]),_:2},1032,["to"])])]))),256)),a("form",{class:"v-admin-view__add-calculation",onClick:s[2]||(s[2]=(...e)=>t.focusToInput&&t.focusToInput(...e)),onSubmit:s[3]||(s[3]=(...e)=>t.addCalculation&&t.addCalculation(...e))},[a("div",{class:"ccc-ui-circle",onClick:s[0]||(s[0]=(...e)=>t.addCalculation&&t.addCalculation(...e))},"+"),T,g(a("input",{ref:"nameNewDocumentInput",type:"text","onUpdate:modelValue":s[1]||(s[1]=e=>t.newProjectName=e)},null,512),[[S,t.newProjectName]])],32)])])}const F=h(C,[["render",V]]);export{F as default};
