const player = new MusicPlayer(musicList);

let music = player.getMusic();

window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music);
    displayPlayList(player.musicList);
    isPlayingNow();
})

function displayMusic(music) {
    music_title.innerText = music.title;
    music_singer.innerText = music.singer;
    image.src = `img/${music.img}`;
    audio.src = `mp3/${music.file}`;
}

play.addEventListener('click', () => {
    let isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
})

function pauseMusic() {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

function playMusic() {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

next.addEventListener("click", () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    setTimeout(() => {
        playMusic();
    }, 500);
    isPlayingNow();
});

prev.addEventListener("click", () => {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    setTimeout(() => {
        playMusic();
    }, 500);
    isPlayingNow();
});

function calculateTime(seconds) {
    let time = Math.floor(seconds);
    time = time / 60;
    let timeMain = Math.trunc(time);
    let timeDeci = time - timeMain;
    timeDeci = Math.round(timeDeci * 60);
    let newTimeDeci = timeDeci < 10 ? `0${timeDeci}` : timeDeci; 
    return `${timeMain}.${newTimeDeci}`; 
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progress_bar.max = Math.floor(audio.duration);
})


audio.addEventListener('timeupdate', () => {
    progress_bar.value = Math.floor(audio.currentTime);
    current_time.textContent = calculateTime(progress_bar.value);
    if (audio.ended) {
        play.querySelector('i').classList = "fa-solid fa-rotate";
        container.classList.remove('playing');
        let timeOut = setTimeout(() => {next.click()}, 4000);
        audio.onplay = function () {
            clearTimeout(timeOut);
        }
    }
})

progress_bar.addEventListener("input", () => {
    current_time.textContent = calculateTime(progress_bar.value);
    audio.currentTime = progress_bar.value;
})

//* Ses
volume_bar.addEventListener("input", (event) => {
    let val = event.target.value;
    audio.volume = val / 100;
    if (val == 0) {
        volume_icon.classList = "fa-solid fa-volume-xmark";
    }
    else {
        volume_icon.classList = "fa-solid fa-volume-high";
    }
})

let muteState = "unmuted";
volume_icon.addEventListener("click", () => {
    if (muteState == "unmuted") {
        audio.muted = true;
        muteState = 'muted';
        volume_icon.classList = "fa-solid fa-volume-xmark";
        volume_bar.value = 0;
    }
    else {
        audio.muted = false;
        muteState = 'unmuted';
        volume_icon.classList = "fa-solid fa-volume-high";
        volume_bar.value = audio.volume * 100;
    }
})

if (audio.ended == true) {
    setTimeout(function() {
        console.log('aa')
    }, 2000)
}

function displayPlayList(list) {
    for (let i = 0; i < list.length; i++) {
        let li = `<li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
        <span>${list[i].getName()}</span>
        <span class="badge bg-primary rounded-pill" id="music${i}"></span>
        <audio class='music${i}' src='mp3/${list[i].file}'></audio>
        </li>`
        
        ul.insertAdjacentHTML('beforeend', li);

        let liAudioDuration = ul.querySelector(`#music${i}`);
        let liAudioSpan = ul.querySelector(`.music${i}`);

        liAudioSpan.addEventListener('loadeddata', () => {
            liAudioDuration.innerText = calculateTime(liAudioSpan.duration);
        })
    }
}

function displayPlayListAgain(list) {
    for (let i = (list.length - 1); i < list.length; i++) {
        let li = `<li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
        <span>${list[i].getName()}</span>
        <span class="badge bg-primary rounded-pill" id="music${i}"></span>
        <audio class='music${i}' src='mp3/${list[i].file}'></audio>
        </li>`
        
        ul.insertAdjacentHTML('beforeend', li);

        let liAudioDuration = ul.querySelector(`#music${i}`);
        let liAudioSpan = ul.querySelector(`.music${i}`);

        liAudioSpan.addEventListener('loadeddata', () => {
            liAudioDuration.innerText = calculateTime(liAudioSpan.duration);
        })
    }
}

function selectedMusic(li) {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

function isPlayingNow() {
    for (let i = 0; i < ul.querySelectorAll('li').length; i++) {
        if (ul.querySelectorAll('li')[i].classList.contains('bg-primary')) {
            ul.querySelectorAll('li')[i].classList.remove('bg-primary');
            ul.querySelectorAll('li')[i].classList.remove('text-white');
        }

        if (ul.querySelectorAll('li')[i].getAttribute("li-index") == player.index) {
            ul.querySelectorAll('li')[i].classList.add('bg-primary');
            ul.querySelectorAll('li')[i].classList.add('text-white');
        }
    }
} 

ul.style.cursor = 'pointer';
function showFile() {
    let deneme = document.getElementById('file').value;
    console.log(deneme);
}
