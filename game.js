var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
  default: 'arcade',
    arcade: {
    gravity: { y: 200 }
    }
  },
  scene:  {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

var slug;

function preload () {
  this.load.image("background", "assets/tile009.gif");
  this.load.image("blob", "assets/blob.png");
  this.load.image("ground", "assets/ground.png");
};

function create () {
  this.background = this.add.tileSprite(18, 36, 1600, 1200, "background");
  ground = this.physics.add.staticGroup();

  ground.create(200, 400, 'ground');
  ground.create(500, 440, 'ground').setFlipX(true);
  ground.create(700, 500, 'ground');

  slug = this.physics.add.sprite(100, 200, 'blob');

  //slug.head = new Phaser.Geom.Rectangle(100, 400, 20, 80);

  this.physics.add.collider(slug, ground);

  cursors = this.input.keyboard.createCursorKeys();

  this.cameras.main.startFollow(slug, true, 0.05, 0.05);
};

function update(){

  if (cursors.left.isDown){
    slug.setVelocityX(-100);
  }
  else if (cursors.right.isDown){
    var newScaleX = slug.scaleX + .1;
    slug.setScale(newScaleX,1);
  }
  else {
    slug.setVelocityX(0);

    if (slug.scaleX > 1){
      slug.setScale(slug.scaleX-.1, 1);
      slug.x +=(.05*slug.width);
    }
  };
};

// class Slug {
//   constructor(){
//     this.physics.add.sprite(100, 200, 'blob');
//   }
// }
