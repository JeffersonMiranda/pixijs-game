import { Application, Container, Sprite } from 'pixi.js'
import gsap from 'gsap'
import Scene from './Scene'
import { Globals } from '../Globals'
import { isMobile } from '../utils'
import BackgroundSound from '../BackgroundSound'
import FPS from '../FPS'

export default class CardsDeck extends Scene {
  constructor(game: Application) {
    super()

    this.game = game
    this.createBackground()
    this.cards.position.y = 0
    this.cards.sortableChildren = true
    this.addChild(this.cards)
    this.createDeckCards().then(() => {
      this.createSecondCards()
    }) 

    this.on('removed', () => {
      this.cardsSound.stop()
    })

    this.setFPS()
  }

  private game: Application
  private FPSData: FPS
  private cards: Container = new Container()
  private cardsSprites: Sprite[] = []
  private cardsQuantity: number
  private distanceBetweenCards: number
  private lastZIndex: number = 0
  private cardsSound: BackgroundSound

  public setFPS(): void {
    this.FPSData = new FPS()
    this.FPSData.position.set(80, 30)
    this.FPSData.anchor.set(0.5)

    this.addChild(this.FPSData)
    
    this.game.ticker.add(() => {
      this.FPSData.setFrames(this.game.ticker.FPS)
    })
  }

  public createBackground(): void {
    const backgroundSprite = Sprite.from(Globals.resources['tableCards'].texture)

    backgroundSprite.width = window.innerWidth
    backgroundSprite.height = window.innerHeight

    this.addChild(backgroundSprite)
  }

  public playSound() {
    this.cardsSound = new BackgroundSound(require('./../../assets/sounds/Dealing-cards-sound.mp3'))
  }

  public createRandomCard(): Sprite {
    const cardsResourcesKeys = Object.keys(Globals.resources).filter((key: any) => key.startsWith('card'))
    const randomIndex = cardsResourcesKeys[Math.floor(Math.random() * cardsResourcesKeys.length)]

    return Sprite.from(Globals.resources[randomIndex].texture)
  }

  public createDeckCards(cardsQuantity: number = 144): Promise<unknown> {
    this.playSound()
    const responsiveDistanceBetweenCards = isMobile ? 3.5 : 2.5

    this.distanceBetweenCards = responsiveDistanceBetweenCards
    this.cardsQuantity = cardsQuantity
    
    let index = 0

    return new Promise((resolve, reject) => {
      const cardMoving = setInterval(() => {
      const allCardsArePositioned = true
      const cardSprite = this.createRandomCard()
      this.cardsSprites.push(cardSprite)
      this.addNewCardToDeck(cardSprite, index * this.distanceBetweenCards)  
      
      if (index >= this.cardsQuantity - 1) {
        clearInterval(cardMoving)
        resolve(allCardsArePositioned)
        this.cardsSound.stop()
      }
      
      index++
      }, 30)
    })
  }
  
  public addNewCardToDeck(newCard: Sprite, positionY: number): void {
    const responsivePositionY = isMobile ? window.innerHeight / 10 : window.innerHeight / 5
    
    const cardPositionY = window.innerHeight - responsivePositionY - positionY
    const cardPositionX = isMobile ? 80 : 100
    const cardSize = isMobile ? window.innerHeight / 1750 : 1
    
    newCard.position.set(-100, cardPositionY)
    newCard.anchor.set(0.5)
    newCard.scale.set(cardSize)
    
    this.cards.addChild(newCard)

    const animationDuration = 1

    gsap.to(newCard, animationDuration, { x: cardPositionX, ease: 'expo'}).play()
  }

  public moveCardToSecondDeck(card: any, positionY: number): void {
    this.lastZIndex++
    card.zIndex = this.lastZIndex

    const screenHeight = window.innerHeight

    const responsivePositionY = isMobile ?  
                                screenHeight - (screenHeight / 10) - positionY : 
                                screenHeight - (screenHeight / 5) - positionY

    const cardPositionX = isMobile ? window.innerWidth - 80: window.innerWidth / 2
    const animationDuration = 2

    gsap.to(card, animationDuration, { x: cardPositionX, y: responsivePositionY}).play()
  }

  public createSecondCards(): void {
    let index = this.cardsQuantity - 1
    let indexPositionY = 0
    const interval = 1000
   
    const cardMoving = setInterval(() => {
      this.moveCardToSecondDeck(this.cards.children[index], indexPositionY * this.distanceBetweenCards)
      
      if (index === 0) {
        clearInterval(cardMoving)
      }
      
      index--
      indexPositionY++
    }, interval)
  }
}