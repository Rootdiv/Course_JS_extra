(()=>{"use strict";var e,t,n,o,a,r,c,i,l,s,u,d,m,v,f;window.onload=function(e){var t=document.getElementById("timer-hours"),n=document.getElementById("timer-minutes"),o=document.getElementById("timer-seconds"),a=function(e){return e<10?"0"+e:e},r=function(){var t=new Date(e).getTime(),n=(new Date).getTime(),o=n>t,r=(t-n)/1e3,c=a(Math.floor(r%60)),i=a(Math.floor(r/60%60));return{timeRemaining:r,hours:a(Math.floor(r/60/60)),minutes:i,seconds:c,fullStop:o}},c=function(){var e=r();t.textContent=e.hours,n.textContent=e.minutes,o.textContent=e.seconds};if(r().timeRemaining>0){c();var i=setInterval((function(){r().fullStop?clearInterval(i):c()}),1e3)}else r().fullStop&&(document.getElementById("timer").style.color="#FF0000")}("14 March 2022"),v=document.querySelector("menu"),f=function(){v.classList.toggle("active-menu")},document.body.addEventListener("click",(function(e){var t=e.target;t.closest(".menu")||t.classList.contains("close-btn")?f():t.closest(".portfolio-content")||t.closest("footer")||(t.matches('[href^="#"]')?f():t.closest(".active-menu")||t.closest(".menu")||v.classList.remove("active-menu"))})),function(){var e=document.querySelector(".service"),t=document.querySelector(".popup"),n=document.querySelector(".popup-content"),o=parseInt(getComputedStyle(n).width)/2,a=Math.floor(o);n.style.transform="translateX(".concat(100+a,"%)");var r,c=100+a,i=function e(){r=requestAnimationFrame(e),(c-=2)>=0?n.style.transform="translateX(".concat(c,"%)"):cancelAnimationFrame(r)},l=function(){c=100+a,t.style.display="none",n.style.transform="translateX(".concat(100+a,"%)")};e.addEventListener("click",(function(e){e.target.matches(".popup-btn")&&(t.style.display="block",document.body.clientWidth>768?requestAnimationFrame(i):n.style.transform="translateX(0)")})),t.addEventListener("click",(function(e){var t=e.target;t.classList.contains("popup-close")?l():(t=t.closest(".popup-content"))||l()}))}(),function(){var e=document.querySelector("menu"),t=document.querySelector("main a"),n=function(e){var t=e.target.closest('[href^="#"]');if(t&&!t.matches('[href="#close"]')){var n,o=t.getAttribute("href").substring(1),a=document.getElementById(o).offsetTop,r=window.pageYOffset;requestAnimationFrame((function e(){n=requestAnimationFrame(e),(r+=15)<a?document.documentElement.scrollTop=r:cancelAnimationFrame(n)}))}};e.addEventListener("click",(function(e){e.preventDefault(),n(e)})),t.addEventListener("click",(function(e){e.preventDefault(),n(e)}))}(),s=document.querySelector(".service"),u=document.querySelectorAll(".service-header-tab"),d=document.querySelectorAll(".service-tab"),m=function(e){d.forEach((function(t,n){t.classList.contains("d-none")&&e===n?t.classList.remove("d-none"):t.classList.contains("d-none")||e!==n||t.classList.add("d-none")}))},s.addEventListener("click",(function(e){var t=e.target;(t=t.closest(".service-header-tab"))&&u.forEach((function(e,n){e.classList.contains("active")||e!==t?e.classList.contains("active")&&e!==t&&(e.classList.remove("active"),m(n)):(e.classList.add("active"),m(n))}))})),function(){for(var e=document.querySelector(".portfolio-content"),t=document.querySelectorAll(".portfolio-item"),n=document.querySelector(".portfolio-dots"),o=0;o<t.length;o++){var a=document.createElement("li");a.classList.add("dot"),0===o&&a.classList.add("dot-active"),n.append(a)}var r,c=document.querySelectorAll(".dot"),i=0,l=function(e,t,n){e[t].classList.remove(n)},s=function(e,t,n){e[t].classList.add(n)},u=function(){l(t,i,"portfolio-item-active"),l(c,i,"dot-active"),++i>=t.length&&(i=0),s(t,i,"portfolio-item-active"),s(c,i,"dot-active")},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;r=setInterval(u,e)};e.addEventListener("click",(function(e){e.preventDefault();var n=e.target;n.matches(".portfolio-btn, .dot")&&(l(t,i,"portfolio-item-active"),l(c,i,"dot-active"),n.matches("#arrow-right")?i++:n.matches("#arrow-left")?i--:n.matches(".dot")&&c.forEach((function(e,t){e===n&&(i=t)})),i>=t.length&&(i=0),i<0&&(i=t.length-1),s(t,i,"portfolio-item-active"),s(c,i,"dot-active"))})),e.addEventListener("mouseover",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearTimeout(r)})),e.addEventListener("mouseout",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&d()})),d(1500)}(),function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,n=document.querySelector(".calc-block"),o=document.querySelector(".calc-type"),a=document.querySelector(".calc-square"),r=document.querySelector(".calc-count"),c=document.querySelector(".calc-day"),i=document.getElementById("total"),l=0,s=function(){var n=0,s=1,u=1,d=o.options[o.selectedIndex].value,m=+a.value;if(r.value>1&&(s+=(r.value-1)/10),c.value&&c.value<5?u*=2:c.value&&c.value<10&&(u*=1.5),d&&m){n=t*d*m*s*u;var v=Math.round(n/100*24);e=setInterval((function(){l>=n?(clearInterval(e),i.textContent=Math.floor(n)):(l+=v,i.textContent=l)}),37)}else i.textContent=n};n.addEventListener("change",(function(t){var n=t.target;(n.matches("select")||n.matches("input"))&&(clearInterval(e),l=0,s())})),n.addEventListener("input",(function(e){e.target.matches("input")&&(e.target.value=e.target.value.replace(/\D/,""))}))}(100),i=document.getElementById("command"),l=function(e){if(e.target.closest(".command__photo")){var t=e.target.src;e.target.src=e.target.dataset.img,e.target.dataset.img=t}},i.addEventListener("mouseover",(function(e){l(e)})),i.addEventListener("mouseout",(function(e){l(e)})),t=function(e){var t=e.target;t.value=t.value.replace(/[^а-яё\s]/gi,"")},n=function(e){var t=e.target;t.value=t.value.split(/\s+/).map((function(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()})).join(" ")},o=function(e){var t=e.target;t.value=t.value.replace(/[^a-z0-9@\-_.!~*']/gi,"")},a=function(e){var t=e.target;t.value=t.value.replace(/^[\s-]+|[\s-]+$/gi,"").replace(/-+/g,"-")},r=function(e){var t=e.target;t.value=t.value.replace(/[^+\d]/g,"")},c=function(e){var t=e.target;t.value=t.value.replace(/^[\s]+|[\s\+]{1,}$/g,"")},document.body.addEventListener("click",(function(e){var i=e.target;i.matches('[placeholder="Ваше имя"]')?(i.addEventListener("input",t),i.addEventListener("blur",n)):i.matches('[placeholder~="E-mail"]')?(i.addEventListener("input",o),i.addEventListener("blur",a)):i.matches('[placeholder*="телефон"]')&&(i.addEventListener("input",r),i.addEventListener("blur",c))})),(e=document.getElementById("form2-message")).addEventListener("input",(function(){e.value=e.value.replace(/[^а-яё\d\s\-\?;:,.!]/gi,"")})),e.addEventListener("blur",(function(){e.value=e.value.trim().replace(/\s+/g," ").replace(/-+/g,"-")})),function(){var e=document.createElement("div");e.style.cssText="font-size: 2rem; color: #ffffff";document.body.addEventListener("submit",(function(t){t.preventDefault(),""!==t.target.querySelector('[placeholder~="E-mail"]').value.trim()&&function(t){t.appendChild(e),e.textContent="Загрузка...";var n=new FormData(t);t.reset();var o=function(){setTimeout((function(){return e.remove()}),5e3)};(function(e){return fetch("./server.php",{method:"POST",headers:{"Content-Type":"multipart/form-data"},body:e})})(n).then((function(n){if(200!==n.status)throw new Error("Status network not 200");e.textContent="Спасибо! Мы скоро с Вами свяжемся!",o(),setTimeout((function(){t.matches("#form3")&&(document.querySelector(".popup").style.display="none")}),5500)})).catch((function(t){e.textContent="Что-то пошло не так...",console.error(t),o()}))}(t.target)}))}()})();