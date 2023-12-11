import{a as h,S as b,i as a}from"./assets/vendor-5f0e12e0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();h.defaults.baseURL="https://pixabay.com/api/";const v="41181401-cfbb9dc400356a899a7dc1037",f=40,m=async(o,e)=>{try{return(await h.get(`?key=${v}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${f}`)).data}catch(s){console.log(s)}},w=document.querySelector(".search-form"),l=document.querySelector('[name="searchQuery"]'),u=document.querySelector(".gallery"),n=document.querySelector(".load-more");n.style.display="none";const y=new b(".gallery a");let i=0;const p={message:"Sorry, there are no images matching your search query. Please try again.",color:"red",position:"center"};w.addEventListener("submit",async o=>{o.preventDefault(),n.style.display="none";const e=l.value.trim();if(!e){a.show({...p,message:"Enter word for search"}),l.value="";return}u.innerHTML="",i+=1;try{const s=await m(e,i);if(s.hits.length)a.show({message:`Hooray! We found ${s.totalHits} images.`,position:"topRight",color:"green"});else{a.show(p);return}s.hits.length===f?n.style.display="block":(a.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"green"}),n.style.display="none");const c=g(s);u.insertAdjacentHTML("beforeend",c),y.refresh()}catch{}});l.addEventListener("input",()=>{i=0});n.addEventListener("click",async()=>{i+=1;try{const o=await m(l.value.trim(),i);o.hits.length!==f&&(n.style.display="none",a.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"green"}));const e=g(o);u.insertAdjacentHTML("beforeend",e),y.refresh()}catch(o){console.log(o)}});function g(o){if(o.hits.length)return o.hits.map(e=>`
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
