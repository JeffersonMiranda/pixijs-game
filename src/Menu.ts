import { Application, Container, Sprite } from 'pixi.js'
import { ListenerFn } from '@pixi/utils/node_modules/eventemitter3'
import { Globals } from './Globals'
import Scene from './Scenes/Scene'
import CardsDeck from './Scenes/CardsDeck'
import IScreenPosition from './IScreenPosition'
import RandomTexts from './Scenes/RandomTexts'
import FiresEffects from './Scenes/FiresEffect'
import BackgroundSound from './BackgroundSound'

export default class Menu {
  constructor(gameApp: Application) {
    this.container = new Container()
    this.container.width = window.innerWidth
    this.container.height = window.innerHeight

    this.gameApp = gameApp
    this.addGameButtons()
  }

  private background: Sprite
  private container: Container
  private buttonsContainer: Container = new Container()
  private gameApp: Application
  private songBackground: BackgroundSound

  get getContainer(): Container {
    return this.container
  }

  public playSound(): void {
    this.songBackground = new BackgroundSound('./../assets/sounds/Seu Jorge Tive Razao.mp3')
  }

  public addBackground(): void {
    this.background = Sprite.from(Globals.resources['bg_background'].texture)
    this.background.width = window.innerWidth
    this.background.height = window.innerHeight
    this.background.position.set(0, 0)
    this.background.anchor.set(0.5)

    this.container.addChild(this.background)
  }

  public addGameButtons(): void {
    this.playSound()
    this.buttonsContainer.position.set(window.innerWidth / 2, window.innerHeight / 2)

    const centerScreen = this.container.width / 2

    const cardsDeckPosition: IScreenPosition = { x: centerScreen, y: 0 }
    const randomTextsosition: IScreenPosition = { x: centerScreen, y: 70 }
    const fireEffectsPosition: IScreenPosition = { x: centerScreen, y: 140 }

    this.buttonsContainer.addChild(this.addSceneButton('menu_button_1', () => new CardsDeck(this.gameApp), cardsDeckPosition ))
    this.buttonsContainer.addChild(this.addSceneButton('menu_button_2', () => new RandomTexts(), randomTextsosition ))
    this.buttonsContainer.addChild(this.addSceneButton('menu_button_3', () => new FiresEffects(this.gameApp), fireEffectsPosition ))

    this.container.addChild(this.buttonsContainer)
  }

  public addSceneClikToButton(button: Sprite, callback: ListenerFn) {
    button.interactive = true
    button.buttonMode = true

    button.on('pointerdown', callback)
  }

  public addSceneButton(buttonSprite: string, sceneCallback: Function, position: IScreenPosition): Sprite {
    const gameButton = Sprite.from(Globals.resources[buttonSprite].texture)

    gameButton.position.set(position.x, position.y)
    gameButton.anchor.set(0.5)

    this.addSceneClikToButton(gameButton, () => { 
      this.songBackground.stop()
      const gameScene = sceneCallback()

      this.removeMenu()
      this.gameApp.stage.addChild(gameScene)

      gameScene.on('removed', () => {
        this.addGameButtons()
      })
    })

    return gameButton
  }

  public removeMenu(): void {
    this.container.removeChild(this.buttonsContainer)
  }
}