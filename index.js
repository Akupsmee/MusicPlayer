const musicContainer = document.querySelector(".music-container")
const prevBtn = document.querySelector("#prev")
const playBtn = document.querySelector("#play")
const nextBtn = document.querySelector("#next")
const audio = document.querySelector("#audio")
const progress = document.querySelector(".progress")
const progressContainer = document.querySelector(".progress-container")
const title = document.querySelector("#title")
const cover = document.querySelector("#cover")

//songs title
const songs = ["Arise O Lord", "Elshaddai", "Grace", "In Control", "Is The Holy Ghost" ]

// keep track of songs
let songIndex = 4

// initially load songs into the DOM

loadSong(songs[songIndex])

// update song details
function loadSong(song){
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `img/${song}.jpg`
}

function playSong(){
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")
    audio.play()
}
function pauseSong(){
    musicContainer.classList.remove("play")
    playBtn.querySelector("i.fas").classList.add("fa-play")
    playBtn.querySelector("i.fas").classList.remove("fa-pause")
    audio.pause()  
}

function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length-1
    }
    loadSong(songs[songIndex])
    audio.play()
    
}

function nextSong(){
    songIndex++
    if(songIndex > songs.length -1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    audio.play()

}

function updateProgress(e){
    const {duration, currentTime}  = e.srcElement
    const progressPercent =(currentTime/duration ) * 100
    progress.style.width = `${progressPercent}%`

    const progressTime = document.querySelector(".progress-time")
    let firstTime = currentTime
    let secondTime = duration

    let firstTimeMins= Math.floor(firstTime / 60) //for the total value of currentTime each time we are dividing by 60
    let firstTimeSecs= Math.floor(firstTime % 60) //assigning the remainder of firstime % 60 to firstTimeSecs; modulo returns the remainder

    console.log(firstTimeMins);

    secondTime = (secondTime/60).toFixed(2)

    if(firstTimeSecs < 10 ){
        firstTimeSecs = "0"+ firstTimeSecs
    }
    progressTime.innerText = `${firstTimeMins}:${firstTimeSecs} / ${secondTime}`
    console.log(progressTime.innerText);
}

function setProgress(e){
    const width = this .clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    
    audio.currentTime = (clickX /width) * duration   
}


// Event listeners
playBtn.addEventListener("click", ()=>{
    const isPlaying = musicContainer.classList.contains("play")
    if(isPlaying){
        pauseSong()
    } else{
        playSong()
        }  
})

// change song

prevBtn.addEventListener("click", prevSong)

nextBtn.addEventListener("click", nextSong)

audio.addEventListener("timeupdate", updateProgress)

progressContainer.addEventListener("click", setProgress)

audio.addEventListener("ended", nextSong)

