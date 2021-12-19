import { Sprite, Container } from 'pixi.js'
import { Globals } from '../Globals'

export default abstract class Scene extends Container {  
  constructor(hasHomeButton: boolean = true) {
    super()

    this.addHomeButton()
    this.sortableChildren = true
  }

  private buttonSprite: Sprite

  public addHomeButton() {
    this.buttonSprite = Sprite.from(Globals.resources['back_button'].texture)
    this.buttonSprite.scale.set(0.3)
    this.buttonSprite.anchor.set(0.5)
    this.buttonSprite.position.set(40)
    this.setBackButtonClick()

    this.buttonSprite.zIndex = 1

    this.addChild(this.buttonSprite)
  }

  public setBackButtonClick() {
    this.buttonSprite.interactive = true
    this.buttonSprite.buttonMode = true

    this.buttonSprite.on('pointerdown', () => {
      this.destroyScene()
    })
  }

  public destroyScene(callback?: Function) {
    this.parent.removeChild(this)

    if (callback) callback()
  }
}