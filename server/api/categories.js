const router = require('express').Router()
const {Category, Priority} = require('../db/models')
// Neded for RAW query
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const pkg = require('../../package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)

module.exports = router

// All Categories for Category Filter menu
router.get('/', async (req, res, next) => {
  try {
    let categories = await Category.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})

// User's Selected Categories
router.get('/:userId', async (req, res, next) => {
  let {userId} = req.params
  try {
    let categories = await db.query(
      `SELECT COALESCE(categories.type, '') || COALESCE(places.name, '') AS label, priorities.priority, "priorities"."categoryId", "priorities"."placeId"
      FROM priorities
      LEFT JOIN categories ON "priorities"."categoryId" = categories.id
      LEFT JOIN places ON "priorities"."placeId" = places.id
      WHERE "priorities"."userId" = :userId
      ORDER BY priorities.priority;`,
      {replacements: {userId}, type: Sequelize.QueryTypes.SELECT}
    )
    res.status(200).json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  const {userId} = req.params
  const {categoryId, priority} = req.body
  try {
    await Priority.create({userId, priority, categoryId})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.delete(
  '/:categoryId/priority/:priority/:userId',
  async (req, res, next) => {
    const {categoryId, priority, userId} = req.params
    try {
      const shift = await Priority.findAll({
        where: {
          userId: userId,
          priority: {[Op.gt]: priority}
        },
        raw: true
      })
      const shifted = shift.map(item => {
        return {...item, priority: item.priority - 1}
      })

      for (let i = 0; i < shifted.length; i++) {
        await Priority.update(
          {priority: shifted[i].priority},
          {
            where: {id: shifted[i].id},
            returning: true
          }
        )
      }
      await Priority.destroy({where: {userId, categoryId}})
      res.status(202).end()
    } catch (err) {
      next(err)
    }
  }
)
router.put('/:userId', async (req, res, next) => {
  const {selected} = req.body
  const {userId} = req.params
  try {
    const promises = selected.map(item => {
      if (item.categoryId) {
        return Priority.update(
          {priority: item.priority},
          {
            where: {
              userId,
              categoryId: item.categoryId
            }
          }
        )
      } else {
        return Priority.update(
          {priority: item.priority},
          {
            where: {
              userId,
              placeId: item.placeId
            }
          }
        )
      }
    })
    await Promise.all(promises)
    res.status(202).end()
  } catch (err) {
    next(err)
  }
})
