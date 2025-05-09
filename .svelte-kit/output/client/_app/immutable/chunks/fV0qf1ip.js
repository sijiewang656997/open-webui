import{s as rt,y as Ee,d,G as lt,z as Re,a as z,i as ee,b as r,x as _e,A as it,c,l as P,e as m,f as _,g as O,o as N,h,t as R,p as ut,j as ct,n as Ge,B as pe,C as We}from"./CgRTDwF2.js";import{S as ft,i as dt,f as He,d as J,t as j,a as L,g as mt,c as ht,m as Q,b as X,e as Z}from"./Bnxgdxyh.js";import{C as _t}from"./CEkESd0P.js";import{g as pt}from"./JmxR0F9R.js";import{C as gt}from"./CtUWi401.js";import{C as vt}from"./vrCpesxC.js";import{T as Ne}from"./iHdIuxSF.js";import{A as wt,L as bt}from"./6z1ErD2o.js";function yt(s){let e,t,n,u,a;return t=new vt({props:{strokeWidth:"2.5"}}),{c(){e=h("button"),Z(t.$$.fragment),this.h()},l(i){e=m(i,"BUTTON",{class:!0,type:!0});var p=_(e);X(t.$$.fragment,p),p.forEach(d),this.h()},h(){c(e,"class","w-full text-left text-sm py-1.5 px-1 rounded-lg dark:text-gray-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-gray-850"),c(e,"type","button")},m(i,p){ee(i,e,p),Q(t,e,null),n=!0,u||(a=_e(e,"click",s[19]),u=!0)},p:Ge,i(i){n||(L(t.$$.fragment,i),n=!0)},o(i){j(t.$$.fragment,i),n=!1},d(i){i&&d(e),J(t),u=!1,a()}}}function kt(s){let e,t,n,u;return{c(){e=h("input"),this.h()},l(a){e=m(a,"INPUT",{class:!0,type:!0,placeholder:!0}),this.h()},h(){c(e,"class","w-full text-2xl font-semibold bg-transparent outline-hidden"),c(e,"type","text"),c(e,"placeholder",t=s[11].t("Tool Name")),e.required=!0},m(a,i){ee(a,e,i),pe(e,s[0]),n||(u=_e(e,"input",s[20]),n=!0)},p(a,i){i[0]&2048&&t!==(t=a[11].t("Tool Name"))&&c(e,"placeholder",t),i[0]&1&&e.value!==a[0]&&pe(e,a[0])},d(a){a&&d(e),n=!1,u()}}}function Et(s){let e,t;return e=new Ne({props:{className:"w-full",content:s[11].t("e.g. my_tools"),placement:"top-start",$$slots:{default:[Tt]},$$scope:{ctx:s}}}),{c(){Z(e.$$.fragment)},l(n){X(e.$$.fragment,n)},m(n,u){Q(e,n,u),t=!0},p(n,u){const a={};u[0]&2048&&(a.content=n[11].t("e.g. my_tools")),u[0]&2084|u[1]&8&&(a.$$scope={dirty:u,ctx:n}),e.$set(a)},i(n){t||(L(e.$$.fragment,n),t=!0)},o(n){j(e.$$.fragment,n),t=!1},d(n){J(e,n)}}}function It(s){let e,t;return{c(){e=h("div"),t=R(s[2]),this.h()},l(n){e=m(n,"DIV",{class:!0});var u=_(e);t=O(u,s[2]),u.forEach(d),this.h()},h(){c(e,"class","text-sm text-gray-500 shrink-0")},m(n,u){ee(n,e,u),r(e,t)},p(n,u){u[0]&4&&z(t,n[2])},i:Ge,o:Ge,d(n){n&&d(e)}}}function Tt(s){let e,t,n,u;return{c(){e=h("input"),this.h()},l(a){e=m(a,"INPUT",{class:!0,type:!0,placeholder:!0}),this.h()},h(){c(e,"class","w-full text-sm disabled:text-gray-500 bg-transparent outline-hidden"),c(e,"type","text"),c(e,"placeholder",t=s[11].t("Tool ID")),e.required=!0,e.disabled=s[5]},m(a,i){ee(a,e,i),pe(e,s[2]),n||(u=_e(e,"input",s[22]),n=!0)},p(a,i){i[0]&2048&&t!==(t=a[11].t("Tool ID"))&&c(e,"placeholder",t),i[0]&32&&(e.disabled=a[5]),i[0]&4&&e.value!==a[2]&&pe(e,a[2])},d(a){a&&d(e),n=!1,u()}}}function Ct(s){let e,t,n,u;return{c(){e=h("input"),this.h()},l(a){e=m(a,"INPUT",{class:!0,type:!0,placeholder:!0}),this.h()},h(){c(e,"class","w-full text-sm bg-transparent outline-hidden"),c(e,"type","text"),c(e,"placeholder",t=s[11].t("Tool Description")),e.required=!0},m(a,i){ee(a,e,i),pe(e,s[3].description),n||(u=_e(e,"input",s[23]),n=!0)},p(a,i){i[0]&2048&&t!==(t=a[11].t("Tool Description"))&&c(e,"placeholder",t),i[0]&8&&e.value!==a[3].description&&pe(e,a[3].description)},d(a){a&&d(e),n=!1,u()}}}function Dt(s){let e,t,n,u=s[11].t("Please carefully review the following warnings:")+"",a,i,p,v,y=s[11].t("Tools have a function calling system that allows arbitrary code execution.")+"",k,T,g,q=s[11].t("Do not install tools from sources you do not fully trust.")+"",E,I,V,S=s[11].t("I acknowledge that I have read and I understand the implications of my action. I am aware of the risks associated with executing arbitrary code and I have verified the trustworthiness of the source.")+"",w;return{c(){e=h("div"),t=h("div"),n=h("div"),a=R(u),i=N(),p=h("ul"),v=h("li"),k=R(y),T=N(),g=h("li"),E=R(q),I=N(),V=h("div"),w=R(S),this.h()},l(b){e=m(b,"DIV",{class:!0});var C=_(e);t=m(C,"DIV",{class:!0});var A=_(t);n=m(A,"DIV",{});var W=_(n);a=O(W,u),W.forEach(d),i=P(A),p=m(A,"UL",{class:!0});var B=_(p);v=m(B,"LI",{});var te=_(v);k=O(te,y),te.forEach(d),T=P(B),g=m(B,"LI",{});var U=_(g);E=O(U,q),U.forEach(d),B.forEach(d),A.forEach(d),I=P(C),V=m(C,"DIV",{class:!0});var D=_(V);w=O(D,S),D.forEach(d),C.forEach(d),this.h()},h(){c(p,"class","mt-1 list-disc pl-4 text-xs"),c(t,"class","bg-yellow-500/20 text-yellow-700 dark:text-yellow-200 rounded-lg px-4 py-3"),c(V,"class","my-3"),c(e,"class","text-sm text-gray-500")},m(b,C){ee(b,e,C),r(e,t),r(t,n),r(n,a),r(t,i),r(t,p),r(p,v),r(v,k),r(p,T),r(p,g),r(g,E),r(e,I),r(e,V),r(V,w)},p(b,C){C[0]&2048&&u!==(u=b[11].t("Please carefully review the following warnings:")+"")&&z(a,u),C[0]&2048&&y!==(y=b[11].t("Tools have a function calling system that allows arbitrary code execution.")+"")&&z(k,y),C[0]&2048&&q!==(q=b[11].t("Do not install tools from sources you do not fully trust.")+"")&&z(E,q),C[0]&2048&&S!==(S=b[11].t("I acknowledge that I have read and I understand the implications of my action. I am aware of the risks associated with executing arbitrary code and I have verified the trustworthiness of the source.")+"")&&z(w,S)},d(b){b&&d(e)}}}function Vt(s){let e,t,n,u,a,i,p,v,y,k,T,g,q,E,I,V,S,w,b,C,A,W=s[11].t("Access")+"",B,te,U,D,$,ue,H,ge,se,M,ve,G,oe,l,ce,we=s[11].t("Warning:")+"",Ie,Se,be=s[11].t("Tools are a function calling system with arbitrary code execution")+"",Te,Ue,$e,Be,fe,ye=s[11].t("don't install random tools from sources you don't trust.")+"",Ce,Me,le,ke=s[11].t("Save")+"",De,Ve,x,je,K,Le,xe;function st(o){s[17](o)}function ot(o){s[18](o)}let Oe={accessRoles:["read","write"]};s[8]!==void 0&&(Oe.show=s[8]),s[4]!==void 0&&(Oe.accessControl=s[4]),e=new wt({props:Oe}),Ee.push(()=>He(e,"show",st)),Ee.push(()=>He(e,"accessControl",ot)),g=new Ne({props:{content:s[11].t("Back"),$$slots:{default:[yt]},$$scope:{ctx:s}}}),I=new Ne({props:{content:s[11].t("e.g. My Tools"),placement:"top-start",$$slots:{default:[kt]},$$scope:{ctx:s}}}),b=new bt({props:{strokeWidth:"2.5",className:"size-3.5"}});const Fe=[It,Et],ae=[];function Ye(o,f){return o[5]?0:1}D=Ye(s),$=ae[D]=Fe[D](s),H=new Ne({props:{className:"w-full self-center items-center flex",content:s[11].t("e.g. Tools for performing various operations"),placement:"top-start",$$slots:{default:[Ct]},$$scope:{ctx:s}}});let at={value:s[1],boilerplate:s[13],lang:"python",onChange:s[24],onSave:s[25]};M=new _t({props:at}),s[26](M);function nt(o){s[29](o)}let ze={$$slots:{default:[Dt]},$$scope:{ctx:s}};return s[7]!==void 0&&(ze.show=s[7]),x=new gt({props:ze}),Ee.push(()=>He(x,"show",nt)),x.$on("confirm",s[30]),{c(){Z(e.$$.fragment),u=N(),a=h("div"),i=h("div"),p=h("form"),v=h("div"),y=h("div"),k=h("div"),T=h("div"),Z(g.$$.fragment),q=N(),E=h("div"),Z(I.$$.fragment),V=N(),S=h("div"),w=h("button"),Z(b.$$.fragment),C=N(),A=h("div"),B=R(W),te=N(),U=h("div"),$.c(),ue=N(),Z(H.$$.fragment),ge=N(),se=h("div"),Z(M.$$.fragment),ve=N(),G=h("div"),oe=h("div"),l=h("div"),ce=h("span"),Ie=R(we),Se=N(),Te=R(be),Ue=N(),$e=h("br"),Be=R(`—
							`),fe=h("span"),Ce=R(ye),Me=N(),le=h("button"),De=R(ke),Ve=N(),Z(x.$$.fragment),this.h()},l(o){X(e.$$.fragment,o),u=P(o),a=m(o,"DIV",{class:!0});var f=_(a);i=m(f,"DIV",{class:!0});var de=_(i);p=m(de,"FORM",{class:!0});var me=_(p);v=m(me,"DIV",{class:!0});var F=_(v);y=m(F,"DIV",{class:!0});var ne=_(y);k=m(ne,"DIV",{class:!0});var Y=_(k);T=m(Y,"DIV",{class:!0});var ie=_(T);X(g.$$.fragment,ie),ie.forEach(d),q=P(Y),E=m(Y,"DIV",{class:!0});var he=_(E);X(I.$$.fragment,he),he.forEach(d),V=P(Y),S=m(Y,"DIV",{class:!0});var Ke=_(S);w=m(Ke,"BUTTON",{class:!0,type:!0});var qe=_(w);X(b.$$.fragment,qe),C=P(qe),A=m(qe,"DIV",{class:!0});var Je=_(A);B=O(Je,W),Je.forEach(d),qe.forEach(d),Ke.forEach(d),Y.forEach(d),te=P(ne),U=m(ne,"DIV",{class:!0});var Ae=_(U);$.l(Ae),ue=P(Ae),X(H.$$.fragment,Ae),Ae.forEach(d),ne.forEach(d),ge=P(F),se=m(F,"DIV",{class:!0});var Qe=_(se);X(M.$$.fragment,Qe),Qe.forEach(d),ve=P(F),G=m(F,"DIV",{class:!0});var Pe=_(G);oe=m(Pe,"DIV",{class:!0});var Xe=_(oe);l=m(Xe,"DIV",{class:!0});var re=_(l);ce=m(re,"SPAN",{class:!0});var Ze=_(ce);Ie=O(Ze,we),Ze.forEach(d),Se=P(re),Te=O(re,be),Ue=P(re),$e=m(re,"BR",{}),Be=O(re,`—
							`),fe=m(re,"SPAN",{class:!0});var et=_(fe);Ce=O(et,ye),et.forEach(d),re.forEach(d),Xe.forEach(d),Me=P(Pe),le=m(Pe,"BUTTON",{class:!0,type:!0});var tt=_(le);De=O(tt,ke),tt.forEach(d),Pe.forEach(d),F.forEach(d),me.forEach(d),de.forEach(d),f.forEach(d),Ve=P(o),X(x.$$.fragment,o),this.h()},h(){c(T,"class","shrink-0 mr-2"),c(E,"class","flex-1"),c(A,"class","text-sm font-medium shrink-0"),c(w,"class","bg-gray-50 hover:bg-gray-100 text-black dark:bg-gray-850 dark:hover:bg-gray-800 dark:text-white transition px-2 py-1 rounded-full flex gap-1 items-center"),c(w,"type","button"),c(S,"class","self-center shrink-0"),c(k,"class","flex w-full items-center"),c(U,"class","flex gap-2 px-1 items-center"),c(y,"class","w-full mb-2 flex flex-col gap-0.5"),c(se,"class","mb-2 flex-1 overflow-auto h-0 rounded-lg"),c(ce,"class","font-semibold dark:text-gray-200"),c(fe,"class","font-medium dark:text-gray-400"),c(l,"class","text-xs text-gray-500 line-clamp-2"),c(oe,"class","flex-1 pr-3"),c(le,"class","px-3.5 py-1.5 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-full"),c(le,"type","submit"),c(G,"class","pb-3 flex justify-between"),c(v,"class","flex flex-col flex-1 overflow-auto h-0"),c(p,"class","flex flex-col max-h-[100dvh] h-full"),c(i,"class","mx-auto w-full md:px-0 h-full"),c(a,"class","flex flex-col justify-between w-full overflow-y-auto h-full")},m(o,f){Q(e,o,f),ee(o,u,f),ee(o,a,f),r(a,i),r(i,p),r(p,v),r(v,y),r(y,k),r(k,T),Q(g,T,null),r(k,q),r(k,E),Q(I,E,null),r(k,V),r(k,S),r(S,w),Q(b,w,null),r(w,C),r(w,A),r(A,B),r(y,te),r(y,U),ae[D].m(U,null),r(U,ue),Q(H,U,null),r(v,ge),r(v,se),Q(M,se,null),r(v,ve),r(v,G),r(G,oe),r(oe,l),r(l,ce),r(ce,Ie),r(l,Se),r(l,Te),r(l,Ue),r(l,$e),r(l,Be),r(l,fe),r(fe,Ce),r(G,Me),r(G,le),r(le,De),s[27](p),ee(o,Ve,f),Q(x,o,f),K=!0,Le||(xe=[_e(w,"click",s[21]),_e(p,"submit",it(s[28]))],Le=!0)},p(o,f){const de={};!t&&f[0]&256&&(t=!0,de.show=o[8],Re(()=>t=!1)),!n&&f[0]&16&&(n=!0,de.accessControl=o[4],Re(()=>n=!1)),e.$set(de);const me={};f[0]&2048&&(me.content=o[11].t("Back")),f[1]&8&&(me.$$scope={dirty:f,ctx:o}),g.$set(me);const F={};f[0]&2048&&(F.content=o[11].t("e.g. My Tools")),f[0]&2049|f[1]&8&&(F.$$scope={dirty:f,ctx:o}),I.$set(F),(!K||f[0]&2048)&&W!==(W=o[11].t("Access")+"")&&z(B,W);let ne=D;D=Ye(o),D===ne?ae[D].p(o,f):(mt(),j(ae[ne],1,1,()=>{ae[ne]=null}),ht(),$=ae[D],$?$.p(o,f):($=ae[D]=Fe[D](o),$.c()),L($,1),$.m(U,ue));const Y={};f[0]&2048&&(Y.content=o[11].t("e.g. Tools for performing various operations")),f[0]&2056|f[1]&8&&(Y.$$scope={dirty:f,ctx:o}),H.$set(Y);const ie={};f[0]&2&&(ie.value=o[1]),f[0]&512&&(ie.onChange=o[24]),f[0]&64&&(ie.onSave=o[25]),M.$set(ie),(!K||f[0]&2048)&&we!==(we=o[11].t("Warning:")+"")&&z(Ie,we),(!K||f[0]&2048)&&be!==(be=o[11].t("Tools are a function calling system with arbitrary code execution")+"")&&z(Te,be),(!K||f[0]&2048)&&ye!==(ye=o[11].t("don't install random tools from sources you don't trust.")+"")&&z(Ce,ye),(!K||f[0]&2048)&&ke!==(ke=o[11].t("Save")+"")&&z(De,ke);const he={};f[0]&2048|f[1]&8&&(he.$$scope={dirty:f,ctx:o}),!je&&f[0]&128&&(je=!0,he.show=o[7],Re(()=>je=!1)),x.$set(he)},i(o){K||(L(e.$$.fragment,o),L(g.$$.fragment,o),L(I.$$.fragment,o),L(b.$$.fragment,o),L($),L(H.$$.fragment,o),L(M.$$.fragment,o),L(x.$$.fragment,o),K=!0)},o(o){j(e.$$.fragment,o),j(g.$$.fragment,o),j(I.$$.fragment,o),j(b.$$.fragment,o),j($),j(H.$$.fragment,o),j(M.$$.fragment,o),j(x.$$.fragment,o),K=!1},d(o){o&&(d(u),d(a),d(Ve)),J(e,o),J(g),J(I),J(b),ae[D].d(),J(H),s[26](null),J(M),s[27](null),J(x,o),Le=!1,lt(xe)}}}function qt(s,e,t){let n;const u=ut("i18n");ct(s,u,l=>t(11,n=l));let a=null,i=!1,p=!1,{edit:v=!1}=e,{clone:y=!1}=e,{onSave:k=()=>{}}=e,{id:T=""}=e,{name:g=""}=e,{meta:q={description:""}}=e,{content:E=""}=e,{accessControl:I=null}=e,V="";const S=()=>{t(9,V=E)};let w,b=`import os
import requests
from datetime import datetime


class Tools:
    def __init__(self):
        pass

    # Add your custom tools using pure Python code here, make sure to add type hints
    # Use Sphinx-style docstrings to document your tools, they will be used for generating tools specifications
    # Please refer to function_calling_filter_pipeline.py file from pipelines project for an example

    def get_user_name_and_email_and_id(self, __user__: dict = {}) -> str:
        """
        Get the user name, Email and ID from the user object.
        """

        # Do not include :param for __user__ in the docstring as it should not be shown in the tool's specification
        # The session user object will be passed as a parameter when the function is called

        print(__user__)
        result = ""

        if "name" in __user__:
            result += f"User: {__user__['name']}"
        if "id" in __user__:
            result += f" (ID: {__user__['id']})"
        if "email" in __user__:
            result += f" (Email: {__user__['email']})"

        if result == "":
            result = "User: Unknown"

        return result

    def get_current_time(self) -> str:
        """
        Get the current time in a more human-readable format.
        :return: The current time.
        """

        now = datetime.now()
        current_time = now.strftime("%I:%M:%S %p")  # Using 12-hour format with AM/PM
        current_date = now.strftime(
            "%A, %B %d, %Y"
        )  # Full weekday, month name, day, and year

        return f"Current Date and Time = {current_date}, {current_time}"

    def calculator(self, equation: str) -> str:
        """
        Calculate the result of an equation.
        :param equation: The equation to calculate.
        """

        # Avoid using eval in production code
        # https://nedbatchelder.com/blog/201206/eval_really_is_dangerous.html
        try:
            result = eval(equation)
            return f"{equation} = {result}"
        except Exception as e:
            print(e)
            return "Invalid equation"

    def get_current_weather(self, city: str) -> str:
        """
        Get the current weather for a given city.
        :param city: The name of the city to get the weather for.
        :return: The current weather information or an error message.
        """
        api_key = os.getenv("OPENWEATHER_API_KEY")
        if not api_key:
            return (
                "API key is not set in the environment variable 'OPENWEATHER_API_KEY'."
            )

        base_url = "http://api.openweathermap.org/data/2.5/weather"
        params = {
            "q": city,
            "appid": api_key,
            "units": "metric",  # Optional: Use 'imperial' for Fahrenheit
        }

        try:
            response = requests.get(base_url, params=params)
            response.raise_for_status()  # Raise HTTPError for bad responses (4xx and 5xx)
            data = response.json()

            if data.get("cod") != 200:
                return f"Error fetching weather data: {data.get('message')}"

            weather_description = data["weather"][0]["description"]
            temperature = data["main"]["temp"]
            humidity = data["main"]["humidity"]
            wind_speed = data["wind"]["speed"]

            return f"Weather in {city}: {temperature}°C"
        except requests.RequestException as e:
            return f"Error fetching weather data: {str(e)}"
`;const C=async()=>{k({id:T,name:g,meta:q,content:E,access_control:I})},A=async()=>{if(w){t(1,E=V),await We();const l=await w.formatPythonCodeHandler();await We(),t(1,E=V),await We(),l&&(console.log("Code formatted successfully"),C())}};function W(l){p=l,t(8,p)}function B(l){I=l,t(4,I)}const te=()=>{pt("/workspace/tools")};function U(){g=this.value,t(0,g)}const D=()=>{t(8,p=!0)};function $(){T=this.value,t(2,T),t(0,g),t(5,v),t(15,y)}function ue(){q.description=this.value,t(3,q)}const H=l=>{t(9,V=l)},ge=()=>{a&&a.requestSubmit()};function se(l){Ee[l?"unshift":"push"](()=>{w=l,t(10,w)})}function M(l){Ee[l?"unshift":"push"](()=>{a=l,t(6,a)})}const ve=()=>{v?A():t(7,i=!0)};function G(l){i=l,t(7,i)}const oe=()=>{A()};return s.$$set=l=>{"edit"in l&&t(5,v=l.edit),"clone"in l&&t(15,y=l.clone),"onSave"in l&&t(16,k=l.onSave),"id"in l&&t(2,T=l.id),"name"in l&&t(0,g=l.name),"meta"in l&&t(3,q=l.meta),"content"in l&&t(1,E=l.content),"accessControl"in l&&t(4,I=l.accessControl)},s.$$.update=()=>{s.$$.dirty[0]&2&&E&&S(),s.$$.dirty[0]&32801&&g&&!v&&!y&&t(2,T=g.replace(/\s+/g,"_").toLowerCase())},[g,E,T,q,I,v,a,i,p,V,w,n,u,b,A,y,k,W,B,te,U,D,$,ue,H,ge,se,M,ve,G,oe]}class jt extends ft{constructor(e){super(),dt(this,e,qt,Vt,rt,{edit:5,clone:15,onSave:16,id:2,name:0,meta:3,content:1,accessControl:4},null,[-1,-1])}}export{jt as T};
//# sourceMappingURL=fV0qf1ip.js.map
