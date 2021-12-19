import { AnimatedSprite, Application, Loader, Sprite, TilingSprite } from 'pixi.js'
import Scene from './Scene'
import { Globals } from '../Globals'
import { getRandomValue } from '../utils'
import IScreenPosition from '../IScreenPosition'
import BackgroundSound from '../BackgroundSound'

export default class FiresEffects extends Scene {
  constructor(game: Application) {
    super()
    
    this.game = game

    this.createBackground()
    this.loadTextures()
    this.update()
    this.on('removed', () => {
      this.backgroundSong.stop()
    })
  }

  private game: Application
  private backgroundSprite: TilingSprite
  private spritesInTheScreen: number = 0
  private readonly maxSpritesInTheScreen: number = 10
  private backgroundSong: BackgroundSound

  public createBackground() {
    this.backgroundSprite = new TilingSprite(Globals.resources['bg_sky'].texture)

    this.backgroundSprite.width = window.innerWidth
    this.backgroundSprite.height = window.innerHeight

    this.addChild(this.backgroundSprite)
  }

  public playBackgroundSong(): void {
    this.backgroundSong = new BackgroundSound('./../assets/sounds/Multiple-Loud-FireWorks.mp3')
  }

  public loadTextures(): void {
    const loader = new Loader()

    loader.add('fire_animation', './../../assets/images/fire/fire_spritesheet.json')
          .load((loader: any) => {
            Globals.resources['fire_animation'] = loader.resources.fire_animation.spritesheet.animations.fire

            this.startExplosions()
            this.playBackgroundSong()
          })
   }
   
   public startExplosions(): void {
     const isSpritesQuantityInLimit = (): boolean => this.spritesInTheScreen <= this.maxSpritesInTheScreen
     
     setInterval(() => {
      if (!isSpritesQuantityInLimit()) return
      
      const positionX = getRandomValue(0, window.innerWidth - 100)
			const positionY = getRandomValue(0, window.innerHeight / 2)

      this.createExplosion({ x: positionX, y: positionY })
     }, 150)
   }

  public createExplosion(position: IScreenPosition): void {
		const explosion = new AnimatedSprite(Globals.resources['fire_animation'])
		
    const randomSize = getRandomValue(20, 300)

		explosion.animationSpeed = 0.8
		explosion.x = position.x
		explosion.y = position.y
		explosion.width = randomSize
		explosion.height = randomSize

		explosion.loop = false
		explosion.onComplete = () => {
      explosion.destroy()
      this.spritesInTheScreen--
		}
		
    this.spritesInTheScreen++
    explosion.play()
		
	 	this.addChild(explosion)
   }

  public update(): void {
    this.game.ticker.add((delta: number) => {
      this.backgroundSprite.tilePosition.x -= 0.5 * delta
    })
   }
}