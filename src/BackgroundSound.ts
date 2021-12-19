import { Howl } from 'howler'

export default class BackgroundSound extends Howl {
  constructor(soundUrl: string, autoPlay: boolean = true, loop: boolean = true) {
    super({ src: soundUrl, loop })  

    if (autoPlay) this.play()
  }
}