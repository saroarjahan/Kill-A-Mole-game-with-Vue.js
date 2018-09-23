let app = new Vue({
  el: '#app',
  data: {
      holeNumber: [1,2,3,4,5,6],
      mode:[{'type':'Easy','speed':1100},{'type':'Medium','speed':900},{'type':'Hard','speed':400}],
      holeSelect:'',
      point:0,
      playButton : true,
      playAgainButton:false,
      interval:1100, 
      backSound:'notSet',
      enableSoundIcon:false,
      disableSoundIcon:false,
      ratImage:"./image/rat.png",
      startAudio:'./audio/start.mp3',
      hit:'./audio/hit.mp3',
      select:"./audio/select.wav",
      clickSound:'./audio/click.wav',
  },
 methods: {
    scoreUp:function(){
      this.ratImage='./image/hitRat.png';
      this.point= this.point+1;
      new Audio(this.hit).play(); //start gmae background sound play
    },
    play: function (){
      this.startGame();
      this.playButton = this.playAgainButton = false;
      this.point=0;
      new Audio(this.select).play();//click sound
      if (this.backSound==='notSet') {
          this.backSound = new Audio(this.startAudio); 
          this.backSound.loop= true;
          this.backSound.play();
          this.disableSoundIcon=true;
      }
    },
    speed: function(value){
      this.interval=value;
      new Audio(this.select).play();//click sound
    },
    mouseHoverSound: function(){
      new Audio(this.clickSound).play();//mouse Hover sound
    },
    soundOnOff:function(){ //sound on off
        if (this.enableSoundIcon==false) {
            this.backSound.muted = this.enableSoundIcon = true;
            this.disableSoundIcon = false;
        }else{
            this.backSound.muted = this.enableSoundIcon = false;
            this.disableSoundIcon = true;
        }
    },
    startGame: function(){ // Function for start game  
       var it = 0, howManyTimes = 20;
        function delay() {
            function holeIndex(min,max) {// function will return a random value
            return Math.floor(Math.random() * (max - min));
            } 
            app.holeSelect = holeIndex(0,7);//Get a random value
            app.ratImage='./image/rat.png';

            setTimeout(myTimer, app.interval); //set setime for head Up
            function myTimer() {app.holeSelect='';}
            
            it++;
            if( it < howManyTimes ){
                setTimeout( delay, app.interval );
            }

            if(it==20){
                app.endGame();
            }
        }

        delay();
    },   
    endGame: function (){ //function for end game and show play again button
         setTimeout(myTimer, app.interval); 
         function myTimer() {app.playAgainButton=true;}  
    },
  }
});