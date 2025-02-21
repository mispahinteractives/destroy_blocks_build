(()=>{"use strict";class t extends Phaser.Scene{width=null;height=null;handlerScene=null;sceneStopped=!1;constructor(){super({key:"boot"})}init(){}preload(){}create(){this.scene.stop("boot"),this.scene.launch("preload")}}class e extends Phaser.Scene{width=null;height=null;handlerScene=null;sceneStopped=!1;constructor(){super({key:"preload"})}init(){var t=document.createElement("style");document.head.appendChild(t),t.sheet.insertRule('@font-face { font-family: "Flame_Regular"; src: url("fonts/Flame_Regular.ttf") format("truetype"); }\n',0)}preload(){this.load.image("bg","assets/bg.png"),this.load.image("blue","assets/blue.png"),this.load.image("bg2","assets/bg2.png"),this.load.image("yellow","assets/yellow.png"),this.load.image("red","assets/red.png"),this.load.image("white","assets/white.png"),this.load.atlas("sheet","assets/sheet.png","assets/sheet.json"),this.load.script("webfont","lib/webfont.js"),this.load.plugin("rextagtextplugin","lib/rextagtextplugin.min.js",!0),this.load.audio("countdown","sounds/countdown.mp3"),this.load.audio("break","sounds/break.mp3"),this.canvasWidth=this.sys.game.canvas.width,this.canvasHeight=this.sys.game.canvas.height,this.width=this.game.screenBaseSize.width,this.height=this.game.screenBaseSize.height,this.sceneStopped=!1,this.load.on("progress",(t=>{})),this.load.on("complete",(()=>{}))}create(){this.firstTime=!1;let t=this;WebFont.load({custom:{families:["Flame_Regular"]},active:function(){t.scene.stop("preload"),t.scene.launch("GameScene")}})}}class s extends Phaser.GameObjects.Container{constructor(t,e,s,i){super(t),this.scene=t,this.x=e,this.y=s,this.gameScene=i,this.scene.add.existing(this),this.init()}init(){this.bg=this.scene.add.sprite(0,0,"bg2"),this.bg.setOrigin(.5),this.add(this.bg),this.logo=this.scene.add.sprite(0,-250,"sheet","title"),this.logo.setOrigin(.5),this.logo.setScale(1),this.add(this.logo),this.playBtn=this.scene.add.sprite(0,35,"sheet","play"),this.playBtn.setOrigin(.5),this.playBtn.setScale(.9),this.add(this.playBtn),this.line=this.scene.add.sprite(0,165,"sheet","line"),this.line.setOrigin(.5),this.line.setScale(.9),this.add(this.line),this.playBtn.setInteractive(),this.playBtn.on("pointerdown",(()=>{this.ctaClick(this.playBtn)})),this.visible=!1}ctaClick(t){this.done||(t.disableInteractive(),this.scene.restart(),this.done=!0,this.scene.time.addEvent({delay:1e4,callback:()=>{this.done=!1,t.setInteractive()}}))}show(){this.visible||(this.visible=!0,this.scene.hideUI(),this.alpha=0,this.logo.alpha=0,this.line.alpha=0,this.playBtn.alpha=0,this.scene.tweens.add({targets:this,alpha:{from:0,to:1},ease:"Linear",duration:200,onComplete:()=>{this.scene.tweens.add({targets:this.logo,alpha:{from:0,to:1},y:{from:this.logo.y-500,to:this.logo.y},ease:"Back.easeOut",duration:200,onComplete:()=>{this.scene.tweens.add({targets:this.playBtn,alpha:{from:0,to:1},scale:{from:0,to:this.playBtn.scale},ease:"Linear",duration:200,onComplete:()=>{this.scene.tweens.add({targets:this.playBtn,scale:{from:this.playBtn.scale,to:this.playBtn.scale+.1},ease:"Linear",duration:700,yoyo:!0,repeat:-1}),this.scene.tweens.add({targets:this.line,alpha:{from:0,to:1},scale:{from:0,to:this.line.scale},ease:"Linear",duration:200})}})}})}}))}hide(){this.scene.tweens.add({targets:this,alpha:{from:1,to:0},ease:"Linear",duration:100,onComplete:()=>{this.alpha=1,this.visible=!1}})}}const i={texts:[{tuto1:"Tap on the canon to change \nthe colour of the shooting ball",tuto2:"Change the colour of the ball to \nmatch the colour of the incoming \nblock to destroy it.",tuto3:"Destroy the blocks before \nit reaches the bottom!",score:"Score : "}]},h={gameWidth:540,gameHeight:960},a={gameWidth:960,gameHeight:540};class r extends Phaser.GameObjects.Container{constructor(t,e,s,i,h){super(t),this.scene=t,this.dimensions=h,this.x=e,this.y=s,this.gameScene=i,this.scene.add.existing(this),this.init()}init(){this.blocksArr=[],this.circleArr=[],this.colors=["red","yellow"],this.blockWidth=470,this.blockHeight=50,this.blockSpacing=70,this.blockSpeed=1e3,this.ballSpeed=1e3,this.ballDelay=1e3,this.emitterBallSpeed=80,this.score=0,this.currentColorType=this.colors[0];for(let t=0;t<4;t++)this.createBlocks();this.addShooter(),this.text=this.scene.add.text(-230,350,this.scene.text.texts[0].score,{fontFamily:"Arial",fontSize:"40px",color:"#ffffff",stroke:"#c00b00",strokeThickness:5}),this.text.setOrigin(0,.5),this.add(this.text),this.scoreText=this.scene.add.text(-230,400,this.score,{fontFamily:"Arial",fontSize:"40px",color:"#ffffff",stroke:"#c00b00",strokeThickness:5}),this.scoreText.setOrigin(0,.5),this.add(this.scoreText),this.line=this.scene.add.sprite(0,290,"sheet","line"),this.line.setOrigin(.5).setScale(1),this.add(this.line),this.visible=!1}show(){this.visible||(this.visible=!0)}startGame(){this.gameStarted=!0,this.hand.visible=!1,this.createBlocks(),this.createSmallCircle(),this.blockLoop=this.scene.time.addEvent({delay:this.blockSpeed,callback:this.createBlocks,callbackScope:this,loop:!0}),this.circleLoop=this.scene.time.addEvent({delay:this.ballDelay,callback:this.createSmallCircle,callbackScope:this,loop:!0})}createBlocks(){if(this.gameOver)return;const t=Math.floor(Math.random()*this.colors.length),e=this.colors[t];let s;s=this.blocksArr.length>0?this.blocksArr[this.blocksArr.length-1].y:-655;for(let t=0;t<this.blocksArr.length;t++)this.blocksArr[t].y+=this.blockSpacing;let i=this.scene.add.sprite(0,s,"sheet",e);i.setOrigin(.5),this.add(i),i.colorType=e,this.blocksArr.push(i),this.adjustSpeed(),this.blocksArr[0].y>=210&&(this.blockLoop&&this.blockLoop.remove(),this.circleLoop&&this.circleLoop.remove(),this.gameOver=!0,console.log("Game Over!"),setTimeout((()=>{this.scene.cta.show()}),250))}adjustSpeed(){0!==this.blocksArr.length&&this.blocksArr[0].y>=-300&&(this.blockSpeed=Math.max(400,this.blockSpeed-5),this.ballSpeed=Math.max(400,this.ballSpeed-5),this.emitterBallSpeed=Math.max(5,this.emitterBallSpeed-5))}createSmallCircle(){const t=this.shooter.y-80;let e=this.scene.add.sprite(0,t,this.currentColorType);e.setOrigin(.5),this.add(e),e.x=0,e.y=t,e.colorType=this.currentColorType,this.currentBall=e,this.circleArr.push(e);const s=this.scene.add.particles(0,0,"white",{speed:this.emitterBallSpeed,lifespan:800,scale:{start:1,end:0},alpha:{start:.9,end:0},quantity:1,frequency:50,maxParticles:30});this.add(s),e.emitter=s,s.startFollow(e),this.bringToTop(e),this.scene.tweens.add({targets:this.shooter,y:this.shooter.y-15,duration:100,yoyo:!0,ease:"Power1"}),e.tween=this.scene.tweens.add({targets:e,y:e.y-1e3,duration:this.ballSpeed,ease:"Linear",onUpdate:()=>this.checkCollisions(e),onComplete:()=>{s.stop(),s.destroy()}})}checkCollisions(t){this.blocksArr.forEach((e=>{let s=new Phaser.Geom.Rectangle(e.x,e.y,e.width,e.height),i=new Phaser.Geom.Circle(t.x,t.y,t.radius);Phaser.Geom.Intersects.CircleToRectangle(i,s)&&(this.circleArr=this.circleArr.filter((t=>t!==i)),t.tween.stop(),t.destroy(),this.handleCircleBlockCollision(t,e))}))}handleCircleBlockCollision(t,e){this.shooter.type==e.colorType?(this.createCollisionEffect(e,e.x,e.y,e.colorType),this.circleArr=this.circleArr.filter((e=>e!==t)),this.blocksArr=this.blocksArr.filter((t=>t!==e)),t.tween&&t.tween.stop(),t.emitter&&t.emitter.destroy(),t.destroy(),e.destroy(),this.scene.sound.play("break",{volume:3}),this.score++,this.scoreText.setText(this.score)):(this.circleArr=this.circleArr.filter((e=>e!==t)),t.tween&&t.tween.stop(),t.destroy(),t.emitter&&t.emitter.destroy())}createCollisionEffect(t,e,s,i){const h={type:"random",source:new Phaser.Geom.Rectangle(e-t.width/2,s-t.height/2,t.width,t.height),quantity:25},a=this.scene.add.particles(0,0,i,{speed:24,lifespan:250,quantity:25,scale:{start:.4,end:0},emitZone:h,duration:100,emitting:!1});this.add(a),a.start(100)}addShooter(){this.shooterBg=this.scene.add.sprite(0,450,"sheet","ball_thrower/thrower_bg"),this.shooterBg.setOrigin(.5),this.add(this.shooterBg),this.shooter=this.scene.add.sprite(0,395,"sheet","ball_thrower/"+this.currentColorType),this.shooter.setOrigin(.5),this.add(this.shooter),this.hand=this.scene.add.sprite(70,440,"sheet","hand"),this.hand.setOrigin(.5),this.hand.angle=-40,this.add(this.hand),this.scene.tweens.add({targets:this.hand,scale:{from:this.hand.scale,to:this.hand.scale-.1},ease:"Linear",duration:700,yoyo:!0,repeat:-1,onComplete:()=>{}}),this.shooter.type=this.currentColorType,this.shooter.setInteractive(),this.shooter.on("pointerdown",(t=>{this.onShooterClick()}))}onShooterClick(){this.gameStarted&&("yellow"==this.shooter.type?(this.shooter.setFrame("ball_thrower/red"),this.circleArr.forEach((t=>{t.setTexture("red")})),this.currentColorType=this.colors[0],this.shooter.type=this.currentColorType):(this.shooter.setFrame("ball_thrower/yellow"),this.circleArr.forEach((t=>{t.setTexture("yellow")})),this.currentColorType=this.colors[1],this.shooter.type=this.currentColorType))}}class l extends Phaser.GameObjects.Container{constructor(t,e,s,i,h){super(t),this.scene=t,this.x=e,this.y=s,this.gameScene=i,this.dimensions=h,this.scene.add.existing(this),this.init()}init(){this.frameGrp=this.scene.add.container(0,0),this.add(this.frameGrp),this.frame=this.scene.add.sprite(0,-100,"sheet","tutorial/panel"),this.frame.setOrigin(.5),this.frame.setScale(1),this.frameGrp.add(this.frame),this.tutorialText=this.scene.add.text(0,290,this.scene.text.texts[0].tuto1,{fontFamily:"Flame_Regular",fontSize:33,fill:"#ffffff",align:"center",stroke:"#c00b00",strokeThickness:4}),this.tutorialText.setOrigin(.5),this.add(this.tutorialText),this.tutorialText.visible=!1,this.circleArr=[];let t=-22;for(let e=0;e<3;e++){let e=this.scene.add.sprite(t,140,"sheet","tutorial/4");e.setOrigin(.5),e.setScale(1.25),this.frameGrp.add(e);let s=this.scene.add.sprite(t,140,"sheet","tutorial/3");s.setOrigin(.5),s.setScale(1.25),this.frameGrp.add(s),this.circleArr.push(e),e.whiteCircle=s,t+=22}this.circleArr[1].whiteCircle.visible=!1,this.circleArr[2].whiteCircle.visible=!1,this.addTutorial(),this.hand=this.scene.add.sprite(this.shooter.x+100,this.shooter.y+185,"sheet","hand"),this.hand.setOrigin(.5,1),this.hand.setScale(1),this.hand.angle=-25,this.add(this.hand),this.hand.alpha=0,setTimeout((()=>{this.tutorialText.visible=!0,this.scene.tweens.add({targets:this.tutorialText,scaleX:{from:0,to:this.tutorialText.scaleX},ease:"Back.easeOut",duration:250,onComplete:()=>{this.runTween=!1,this.showTutorial()}})}),20)}stopTimer(){this.timer1&&this.scene.time.removeEvent(this.timer1),this.timer2&&this.scene.time.removeEvent(this.timer2),this.timer3&&this.scene.time.removeEvent(this.timer3),this.timer4&&this.scene.time.removeEvent(this.timer4),this.timer5&&this.scene.time.removeEvent(this.timer5),this.timer6&&this.scene.time.removeEvent(this.timer6)}stopTween(){this.showTween&&(this.showTween.stop(),this.showTween=""),this.hideTween&&(this.hideTween.stop(),this.hideTween="")}show(){this.visible=!0,this.runTween=!0,this.timer5=this.scene.time.addEvent({delay:300,callback:()=>{this.tutorialText.visible=!0,this.scene.tweens.add({targets:this.tutorialText,scaleX:{from:0,to:this.tutorialText.scaleX},ease:"Back.easeOut",duration:250,onComplete:()=>{this.runTween=!1,this.showTutorial()}})}})}hide(){this.visible&&(this.runTween=!0,this.tutorialText.visible=!1,this.runTween=!1,this.visible=!1,this.x=0,this.shooter.setFrame("ball_thrower/red"),this.redBall.setTexture("red"))}addTutorial(){this.bottomUi=this.scene.add.sprite(0,75,"sheet","ball_thrower/thrower_bg"),this.bottomUi.setOrigin(.5),this.bottomUi.setScale(1),this.frameGrp.add(this.bottomUi),this.redBall=this.scene.add.sprite(0,20,"red"),this.redBall.setOrigin(.5),this.redBall.setScale(1),this.frameGrp.add(this.redBall),this.shooter=this.scene.add.sprite(0,30,"sheet","ball_thrower/red"),this.shooter.setOrigin(.5),this.shooter.setScale(1),this.frameGrp.add(this.shooter),this.redBlock=this.scene.add.sprite(0,-275,"sheet","red"),this.redBlock.setOrigin(.5),this.redBlock.setScale(.65),this.frameGrp.add(this.redBlock),this.redBlock.visible=!1,this.yellowBlock=this.scene.add.sprite(0,-315,"sheet","yellow"),this.yellowBlock.setOrigin(.5),this.yellowBlock.setScale(.65),this.frameGrp.add(this.yellowBlock),this.yellowBlock.visible=!1}handTween(){this.scene.tweens.add({targets:this.hand,alpha:1,ease:"Linear",duration:250,onComplete:()=>{this.scene.tweens.add({targets:this.hand,scale:{from:this.hand.scale,to:this.hand.scale-.1},ease:"Linear",duration:250,yoyo:!0,onComplete:()=>{}})}})}showTutorial(){this.showredBall(),this.timer4=this.scene.time.addEvent({delay:1500,callback:()=>{this.showYellowBall(),this.timer1=this.scene.time.addEvent({delay:1e3,callback:()=>{this.hand.visible=!1,this.timer6=this.scene.time.addEvent({delay:2500,callback:()=>{}})}})}})}showredBall(){this.hand.visible=!0,this.handTween(),this.timer2=this.scene.time.addEvent({delay:350,callback:()=>{this.redBall.visible=!0,this.shooter.setFrame("ball_thrower/red"),this.redBall.visible=!0,this.redBall.setTexture("red"),this.redBall.y=20,this.scene.tweens.add({targets:this.shooter,y:{from:this.shooter.y,to:this.shooter.y-10},ease:"Linear",duration:100,yoyo:!0}),this.scene.tweens.add({targets:this.redBall,y:{from:this.redBall.y,to:this.redBlock.y},ease:"Linear",duration:350,onComplete:()=>{this.redBall.visible=!1}})}})}showYellowBall(){this.handTween(),this.timer3=this.scene.time.addEvent({delay:350,callback:()=>{this.shooter.setFrame("ball_thrower/yellow"),this.redBall.visible=!0,this.redBall.setTexture("yellow"),this.redBall.y=20,this.scene.tweens.add({targets:this.shooter,y:{from:this.shooter.y,to:this.shooter.y-10},ease:"Linear",duration:100,yoyo:!0}),this.scene.tweens.add({targets:this.redBall,y:{from:this.redBall.y,to:this.yellowBlock.y},ease:"Linear",duration:350,onComplete:()=>{this.yellowBlock.visible=!1,this.redBall.visible=!1}})}})}}class o extends Phaser.GameObjects.Container{constructor(t,e,s,i,h){super(t),this.scene=t,this.x=e,this.y=s,this.gameScene=i,this.dimensions=h,this.scene.add.existing(this),this.init()}init(){this.frameGrp=this.scene.add.container(0,0),this.add(this.frameGrp),this.frame=this.scene.add.sprite(0,-100,"sheet","tutorial/panel"),this.frame.setOrigin(.5),this.frame.setScale(1),this.frameGrp.add(this.frame),this.tutorialText=this.scene.add.text(0,305,this.scene.text.texts[0].tuto2,{fontFamily:"Flame_Regular",fontSize:33,fill:"#ffffff",align:"center",stroke:"#c00b00",strokeThickness:4}),this.tutorialText.setOrigin(.5),this.add(this.tutorialText),this.tutorialText.visible=!1,this.circleArr=[];let t=-22;for(let e=0;e<3;e++){let e=this.scene.add.sprite(t,140,"sheet","tutorial/4");e.setOrigin(.5),e.setScale(1.25),this.frameGrp.add(e);let s=this.scene.add.sprite(t,140,"sheet","tutorial/3");s.setOrigin(.5),s.setScale(1.25),this.frameGrp.add(s),this.circleArr.push(e),e.whiteCircle=s,t+=22}this.circleArr[0].whiteCircle.visible=!1,this.circleArr[2].whiteCircle.visible=!1,this.addTutorial(),this.hand=this.scene.add.sprite(this.shooter.x+100,this.shooter.y+185,"sheet","hand"),this.hand.setOrigin(.5,1),this.hand.setScale(1),this.hand.angle=-25,this.add(this.hand),this.hand.visible=!1,this.visible=!1}stopTimer(){this.timer1&&this.scene.time.removeEvent(this.timer1),this.handTimer&&this.scene.time.removeEvent(this.handTimer),this.timer2&&this.scene.time.removeEvent(this.timer2),this.timer3&&this.scene.time.removeEvent(this.timer3),this.timer4&&this.scene.time.removeEvent(this.timer4),this.timer5&&this.scene.time.removeEvent(this.timer5),this.timer6&&this.scene.time.removeEvent(this.timer6)}show(){this.visible||(this.visible=!0,this.runTween=!0,this.timer6=this.scene.time.addEvent({delay:250,callback:()=>{this.tutorialText.visible=!0,this.scene.tweens.add({targets:this.tutorialText,scaleX:{from:0,to:this.tutorialText.scaleX},ease:"Back.easeOut",duration:250,onComplete:()=>{this.runTween=!1,this.showTutorial2()}})}}))}hide(){this.visible&&(this.runTween=!0,this.tutorialText.visible=!1,this.runTween=!1,this.redBlock.y=-275,this.yellowBlock.y=-315,this.visible=!1,this.x=0,this.shooter.setFrame("ball_thrower/red"),this.redBall.setTexture("red"))}addTutorial(){this.bottomUi=this.scene.add.sprite(0,75,"sheet","ball_thrower/thrower_bg"),this.bottomUi.setOrigin(.5),this.bottomUi.setScale(1),this.frameGrp.add(this.bottomUi),this.redBall=this.scene.add.sprite(0,20,"red"),this.redBall.setOrigin(.5),this.redBall.setScale(1),this.frameGrp.add(this.redBall),this.shooter=this.scene.add.sprite(0,30,"sheet","ball_thrower/red"),this.shooter.setOrigin(.5),this.shooter.setScale(1),this.frameGrp.add(this.shooter),this.redBlock=this.scene.add.sprite(0,-275,"sheet","red"),this.redBlock.setOrigin(.5),this.redBlock.setScale(.65),this.frameGrp.add(this.redBlock),this.redBlock.visible=!1,this.yellowBlock=this.scene.add.sprite(0,-315,"sheet","yellow"),this.yellowBlock.setOrigin(.5),this.yellowBlock.setScale(.65),this.frameGrp.add(this.yellowBlock),this.yellowBlock.visible=!1}handTween(){this.handTimer=this.scene.time.addEvent({delay:100,callback:()=>{this.hand.visible=!0,this.scene.tweens.add({targets:this.hand,scale:{from:this.hand.scale,to:this.hand.scale-.1},ease:"Linear",duration:250,yoyo:!0,onComplete:()=>{this.hand.visible=!1}})}})}showTutorial2(){this.handTween(),this.redBlock.visible=!0,this.yellowBlock.visible=!0,this.redBall.y=20,this.timer2=this.scene.time.addEvent({delay:350,callback:()=>{this.scene.tweens.add({targets:this.yellowBlock,y:{from:this.yellowBlock.y,to:this.redBlock.y},ease:"Linear",duration:350}),this.scene.tweens.add({targets:this.redBlock,y:{from:this.redBlock.y,to:this.redBlock.y+40},ease:"Linear",duration:350,onComplete:()=>{this.timer3=this.scene.time.addEvent({delay:1400,callback:()=>{this.scene.tweens.add({targets:this.yellowBlock,y:{from:this.yellowBlock.y,to:this.redBlock.y},ease:"Linear",duration:350})}})}}),this.scene.tweens.add({targets:this.shooter,y:{from:this.shooter.y,to:this.shooter.y-10},ease:"Linear",duration:100,yoyo:!0}),this.redBall.visible=!0,this.scene.tweens.add({targets:this.redBall,y:{from:this.redBall.y,to:this.redBlock.y+40},ease:"Linear",duration:350,onComplete:()=>{this.redBlock.visible=!1,this.redBall.visible=!1,this.timer4=this.scene.time.addEvent({delay:1e3,callback:()=>{this.handTween(),this.timer5=this.scene.time.addEvent({delay:350,callback:()=>{this.shooter.setFrame("ball_thrower/yellow"),this.redBall.visible=!0,this.redBall.setTexture("yellow"),this.redBall.y=20,this.scene.tweens.add({targets:this.shooter,y:{from:this.shooter.y,to:this.shooter.y-10},ease:"Linear",duration:100,yoyo:!0}),this.scene.tweens.add({targets:this.redBall,y:{from:this.redBall.y,to:this.yellowBlock.y+40},ease:"Linear",duration:350,onComplete:()=>{this.yellowBlock.visible=!1,this.redBall.visible=!1,this.timer1=this.scene.time.addEvent({delay:3e3,callback:()=>{}})}})}})}})}})}})}adjust(){this.x=this.dimensions.gameWidth/2,this.y=this.dimensions.gameHeight/2}}class n extends Phaser.GameObjects.Container{constructor(t,e,s,i,h){super(t),this.scene=t,this.x=e,this.y=s,this.gameScene=i,this.dimensions=h,this.scene.add.existing(this),this.init()}init(){this.blocksArr=[],this.frameGrp=this.scene.add.container(0,0),this.add(this.frameGrp),this.frame=this.scene.add.sprite(0,-100,"sheet","tutorial/panel"),this.frame.setOrigin(.5),this.frame.setScale(1),this.frameGrp.add(this.frame),this.tutorialText=this.scene.add.text(0,305,this.scene.text.texts[0].tuto3,{fontFamily:"Flame_Regular",fontSize:33,fill:"#ffffff",align:"center",stroke:"#c00b00",strokeThickness:4}),this.tutorialText.setOrigin(.5),this.add(this.tutorialText),this.tutorialText.visible=!1,this.circleArr=[];let t=-22;for(let e=0;e<3;e++){let e=this.scene.add.sprite(t,140,"sheet","tutorial/4");e.setOrigin(.5),e.setScale(1.25),this.frameGrp.add(e);let s=this.scene.add.sprite(t,140,"sheet","tutorial/3");s.setOrigin(.5),s.setScale(1.25),this.frameGrp.add(s),this.circleArr.push(e),e.whiteCircle=s,t+=22}this.circleArr[0].whiteCircle.visible=!1,this.circleArr[1].whiteCircle.visible=!1,this.addTutorial(),this.hand=this.scene.add.sprite(this.shooter.x+100,this.shooter.y+185,"sheet","hand"),this.hand.setOrigin(.5,1),this.hand.setScale(1),this.hand.angle=-25,this.add(this.hand),this.hand.visible=!1,this.visible=!1,setTimeout((()=>{}),20)}stopTimer(){this.handTimer&&this.scene.time.removeEvent(this.handTimer),this.timer1&&this.scene.time.removeEvent(this.timer1),this.timer2&&this.scene.time.removeEvent(this.timer2),this.timer3&&this.scene.time.removeEvent(this.timer3)}show(){this.visible||(this.visible=!0,this.runTween=!0,this.timer3=this.scene.time.addEvent({delay:250,callback:()=>{this.tutorialText.visible=!0,this.scene.tweens.add({targets:this.tutorialText,scaleX:{from:0,to:this.tutorialText.scaleX},ease:"Back.easeOut",duration:250,onComplete:()=>{this.runTween=!1,this.showTutorial2()}})}}))}hide(){if(!this.visible)return;this.runTween=!0,this.tutorialText.visible=!1,this.runTween=!1,this.visible=!1,this.x=0,this.redBall.visible=!0,this.redBall.y=20,this.shooter.setFrame("ball_thrower/red"),this.redBall.setTexture("red");let t=-135;for(let e=0;e<this.blocksArr.length;e++)this.blocksArr[e].visible=!0,this.blocksArr[e].y=t,t-=40,6==e&&(this.blocksArr[e].visible=!1)}addTutorial(){this.bottomUi=this.scene.add.sprite(0,75,"sheet","ball_thrower/thrower_bg"),this.bottomUi.setOrigin(.5),this.bottomUi.setScale(1),this.frameGrp.add(this.bottomUi),this.redBall=this.scene.add.sprite(0,20,"red"),this.redBall.setOrigin(.5),this.redBall.setScale(1),this.frameGrp.add(this.redBall),this.shooter=this.scene.add.sprite(0,30,"sheet","ball_thrower/red"),this.shooter.setOrigin(.5),this.shooter.setScale(1),this.frameGrp.add(this.shooter);let t=-135,e=["red","yellow","red","yellow","red","yellow","red"];for(let s=0;s<7;s++){let i=this.scene.add.sprite(0,t,"sheet",e[s]);i.setOrigin(.5),i.setScale(.65),this.frameGrp.add(i),this.blocksArr.push(i),6==s&&(i.visible=!1),t-=40}}handTween(){this.handTimer=this.scene.time.addEvent({delay:100,callback:()=>{this.hand.visible=!0,this.scene.tweens.add({targets:this.hand,scale:{from:this.hand.scale,to:this.hand.scale-.1},ease:"Linear",duration:250,yoyo:!0,onComplete:()=>{this.hand.visible=!1}})}})}showTutorial2(){this.handTween(),this.timer1=this.scene.time.addEvent({delay:350,callback:()=>{this.scene.tweens.add({targets:this.shooter,y:{from:this.shooter.y,to:this.shooter.y-10},ease:"Linear",duration:100,yoyo:!0}),this.redBall.visible=!0,this.scene.tweens.add({targets:this.redBall,y:{from:this.redBall.y,to:this.blocksArr[0].y},ease:"Linear",duration:350,onComplete:()=>{this.blocksArr[6].visible=!0,this.blocksArr.forEach((t=>{t.y+=40})),this.blocksArr[0].visible=!1,this.redBall.visible=!1,this.timer2=this.scene.time.addEvent({delay:3e3,callback:()=>{}})}})}})}adjust(){this.x=this.dimensions.gameWidth/2,this.y=this.dimensions.gameHeight/2}}class d extends Phaser.GameObjects.Container{constructor(t,e,s,i,h){super(t),this.scene=t,this.x=e,this.y=s,this.gameScene=i,this.dimensions=h,this.scene.add.existing(this),this.init()}init(){this.level=0,this.graphicsGrp=this.scene.add.container(0,0),this.add(this.graphicsGrp),this.graphics=this.scene.make.graphics().fillStyle(0,1).fillRect(this.dimensions.leftOffset,this.dimensions.topOffset,this.dimensions.actualWidth,this.dimensions.actualHeight),this.graphicsGrp.add(this.graphics),this.leftArrow=this.scene.add.sprite(0,0,"sheet","tutorial/2"),this.leftArrow.setOrigin(.5).setScale(1).setAlpha(.5),this.add(this.leftArrow),this.rightArrow=this.scene.add.sprite(0,0,"sheet","tutorial/1"),this.rightArrow.setOrigin(.5).setScale(1),this.add(this.rightArrow),this.closeBtn=this.scene.add.sprite(0,0,"sheet","tutorial/close"),this.closeBtn.setOrigin(.5).setScale(1),this.add(this.closeBtn),this.playBtn=this.scene.add.sprite(0,0,"sheet","tutorial/play"),this.playBtn.setOrigin(.5).setScale(1),this.add(this.playBtn),this.tutorial1=new l(this.scene,0,0,this),this.add(this.tutorial1),this.tutorial2=new o(this.scene,0,0,this),this.add(this.tutorial2),this.tutorial3=new n(this.scene,0,0,this),this.add(this.tutorial3),this.playBtn.setInteractive().on("pointerdown",(()=>this.hide())),this.closeBtn.setInteractive().on("pointerdown",(()=>this.hide())),this.rightArrow.setInteractive().on("pointerdown",(()=>{.5!==this.rightArrow.alpha&&this.changeTutorial(1)})),this.leftArrow.setInteractive().on("pointerdown",(()=>{.5!==this.leftArrow.alpha&&this.changeTutorial(-1)}))}changeTutorial(t){if(this.tutorial1.runTween||this.tutorial2.runTween||this.tutorial3.runTween)return;this.tutorial1.stopTimer(),this.tutorial2.stopTimer(),this.tutorial3.stopTimer();let e=this[`tutorial${this.level+1}`],s=(this.level+t+3)%3,i=this[`tutorial${s+1}`];this.scene.tweens.add({targets:e,x:t>0?-500:500,ease:"Cubic.easeOut",duration:300,onComplete:()=>{e.hide(),e.x=500}}),i.x=t>0?500:-500,i.show(),this.scene.tweens.add({targets:i,x:0,ease:"Linear",duration:300}),this.level=s,this.leftArrow.setAlpha(0===this.level?.5:1),this.rightArrow.setAlpha(2===this.level?.5:1)}show(){this.visible||(this.visible=!0,this.alpha=0,this.frameGrp.alpha=0,this.scene.tweens.add({targets:this,alpha:{from:0,to:1},ease:"Linear",duration:200,onComplete:()=>{this.tutorial1.show()}}))}hide(){this.visible&&(this.visible=!1,this.scene.tweens.add({targets:this,alpha:{from:1,to:0},ease:"Linear",duration:200,onComplete:()=>{this.visible=!1,this.scene.countDown.updateCount(),this.scene.gamePlay.show()}}))}adjust(){this.x=this.dimensions.gameWidth/2,this.y=this.dimensions.gameHeight/2,this.leftArrow.x=this.dimensions.leftOffset+17-this.x,this.leftArrow.y=this.dimensions.gameHeight/2-50-this.y,this.rightArrow.x=this.dimensions.rightOffset-17-this.x,this.rightArrow.y=this.dimensions.gameHeight/2-50-this.y,this.closeBtn.x=this.dimensions.leftOffset+47-this.x,this.closeBtn.y=this.dimensions.bottomOffset-47-this.y,this.playBtn.x=this.dimensions.rightOffset-204-this.x,this.playBtn.y=this.dimensions.bottomOffset-47-this.y,this.graphics.clear(),this.graphics=this.scene.make.graphics().fillStyle(0,.65).fillRect(this.dimensions.leftOffset-this.x,this.dimensions.topOffset-this.y,this.dimensions.actualWidth,this.dimensions.actualHeight),this.graphicsGrp.add(this.graphics)}}class c extends Phaser.GameObjects.Container{constructor(t,e,s,i,h){super(t),this.scene=t,this.x=e,this.y=s,this.gameScene=i,this.dimensions=h,this.scene.add.existing(this),this.init()}init(){this.countdownValue=3,this.graphicsGrp=this.scene.add.container(0,0),this.add(this.graphicsGrp),this.graphics=this.scene.make.graphics().fillStyle(0,.5).fillCircle(0,0,50),this.graphicsGrp.add(this.graphics),this.text=this.scene.add.text(0,0,this.countdownValue,{fontSize:"64px",color:"#ffffff",fontStyle:"bold"}).setOrigin(.5),this.add(this.text),this.visible=!1}updateCount(){this.visible=!0,this.scene.tweens.add({targets:this.graphics,scale:{from:0,to:this.graphics.scaleX},duration:300,ease:"Power2"}),this.scene.tweens.add({targets:this.text,scale:{from:0,to:this.text.scaleX},duration:300,ease:"Power2"}),this.scene.sound.play("countdown",{volume:.5}),this.scene.time.addEvent({delay:1e3,repeat:2,callback:()=>{this.countdownValue--,this.text.setText(this.countdownValue),this.scene.tweens.add({targets:this.graphics,scale:{from:0,to:this.graphics.scaleX},duration:300,ease:"Power2"}),this.scene.tweens.add({targets:this.text,scale:{from:0,to:this.text.scaleX},duration:300,ease:"Power2"}),this.scene.sound.play("countdown",{volume:.5}),this.countdownValue<=0&&(this.text.setText("Go"),setTimeout((()=>{this.visible=!1,setTimeout((()=>{this.scene.gamePlay.startGame()}),1500)}),1e3))}})}}let m={};class g extends Phaser.Scene{constructor(){super("GameScene")}preload(){this.levelIndex=0,m.isPortrait!=m.fullWidth<m.fullHeight?this.switchMode(!m.isPortrait):this.switchMode(m.isPortrait);let t=window.devicePixelRatio;m.fullWidth=window.innerWidth*t,m.fullHeight=window.innerHeight*t,this.scale.displaySize.setAspectRatio(m.fullWidth/m.fullHeight),this.scale.refresh(),this.scale.lockOrientation(this.game.orientation)}create(){this.setGameScale(),document.getElementById("loader").style.visibility="hidden",this.text=i,this.superGroup=this.add.container(),this.gameGroup=this.add.container(),this.superGroup.add(this.gameGroup),this.bg=this.add.sprite(0,0,"bg").setOrigin(.5),this.gameGroup.add(this.bg),this.gamePlay=new r(this,0,0,this,m),this.gameGroup.add(this.gamePlay),this.intro=new d(this,0,0,this,m),this.gameGroup.add(this.intro),this.countDown=new c(this,0,0,this,this.dimensions),this.gameGroup.add(this.countDown),this.cta=new s(this,0,0,this),this.gameGroup.add(this.cta),this.gameOver=!1,this.setPositions();try{dapi.addEventListener("adResized",this.gameResized.bind(this))}catch(t){this.scale.on("resize",this.gameResized,this)}this.gameResized(),window.restart}hideUI(){this.tweens.add({targets:[this.tutorial,this.gamePlay],alpha:0,ease:"Linear",duration:250})}restart(t){window.restart=!0,this.scene.restart()}destroySounds(){this.sound.mute=!this.sound.mute}update(t,e){super.update()}setGameScale(){let t=m.fullWidth/m.gameWidth,e=m.fullHeight/m.gameHeight;this.gameScale=t<e?t:e,m.actualWidth=this.game.canvas.width/this.gameScale,m.actualHeight=this.game.canvas.height/this.gameScale,m.leftOffset=-(m.actualWidth-m.gameWidth)/2,m.rightOffset=m.gameWidth-m.leftOffset,m.topOffset=-(m.actualHeight-m.gameHeight)/2,m.bottomOffset=m.gameHeight-m.topOffset}switchMode(t){m.isPortrait=t,m.isLandscape=!t;let e=h;m.isLandscape&&(e=a),m.gameWidth=e.gameWidth,m.gameHeight=e.gameHeight}gameResized(){let t=1;try{if("tiktok"!=`${PLATFORM}`)try{if(mraid){var e=mraid.getScreenSize();mraid.setResizeProperties({width:e.width,height:e.height,offsetX:0,offsetY:0}),mraid.expand()}}catch(t){}}catch(t){}void 0!==window.screen.systemXDPI&&void 0!==window.screen.logicalXDPI&&window.screen.systemXDPI>window.screen.logicalXDPI?t=window.screen.systemXDPI/window.screen.logicalXDPI:void 0!==window.devicePixelRatio&&(t=window.devicePixelRatio);try{let t=dapi.getScreenSize();m.fullWidth=t.width,m.fullHeight=t.height}catch(e){m.fullWidth=Math.ceil(window.innerWidth*t),m.fullHeight=Math.ceil(window.innerHeight*t)}m.ratio=t,this.game.canvas.width===m.fullWidth&&this.game.canvas.height===m.fullHeight||(m.isPortrait!=m.fullWidth<m.fullHeight?this.switchMode(!m.isPortrait):this.switchMode(m.isPortrait),this.game.scale.setGameSize(m.fullWidth,m.fullHeight),this.game.canvas.style.width=m.fullWidth+"px",this.game.canvas.style.height=m.fullHeight+"px",this.game.scale.updateBounds(),this.game.scale.refresh(),this.setGameScale(),this.setPositions())}setPositions(){this.superGroup.scale=this.gameScale,this.gameGroup.x=(this.game.canvas.width/this.gameScale-m.gameWidth)/2,this.gameGroup.y=(this.game.canvas.height/this.gameScale-m.gameHeight)/2,this.bg.setScale(1);let t=m.actualWidth/this.bg.displayWidth,e=m.actualHeight/this.bg.displayHeight,s=Math.max(t,e);this.bg.setScale(s),this.bg.x=m.gameWidth/2,this.bg.y=m.gameHeight/2,this.intro.adjust(),this.gamePlay.x=m.gameWidth/2,this.gamePlay.y=m.bottomOffset-480,this.cta.x=m.gameWidth/2,this.cta.y=m.gameHeight/2,this.cta.bg.setScale(1),t=m.actualWidth/this.cta.bg.displayWidth,e=m.actualHeight/this.cta.bg.displayHeight,s=Math.max(t,e),this.cta.bg.setScale(s),this.cta.bg.x=m.gameWidth/2-this.cta.x,this.cta.bg.y=m.gameHeight/2-this.cta.y,this.countDown.x=m.gameWidth/2,this.countDown.y=m.gameHeight/2}offsetMouse(){return{x:this.game.input.activePointer.worldX*m.actualWidth/m.fullWidth+(m.gameWidth-m.actualWidth)/2,y:this.game.input.activePointer.worldY*m.actualHeight/m.fullHeight+(m.gameHeight-m.actualHeight)/2}}offsetWorld(t){return{x:t.x*m.actualWidth/this.game.width,y:t.y*m.actualHeight/this.game.height}}}const p=window.devicePixelRatio,u={type:Phaser.CANVAS,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,parent:"game",width:540,height:960,antialias:!1},backgroundColor:0,dom:{createContainer:!0},scene:[t,e,g],physics:{default:"matter",matter:{debug:!1}}},w=new Phaser.Game(u);w.debugMode=!0,w.embedded=!1,w.screenBaseSize={width:window.innerWidth*p,height:window.innerHeight*p},w.orientation="portrait"})();