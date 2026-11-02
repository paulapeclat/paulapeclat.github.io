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
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 300
scene.cameraFollowSprite(mySprite)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -150
    }
})
