// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading=$('header h2')
const cdThumb=$('.cd-thumb')
const audio=$("#audio");
const cd=$('.cd')
const playBtn=$('.btn-toggle-play')
const player=$('.player')
const progress=$('.progress')
const nextBtn=$('.btn-next')
const prevBtn=$('.btn-prev')
const randomBtn=$('.btn-random')
//const playlist = $('.playlist')
const app = {
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    songs: [
        {
            name: "Tháng 1 của anh",
            singer: "Khói",
            //path: "http://hi5.1980s.fm/;",
            path:"music/Thang-1-Cua-Anh-Khoi.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Bệnh của anh",
            singer: "Khói",
            path: "music/Benh-Cua-Anh-Khoi.mp3",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "25",
            singer: "Táo, Masew",
            path:
                "music/25-Masew-Mix-Tao-Masew.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path:
                "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image:
                "https://nguoi-noi-tieng.com/photo/tieu-su-ca-si-khoi-9807.jpg"
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
    ],
    render: function(){
        const htmls=this.songs.map(song=>{
            return `
            <div class="song">
            <div class="thumb"
                style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
            `
        })
        $('.playlist').innerHTML=htmls.join('')
    }
    ,
    defineProperties:function(){
        Object.defineProperty(this,'currentSong',{
            get:function(){
                return this.songs[this.currentIndex]
            }
        })
    }
    ,
    handleEvent:function(){
        const _this=this
        const cdWidth=cd.offsetWidth
        
        //xu ly cd quay
        const cdThumAnimate=cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ],{
            duration:10000, //1980s
            iterations:Infinity
        })
        cdThumAnimate.pause()
        //Xử lý phóng to thu nhỏ cd
        document.onscroll=function(){
           
           const scrollTop= document.documentElement.scrollTop ||window.scrollY
            const newCdWidth=cdWidth-scrollTop
            cd.style.width=newCdWidth>0 ? newCdWidth + 'px': 0
            cd.style.opacity=newCdWidth/cdWidth
        }
        //Xử lý khi click play
        playBtn.onclick=function(){
            if(_this.isPlaying){
                audio.pause()
            }else{
                audio.play()
                
            }

        }
        //khi play 
        audio.onplay=function(){
            _this.isPlaying=true
            player.classList.add('playing')
            cdThumAnimate.play()
        }
        audio.onpause=function(){
            _this.isPlaying=false
            player.classList.remove('playing')
            cdThumAnimate.pause()
        }
        //khi tiến độ bài hát thay đổi
        audio.ontimeupdate=function(){
            if(audio.duration){
                const progressPercent=Math.floor((audio.duration/audio.currentTime ) * 100)
                progress.value=progressPercent

            }
            //console.log((audio.currentTime / audio.duration) * 100)
        }
        //tua bài hát
        progress.onchange=function(e){
          
           const seekTime=audio.duration /100 *  progress.value
           audio.currentTime=seekTime
        }
        //khi next song
        nextBtn.onclick=function(){
            if(_this.isRandom){
                _this.randomSong()
                audio.play()
            }else{
                _this.nextSong()
                audio.play()
            }
            
            
        }
        prevBtn.onclick=function(){
            if(_this.isRandom){
                _this.randomSong()
                audio.play()
            }else{
                _this.nextSong()
                audio.play()
            }
            
        }
        //khi click random
        randomBtn.onclick=function(e){
            _this.isRandom= !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)

        }
        //xu ly next song khi audio ended
        audio.onended=function(){
            
        }
    }
    ,
    loadCurrentSong(){

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImange=`url('${this.currentSong.image}')`
        audio.src=this.currentSong.path
        console.log(heading,cdThumb,audio)
    }
    ,
    nextSong(){
        this.currentIndex++
        if(this.currentIndex>=this.songs.length){
            this.currentIndex=0
        }
        this.loadCurrentSong()
    }
    ,
    prevSong(){
        this.currentIndex--
        if(this.currentIndex<0){
            this.currentIndex=this.songs.length-1
        }
        this.loadCurrentSong()
    }
    ,
    randomSong(){
        let newIndex;
        do{
            newIndex=Math.floor(Math.random()*this.songs.length)
        }while(newIndex===this.currentIndex){
            this.currentIndex=newIndex
            this.loadCurrentSong()
        }
    }
    ,
    start:function(){
        //Định nghĩa thuộc tính cho Object
        this.defineProperties()
        //Lắng nghe, xử lý các sự kiên
        this.handleEvent()
        //Tai thong tin bai hat dau tien vao UI khi chay ung dung
        this.loadCurrentSong()
        //render lại playlist
        this.render()
    }
    
}
app.start()

