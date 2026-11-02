let turboLigado = false
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
controller.moveSprite(jogador, 100, 100)
let raio = sprites.create(img`
    . . . . 5 5 5 .
    . . . 5 5 5 . .
    . . 5 5 5 . . .
    . 5 5 5 5 5 5 .
    . . . . 5 5 5 .
    . . . 5 5 5 . .
    . . 5 5 5 . . .
    . 5 5 . . . . .
`, SpriteKind.Food)
raio.setPosition(120, 60)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (!(turboLigado)) {
        turboLigado = true
        controller.moveSprite(sprite, 200, 200)
        pause(3000)
        controller.moveSprite(sprite, 100, 100)
        turboLigado = false
    }
})
