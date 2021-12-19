import { Text, TextStyle } from 'pixi.js'

export default class FPS extends Text {
  constructor() {
    const textStyle = new TextStyle({
                                fontFamily: 'Arial',
                                fontSize: 20,
                                fontWeight: 'bold',
                                fill: ['#ffffff']
                              })

    super('0', textStyle)
  } 

  public setFrames(frames: number): void {
    this.text = `${frames.toFixed(2)} FPS`
  }
}