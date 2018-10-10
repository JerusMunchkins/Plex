const Sequelize = require('sequelize')
const db = require('../db')

const Home = db.define('home', {
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://bit.ly/2DDPIm8'
  },
  price: {
    type: Sequelize.INTEGER
  },
  link: {
    type: Sequelize.STRING
  }
})

//-------------- OPTION 1 - Hook - not working properly -----------------//

// const Home = db.define('home', {
//   imgUrl: {
//     type: Sequelize.STRING,
//   },
//   price: {
//     type: Sequelize.INTEGER
//   },
//   link: {
//     type: Sequelize.STRING
//   }
// })

// let images = [
//   'img/home1.jpg',
//   'img/home2.jpg',
//   'img/home3.jpg',
//   'img/home4.jpg',
//   'img/home5.jpg',
//   'img/home6.jpg',
//   'img/home7.jpg',
//   'img/home8.jpg',
//   'img/home9.jpg',
//   'img/home10.jpg',
//   'img/home11.jpg',
//   'img/home12.jpg'
// ]

// Home.hook('afterSave', (home) => {
//   if (!home.imgUrl) {
//     let randomImage = images[Math.floor(Math.random() * images.length)]
//     home.imgUrl = randomImage
//   }
// })

//-------------- OPTION 2 - With Setter, it overwrites the seeded data -----------------//

// let images = [
//   'img/home1.jpg',
//   'img/home2.jpg',
//   'img/home3.jpg',
//   'img/home4.jpg',
//   'img/home5.jpg',
//   'img/home6.jpg',
//   'img/home7.jpg',
//   'img/home8.jpg',
//   'img/home9.jpg',
//   'img/home10.jpg',
//   'img/home11.jpg',
//   'img/home12.jpg'
// ]

// const Home = db.define('home', {
//   imgUrl: {
//     type: Sequelize.STRING,
//     set() {
//       let randomImage = images[Math.floor(Math.random() * images.length)]
//       this.setDataValue('imgUrl', randomImage)
//     }
//   },
//   price: {
//     type: Sequelize.INTEGER
//   },
//   link: {
//     type: Sequelize.STRING
//   }
// })

module.exports = Home
