const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".name"),
    musicArtist = wrapper.querySelector(".artist"),
    musicAudio = wrapper.querySelector("#main-audio"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = wrapper.querySelector(".progress-bar"),
    musicList = wrapper.querySelector(".music-list"),
    showMoreBtn = wrapper.querySelector("#more-music"),
    hideMoreBtn = musicList.querySelector("#close");

    let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow();
})

function loadMusic(indexNumb) {
    musicName.innerHTML = allMusic[indexNumb - 1].name;
    musicArtist.innerHTML = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
    musicAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}
// play music function
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerHTML = "pause";
    musicAudio.play();
}
function nextMusic() {
    // here we'll just increment of index by 1
    musicIndex++;
    // if music index is less than 1 then musicIndex will be array length so the last song will play
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex)
    playMusic();
    playingNow();
}
function prevMusic() {
    // here we'll just decrement of index by 1
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex)
    playMusic();
    playingNow();
}

// pause music function
function pauseMusic() {
    wrapper.classList.remove("pause");
    playPauseBtn.querySelector("i").innerHTML = "play_arrow";
    musicAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
});

// next music function
nextBtn.addEventListener("click", () => {
    nextMusic();
});
prevBtn.addEventListener("click", () => {
    prevMusic();
});

// update progress bar width according to music current time
musicAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; //getting current time of song
    const duration = e.target.duration; //getting total duration of song
    let progessWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progessWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

    musicAudio.addEventListener("loadeddata", () => {
        //update song total duration
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) { //adding 0 if sec is less than 10
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    //update playing song total current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { //adding 0 if sec is less than 10
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});
// update the playing song current time on according to the progress bar width
progressArea.addEventListener("click", (e) => {
    let progressWidthwal = progressArea.clientWidth; //getting width of progress bar
    let clickedOffSetX = e.offsetX; //getting offset x value
    let songDuration = musicAudio.duration; //getting song total duration

    musicAudio.currentTime = (clickedOffSetX / progressWidthwal) * songDuration;
    playMusic();
})
// lets work on repeat shuffle and other icon
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    // first we get the innerText of the icon then we'll change accordingly
    let getText = repeatBtn.innerText; //getting innerText of icon
    // lets do diff changes on different icon click using switch
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one": //if icon is repeat_one for the shuffle
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "repeat_one": //if icon is repeat_one for the shuffle
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

//above we just changed the icon, now let's work on what to do after the song ended

musicAudio.addEventListener("ended", () => {
    // we'll do according to the icon means if user has set icon to loop song then we'll repeat the current song and will do further accordingly

    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one": //if icon is repeat_one for the shuffle
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle": //if icon is repeat_one for the shuffle
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});
//after the song ended
musicAudio.addEventListener("ended", () => {
    // if the user has set icon on loop song then we'll repeat the current
    // song and will do further accordingly
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat": //if this icon is repeat then simply we call the nextMusic function so that next song will play
            nextMusic();
            break;
        case "repeat_one": //if icon is repeat_one for then we'll change current playing song current time to 0 so song will play from beginning 
            musicAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle": //if icon is repeat_one for the shuffle
            //generating random index between the max range of array length
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex = randIndex); // this loop run until the next random number won't be the same of current music index
            musicIndex = randIndex; // passsing randomIndex to musicIndex so the random song will play
            loadMusic(musicIndex); //calling load music function
            playMusic();
            playingNow();
            break;
    }
});

showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

hideMoreBtn.addEventListener("click", () => {
    showMoreBtn.click();
});
const ulTag = wrapper.querySelector("ul");

//lets create li according to the array length
for (let i = 0; i < allMusic.length; i++) {
    //let pass the song name, artist from th array to li
    let liTag = `<li li-index="${i + 1}">
     <div class="row">
         <span>${allMusic[i].name}</span>
         <p>${allMusic[i].artist}</p>
     </div>
     <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
     <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
 </li> `;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src} `);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src} `);

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) { //adding 0 if sec is less than 10
            totalSec = `0${totalSec}`;
        };
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        //adding t duration attribute which we'll use below
        liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);

    });
}

//let work on play particular song on click
const allLiTags = ulTag.querySelector("li");
function playingNow() {
    for (let j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector(".audio.duration");
        if (allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing");
            //lets get that audio duration value and pass to .audio-duration innertext
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration; //passing t-duration value to audio duration innerText
        }
        if (allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }

        //adding attribute to all li tags
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

//lets play song on li click
function clicked(element) {
    //getting li index of particular clicked li tag
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; //passing that liindex to musicIndex
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}
