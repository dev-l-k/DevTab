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
    let ampm = "AM";
    if (hours >= 12){
        ampm = "PM";
    }else{
        ampm = "AM";
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