import { Container, Sprite, TextStyle, Text } from 'pixi.js'
import gsap from 'gsap'
import Scene from './Scene'
import { getRandomValue, currencyFormatter, isMobile } from './../utils'
import { Globals } from '../Globals'
import BackgroundSound from '../BackgroundSound'

export default class RandomTexts extends Scene {
  constructor() {
    super()

    this.createBackground()
    this.renderTextElements()
    this.playBackgroundSong()

    this.on('removed', () => {
      this.backgroundSong.stop()
    })
    this.sortableChildren = true
  }

  private backgroundSong: BackgroundSound
  
  public createBackground(): void {
    const backgroundSprite = Sprite.from(Globals.resources['randomTextsBackground'].texture)

    backgroundSprite.width = window.innerWidth
    backgroundSprite.height = window.innerHeight

    this.addChild(backgroundSprite)
  }

  public playBackgroundSong(): void {
    this.backgroundSong = new BackgroundSound(require('./../../assets/sounds/Solve-The-Puzzle.mp3'))
  }

  public getStyle(fontSize: number): TextStyle {
    return new TextStyle({
      fontFamily: 'Pricedown',
      fontSize,
      fill: ['#FFBF00'],
      align: 'center'
    })
  }

  public createRandomText(fontSize: number): Text {
    const randomPrice = currencyFormatter('de-DE', 'EUR').format(getRandomValue(0, 1000000))
    const textElement = new Text(randomPrice, this.getStyle(fontSize))
    
    textElement.anchor.y = 0.5
    
    return textElement
  }

  public createMoneyIcon(fontSize: number): Sprite {
    const spriteIcon = Sprite.from(Globals.resources['euro_coin'].texture)

    spriteIcon.anchor.y = 0.5
    spriteIcon.scale.set(fontSize / 150)

    return spriteIcon
  }

  public createTextElement(): Container {
    const textsContainer = new Container()
    textsContainer.zIndex = 1
    const maximumFontSize = isMobile ? 30 : 60
    const fontSize = getRandomValue(10, maximumFontSize)
    const elements: any[] = []
    const numberOperations: number = 2
    const isNotFirstItem = (index: number) => index > 0 

    for (let index = 0; index < 3; index++) {
      const randomOperation = Math.floor(Math.random() * numberOperations)
      let newElement: any
      const lastElement = elements[elements.length - 1]

      switch (randomOperation) {
        case 0:
            newElement = this.createRandomText(fontSize)
            textsContainer.addChild(newElement)

            if (isNotFirstItem(index)) newElement.x = lastElement.x + lastElement.width + fontSize

            elements.push(newElement)
          break;
          
          case 1:
            newElement = this.createMoneyIcon(fontSize)
            textsContainer.addChild(newElement)

            if (isNotFirstItem(index)) newElement.x = lastElement.x + lastElement.width + fontSize

            elements.push(newElement)
            break;
      
        default:
          break;
      }
    }
    
    this.addChild(textsContainer)

    return textsContainer
  }

  public createTextAnimation(): void {
    const textElement = this.createTextElement()

    const responsivePositionX = isMobile ? 0 : window.innerWidth - textElement.width * 1.5 

    const positionY = getRandomValue(textElement.height, window.innerHeight - textElement.height * 1.5)
    const positionX = getRandomValue(50, responsivePositionX)

    const animationDuration = 1

    gsap.to(textElement, animationDuration, { x: positionX, 
                              y: positionY,
                              onComplete: this.destroyText,
                              onCompleteParams: [textElement]
                            })
  }

  public destroyText(textElement: Container): void {
    setTimeout(() => {
      textElement.destroy()
    }, 2000);
  }

  public renderTextElements(): void {
    setInterval(() => {
      this.createTextAnimation()
    }, 2000)
  }
}