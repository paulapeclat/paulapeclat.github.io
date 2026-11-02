let checkpointX = 20
let checkpointY = 60
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
mySprite.setPosition(checkpointX, checkpointY)
let bandeira = sprites.create(img`
    f 5 5 5 5 5 5 5
    f 5 5 5 5 5 5 5
    f 5 5 5 5 5 5 5
    f 5 5 5 5 5 5 5
    f . . . . . . .
    f . . . . . . .
    f . . . . . . .
    f . . . . . . .
`, SpriteKind.Food)
bandeira.setPosition(80, 30)
let pedra = sprites.create(img`
    . . c c c c . .
    . c b b b b c .
    c b b b b b b c
    c b b c b b b c
    c b b b b b b c
    c b c b b b b c
    . c b b b b c .
    . . c c c c . .
`, SpriteKind.Enemy)
pedra.setPosition(80, 90)
info.setLife(3)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    checkpointX = otherSprite.x
    checkpointY = otherSprite.y
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.setPosition(checkpointX, checkpointY)
})
forever(function () {
    pedra.vx = 40
    pause(2000)
    pedra.vx = -40
    pause(2000)
})
