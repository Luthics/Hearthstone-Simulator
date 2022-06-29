// 获取随机颜色的函数
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var config = {
    type: Phaser.AUTO,
    //width: 800,
    //height: 600,
    scale: {
        mode: Phaser.Scale.NONE,
        parent: 'game',
        width: window.innerWidth,
        height: window.innerHeight
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload (){
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

function create (){
    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });
    
    var sky = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'sky').setOrigin(0);
    var logo = this.physics.add.image(this.scale.width / 2, this.scale.height / 2, 'logo');

    this.scale.on('resize', function (gameSize) {

        var width = gameSize.width;
        var height = gameSize.height;

        this.cameras.resize(width, height);

        sky.setSize(width, height);
        logo.setPosition(width / 2, height / 2);

    }, this);

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}

//自动更改比例
window.addEventListener('resize', function (event) {

    game.scale.resize(window.innerWidth, window.innerHeight);

}, false);