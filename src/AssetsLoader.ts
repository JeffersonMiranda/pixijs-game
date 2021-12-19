import { Loader } from 'pixi.js'
import { Globals } from './Globals'
import { AssetsLoaderConfig } from './AssetsLoaderConfig'

export default class AssetsLoader {
  constructor(loader: Loader) {
    this.loader = loader
    this.resources = AssetsLoaderConfig
  }

  private loader: Loader
  private resources: any

  public preload(): Promise<any> {
    return new Promise(resolve => {
      for (let key in this.resources) {
        this.loader.add(key, this.resources[key])
      }

      this.loader.load((loader: any, resources: any) => {
        Globals.resources = resources
        resolve(Globals.resources)
      })
    })
  }
}