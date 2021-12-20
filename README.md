# Test task 

Link: [https://ts-pixi-game.herokuapp.com/](https://ts-pixi-game.herokuapp.com/)

This is a PixiJS application composed of three games:

- Cards deck
- Random texts
- Fires effect

The technologies used in this project are:

- PixiJS
- Webpack
- TypeScript
- NPM

There are also other libraries/tools that were added to manage audio and animations:

- [Howl.js](https://github.com/goldfire/howler.js/)
- [GSAP](https://github.com/greensock/GSAP)


## Installation

After cloning the project, please check if you have selected **Node version 14.17.6** to make sure the application will run as expected.

```
npm install

npm run dev

npm run build
```

Open your localhost:8081

## The project

Since PixiJS is a requirement, I tried to bring my Phaser.js experience to it and it worked well! The concepts are basically the same. I'm going to quickly highlight some details of the project. 

### Architecture

Below is described some files and its roles in the application.  
 
```
app
└─ src
    └─ scss
    └─ fonts
    └─ scenes           // all scenes for the games, also includes an abstract class to be extended for the games classes
    ├─ IScreenPosition.ts       // simple interface to define the position of some elements 
    ├─ Globals.ts         // It includes most of the resources that will be preloaded before the game application starts 
    └─ AssetsLoaderConfig.ts         // it is responsible to list all the sprites (unless spritesheets) with their keys to be loaded after with AssetsLoader class
    └─ AssetsLoader.ts            // it preloads all the assets available in AssetsLoader.ts
    └─ Menu.ts             // All the three games can be accessed by this component. It renders a button for each one and it connects PIXI.Application with the Containers responsible for each game. 
    └─ utils.ts                   // only a few methods that are used in different classes and objects
    └─ BackgroundSound.js              // This one is used on all games, it facilitates the job of playing the sounds.
            
```

About my decisions: 

- I think that using setInterval() is more efficient in some cases than using ticker.add() because the first method is easier to define intervals between the actions.

- I was not sure if Particle.Container would be the best option to store the fires' spritesheets. Anyway, I could easily organize them with a simple Container. 

- The way implemented to disable a Container to show another is not probably the best approach, for example: exiting from Menu and going to any game. It was a bit complicated to manipulate the general information of the game across the containers, but it was the way that I could make it work in few hours. Anyway, even with a little of complexity, it's still scalable.

- I had to add the fire assets to the public folder because the URL of the spritesheet was not being recognized and bundled by the webpack in production mode, so the easiest way was adding them to public folder at least for a while =D  

- At last, the menu song is from a Brazilian singer called Seu Jorge, this song is included in FIFA 2007 game soundtrack!! Take a look at this Brazilian samba: [https://www.youtube.com/watch?v=AoPrF8l2uQg](https://www.youtube.com/watch?v=AoPrF8l2uQg)


What I would like to add in the future: 

- I would love to add a State Management tool similar to Redux or Vuex. It's much easier to manipulate the data in the application. It would be easier, for example, to get any data from PIXI.Application from a Container or Sprite. If I had time I certainly would think about it.

- I know that some backgrounds are not refined, but I did not have time for them, sorry, anyway if I had more time I would improve the responsiveness of the sprites and backgrounds because they should perfectly scale according the device screen. 

That's all, I'm totally open to discuss the above points. Of course I have a lot to learn and share with you guys! 


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
