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
const repeatBtn=$('.btn-repeat')
const playlist=$('.playlist')
const PLAYER_STORAGE_KEY='Vinh'
//const playlist = $('.playlist')
const app = {
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    //config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))||{}
    config:  {},
    songs: [
        {
            name: "Tháng 1 của anh",
            singer: "Khói",
            //path: "http://hi5.1980s.fm/;",
            path:"music/Thang-1-Cua-Anh-Khoi.mp3",
            image: "https://static2.yan.vn/YanNews/202012/202012170248422078-3c50e436-2eee-4666-b87e-93460a35ab65.png"
        },
        {
            name: "Bệnh của anh",
            singer: "Khói",
            path: "music/Benh-Cua-Anh-Khoi.mp3",
            image:
                "https://static2.yan.vn/YanNews/202012/202012170248422078-3c50e436-2eee-4666-b87e-93460a35ab65.png"
        },
        {
            name: "25",
            singer: "Táo, Masew",
            path:
                "music/25-Masew-Mix-Tao-Masew.mp3",
            image: "https://static2.yan.vn/YanNews/202012/202012170248422078-3c50e436-2eee-4666-b87e-93460a35ab65.png"
        },
        {
            name: "Tháng 7 của anh",
            singer: "Khói",
            path: "music/Thang-7-Cua-Anh-Masew-Mix-Khoi-Masew.mp3",
            image:
                "hhttps://static2.yan.vn/YanNews/202012/202012170248422078-3c50e436-2eee-4666-b87e-93460a35ab65.png"
        },
        {
            name: "Như ngày đó",
            singer: "Binz, Khói",
            path: "music/Nhu-Ngay-Do-Binz-Khoi-ItsLee.mp3",
            image:
                "https://static2.yan.vn/YanNews/202012/202012170248422078-3c50e436-2eee-4666-b87e-93460a35ab65.png"
        },
        {
            name: "Rời xa",
            singer: "Binz, Khói",
            path:
                "music/Roi-Xa-Binz-ItsLee-Khoi.mp3",
            image:
                "https://static2.yan.vn/YanNews/202012/202012170248422078-3c50e436-2eee-4666-b87e-93460a35ab65.png"
        },
        {
            name: "Tài liệu không có tiêu đề",
            singer: "Khói",
            path: "music/NgheNhacMp3.Org - Tài Liệu Không Có Tiêu Đề.mp3",
            image:
                "https://static2.yan.vn/YanNews/202012/202012170248422078-3c50e436-2eee-4666-b87e-93460a35ab65.png"
        }
    ],
    setConfig:function(key,value){
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
        //localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
        //localStorage.setItem(PLAYER_STORAGE_KEY,this.config)
    }
    ,
    render: function(){
        const htmls=this.songs.map((song,index)=>{
            return `
            <div class="song ${index===this.currentIndex ? 'active':''}" data-index="${index}">
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
        playlist.innerHTML = htmls.join("");
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
                const progressPercent= Math.floor((audio.currentTime / audio.duration) * 100)
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
                //audio.play()
            }else{
                _this.nextSong()
                
            }
            audio.play()
            _this.render()
            _this.scrollActiveSong()
            
            
        }
        prevBtn.onclick=function(){
            if(_this.isRandom){
                _this.randomSong()
                //audio.play()
            }else{
                _this.nextSong()
                //audio.play()
            }
            audio.play()
            _this.scrollActiveSong()
            
        }
        //khi click random
        randomBtn.onclick=function(e){
            _this.isRandom= !_this.isRandom
            //_this.setConfig('isRandom',_this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)

        }
        //lap bai hat
        repeatBtn.onclick=function(e){
            _this.isRepeat=!_this.isRepeat
           // _this.setConfig('isRepeat',_this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
            
        }
        //xu ly next song khi audio ended
        audio.onended=function(){
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
            
        }
        //lang nghe hanh vi click vao playlist c
        playlist.onclick=function(e){
            const songNode=e.target.closest(".song:not(.active)")
            //xu ly khi click vao song
            if(songNode||!e.target.closest('.option')){
                if(songNode){
                    _this.currentIndex=Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                    
                }

                if(e.target.closest('.option')){

                }

            }

            //xu ly khi click vao option
        }

    }
    ,
    loadCurrentSong(){
        heading.textContent = this.currentSong.name;
           cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
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
    loadConfig(){
        this.isRandom=this.config.isRandom
        this.isRepeat=this.config.isRepeat
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
    scrollActiveSong(){

        if(this.currentIndex===this.songs[0] ||this.currentIndex===this.songs[1]||this.currentIndex===this.songs[2])
        {
            setTimeout(function(){
                $('.song.active').scrollIntoView({
                    behavior:'smooth',
                    block:'nearest'
                })
            },300)
        }else{
            setTimeout(function(){
                $('.song.active').scrollIntoView({
                    behavior:'smooth',
                    block:'center'
                })
            },500)
        }



    }
    ,
    start:function(){
        //load cau hinh
        this.loadConfig()
        //Định nghĩa thuộc tính cho Object
        this.defineProperties()
        //Lắng nghe, xử lý các sự kiên
        this.handleEvent()
        //Tai thong tin bai hat dau tien vao UI khi chay ung dung
        this.loadCurrentSong()
        //render lại playlist
        this.render()

        //hienthi trang thai ban dau cua button repeat va random
        repeatBtn.classList.toggle('active', this.isRepeat)
        randomBtn.classList.toggle('active', this.isRandom)
    }
    
}
app.start()

