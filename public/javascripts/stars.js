
//------------
var image1 = document.createElement('image');
image1.src = 'url(/assets/starry.jpeg)'

var image2 = document.createElement('image');
image2.src = 'url(/assets/starry3.jpg)'

// var el = document.querySelector('#begin');
// el.onmouseover = function(event) {
//     var body = document.getElementById('bodies');
//     body.style.backgroundImage = 'url(/assets/starry3.jpg)'
// };
// el.onmouseout = function(event) {
//     var body = document.getElementById('bodies');
//     body.style.backgroundImage = 'url(/assets/starry.jpeg)'
// };
//-----------

var audio6 = document.createElement('audio');
audio6.src = '/assets/ambient.wav'

audio6.play();

var gamePlay = true;

var b = document.getElementById('begin');
    b.addEventListener('click', function(e){
    drawGame();
});

 document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13 && gamePlay === true) { 
        drawGame();
        gamePlay = false;
    }
});

function drawGame(){
    audio6.pause();
    gamePlay = false;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'games', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('background', '/assets/background.png');
    game.load.image('ground2', '/assets/platform2.png');
    game.load.image('ground3', '/assets/platform3.png');
    game.load.image('star', '/assets/star2.png');
    game.load.spritesheet('dude', '/assets/dude2.png', 32, 48);
}

function removeDummy() {
    var elem = document.getElementById('begin');
        elem.parentNode.removeChild(elem);
}

removeDummy();


var c = document.getElementById('buttons');
    c.addEventListener('click', function(e){
    window.location.reload();
});

var player;
var platforms;
var cursors;
var stars;

var score = 12;
var scoreText;

var timer = 30;
var timerText;

var movement = false;
var music;

var audio1 = document.createElement('audio');
audio1.src = '/assets/pacman.wav'

var audio2 = document.createElement('audio');
audio2.src = '/assets/win.wav'

var audio3 = document.createElement('audio');
audio3.src = '/assets/song.mp3'

var audio4 = document.createElement('audio');
audio4.src = '/assets/jump.wav'

var audio5 = document.createElement('audio');
audio5.src = '/assets/intro.wav'

function create() {
    audio5.play();

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'background'); 

    platforms = game.add.group();
    platforms.enableBody = true;

    var floor = platforms.create(0, game.world.height - 10, 'ground3'); 

    floor.scale.setTo(2, 2);
    floor.body.immovable = true;

    var boxes = platforms.create(95, 120, 'ground2');
    boxes.body.immovable = true;

    boxes = platforms.create(730, 100, 'ground2');
    boxes.body.immovable = true;

    boxes = platforms.create(-100, 230, 'ground2');
    boxes.body.immovable = true;

    boxes = platforms.create(380, 235, 'ground2');
    boxes.body.immovable = true;

    boxes = platforms.create(680, 340, 'ground2');
    boxes.body.immovable = true;

    boxes = platforms.create(50, 380, 'ground2');
    boxes.body.immovable = true;

    boxes = platforms.create(350, 450, 'ground2');
    boxes.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true); 
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    stars = game.add.group(); 
    stars.enableBody = true;

    for (var i = 0; i < 12; i++) 
    {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 700;
        star.body.bounce.y = 0.4 + Math.random() * 0.2;
    }
    
    scoreText = game.add.text(16, 16, 'Stars left: 12', {fontSize: '32px', fill: 'white' });
    timerText = game.add.text(650, 16, 'Time: 30',  {fontSize: '32px', fill: 'white' });
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    player.body.velocity.x = 0;

    if (cursors.left.isDown) 
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
        var movement = true;
    }

    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
        var movement = true;
    }

    else 
    {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
        audio4.play();
    }
}

function collectStar (player, star) {
    audio3.play(); 
    star.kill(); 
    score -= 1;
    scoreText.text = 'Stars left: ' + score; 
}

function gameOver() {
     if (score === 0) {
        clearInterval(interval)
        scoreText.text ='Stars left: ' + score + '                YOU WON'; 
        makeButton();
        audio5.pause();  
        audio2.play(); 
        game.paused = true;                   
    }
     else if (score >= 1 && timer <= 0) {
        clearInterval(interval)
        scoreText.text ='Stars left: ' + score + '                YOU LOSE';
        makeButton();
        audio5.pause();
        audio1.play();
        game.paused = true;
    }
}

var interval = setInterval(function(event) {
    timer -=1;
    timerText.text = 'Time: ' + timer;
    gameOver();
}, 1000);

function makeButton(){
   var element = document.getElementById('buttons');
    element.style.opacity = '1';
    element.style.height = '80px';
    element.style.width = '200px';
    }
};