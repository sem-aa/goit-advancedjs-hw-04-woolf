import{a as p,S as g,i as f}from"./assets/vendor-5f0e12e0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();p.defaults.baseURL="https://pixabay.com/api/";const b="41181401-cfbb9dc400356a899a7dc1037",c=40,m=(s,e)=>p.get(`?key=${b}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${c}`).then(r=>r.data),L=document.querySelector(".search-form"),d=document.querySelector('[name="searchQuery"]'),l=document.querySelector(".gallery"),n=document.querySelector(".load-more");n.style.display="none";const y=new g(".gallery a");let a=0;const v={message:"Sorry, there are no images matching your search query. Please try again.",color:"red",position:"center"};L.addEventListener("submit",async s=>{s.preventDefault(),l.innerHTML="",a+=1;const e=await m(d.value,a);if(e.hits.length)f.show({message:`Hooray! We found ${e.totalHits} images.`,position:"topRight",color:"green"});else{f.show(v);return}e.hits.length===c?n.style.display="block":n.style.display="none";const r=h(e);l.insertAdjacentHTML("beforeend",r),y.refresh()});d.addEventListener("input",()=>{a=0});n.addEventListener("click",async()=>{a+=1;const s=await m(d.value,a);s.hits.length!==c&&(n.style.display="none");const e=h(s);l.insertAdjacentHTML("beforeend",e),y.refresh()});function h(s){if(s.hits.length)return s.hits.map(e=>`
            <a href=${e.largeImageURL}>
                <div class="photo-card">
                    <img class="image" src=${e.webformatURL} alt=${e.tags} loading="lazy" />
                        <div class="info">
                            <p class="info-item">
                                Likes
                                <b>${e.likes}</b>
                            </p>
                            <p class="info-item">
                                Views
                                <b>${e.views}</b>
                            </p>
                            <p class="info-item">
                                Comments
                                <b>${e.comments}</b>
                            </p>
                            <p class="info-item">
                                Downloads
                                <b>${e.downloads}</b>
                            </p>
                        </div>
                </div>  
            </a>
  `).join("")}
//# sourceMappingURL=commonHelpers.js.map
