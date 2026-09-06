const DEFAULT_BOOKMARKS = [
    { name: 'GitHub',url:'https://github.com'},
    {name:'hackclub',url:'https://hackclub.com'},
    {name:'YouTube',url:'https://youtube.com'},
    {name:'Instagram',url:'https://instagram.com'}
];

const clockElement= document.getElementById("clock");
const greetingElement = document.getElementById("greeting");
const apodTitleElement = document.getElementById("apod-title");
const bookmarksGrid = document.getElementById("bookmarks-grid");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const modal = document.getElementById("bookmark-modal");
const bookmarkForm =document.getElementById("bookmark-form");
const titleInput = document.getElementById('bm-title');
const urlInput=document.getElementById("bm-url");

function updateClock(){
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = "am";
    if (hours >= 12){
        ampm = "pm";
    }else{
        ampm = "am";
    }
    hours = hours % 12;
    if (hours===0){
        hours = 12;
    }

    if (minutes<10){
        minutes="0"+minutes;
    }
    const formattedHours = String(hours).padStart(2,'0');
    clockElement.innerHTML= `${formattedHours}:${minutes} <span class ='ampm'>${ampm}</span>`;
    const hr = now.getHours();
    let greeting = "Good Evening";
    if (hr>=5&&hr<12){
        greeting="Good Morning";

    }else if (hr>=12&&hr<18){
        greeting="Good Aternoon";
    
    }
    greetingElement.textContent = `${greeting}, devloper`;
    
}
async function loadNASAWallpaper() {
    const today = new Date().toISOString().split('T')[0];
    const cache = localStorage.getItem('devtab_apod');
    if (cache){
        const parsed = JSON.parse(cache);
        if (parsed.date === today && parsed.url){
            applyBackground(parsed.url,parsed.title);
            return;
        }
    }
    
        const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
        const data = await res.json();
        const bgUrl = data.media_type === "image" ? (data.hdurl || data.url):null;
        const title= data.title || 'NASA Astronomy Picture';
        localStorage.setItem('devtab_apod',JSON.stringify({date:today,url:bgUrl,title}));
        applyBackground(bgUrl,title);

}
function applyBackground(url,title){
    document.body.style.backgroundImage = `url("${url}")`;
    apodTitleElement.textContent = title;

}
function getBookmarks(){
    const data = localStorage.getItem('devtab_bookmarks');
    return data ? JSON.parse(data) : DEFAULT_BOOKMARKS;

}
function saveBookmarks(bookmarks){
    localStorage.setItem('devtab_bookmarks',JSON.stringify(bookmarks));
    renderBookmarks();

}
function renderBookmarks(){
    const bookmarks = getBookmarks();
    bookmarksGrid.innerHTML="";
    bookmarks.forEach((bm,index) => {
        let hostname ="";
        try{
            hostname = new URL(bm.url).hostname;
        }catch{
            hostname = bm.url;
        }
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
        const card = document.createElement('a');
        card.className='bookmark-item';
        card.href=bm.url;
        card.target='_blank';
        card.rel = 'noopener noreferer';
        card.innerHTML = `
        <img src = "${faviconUrl}">
        <span>${bm.name}</span>
        <button class = "delete-bm-btn" data-index = "${index}">X</button>

        `;
        card.querySelector('.delete-bm-btn').addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteBookmark(index);

        });
        bookmarksGrid.appendChild(card);


    });
}
function addBookmark(name,url){
    let formattedUrl=url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)){
        formattedUrl="https://${formattedUrl}";
        
    }
    const bookmarks=getBookmarks();
    bookmarks.push({name:name.trim(),url:formattedUrl});
    saveBookmarks(bookmarks);
}
function deleteBookmark(index){
    const bookmarks = getBookmarks();
    bookmarks.splice(index,1);
    saveBookmarks(bookmarks);

}
openModalBtn.addEventListener("click",() => {
    modal.classList.remove('hidden');
});
closeModalBtn.addEventListener("click",()=>{
    modal.classList.add('hidden');

});
modal.addEventListener("click",(e)=>{
    if (e.target===modal){
        modal.classList.add('hidden');
        bookmarkForm.reset();

    }

});
bookmarkForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    addBookmark(titleInput.value,urlInput.value);
    modal.classList.add('hidden');
    bookmarkForm.reset();

});
setInterval(updateClock,1000);
updateClock();
loadNASAWallpaper();
renderBookmarks();