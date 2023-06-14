const player=new MusicPlayer(musicList);
const container=document.querySelector(".container");
const title =document.querySelector("#title");
const image =document.querySelector("#image");
const singer =document.querySelector("#singer");
const prev =document.querySelector("#prev");
const play =document.querySelector("#play");
const next =document.querySelector("#next");
const menuBar=document.querySelector("#menuBar");
const audio =document.querySelector("#audio")
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volumeBtn=document.querySelector("#volumeBtn");
const volumeBar=document.querySelector("#volumeBar");


window.addEventListener("load",()=>{
    let music =player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList)
});

function displayMusic(music){
    title.innerText=music.getName();
    singer.innerText=music.singer;
    image.src="img/"+ music.image;
    audio.src="mp3/"+ music.soundFile;
};

play.addEventListener("click",()=>{
   if(container.classList.contains("playing")){
        pauseMusic();
   } 
   else{
        playMusic();
   }

});

function pauseMusic(){
    container.classList.remove("playing");
    audio.pause();
    play.firstChild.classList="fa-solid fa-play";
}

function playMusic(){
    container.classList.add("playing");
    audio.play();
    play.firstChild.classList="fa-solid fa-pause";
}

function nextMusic(){
    player.next();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
}

function prevMusic(){
    player.prev();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
}

prev.addEventListener("click",()=>{
    prevMusic();
});
 next.addEventListener("click",()=>{
    nextMusic();
});

audio.addEventListener("ended",()=>{
    nextMusic();})

const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenenSaniye = saniye < 10 ? `0${saniye}`: `${saniye}`;
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});
progressBar.addEventListener("input",()=>{
    currentTime.textContent=calculateTime(progressBar.value)
    audio.currentTime=progressBar.value;


});

let volumeStatus="hasVoice";
volumeBtn.addEventListener("click",()=>{
    const volumeIcon=document.querySelector("#volumeIcon")
    if(volumeStatus==="hasVoice"){
        audio.muted=true;
        volumeStatus="noVoice";
        volumeIcon.classList=`fa-solid fa-volume-xmark`
        volumeBar.value=0;
    }
    else{
        audio.muted=false;
        volumeStatus="hasVoice";
        volumeIcon.classList=`fa-solid fa-volume-high`
        audio.volume=1;
        volumeBar.value=100;
    }
});
volumeBar.addEventListener("input",(e)=>{
    const voiceValue=(e.target.value)/100;
    audio.volume=voiceValue;
    if(voiceValue==0){
        volumeIcon.classList=`fa-solid fa-volume-xmark`
    }
    if(voiceValue>0){
        volumeIcon.classList=`fa-solid fa-volume-high`
        audio.muted=false;
    }
});


 function displayMusicList(musicList){
    const ul =document.querySelector(".list-group");
   
    musicList.forEach((music,index)=>{
    
            const li=`<li musicIndex="${index}" onclick="displayMusicFromList(this)" class="list-group-item d-flex justify-content-start shadow btn btn-primary "> 
                    <span>
                        ${music.getName()}
                    </span>
                   
                </li>`
            ul.innerHTML+=li
        }
        
    )};
    
function displayMusicFromList(_li){
    player.index =_li.getAttribute("musicIndex");
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
    isPlaying();
}
function isPlaying(){
    
    for (let li of document.querySelectorAll("li")){
        if(li.classList.contains("active")){
            li.classList.remove("active");
        }
        if(li.getAttribute("musicIndex")==player.index){
            li.classList.add("active");
        }
    }
}