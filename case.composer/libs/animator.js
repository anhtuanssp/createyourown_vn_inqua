// animator.js: Demo animator controller
// Scott Schiller | schillmania.com | May 2009
// -------------------------------------------
// Provided free, "as-is", for any use. No warranty or support.
// http://www.schillmania.com/projects/javascript-animation-3/

writeDebug = (typeof console != 'undefined' && console.log && window.location.href.match(/debug=1/i))?function(sDebug) {
  // use #debug=1 etc. in URL to enable debug output for console.log()-supported shiz
  console.log(sDebug);
}:function() {
  // oh well
}

function Animator() {
  var self = this;
  var intervalRate = 20;
  this.tweenTypes = {
    'default': [1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1],
    'blast': [12,12,11,10,10,9,8,7,6,5,4,3,2,1],
    'linear': [10,10,10,10,10,10,10,10,10,10]
  }
  this.queue = [];
  this.queueHash = [];
  this.active = false;
  this.timer = null;
  this.createTween = function(start,end,type) {
    // return array of tween coordinate data (start->end)
    type = type||'default';
    var tween = [start];
    var tmp = start;
    var diff = end-start;
    var x = self.tweenTypes[type].length;
    for (var i=0; i<x; i++) {
      tmp += diff*self.tweenTypes[type][i]*0.01;
      tween[i] = {};
      tween[i].data = tmp;
      tween[i].event = null;
    }
    return tween;
  }

  this.enqueue = function(o,fMethod,fOnComplete) {
    // add object and associated methods to animation queue
    writeDebug('animator.enqueue()');
    if (!fMethod) {
      writeDebug('animator.enqueue(): missing fMethod');
    }

    self.queue.push(o);
    o.active = true;
  }

  this.animate = function() {
    var active = 0;
    for (var i=0,j=self.queue.length; i<j; i++) {
      if (self.queue[i].active) {
        self.queue[i].animate();
        active++;
      }
    }
    if (active == 0 && self.timer) {
      // all animations finished
      writeDebug('Animations complete');
      self.stop();
    } else {
      // writeDebug(active+' active');
    }
  }

  this.start = function() {
    if (self.timer || self.active) {
      writeDebug('animator.start(): already active');
      return false;
    }
    writeDebug('animator.start()'); // report only if started
    self.active = true;
    self.timer = setInterval(self.animate,intervalRate);
  }

  this.stop = function() {
    writeDebug('animator.stop()',true);
    // reset some things, clear for next batch of animations
    clearInterval(self.timer);
    self.timer = null;
    self.active = false;
    self.queue = [];
  }

}

var animator = new Animator();

function Animation(oParams) {
  // unique animation object
  /*
    oParams = {
      from: 200,
      to: 300,
      tweenType: 'default',
      ontween: function(value) { ... }, // method called each time
      oncomplete: function() { ... } // when finished
    }
  */
  var self = this;
  if (typeof oParams.tweenType == 'undefined') {
    oParams.tweenType = 'default';
  }
  this.ontween = (oParams.ontween||null);
  this.oncomplete = (oParams.oncomplete||null);
  this.tween = animator.createTween(oParams.from,oParams.to,oParams.tweenType);
  this.frameCount = animator.tweenTypes[oParams.tweenType].length;
  this.frame = 0;
  this.active = false;

  this.animate = function() {
    // generic animation method
    if (self.active) {
      if (self.ontween && self.tween[self.frame]) {
        self.ontween(self.tween[self.frame].data);
      }
      if (self.frame++ >= self.frameCount-1) {
        writeDebug('animation(): end');
        self.active = false;
        self.frame = 0;
        if (self.oncomplete) {
          self.oncomplete();
          // self.oncomplete = null;
        }
        return false;
      }
      return true;
    }
    return false;
  }

  this.start = function() {
    // add this to the main animation queue
    animator.enqueue(self,self.animate,self.oncomplete);
    if (!animator.active) {
      animator.start();
    }
  }

  this.stop = function() {
    self.active = false;
  }
  
}


// IMPLEMENNT CODE
// <div id="card" class="feedback">
//   <div class="card" >
//     <h1>Send me your idea!</h1>
//     <hr>
//     <form>
//       <div>
//         <label>Email</label><br/>
//         <input type="text" name="" value="" placeholder="Vui lòng nhập email của bạn">
//         <br/>
//         <label>Nội dung Feedback</label><br/>
//         <textarea name="" class="ta">
//         </textarea>
//         <br><br>
//         <button type="button " class="submit"><i class="ion-ios-paperplane-outline"></i> Gửi</button>
//       </div>
//     </form>
//   </div>
// </div>
//div#card {
//   position:absolute;
//   left:0px;
//   top:0px;
//   width:3em;
//   line-height:100%;
//   cursor:pointer;
//   background-color: rgba(37, 46, 44, 0.2);
//   background: rgba(37, 46, 44, 0.2);
//   z-index: 99;
//   display: none;
// }
// div#card .card{
//   margin-top: 10%
// }
// div.card {
//   margin: auto;
//   width: 495px;
//   min-height: 200px;
//   background-color: white;
//   border-radius: 2px;
//   box-shadow: 0px 3px 3px silver;
//   padding: 25px;
// }
// 

/**
 * Implement by tuantruong
 */
var popupAnimator = function(idWrapper){

  this.id = idWrapper;
  this.$el = $('#'+idWrapper);
  this.isFirstTime = true;

  this.getWindowCoords = function() {
    if (window.innerWidth || window.innerHeight) {
      return [window.innerWidth,window.innerHeight];
    } else {
      return [(document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth),(document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight)];
    }
  }

  this.animationCard =  function () {

    // DOM/coordinate references

    var winXY = this.getWindowCoords();
    var oBox = document.getElementById(this.id);
    var oBoxWidth = parseInt(oBox.offsetWidth);

    // generic tween functions

    function tweenLeftPX(o,value) {
      o.style.marginLeft = value+'px';
    }

    function tweenTopPX(o,value) {
      o.style.marginTop = value+'px';
    }

    function tweenLeftPercent(o,value) {
      o.style.left = value+'%';
      var offset = parseInt(oBoxWidth/2);
      o.style.marginLeft = '0px';
    }

    function tweenTopPercent(o,value) {
      o.style.top = value+'%';
    }

    function tweenWidthPercent(o,value) {
      o.style.width = parseInt(winXY[0]*value/100)+'px';
    }

    function tweenHeightPercent(o,value) {
      o.style.height = parseInt(winXY[1]*value/100)+'px';
    }

    // move box to middle of the screen

    var a = new Animation({
      from: 0,
      to: 50,
      tweenType: 'blast',
      ontween: function(value){
        tweenLeftPercent(oBox,value);
        oBox.style.marginLeft = -parseInt(oBox.offsetWidth/2)+'px';
      },
      oncomplete: function() {
        writeDebug('a.oncomplete()');
      }
    });

    var a2 = new Animation({
      from: 0,
      to: 50,
      ontween: function(value){
        tweenTopPercent(oBox,value);
      },
      oncomplete: function() {
        fs[0].start();
        fs[1].start();
      }
    });

    // "full-screen" animation

    var fs = [
      new Animation({
        from: 50,
        to: 0,
        tweenType: 'blast',
        ontween: function(value) {
          tweenLeftPercent(oBox,value);
          tweenTopPercent(oBox,value);
        }
      }),
      new Animation({
        from: 1,
        to: 100,
        tweenType: 'blast',
        ontween: function(value) {
          tweenWidthPercent(oBox,value);
          tweenHeightPercent(oBox,value);
          // oBox.style.fontSize = 16+(72*value/100)+'px';
          // oBox.style.lineHeight = parseInt(winXY[1]*value/100)+'px';
        },
        oncomplete: function() {
          oBox.style.left = '0px';
          oBox.style.top = '0px';
          oBox.style.width = '100%';
          oBox.style.height = '100%';
        }
      })
    ];

    // start ze animations
    this.$el.show();


    a.start();
    a2.start();

    return this;

  }

  this.redoAnimationCard = function () {
    var o = document.getElementById(this.id);
    o.style.width = '3em';
    o.style.height = 'auto';
    o.style.left = '0px';
    o.style.top = '0px';
    // this.$el.hide();

    // this.animationCard(this.id);

    return this;
  }

  this.bindEvent = function(callbackClose){

    var that = this;

    this.$el.click(function(event) {
      var target = event.target;

      if($(target).attr('id') == that.id){
        that.$el.hide();
        that.isFirstTime = false;

        that.redoAnimationCard();
        if(callbackClose && typeof(callbackClose) == 'function')
          callbackClose.call(that);
      }
    });

    return this;
  }

  this.show = function(){
    this.$el.show();
  }
  this.hide = function(){
    this.redoAnimationCard();
    this.$el.hide();
  }

  this.$el.hide();

  return this;

}