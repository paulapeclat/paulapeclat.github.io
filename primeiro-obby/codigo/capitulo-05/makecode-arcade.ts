let mySprite = sprites.create(img`
    . . . . f f f f f f . . . . . .
    . . . f 5 5 5 5 5 5 f . . . . .
    . . f 5 5 5 5 5 5 5 5 f . . . .
    . . f 5 5 f 5 5 f 5 5 f . . . .
    . . f 5 5 f 5 5 f 5 5 f . . . .
    . . f 5 5 5 5 5 5 5 5 f . . . .
    . . f 5 5 f 5 5 f 5 5 f . . . .
    . . . f 5 5 f f 5 5 f . . . . .
    . . . . f f f f f f . . . . . .
    . . . f 8 8 8 8 8 8 f . . . . .
    . . f 8 8 8 8 8 8 8 8 f . . . .
    . . f 5 8 8 8 8 8 8 5 f . . . .
    . . . f 8 8 8 8 8 8 f . . . . .
    . . . f 8 8 f f 8 8 f . . . . .
    . . . f f f . . f f f . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setPosition(20, 60)
let lava = sprites.create(img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 4 2 4 4 2 4 2 2 4 2 4 4 2 4 2
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    4 5 4 5 5 4 4 5 5 4 4 5 5 4 4 5
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 4 2 4 4 2 4 2 2 4 2 4 4 2 4 2
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    5 4 5 5 4 5 5 4 4 5 5 4 5 5 4 5
`, SpriteKind.Enemy)
lava.setPosition(80, 60)
info.setLife(3)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.setPosition(20, 60)
})
