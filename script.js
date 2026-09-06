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
    const minutes = now.getMinutes();
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
    try{
        const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
        const data = await res.json();
        const bgUrl =await data.media_type === "image" ? (data.hdurl || data.url);
    }
}