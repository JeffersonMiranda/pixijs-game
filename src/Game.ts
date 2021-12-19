import { Application } from 'pixi.js'
import AssetsLoader from './AssetsLoader'
import Menu from './Menu'
import Scene from './Scenes/Scene'

export default class Game extends Application {
  constructor(config: any) {
    super(config)
    
    this.initialize()
    this.loadAssets().then(() => {
      this.addMenu()
    }) 
  }

  private menu: Menu
  
  public loadAssets(): Promise<unknown> {
    const loader = new AssetsLoader(this.loader)

    return loader.preload()
  }

  public initialize(): void {
    document.body.appendChild(this.view)
  }

  public addMenu(): void {
    this.menu = new Menu(this)
    this.menu.getContainer.position.set(0, 0)

    this.stage.addChild(this.menu.getContainer)
  }
}