(function(){"use strict";var e={694:function(e,t,s){var o=s(963),r=s(252);const l={class:"container-fluid"};function a(e,t,s,o,a,c){const i=(0,r.up)("CategoryHeader");return(0,r.wg)(),(0,r.iD)("div",l,[(0,r.Wm)(i)])}var c=s(577);const i={class:"grid-body"},n=(0,r._)("h2",null,"Code Jeopardy",-1),u={class:"scorebox"},d=(0,r._)("footer",null,"Created by Kimi Rettig",-1);function g(e,t,s,o,l,a){const g=(0,r.up)("clue-column");return(0,r.wg)(),(0,r.iD)("div",i,[n,(0,r._)("div",u,"Score: "+(0,c.zw)(e.$store.state.score),1),(0,r._)("button",{onClick:t[0]||(t[0]=e=>a.newGameReset()),class:"reset-button"},"Reset Game"),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(l.categories,((e,t)=>((0,r.wg)(),(0,r.iD)("div",{class:"grid-headings",key:t},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id},(0,c.zw)(e.name),1)))),128))])))),128)),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(l.categories,(e=>((0,r.wg)(),(0,r.iD)("div",{class:"grid-clues",key:e.id},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id},[(0,r.Wm)(g,{categoryid:e.category_id},null,8,["categoryid"])])))),128))])))),128)),d])}var h=s(154);const m=["onClick"],w={class:"modal-dialog",role:"document"},p={class:"modal-content"},C={class:"modal-header"},f=(0,r._)("h5",{class:"modal-title"},null,-1),v=(0,r._)("span",{"aria-hidden":"true"},"×",-1),y=[v],_=(0,r._)("i",{class:"bi bi-emoji-smile-fill"},null,-1),b=(0,r._)("p",null,null,-1),$={key:0},k={key:0},S=(0,r._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",height:"40",fill:"currentColor",class:"bi bi-emoji-smile-fill msg_text_correct",viewBox:"0 0 16 16"},[(0,r._)("path",{d:"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"})],-1),x=(0,r._)("p",null,"You are correct!",-1),M={key:1},D=(0,r._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",height:"40",fill:"currentColor",class:"bi bi-slash-circle-fill msg_text_incorrect",viewBox:"0 0 16 16"},[(0,r._)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708l6-6z"})],-1),T=(0,r._)("p",null,"No, that is incorrect.",-1),q=(0,r._)("p",null,null,-1),O=(0,r._)("p",null,null,-1),j={key:1,class:"modal-body"},L=(0,r._)("p",null,null,-1),z={class:"label"},A=(0,r._)("br",null,null,-1),Z=(0,r._)("br",null,null,-1),R=(0,r._)("button",{type:"submit",class:"btn btn-primary",value:"form.name"}," submit ",-1),H={key:0,class:"modal-backdrop fade show"};function I(e,t,s,l,a,i){return(0,r.wg)(),(0,r.iD)(r.HY,null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.clues,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.clue_id},[(0,r._)("div",{class:(0,c.C_)([`buttonbox_${e.clue_id}`])},[(0,r._)("button",{class:(0,c.C_)(`button_${e.clue_id}`),onClick:t=>{i.modalToggle(e.clue_id),i.getClue(e.clue_id)}},(0,c.zw)(e.value),11,m)],2)])))),128))])))),128)),(0,r._)("div",null,[(0,r._)("div",{ref:"modal",class:(0,c.C_)(["modal fade",{show:a.active,"d-block":a.active}]),tabindex:"-1",role:"dialog"},[(0,r._)("div",w,[(0,r._)("div",p,[(0,r._)("div",C,[f,(0,r._)("div",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close",onClick:t[0]||(t[0]=(...e)=>i.modalToggle&&i.modalToggle(...e))},y)]),_,b,!0===a.showMessage?((0,r.wg)(),(0,r.iD)("div",$,[e.answeredCorrect?((0,r.wg)(),(0,r.iD)("div",k,[S,(0,r.Uk)(),x])):(0,r.kq)("",!0),e.answeredCorrect?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",M,[D,T,(0,r._)("p",null,[(0,r._)("strong",null," Correct answer is: "+(0,c.zw)(i.answer),1)])])),q,O])):(0,r.kq)("",!0),!1===a.showMessage?((0,r.wg)(),(0,r.iD)("div",j,[(0,r.Uk)((0,c.zw)(i.clueText)+" ",1),L,(0,r._)("form",{onSubmit:t[2]||(t[2]=(0,o.iM)((e=>i.updateScoreAndClue(a.form.name,i.answer,i.clue[0].clue_id)),["prevent"]))},[(0,r._)("label",z,(0,c.zw)(i.question)+"...",1),(0,r.wy)((0,r._)("input",{id:"modalInput","onUpdate:modelValue":t[1]||(t[1]=e=>a.form.name=e),class:"input",type:"text"},null,512),[[o.nr,a.form.name]]),A,Z,R],32)])):(0,r.kq)("",!0)])])],2),a.active?((0,r.wg)(),(0,r.iD)("div",H)):(0,r.kq)("",!0)])],64)}var Y={name:"CategoryClues",emits:["modalToggle"],props:{categoryid:Number},data(){return{showMessage:!1,selectedItem:null,active:"",form:{name:""},clues:h.Z.get(`${this.$store.state.url}/api/category-clues/${this.categoryid}`).then((e=>{if(""!==e.data)return this.$store.state.clues=e.data,this.clues=e.data;console.log("game clues data response is empty "+this.$store.state.url)})).catch((e=>{console.log(e)}))}},computed:{clue(){return this.$store.state.clue},clueText(){return this.$store.state.clueText},question(){return this.$store.state.question},answer(){return this.$store.state.answer},clueid(){return this.$store.state.clueid},value(){return this.$store.state.value}},methods:{getClues(e){console.log("getClues method in CatClues file"),this.clues=this.$store.dispatch("fetchAllClues",e)},getClue(e){this.clue=this.$store.dispatch("fetchClue",e)},modalToggle(){const e=document.querySelector("body");this.active=!this.active,this.active?e.classList.add("modal-open"):e.classList.remove("modal-open"),this.form.name="",this.showMessage=!1},updateScoreAndClue(e,t,s){if(this.showMessage=!0,e.toLowerCase()!==t.toLowerCase()){this.answeredCorrect=0;const e={clueid:s,answeredCorrect:this.answeredCorrect};this.$store.dispatch("updateClue",e);const t={clueid:s,answeredCorrect:this.answeredCorrect};this.$store.commit("showModalMutation",t),console.log("clue id after mutation method runs = "+this.$store.state.currClueId);const o=document.querySelector(`.buttonbox_${this.$store.state.currClueId}`);o.classList.remove("answeredCorrect_1"),o.classList.remove("answeredCorrect_null"),o.classList.add("answeredCorrect_0"),document.querySelector(`.button_${this.$store.state.currClueId}`).disabled=!0}else if(e.toLowerCase()===t.toLowerCase()){this.answeredCorrect=1;const e={clueid:s,answeredCorrect:this.answeredCorrect};this.$store.dispatch("updateClue",e);const t={gameid:1,score:this.$store.state.score};this.$store.dispatch("setScore",t);const o={clueid:s,answeredCorrect:this.answeredCorrect};this.$store.commit("showModalMutation",o),console.log("clue id after mutation method runs = "+this.$store.state.currClueId);const r=document.querySelector(`.buttonbox_${this.$store.state.currClueId}`);r.classList.remove("answeredCorrect_0"),r.classList.remove("answeredCorrect_null"),r.classList.add("answeredCorrect_1")}console.log(e+" vs "+t+" means answeredCorrect is "+this.answeredCorrect)}},beforeMount(){this.clues}},K=s(744);const N=(0,K.Z)(Y,[["render",I]]);var P=N,U={name:"CategoryHeader",components:{"clue-column":P},data(){return{getResponse:!1,categories:h.Z.get(`${this.$store.state.url}/api/game-categories`).then((e=>(this.getResponse=!0,console.log("header categories call "+e.data),this.categories=e.data))).catch((e=>{console.log(e),this.getResponse=!1})),clues:h.Z.get(`${this.$store.state.url}/api/allclues`).then((e=>(this.getResponse=!0,this.clues=e.data))).catch((e=>{console.log(e),this.getResponse=!1}))}},methods:{getCategories(){return this.categories=this.$store.dispatch("fetchAllCat"),console.log("getCat called"+JSON.stringify(this.categories)),this.categories},modalToggle(){const e=document.querySelector("body");this.active=!this.active,this.active?e.classList.add("modal-open"):e.classList.remove("modal-open")},newGameReset(){this.$store.dispatch("resetClues"),location.reload()}},beforeMount(){}};const G=(0,K.Z)(U,[["render",g]]);var J=G,B={name:"App",components:{CategoryHeader:J}};const F=(0,K.Z)(B,[["render",a]]);var W=F,E=(s(877),s(907)),V=(0,E.MT)({state(){return{categories:[],gameid:"1",clue:"",clueText:"",question:"",answer:"",clues:[],clueid:"",currClueId:"",score:0,value:"",answeredCorrect:null,url:"https://codejeopardy-2399c55e116b.herokuapp.com",getResponse:!0}},getters:{},actions:{async fetchAllCat({commit:e}){h.Z.get(`${this.state.url}/api/game-categories`).then((t=>{console.log("header categories call "+t.data),e("fetchCategories",t.data)})).catch((e=>{console.log(e+" fetch cat error")}))},async fetchAllClues({commit:e},t){h.Z.get(`${this.state.url}/api/category-clues/${t}`).then((t=>{console.log(this.state.url+"fetch clues in store index js file"),e("setClues",t)})).catch((e=>{console.log(e)}))},async fetchClue({commit:e},t){h.Z.get(`${this.state.url}/api/category-clue/${t}`).then((s=>{console.log("This is clueid for fetchClue is "+t),e("setClue",s.data.rows)})).catch((e=>{console.log(e)}))},async updateClue({commit:e},t){console.log("update clue payload "+JSON.stringify(t)),h.Z.patch(`${this.state.url}/api/category-clue/${t.clueid}&${t.answeredCorrect}`).then((e=>(console.log("update clue "+t.answeredCorrect+" "+t.clueid),e))).catch((e=>{console.log(e)})),e("answeredCorrect",t)},async resetClues({commit:e}){h.Z.patch(`${this.state.url}/api/category-clue/newgame`).then((t=>{console.log("reset game"),e("fetchCategories",t),console.log(t)})).catch((e=>{console.log(e)}))},async setScore({commit:e},t){h.Z.patch(`${this.state.url}/api/game/1&${t.score}`).then((s=>{e("setScore",s),console.log("state score is "+t.score)})).catch((e=>{console.log(e)}))}},mutations:{fetchCategories(e,t){return e.categories=t,console.log("categories "+e.categories),e.categories},answeredCorrect(e,t){return console.log("commit answeredCorrect "+t.answeredCorrect),e.answeredCorrect=t.answeredCorrect,e.answeredCorrect},confirmScore(e){return e.score},setScore(e){return e.score=e.score+e.value,console.log("setScore total = "+e.score),e.score},setClues(e,t){console.log("From mutation clues ",t),e.clues=t,e.getResponse=!0},setClue(e,t){let s=t.find((e=>e));e.clue=t;let o=s["clue"];return e.clueText=o.charAt(0).toUpperCase()+o.slice(1),e.question=s["question"],e.answer=s["answer"],e.clueid=s["clueid"],e.answeredCorrect=s["answered"],e.value=s["value"],t},showModalMutation(e,t){return e.currClueId=t.clueid,e.currClueId}},modules:{}});(0,o.ri)(W).use(V).mount("#app")}},t={};function s(o){var r=t[o];if(void 0!==r)return r.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,s),l.exports}s.m=e,function(){var e=[];s.O=function(t,o,r,l){if(!o){var a=1/0;for(u=0;u<e.length;u++){o=e[u][0],r=e[u][1],l=e[u][2];for(var c=!0,i=0;i<o.length;i++)(!1&l||a>=l)&&Object.keys(s.O).every((function(e){return s.O[e](o[i])}))?o.splice(i--,1):(c=!1,l<a&&(a=l));if(c){e.splice(u--,1);var n=r();void 0!==n&&(t=n)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[o,r,l]}}(),function(){s.d=function(e,t){for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,l,a=o[0],c=o[1],i=o[2],n=0;if(a.some((function(t){return 0!==e[t]}))){for(r in c)s.o(c,r)&&(s.m[r]=c[r]);if(i)var u=i(s)}for(t&&t(o);n<a.length;n++)l=a[n],s.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return s.O(u)},o=self["webpackChunkvue_project"]=self["webpackChunkvue_project"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=s.O(void 0,[998],(function(){return s(694)}));o=s.O(o)})();
//# sourceMappingURL=app.63381cf6.js.map