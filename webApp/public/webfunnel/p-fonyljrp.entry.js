import{r as t,h as e}from"./p-d404643c.js";const s=class{constructor(e){t(this,e),this.state={phoneNumber:"",isValid:!1,title1:"",title2:""},this.submitForm=()=>{fetch(this.apiUrl+this.savePhoneNumber,{headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({phoneNumber:this.state.phoneNumber,token:this.getToken()}),method:"post"}).then(t=>t.json()).then(()=>{window.location.href="https://apps.apple.com/us/app/kickit-find-your-people/id1493314888?ls=1"}).catch(()=>{alert("Please try again later.")})},this.validatePhone=t=>{const e=t.target.value;this.state=Object.assign(Object.assign({},this.state),{phoneNumber:e,isValid:/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/.test(e)})},this.mapsLoaded=!1}getToken(){return window.location.href.substr(window.location.href.lastIndexOf("/")+1)}componentDidLoad(){fetch(this.apiUrl+this.getInvitationInfo+`/${this.getToken()||"referral"}`).then(t=>t.json()).then(t=>{this.state=Object.assign(Object.assign({},this.state),t),console.log(this.state),"referral"===this.state.category&&this.injectSDK().then(()=>{this.loadMap()})})}Group(){return e("div",null,e("p",{class:"text-center font-weight-bold mt-2"},this.state.title1),e("p",{class:"text-center"},this.state.title2))}Referral(){return e("div",null,e("p",{class:"text-centerx font-weight-bold mt-2"},e("img",{class:"image",src:this.state.image}),e("span",{class:"pl-2"},this.state.title1)),e("p",{id:"map-container"}),e("p",{class:"text-centerx"},this.state.title2))}Event(){return e("div",null,e("p",{class:"text-center font-weight-bold mt-2"},this.state.title1),e("p",null,"Other info goes here"),e("p",{class:"text-center"},this.state.title2))}getButtonText(){return"group"===this.state.category?"DOWNLOAD":"referral"===this.state.category?"JOIN AND DOWNLOAD":"RSVP AND DOWNLOAD"}render(){const t="group"===this.state.category?this.Group():"referral"===this.state.category?this.Referral():this.Event();return e("div",null,e("div",{class:"text-center mt-2"},e("img",{src:this.logoImgPath,alt:"logo",class:"mb-2"})),t,e("div",null,e("div",{class:"form-group"},e("input",{onInput:t=>this.validatePhone(t),value:this.state.phoneNumber,type:"text",class:"form-control",placeholder:"Enter Phone number"})),e("div",{class:"form-group"},e("button",{onClick:this.submitForm,disabled:!this.state.isValid,type:"button",class:"btn btn-primary btn-block"},this.getButtonText()))),e("div",{class:"text-center mt-4"},e("div",null,"Your privacy and trust are our top priorities."),e("div",null,"We promise to never, ever sell your data.")))}loadMap(){var t=this.state.location,e=new google.maps.Map(document.getElementById("map-container"),{zoom:7,center:t,mapTypeId:google.maps.MapTypeId.ROADMAP});new google.maps.Marker({position:t,map:e,icon:this.state.image})}componentDidUnload(){}injectSDK(){return new Promise(t=>{window.mapInit=()=>{this.mapsLoaded=!0,t(!0)};let e=document.createElement("script");e.id="googleMaps",e.src=this.mapApiKey?"https://maps.googleapis.com/maps/api/js?key="+this.mapApiKey+"&callback=mapInit":"https://maps.googleapis.com/maps/api/js?callback=mapInit",document.body.appendChild(e)})}static get style(){return".image{width:80px;height:80px;border-radius:40px}#map-container{width:100%;height:300px}"}};export{s as web_funnel};