const router = require('express').Router()
const {
  Home,
  Location,
  User,
  UserHome,
  UserPlace,
  Place
} = require('../db/models')

const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)
module.exports = db

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

// GET user_homes
router.get('/:userId/homes', async (req, res, next) => {
  const {userId} = req.params
  try {
    const userHomes = await User.findOne({
      where: {id: userId},
      include: [
        {
          model: Home,
          include: [
            {
              model: Location
            }
          ]
        }
      ]
    })
    res.status(200).json(userHomes)
  } catch (err) {
    next(err)
  }
})

// POST user_homes
router.post('/homes', async (req, res, next) => {
  const {userId, homeId} = req.body
  try {
    await UserHome.create({userId, homeId})
    res.status(201).end()
  } catch (err) {
    next(err)
  }
})

// GET user_places
router.get('/:userId/places', async (req, res, next) => {
  const {userId} = req.params
  try {
    const places = await User.findOne({
      where: {id: userId},
      include: [{model: Place}]
    })
    res.status(200).json(places)
  } catch (err) {
    next(err)
  }
})

// POST user_places
router.post('/places', async (req, res, next) => {
  const {userId, placeId} = req.body
  try {
    await UserPlace.create({userId, placeId})
    res.status(201).end()
  } catch (err) {
    next(err)
  }
})

//GET user_categories
//THIS ROUTE IS STILL A WORK IN PROGRESS
router.get('/:userId/categories', async (req, res, next) => {
  try {
    let {userId} = req.params
    let selectedCategories = await User.findOne({
      where: {id: userId},
      include: [
        {
          model: Category,
          attributes: {exclude: ['createdAt', 'updatedAt']}
        }
      ]
    })
    res.status(200).json(selectedCategories)
  } catch (err) {
    next(err)
  }
})

// get users home_place
router.get('/:userId/home_places', async (req, res, next) => {
  try {
    let {userId} = req.params
    let homePlaces = await db.query(
      `SELECT home_places.*
    FROM home_places
    JOIN user_homes ON "home_places"."homeId"= "user_homes"."homeId"
    WHERE "user_homes"."userId" = :userId`,
      {
        replacements: {userId},
        type: db.QueryTypes.SELECT
      }
    )
    res.json(homePlaces)
  } catch (err) {
    next(err)
  }
})
