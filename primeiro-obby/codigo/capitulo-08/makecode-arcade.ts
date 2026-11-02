game.splash("Use as setas. Chegue ao fim sem cair!")
let jogador = sprites.create(img`
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
controller.moveSprite(jogador)
scene.cameraFollowSprite(jogador)
info.setLife(3)
