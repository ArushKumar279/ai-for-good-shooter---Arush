controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 2 2 2 2 . . 
        . . . . . . . 2 2 2 4 4 4 2 2 . 
        . . 2 2 2 2 2 4 4 4 5 5 5 4 2 . 
        . . . . 2 2 2 2 2 4 4 5 5 4 2 . 
        . . . . . . . 2 2 2 2 4 4 2 2 . 
        . . . . . . . . . . 2 2 2 2 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let statusbar: StatusBarSprite = null
let enemyShip: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
game.splash("I want to show only a glimpse of What we could do with AI for Good")
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . 1 1 1 1 
    . . . . . . . . . . 1 1 6 4 4 4 
    . . . . . . . . 1 1 6 6 6 6 6 . 
    . . . . . . . 1 6 6 6 6 6 . . . 
    . . . . 1 1 1 6 6 6 6 6 6 . . . 
    . . 1 1 6 6 6 6 6 6 6 6 . . . . 
    . 1 8 8 8 8 8 8 8 8 8 a 2 . . . 
    1 6 6 6 6 6 6 6 6 6 a a a 2 . . 
    . 1 6 6 6 6 6 6 6 6 a a a 2 . . 
    . . 1 1 1 8 8 8 8 8 8 a 2 . . . 
    . . . . . 1 1 1 1 1 6 6 6 6 . . 
    . . . . . . . . . . 1 1 1 6 6 . 
    . . . . . . . . . . . . 1 4 4 4 
    . . . . . . . . . . . . . 1 1 1 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
game.onUpdateInterval(2000, function () {
    enemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 2 2 . . . . . . 
        . . . . . . . . 3 2 . . . . . . 
        . . . . . . . . 3 2 4 . . . . . 
        . . . . . . . 3 3 2 . . . . . . 
        . . . . . . . 3 2 2 . . . . . . 
        . . . . . . 3 2 2 2 . . . . . . 
        . . . . . 3 3 2 2 2 . . . . . . 
        . . . 2 3 3 2 2 2 2 . . . . . . 
        . . 2 2 2 2 2 2 2 2 . . . . . . 
        . . . . . 3 2 2 2 2 . . . . . . 
        . . . . . 3 3 2 2 2 . . . . . . 
        . . . . . . . 3 3 2 4 . . . . . 
        . . . . . . . . 3 2 . . . . . . 
        . . . . . . . . . 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.vx = -20
    enemyShip.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.setColor(5, 12)
    statusbar.max = 100
    statusbar.attachToSprite(enemyShip)
})
