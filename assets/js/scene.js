var config = {
    type: Phaser.AUTO,
    //width: 800,
    //height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game',
        width: window.innerWidth,
        height: window.innerHeight
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload (){
    //this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/imgs/desk.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

function create (){    
    var sky = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'sky').setOrigin(0);
    var logo = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'logo');

    this.scale.on('resize', function (gameSize) {
        var width = gameSize.width;
        var height = gameSize.height;

        this.cameras.resize(width, height);

        sky.setSize(width, height);
        logo.setPosition(width / 2, height / 2);
    }, this);
}

//自动更改比例
window.addEventListener('resize', function (event) {

    game.scale.resize(window.innerWidth, window.innerHeight);

}, false);