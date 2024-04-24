(()=>{"use strict";function e(e,t){const n=document.querySelector(e);n.classList.add("show"),n.classList.remove("hide"),document.body.style.overflow="hidden",t&&clearInterval(t)}function t(e){const t=document.querySelector(e);t.classList.add("hide"),t.classList.remove("show"),document.body.style.overflow=""}window.addEventListener("DOMContentLoaded",(()=>{const n=setTimeout((()=>e(".modal",n)),5e4);(function(e,t,n,o){const s=document.querySelectorAll(e),r=document.querySelectorAll(t),a=document.querySelector(n);function c(){r.forEach((e=>{e.classList.add("hide"),e.classList.remove("show","fade")})),s.forEach((e=>{e.classList.remove(o)}))}function i(e=0){r[e].classList.add("show","fade"),r[e].classList.remove("hide"),s[e].classList.add(o)}c(),i(),a.addEventListener("click",(t=>{const n=t.target;n&&n.classList.contains(e.slice(1))&&s.forEach(((e,t)=>{n==e&&(c(),i(t))}))}))})(".tabheader__item",".tabcontent",".tabheader__items","tabheader__item_active"),function(n,o,s){const r=document.querySelectorAll(n),a=document.querySelector(o);r.forEach((t=>{t.addEventListener("click",(()=>e(o,s)))})),a.addEventListener("click",(e=>{e.target!==a&&""!=e.target.getAttribute("data-close")||t(o)})),document.addEventListener("keydown",(e=>{"Escape"===e.code&&a.classList.contains("show")&&t(o)})),window.addEventListener("scroll",(function t(){window.pageYOffset+document.documentElement.clientHeight>=document.documentElement.scrollHeight-1&&(e(o,s),window.removeEventListener("scroll",t))}))}("[data-modal]",".modal",n),function(e,t){function n(e){return e>=0&&e<10?`0${e}`:e}!function(e,t){const o=document.querySelector(e),s=o.querySelector("#days"),r=o.querySelector("#hours"),a=o.querySelector("#minutes"),c=o.querySelector("#seconds"),i=setInterval(l,1e3);function l(){const e=function(e){let t,n,o,s;const r=Date.parse(e)-Date.parse(new Date);return r<=0?(t=0,n=0,o=0,s=0):(t=Math.floor(r/864e5),n=Math.floor(r/36e5%24),o=Math.floor(r/1e3/60%60),s=Math.floor(r/1e3%60)),{total:r,days:t,hours:n,minutes:o,seconds:s}}(t);s.innerHTML=n(e.days),r.innerHTML=n(e.hours),a.innerHTML=n(e.minutes),c.innerHTML=n(e.seconds),e.total<=0&&clearInterval(i)}l()}(e,t)}(".timer","2023-05-11"),function(){class e{constructor(e,t,n,o,s,r,...a){this.src=e,this.alt=t,this.title=n,this.descr=o,this.price=s,this.classes=a,this.parent=document.querySelector(r),this.transfer=27,this.changeToUAH()}changeToUAH(){this.price=this.price*this.transfer}render(){const e=document.createElement("div");0===this.classes.length?(this.element="menu__item",e.classList.add(this.element)):this.classes.forEach((t=>e.classList.add(t))),e.innerHTML=`\n            <img src=${this.src} alt=${this.alt}>\n            <h3 class="menu__item-subtitle">${this.title}</h3>\n            <div class="menu__item-descr">${this.descr}</div>\n            <div class="menu__item-divider"></div>\n            <div class="menu__item-price">\n                <div class="menu__item-cost">Цена:</div>\n                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>\n            </div>\n        `,this.parent.append(e)}}(async(e,t)=>{const n=await fetch(e);if(!n.ok)throw new Error(`Could not fetch ${e}, status: ${n.status}`);return await n.json()})("https://my-json-server.typicode.com/systemshock89/food/menu").then((t=>{t.forEach((({img:t,altimg:n,title:o,descr:s,price:r})=>{new e(t,n,o,s,r,".menu .container").render()}))}))}(),function(){const e=document.querySelector(".calculating__result span");let t,n,o,s,r;function a(e,t){document.querySelectorAll(e).forEach((e=>{e.classList.remove(t),e.getAttribute("id")===localStorage.getItem("sex")&&e.classList.add(t),e.getAttribute("data-ratio")===localStorage.getItem("ratio")&&e.classList.add(t)}))}function c(){e.textContent=t&&n&&o&&s&&r?"female"===t?Math.round((447.6+9.2*o+3.1*n-4.3*s)*r):Math.round((88.36+13.4*o+4.8*n-5.7*s)*r):"____"}function i(e,n){const o=document.querySelectorAll(e);o.forEach((e=>{e.addEventListener("click",(e=>{e.target.getAttribute("data-ratio")?(r=+e.target.getAttribute("data-ratio"),localStorage.setItem("ratio",+e.target.getAttribute("data-ratio"))):(t=e.target.getAttribute("id"),localStorage.setItem("sex",e.target.getAttribute("id"))),o.forEach((e=>e.classList.remove(n))),e.target.classList.add(n),c()}))}))}function l(e){const t=document.querySelector(e);t.addEventListener("input",(()=>{switch(t.value.match(/\D/g)?t.style.border="1px solid red":t.style.border="none",t.getAttribute("id")){case"height":n=+t.value;break;case"weight":o=+t.value;break;case"age":s=+t.value}c()}))}localStorage.getItem("sex")?t=localStorage.getItem("sex"):(t="female",localStorage.setItem("sex","female")),localStorage.getItem("ratio")?r=localStorage.getItem("ratio"):(r=1.375,localStorage.setItem("ratio",1.375)),a("#gender div","calculating__choose-item_active"),a(".calculating__choose_big div","calculating__choose-item_active"),c(),i("#gender div","calculating__choose-item_active"),i(".calculating__choose_big div","calculating__choose-item_active"),l("#height"),l("#weight"),l("#age")}(),function(n,o){function s(n){const s=document.querySelector(".modal__dialog");s.classList.add("hide"),e(".modal",o);const r=document.createElement("div");r.classList.add("modal__dialog"),r.innerHTML=`\n            <div class="modal__content">\n                <div data-close class="modal__close">&times;</div>\n                <div class="modal__title">${n}</div>\n            </div>\n        `,document.querySelector(".modal").append(r),setTimeout((()=>{r.remove(),s.classList.add("show"),s.classList.remove("hide"),t("modal")}),4e3)}document.querySelectorAll(n).forEach((e=>{var t;(t=e).addEventListener("submit",(e=>{e.preventDefault();const n=document.createElement("img");n.src="img/form/spinner.svg",n.style.cssText="\n                display: block;\n                margin: 0 auto;\n            ",t.insertAdjacentElement("afterend",n);const o=new FormData(t);(async(e,t)=>{const n=await fetch("http://localhost:3000/requests",{method:"POST",headers:{"Content-type":"application/json"},body:t});return await n.json()})(0,JSON.stringify(Object.fromEntries(o.entries()))).then((e=>{s("Спасибо! Скоро мы с Вами свяжемся"),n.remove()})).catch((()=>{s("Что-то пошло не так...")})).finally((()=>{t.reset()}))}))}))}("form",n),function({container:e,slide:t,nextArrow:n,prevArrow:o,totalCounter:s,currentCounter:r,wrapper:a,field:c}){const i=document.querySelectorAll(t),l=document.querySelector(e),d=document.querySelector(o),u=document.querySelector(n),m=document.querySelector(s),h=document.querySelector(r),f=document.querySelector(a),g=document.querySelector(c),v=window.getComputedStyle(f).width;let _=1,y=0;i.length<10?(m.textContent=`0${i.length}`,h.textContent=`0${_}`):(m.textContent=i.length,h.textContent=_),g.style.width=100*i.length+"%",g.style.display="flex",g.style.transition="0.5s all",f.style.overflow="hidden",i.forEach((e=>{e.style.width=v})),l.style.position="relative";const p=document.createElement("ol"),L=[];p.classList.add("carousel-indicators"),l.append(p);for(let e=0;e<i.length;e++){const t=document.createElement("li");t.setAttribute("data-slide-to",e+1),t.classList.add("dot"),p.append(t),0==e&&(t.style.opacity=1),L.push(t)}function w(e){return+e.replace(/\D/g,"")}function S(e){e.length<10?h.textContent=`0${_}`:h.textContent=_}function E(e){e.forEach((e=>e.style.opacity=".5")),e[_-1].style.opacity="1"}u.addEventListener("click",(()=>{y==w(v)*(i.length-1)?y=0:y+=w(v),g.style.transform=`translateX(-${y}px)`,_==i.length?_=1:_++,S(i),E(L)})),d.addEventListener("click",(()=>{0==y?y=w(v)*(i.length-1):y-=w(v),g.style.transform=`translateX(-${y}px)`,1==_?_=i.length:_--,S(i),E(L)})),L.forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.getAttribute("data-slide-to");_=t,y=w(v)*(t-1),g.style.transform=`translateX(-${y}px)`,S(i),E(L)}))}))}({container:".offer__slider",nextArrow:".offer__slider-next",prevArrow:".offer__slider-prev",totalCounter:"#total",currentCounter:"#current",wrapper:".offer__slider-wrapper",slide:".offer__slide",field:".offer__slider-inner"})}))})();