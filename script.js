const API_KEY="48556e3906024e638aa56f953cc274bb";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=>fetchNews("India"));  //it means whenever load will be called then it will call our function fetch news which will fetch news of india on calling load  
function reload(){
    window.location.reload();
}
 async function fetchNews(query){
    const response=await fetch(`${url}${query}&apiKey=${API_KEY}`);  //since we want like https://newsapi.org/v2/everything?q=tesla&from=2024-07-01&sortBy=publishedAt&apiKey=48556e3906024e638aa56f953cc274bb
    const data=await response.json(); //changing the response it get to json which is also await.
     console.log(data);
     bindData(data.articles); 
 }

 //fetch is an asynchronous funtion to fetch from other , since it wil, not fetch immediately thats why we have put await which is a promise that it will fetch the query soon.

 function bindData(articles){
    //jitne articles aayenge utne hi template banega or utne hi template main div mai append hoga.
    //clone of template will be made accrding to articles and append to main div.
    const cardContainer=document.getElementById('container-cards');
    const newsCardTemplate=document.getElementById('template-news-card');
    cardContainer.innerHTML=""; //whenever bind data is call it will empty the previous data cards and begin with new data cards.
    articles.forEach(article => {
        if(!article.urlToImage) return; //if images of article is not coming then we will return and not show those articles.
        const cardClone=newsCardTemplate.content.cloneNode(true); //clonenode=true means all cards element will be clone.header-card and content-card will get clone.
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone); //we have put the clone made in cardContainer. 
        
    });

 }

 function fillDataInCard(cardClone,article){
    const newsimg=cardClone.querySelector('#news-img');
    const newstitle=cardClone.querySelector('#news-title');
    const newssource=cardClone.querySelector('#news-source');
    const newsdesc=cardClone.querySelector('#news-desc');
    newsimg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;  //these .title,.description .publishedAt etc.. must be same from news api website 
    const date=new Date(article.publishedAt).toLocaleString("en-US" ,{timeZone:"Asia/Jakarta"}); //we get this time zone and en-us from google
    newssource.innerHTML=`${article.source.name} . ${date}`;
    // whenever we will click the cards it will send the data to the place from where data of news is taken 
    cardClone.firstElementChild.addEventListener('click' , () =>{
        window.open(article.url,"_blank");    
    })

 }
 let curSelectedNav=null;
 function onNavClick(id){
    fetchNews(id);
    const navItems=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItems;
    curSelectedNav.classList.add('active');

 }

 const searchbutton=document.getElementById("search-button");
 const search=document.getElementById("search-text");
 searchbutton.addEventListener("click" ,()=>{
    const query=search.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;

 })
